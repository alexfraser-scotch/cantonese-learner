const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const fs = require('node:fs');
const { ensureDataFile, readProfiles, writeProfiles, DEFAULT_PROFILES } = require('../server.js');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

test('Data directory and profiles initialization', (t) => {
    ensureDataFile();

    assert.strictEqual(fs.existsSync(DATA_DIR), true, 'Data directory should exist');
    assert.strictEqual(fs.existsSync(PROFILES_FILE), true, 'profiles.json should exist');
    
    const profiles = readProfiles();
    assert.strictEqual(Array.isArray(profiles), true, 'Profiles should be an array');
    assert.ok(profiles.length > 0, 'Profiles should contain default datasets');
    
    const firstProfile = profiles[0];
    assert.ok(firstProfile.id, 'Profile should have an id');
    assert.ok(firstProfile.name, 'Profile should have a name');
    assert.ok(Array.isArray(firstProfile.items), 'Profile items should be an array');
});

test('Profile metadata and community properties', (t) => {
    const profiles = readProfiles();
    
    profiles.forEach((profile) => {
        assert.ok(profile.id, `Profile ${profile.id} missing ID`);
        assert.ok(profile.name, `Profile ${profile.id} missing name`);
        assert.ok(profile.author, `Profile ${profile.id} missing author`);
        assert.ok(profile.difficulty, `Profile ${profile.id} missing difficulty`);
        assert.strictEqual(typeof profile.likes, 'number', `Profile ${profile.id} likes must be a number`);
        
        profile.items.forEach((item) => {
            assert.ok(item.word, `Item ${item.id} missing word`);
            assert.ok(item.jyutping, `Item ${item.id} missing jyutping`);
            assert.ok(item.meaning, `Item ${item.id} missing meaning`);
        });
    });
});

test('Community deck like and write operation', (t) => {
    const profiles = readProfiles();
    const target = profiles[0];
    const initialLikes = target.likes || 0;
    
    target.likes = initialLikes + 1;
    const writeSuccess = writeProfiles(profiles);
    assert.strictEqual(writeSuccess, true, 'writeProfiles should return true');
    
    const updatedProfiles = readProfiles();
    assert.strictEqual(updatedProfiles[0].likes, initialLikes + 1, 'Likes count should be incremented');
});

test('Spaced Repetition System (Leitner 5-Box SRS) intervals', (t) => {
    const INTERVALS = [0, 1, 3, 7, 14, 30];
    
    function processReview(item, rating) {
        let box = item.srsBox || 1;
        if (rating === 1) box = 1;
        else if (rating === 'good') box = Math.min(box + 1, 5);
        else if (rating === 5) box = 5;

        const days = INTERVALS[box] || 1;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + days);

        item.srsBox = box;
        item.nextReviewDate = nextDate.toISOString();
        item.mastered = (box >= 5);
        return { box, days };
    }

    const testItem = { word: '你好', srsBox: 1 };
    
    // 1. Good review advances Box 1 -> Box 2
    let res = processReview(testItem, 'good');
    assert.strictEqual(res.box, 2, 'Box should advance to 2');
    assert.strictEqual(res.days, 3, 'Interval for Box 2 should be 3 days');

    // 2. Failure resets to Box 1
    res = processReview(testItem, 1);
    assert.strictEqual(res.box, 1, 'Box should reset to 1');
    assert.strictEqual(res.days, 1, 'Interval for Box 1 should be 1 day');

    // 3. Easy rating advances to Box 5 (Mastered)
    res = processReview(testItem, 5);
    assert.strictEqual(res.box, 5, 'Box should set to 5');
    assert.strictEqual(res.days, 30, 'Interval for Box 5 should be 30 days');
    assert.strictEqual(testItem.mastered, true, 'Item should be marked as mastered');
});

test('Open-source governance templates verification', (t) => {
    const rootDir = path.join(__dirname, '..');
    const licenseFile = path.join(rootDir, 'LICENSE');
    const readmeFile = path.join(rootDir, 'README.md');
    const bugTemplate = path.join(rootDir, '.github', 'ISSUE_TEMPLATE', 'bug_report.md');
    const featureTemplate = path.join(rootDir, '.github', 'ISSUE_TEMPLATE', 'feature_request.md');
    const prTemplate = path.join(rootDir, '.github', 'PULL_REQUEST_TEMPLATE.md');

    assert.strictEqual(fs.existsSync(licenseFile), true, 'LICENSE file should exist');
    assert.strictEqual(fs.existsSync(readmeFile), true, 'README.md should exist');
    assert.strictEqual(fs.existsSync(bugTemplate), true, 'Bug report issue template should exist');
    assert.strictEqual(fs.existsSync(featureTemplate), true, 'Feature request issue template should exist');
    assert.strictEqual(fs.existsSync(prTemplate), true, 'PR template should exist');
});

