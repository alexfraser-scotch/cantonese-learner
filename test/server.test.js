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
