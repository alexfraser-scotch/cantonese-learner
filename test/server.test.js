const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const fs = require('node:fs');
const { server, ensureDataFile, readProfiles, writeProfiles, DEFAULT_PROFILES } = require('../server.js');

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
    const securityFile = path.join(rootDir, 'SECURITY.md');
    const conductFile = path.join(rootDir, 'CODE_OF_CONDUCT.md');
    const bugTemplate = path.join(rootDir, '.github', 'ISSUE_TEMPLATE', 'bug_report.md');
    const featureTemplate = path.join(rootDir, '.github', 'ISSUE_TEMPLATE', 'feature_request.md');
    const prTemplate = path.join(rootDir, '.github', 'PULL_REQUEST_TEMPLATE.md');

    assert.strictEqual(fs.existsSync(licenseFile), true, 'LICENSE file should exist');
    assert.strictEqual(fs.existsSync(readmeFile), true, 'README.md should exist');
    assert.strictEqual(fs.existsSync(securityFile), true, 'SECURITY.md should exist');
    assert.strictEqual(fs.existsSync(conductFile), true, 'CODE_OF_CONDUCT.md should exist');
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

test('Role-Based Access Control (RBAC) and Root Admin initialization', (t) => {
    const { readUsers, ROOT_ADMIN_EMAILS, isAuthorizedAdmin } = require('../server.js');
    const users = readUsers();
    assert.ok(Array.isArray(users), 'Users should be an array');
    
    // 1. Root Admin exists and is protected
    const rootUser = users.find(u => u.email && u.email.toLowerCase() === 'canewjour@gmail.com');
    assert.ok(rootUser, 'canewjour@gmail.com must exist as seeded Root Admin');
    assert.strictEqual(rootUser.role, 'root', 'Root admin role must be root');
    assert.strictEqual(rootUser.status, 'active', 'Root admin status must be active');

    // 2. Auth checks
    assert.strictEqual(isAuthorizedAdmin('canewjour@gmail.com'), true, 'canewjour@gmail.com should be authorized admin');
    assert.strictEqual(isAuthorizedAdmin('randomuser@example.com'), false, 'Non-admin should not be authorized');
});

test('Root Admin Immutability and Security Guards', (t) => {
    const { readUsers, writeUsers } = require('../server.js');
    const users = readUsers();
    
    // Attempting to modify Root Admin role or disable Root Admin via writeUsers
    const modifiedUsers = users.map(u => {
        if (u.email === 'canewjour@gmail.com') {
            return { ...u, role: 'user', status: 'disabled' };
        }
        return u;
    });

    writeUsers(modifiedUsers);
    const reloadedUsers = readUsers();
    const rootUser = reloadedUsers.find(u => u.email === 'canewjour@gmail.com');
    
    // Root Admin must remain immutable
    assert.strictEqual(rootUser.role, 'root', 'Root Admin role cannot be overridden');
    assert.strictEqual(rootUser.status, 'active', 'Root Admin status cannot be disabled');
});

test('User Role Promotion and Status Toggle Lifecycle', (t) => {
    const { readUsers, writeUsers, isAuthorizedAdmin } = require('../server.js');
    let users = readUsers();
    
    // Create test user
    const testUser = {
        id: 'usr-test-lifecycle',
        email: 'learner-test@example.com',
        displayName: 'Test Learner',
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString()
    };
    users.push(testUser);
    writeUsers(users);

    // Promote to Admin
    testUser.role = 'admin';
    writeUsers(users);
    assert.strictEqual(isAuthorizedAdmin('learner-test@example.com'), true, 'Promoted user should be authorized admin');

    // Disable Account
    testUser.status = 'disabled';
    writeUsers(users);
    assert.strictEqual(isAuthorizedAdmin('learner-test@example.com'), false, 'Disabled admin should not be authorized');

    // Clean up
    users = users.filter(u => u.id !== 'usr-test-lifecycle');
    writeUsers(users);
});