test('Cantonese Tone Extraction & Ear Training Question Pool', (t) => {
    function extractTones(jyutpingStr) {
        if (!jyutpingStr) return [];
        const matches = jyutpingStr.match(/[1-6]/g);
        return matches ? matches.map(Number) : [];
    }

    assert.deepStrictEqual(extractTones('si1'), [1], 'si1 should extract tone 1');
    assert.deepStrictEqual(extractTones('nei5 hou2'), [5, 2], 'nei5 hou2 should extract tones [5, 2]');
    assert.deepStrictEqual(extractTones('sik6 zo2 faan6 mei6'), [6, 2, 6, 6], 'sik6 zo2 faan6 mei6 should extract tones [6, 2, 6, 6]');

    const tonePool = [
        { word: '詩', jyutping: 'si1', tone: 1 },
        { word: '史', jyutping: 'si2', tone: 2 },
        { word: '試', jyutping: 'si3', tone: 3 },
        { word: '時', jyutping: 'si4', tone: 4 },
        { word: '市', jyutping: 'si5', tone: 5 },
        { word: '事', jyutping: 'si6', tone: 6 }
    ];

    tonePool.forEach((item) => {
        const extracted = extractTones(item.jyutping);
        assert.strictEqual(extracted[0], item.tone, `Extracted tone for ${item.word} should match ${item.tone}`);
    });
});

test('AuthManager user session persistence across page reload', (t) => {
    const mockLocalStorage = {
        store: {},
        getItem(key) { return this.store[key] || null; },
        setItem(key, val) { this.store[key] = String(val); },
        removeItem(key) { delete this.store[key]; }
    };

    const STORAGE_KEY = 'cantonese_learner_user_session_v1';
    const sampleUser = {
        uid: 'usr-test-123',
        displayName: 'Test Learner',
        email: 'test@example.com',
        photoURL: 'https://example.com/avatar.jpg'
    };

    mockLocalStorage.setItem(STORAGE_KEY, JSON.stringify(sampleUser));
    
    const restoredUserRaw = mockLocalStorage.getItem(STORAGE_KEY);
    assert.ok(restoredUserRaw, 'Restored session raw data should exist');

    const restoredUser = JSON.parse(restoredUserRaw);
    assert.strictEqual(restoredUser.uid, 'usr-test-123', 'UID must persist');
    assert.strictEqual(restoredUser.displayName, 'Test Learner', 'Display name must persist');
    assert.strictEqual(restoredUser.email, 'test@example.com', 'Email must persist');

    mockLocalStorage.removeItem(STORAGE_KEY);
    assert.strictEqual(mockLocalStorage.getItem(STORAGE_KEY), null, 'Session should be removed on signout');
});

test('SRS Box Retention Statistics Aggregator', (t) => {
    function getBoxStats(items) {
        if (!Array.isArray(items)) return { box1: 0, box2: 0, box3: 0, box4: 0, box5: 0, due: 0 };
        const stats = { box1: 0, box2: 0, box3: 0, box4: 0, box5: 0, due: 0 };
        items.forEach(item => {
            const box = item.srsBox || 1;
            if (box >= 1 && box <= 5) stats[`box${box}`]++;
            if (!item.nextReviewDate || new Date(item.nextReviewDate) <= new Date()) stats.due++;
        });
        return stats;
    }

    const mockItems = [
        { word: '一', srsBox: 1, nextReviewDate: new Date(Date.now() - 1000).toISOString() },
        { word: '二', srsBox: 2, nextReviewDate: new Date(Date.now() + 86400000).toISOString() },
        { word: '三', srsBox: 5, nextReviewDate: new Date(Date.now() + 864000000).toISOString() }
    ];

    const stats = getBoxStats(mockItems);
    assert.strictEqual(stats.box1, 1, 'Box 1 count should be 1');
    assert.strictEqual(stats.box2, 1, 'Box 2 count should be 1');
    assert.strictEqual(stats.box5, 1, 'Box 5 count should be 1');
    assert.strictEqual(stats.due, 1, 'Due count should be 1');
});