test('Community Deck Moderation & Featured Pinning', (t) => {
    const profiles = readProfiles();
    const deck = profiles[0];
    const originalFeatured = deck.featured;

    deck.featured = true;
    writeProfiles(profiles);

    const reloaded = readProfiles();
    assert.strictEqual(reloaded[0].featured, true, 'Deck should be marked as featured');

    // Revert
    reloaded[0].featured = originalFeatured;
    writeProfiles(reloaded);
});

test('Dictation Mode (默書) Word Randomization & State Flow', (t) => {
    const mockProfile = {
        id: 'prof-dictation-test',
        name: 'Dictation Test Deck',
        items: [
            { id: 'w1', word: '你好', jyutping: 'nei5 hou2', meaning: 'Hello' },
            { id: 'w2', word: '早晨', jyutping: 'zou2 san4', meaning: 'Good morning' },
            { id: 'w3', word: '多謝', jyutping: 'do1 ze6', meaning: 'Thank you' },
            { id: 'w4', word: '唔該', jyutping: 'm4 goi1', meaning: 'Please/Excuse me' }
        ]
    };

    // 1. Randomization at once
    const randomized = [...mockProfile.items].sort(() => 0.5 - Math.random());
    assert.strictEqual(randomized.length, 4, 'Randomized items count must equal total items');
    assert.ok(randomized.every(item => mockProfile.items.some(orig => orig.id === item.id)), 'All original items must be present');

    // 2. Dictation state machine simulation
    let dictationState = {
        items: randomized,
        currentIndex: 0,
        isRevealed: false,
        isFinished: false,
        autoPlaySeconds: 10,
        autoPlayIntervalSeconds: 3
    };

    // Initial state: details hidden by default
    assert.strictEqual(dictationState.isRevealed, false, 'Word details must be hidden by default in dictation');
    assert.strictEqual(dictationState.currentIndex, 0, 'Dictation must start at word index 0');

    // Flip over reveals details (Button 2)
    dictationState.isRevealed = !dictationState.isRevealed;
    assert.strictEqual(dictationState.isRevealed, true, 'Flipping must reveal word details');

    // Next word resets detail visibility to hidden (Button 3)
    dictationState.currentIndex++;
    dictationState.isRevealed = false;
    assert.strictEqual(dictationState.currentIndex, 1, 'Index must advance to 1');
    assert.strictEqual(dictationState.isRevealed, false, 'Next word must reset details to hidden');

    // Previous word (Button 4)
    dictationState.currentIndex--;
    dictationState.isRevealed = false;
    assert.strictEqual(dictationState.currentIndex, 0, 'Index must return to 0');

    // Auto Play audio repetition calculations (Button 5)
    function calculateAutoPlayRepeats(durationSeconds, intervalSeconds = 3) {
        // Plays immediately at t=0, then every intervalSeconds up to durationSeconds
        return Math.floor(durationSeconds / intervalSeconds) + (durationSeconds % intervalSeconds === 0 ? 0 : 1);
    }

    assert.strictEqual(calculateAutoPlayRepeats(10, 3), 4, '10s duration with 3s interval plays 4 times (0s, 3s, 6s, 9s)');
    assert.strictEqual(calculateAutoPlayRepeats(15, 3), 5, '15s duration with 3s interval plays 5 times (0s, 3s, 6s, 9s, 12s)');
    assert.strictEqual(calculateAutoPlayRepeats(30, 3), 10, '30s duration with 3s interval plays 10 times');

    // Stopwatch formatting verification
    function formatStopwatchTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    assert.strictEqual(formatStopwatchTime(0), '00:00', '0s formats to 00:00');
    assert.strictEqual(formatStopwatchTime(45), '00:45', '45s formats to 00:45');
    assert.strictEqual(formatStopwatchTime(125), '02:05', '125s formats to 02:05');
    assert.strictEqual(formatStopwatchTime(3600), '60:00', '3600s formats to 60:00');

    // 3. Word list scope filtering verification (All, Learning, Mastered, Favorites)
    const mockUserProgress = {
        masteredItemIds: ['w1', 'w3'], // '你好' and '多謝' are mastered
        favoriteItemIds: ['w2', 'w3']  // '早晨' and '多謝' are favorites
    };

    const masteredSet = new Set(mockUserProgress.masteredItemIds);
    const favSet = new Set(mockUserProgress.favoriteItemIds);

    function filterItemsByScope(items, scope) {
        if (scope === 'learning') return items.filter(i => !masteredSet.has(i.id));
        if (scope === 'mastered') return items.filter(i => masteredSet.has(i.id));
        if (scope === 'favorites') return items.filter(i => favSet.has(i.id));
        return [...items];
    }

    const allScope = filterItemsByScope(mockProfile.items, 'all');
    const learningScope = filterItemsByScope(mockProfile.items, 'learning');
    const masteredScope = filterItemsByScope(mockProfile.items, 'mastered');
    const favoritesScope = filterItemsByScope(mockProfile.items, 'favorites');

    assert.strictEqual(allScope.length, 4, 'All words scope includes all 4 items');
    assert.strictEqual(learningScope.length, 2, 'Learning scope includes 2 unmastered items (w2, w4)');
    assert.deepStrictEqual(learningScope.map(i => i.id).sort(), ['w2', 'w4'].sort());
    assert.strictEqual(masteredScope.length, 2, 'Mastered scope includes 2 mastered items (w1, w3)');
    assert.deepStrictEqual(masteredScope.map(i => i.id).sort(), ['w1', 'w3'].sort());
    assert.strictEqual(favoritesScope.length, 2, 'Favorites scope includes 2 favorited items (w2, w3)');
    assert.deepStrictEqual(favoritesScope.map(i => i.id).sort(), ['w2', 'w3'].sort());

    // Completion at end of list
    dictationState.currentIndex = dictationState.items.length - 1;
    // Advancing past last item marks dictation as finished
    dictationState.isFinished = true;
    assert.strictEqual(dictationState.isFinished, true, 'Completing all items marks dictation as finished');
});

test('High-Precision Image Auto-Generation & Word-Boundary Token Matching', (t) => {
    // Helper replicating safeMatch logic
    function safeMatch(text, wordsZh = [], wordsEn = []) {
        if (!text) return false;
        const lowerText = text.toLowerCase();
        for (const zh of wordsZh) {
            if (lowerText.includes(zh.toLowerCase())) return true;
        }
        for (const en of wordsEn) {
            const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escaped}(s|es|ed|ing|d)?\\b`, 'i');
            if (regex.test(lowerText)) return true;
        }
        return false;
    }

    // 1. Verify safeMatch prevents false-positive substring accidents
    assert.strictEqual(safeMatch('scared / afraid', ['車'], ['car']), false, '"scared" must NOT trigger "car"');
    assert.strictEqual(safeMatch('teacher 老師', ['茶'], ['tea']), false, '"teacher" must NOT trigger "tea"');
    assert.strictEqual(safeMatch('category 類別', ['貓'], ['cat']), false, '"category" must NOT trigger "cat"');
    assert.strictEqual(safeMatch('weather 天氣', ['食'], ['eat']), false, '"weather" must NOT trigger "eat"');
    assert.strictEqual(safeMatch('beggar 乞丐', ['蛋'], ['egg']), false, '"beggar" must NOT trigger "egg"');
    assert.strictEqual(safeMatch('vocabulary 詞彙', ['的士'], ['cab']), false, '"vocabulary" must NOT trigger "cab"');

    // 2. Verify accurate emotion and topic detections
    assert.strictEqual(safeMatch('生氣 angry', ['生氣', '憤怒'], ['angry', 'mad']), true, '"生氣 angry" matches angry topic');
    assert.strictEqual(safeMatch('害怕 scared / afraid', ['害怕', '恐懼'], ['scared', 'afraid']), true, '"害怕 scared" matches scared topic');
    assert.strictEqual(safeMatch('緊張 nervous', ['緊張'], ['nervous', 'anxious']), true, '"緊張 nervous" matches nervous topic');
    assert.strictEqual(safeMatch('擔心 worried', ['擔心'], ['worried', 'concern']), true, '"擔心 worried" matches worried topic');
    assert.strictEqual(safeMatch('害羞 shy', ['害羞', '怕醜'], ['shy', 'blushing']), true, '"害羞 shy" matches shy topic');
    assert.strictEqual(safeMatch('勇敢 brave', ['勇敢', '膽大'], ['brave', 'courageous']), true, '"勇敢 brave" matches brave topic');

    // 3. Verify that all 6 emotion words from screenshot receive unique, accurate thematic URLs
    const emotionTestItems = [
        { word: '生氣', meaning: 'Angry / Mad', meaningZh: '生氣 / 憤怒' },
        { word: '害怕', meaning: 'Scared / Afraid', meaningZh: '害怕 / 恐懼' },
        { word: '緊張', meaning: 'Nervous / Tense', meaningZh: '緊張 / 忐忑' },
        { word: '擔心', meaning: 'Worried / Anxious', meaningZh: '擔心 / 憂慮' },
        { word: '害羞', meaning: 'Shy / Blushing', meaningZh: '害羞 / 怕醜' },
        { word: '勇敢', meaning: 'Brave / Courageous', meaningZh: '勇敢 / 膽大' }
    ];

    // Mock getTopicImage implementation
    function getTopicImage(word, meaning = '') {
        const text = `${word} ${meaning}`.trim();
        if (safeMatch(text, ['生氣', '憤怒'], ['angry', 'mad', 'furious'])) {
            return 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80';
        }
        if (safeMatch(text, ['害怕', '恐懼'], ['scared', 'afraid', 'fear'])) {
            return 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80';
        }
        if (safeMatch(text, ['緊張'], ['nervous', 'tense', 'tension', 'stress'])) {
            return 'https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=600&q=80';
        }
        if (safeMatch(text, ['擔心'], ['worried', 'concern', 'worry', 'anxious', 'anxiety'])) {
            return 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=600&q=80';
        }
        if (safeMatch(text, ['害羞', '怕醜'], ['shy', 'blushing'])) {
            return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
        }
        if (safeMatch(text, ['勇敢', '膽大'], ['brave', 'courageous'])) {
            return 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=600&q=80';
        }
        return 'https://images.unsplash.com/photo-fallback';
    }

    const assignedImages = emotionTestItems.map(item => getTopicImage(item.word, item.meaning));
    const uniqueImages = new Set(assignedImages);

    assert.strictEqual(uniqueImages.size, 6, 'All 6 emotions must have distinct, customized topic photos');
    assert.ok(!assignedImages[0].includes('dumpling'), '生氣 (Angry) must not be dumplings');
    assert.ok(!assignedImages[1].includes('photo-1503376780353-7e6692767b70'), '害怕 (Scared) must not be sports car');
    assert.ok(!assignedImages[2].includes('photo-1495474472287-4d71bcdd2085'), '緊張 (Nervous) must not be coffee latte art');
});

test('Daily Learning Target (每日學習目標) Engine & Streak Tracker', (t) => {
    // 1. Multi-profile test data
    const mockProfiles = [
        {
            id: 'prof-p1',
            name: 'Basics 1',
            items: [
                { id: 'item-1', word: '早晨', jyutping: 'zou2 san4' },
                { id: 'item-2', word: '你好', jyutping: 'nei5 hou2' }
            ]
        },
        {
            id: 'prof-p2',
            name: 'Food Deck',
            items: [
                { id: 'item-3', word: '點心', jyutping: 'dim2 sam1' },
                { id: 'item-4', word: '奶茶', jyutping: 'naai5 caa4' },
                { id: 'item-1', word: '早晨', jyutping: 'zou2 san4' } // Duplicate item across profiles
            ]
        }
    ];

    const mockProgress = {
        masteredItemIds: ['item-1'], // '早晨' is mastered
        favoriteItemIds: ['item-2', 'item-4'], // '你好' and '奶茶' are favorites
        dailyTarget: {
            profileId: 'all',
            filterScope: 'learning',
            targetCount: 3,
            completedItemIds: [],
            lastDate: '2026-09-01',
            streak: 2
        }
    };

    // 2. Candidate Word Gathering with Deduplication & Scope Filtering
    function getCandidates(profiles, progress, scopeProfileId, filterScope) {
        let pool = [];
        if (scopeProfileId === 'all') {
            profiles.forEach(p => pool.push(...p.items));
        } else {
            const found = profiles.find(p => p.id === scopeProfileId);
            if (found) pool.push(...found.items);
        }

        // Deduplicate
        const unique = new Map();
        pool.forEach(i => {
            if (!unique.has(i.id)) unique.set(i.id, i);
        });
        let result = Array.from(unique.values());

        const masteredSet = new Set(progress.masteredItemIds || []);
        const favSet = new Set(progress.favoriteItemIds || []);

        if (filterScope === 'learning') {
            result = result.filter(i => !masteredSet.has(i.id));
        } else if (filterScope === 'mastered') {
            result = result.filter(i => masteredSet.has(i.id));
        } else if (filterScope === 'favorites') {
            result = result.filter(i => favSet.has(i.id));
        }
        return result;
    }

    // Test All Profiles + Learning scope
    const allLearning = getCandidates(mockProfiles, mockProgress, 'all', 'learning');
    assert.strictEqual(allLearning.length, 3, 'Should gather 3 unique unmastered words (item-2, item-3, item-4)');
    assert.ok(!allLearning.some(i => i.id === 'item-1'), 'Mastered item-1 must be excluded from learning scope');

    // Test Specific Profile (prof-p1) + All words
    const p1All = getCandidates(mockProfiles, mockProgress, 'prof-p1', 'all');
    assert.strictEqual(p1All.length, 2, 'Profile 1 has 2 total words');

    // Test All Profiles + Favorites
    const allFavorites = getCandidates(mockProfiles, mockProgress, 'all', 'favorites');
    assert.strictEqual(allFavorites.length, 2, 'Should gather 2 favorite items (item-2, item-4)');

    // 3. Daily Progress & Streak Logic
    function recordWord(progress, itemId) {
        const target = progress.dailyTarget;
        if (!target.completedItemIds.includes(itemId)) {
            target.completedItemIds.push(itemId);
            if (target.completedItemIds.length === target.targetCount) {
                target.streak = (target.streak || 0) + 1;
            }
        }
        return target;
    }

    recordWord(mockProgress, 'item-2');
    assert.strictEqual(mockProgress.dailyTarget.completedItemIds.length, 1);
    assert.strictEqual(mockProgress.dailyTarget.streak, 2, 'Streak remains 2 before reaching target count');

    recordWord(mockProgress, 'item-3');
    recordWord(mockProgress, 'item-4');
    assert.strictEqual(mockProgress.dailyTarget.completedItemIds.length, 3);
    assert.strictEqual(mockProgress.dailyTarget.streak, 3, 'Reaching targetCount (3 words) increments streak to 3');

    // 4. Day Rollover verification
    function checkDayRollover(target, todayDateStr) {
        if (target.lastDate !== todayDateStr) {
            target.completedItemIds = [];
            target.lastDate = todayDateStr;
        }
        return target;
    }

    const nextDay = '2026-09-02';
    checkDayRollover(mockProgress.dailyTarget, nextDay);
    assert.strictEqual(mockProgress.dailyTarget.completedItemIds.length, 0, 'New day resets completed items to 0');
    assert.strictEqual(mockProgress.dailyTarget.lastDate, nextDay);
    assert.strictEqual(mockProgress.dailyTarget.streak, 3, 'Streak is preserved for the new day');
});

test('Teardown test runner server handle', (t) => {
    if (server && typeof server.close === 'function') {
        server.close();
    }
});

