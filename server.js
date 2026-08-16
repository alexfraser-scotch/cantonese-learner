const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const DATA_DIR = path.join(__dirname, 'data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

const DEFAULT_PROFILES = [
    {
        id: 'prof-greetings-01',
        name: 'Essential Greetings & Basics (廣東話日常對話)',
        category: 'Basics',
        description: 'Common Cantonese greetings, polite expressions, and daily conversation starters.',
        createdAt: new Date().toISOString(),
        items: [
            {
                id: 'w-1',
                word: '你好',
                jyutping: 'nei5 hou2',
                meaning: 'Hello / How are you',
                example: '你好！很高興認識你。',
                example_meaning: 'Hello! Nice to meet you.',
                mastered: false,
                favorite: true
            },
            {
                id: 'w-2',
                word: '多謝',
                jyutping: 'do1 ze6',
                meaning: 'Thank you (for gifts / favors)',
                example: '多謝你的禮物，我好喜歡！',
                example_meaning: 'Thank you for your gift, I really like it!',
                mastered: true,
                favorite: false
            },
            {
                id: 'w-3',
                word: '唔該',
                jyutping: 'm4 goi1',
                meaning: 'Thank you (for service) / Excuse me / Please',
                example: '唔該，借借。',
                example_meaning: 'Excuse me, please let me through.',
                mastered: false,
                favorite: true
            },
            {
                id: 'w-4',
                word: '早晨',
                jyutping: 'zou2 san4',
                meaning: 'Good morning',
                example: '早晨！今日天氣真係好。',
                example_meaning: 'Good morning! Today\'s weather is really nice.',
                mastered: false,
                favorite: false
            },
            {
                id: 'w-5',
                word: '再見',
                jyutping: 'zoi3 gin3',
                meaning: 'Goodbye / See you again',
                example: '我哋聽日再見！',
                example_meaning: 'We will see each other again tomorrow!',
                mastered: true,
                favorite: false
            },
            {
                id: 'w-6',
                word: '食咗飯未？',
                jyutping: 'sik6 zo2 faan6 mei6?',
                meaning: 'Have you eaten yet? (Common greeting)',
                example: '食咗飯未呀？一齊去食啦！',
                example_meaning: 'Have you eaten yet? Let\'s go eat together!',
                mastered: false,
                favorite: true
            },
            {
                id: 'w-7',
                word: '冇問題',
                jyutping: 'mou5 man6 tai4',
                meaning: 'No problem / You\'re welcome',
                example: '冇問題，包喺我身上！',
                example_meaning: 'No problem, leave it all to me!',
                mastered: false,
                favorite: false
            },
            {
                id: 'w-8',
                word: '呢個幾多錢？',
                jyutping: 'ni1 go3 gei2 do1 cin2?',
                meaning: 'How much is this?',
                example: '唔該，呢個幾多錢呀？',
                example_meaning: 'Excuse me, how much is this one?',
                mastered: false,
                favorite: false
            }
        ]
    },
    {
        id: 'prof-dining-02',
        name: 'Cha Chaan Teng & Dining (茶餐廳與飲茶)',
        category: 'Food & Dining',
        description: 'Essential vocabulary for ordering food, tea restaurant items, and dim sum.',
        createdAt: new Date().toISOString(),
        items: [
            {
                id: 'w-9',
                word: '凍檸茶',
                jyutping: 'dung3 ning4 caa4',
                meaning: 'Iced Lemon Tea',
                example: '唔該要一杯凍檸茶，少甜走冰！',
                example_meaning: 'One iced lemon tea please, less sweet and no ice!',
                mastered: true,
                favorite: true
            },
            {
                id: 'w-10',
                word: '蛋撻',
                jyutping: 'daan6 taat3',
                meaning: 'Egg Tart',
                example: '呢間餅店嘅酥皮蛋撻好出名。',
                example_meaning: 'This bakery\'s puff pastry egg tarts are very famous.',
                mastered: false,
                favorite: true
            },
            {
                id: 'w-11',
                word: '點心',
                jyutping: 'dim2 sam1',
                meaning: 'Dim Sum',
                example: '星期日我們全家人去飲茶食點心。',
                example_meaning: 'On Sunday our whole family goes to drink tea and eat dim sum.',
                mastered: false,
                favorite: false
            },
            {
                id: 'w-12',
                word: '埋單',
                jyutping: 'maai4 daan1',
                meaning: 'Check / Bill please',
                example: '夥計，唔該埋單！',
                example_meaning: 'Waiter, check please!',
                mastered: true,
                favorite: true
            },
            {
                id: 'w-13',
                word: '菠蘿包',
                jyutping: 'bo1 lo4 baau1',
                meaning: 'Pineapple Bun',
                example: '熱菠蘿油加一杯熱奶茶最正。',
                example_meaning: 'Hot pineapple bun with butter plus a hot milk tea is the absolute best.',
                mastered: false,
                favorite: false
            },
            {
                id: 'w-14',
                word: '叉燒包',
                jyutping: 'caa1 siu1 baau1',
                meaning: 'BBQ Pork Bun',
                example: '蒸籠入面嘅叉燒包熱辣辣。',
                example_meaning: 'The BBQ pork buns inside the bamboo steamer are piping hot.',
                mastered: false,
                favorite: false
            }
        ]
    },
    {
        id: 'prof-tech-03',
        name: 'Tech & Modern Terms (科技與生活用語)',
        category: 'Technology',
        description: 'Modern vocabulary for smartphones, internet, computing, and digital life.',
        createdAt: new Date().toISOString(),
        items: [
            {
                id: 'w-15',
                word: '手提電話',
                jyutping: 'sau2 tai4 din6 waa2',
                meaning: 'Mobile Phone / Smartphone',
                example: '我部手提電話快要冇電喇。',
                example_meaning: 'My mobile phone is almost out of battery.',
                mastered: false,
                favorite: false
            },
            {
                id: 'w-16',
                word: '網絡',
                jyutping: 'mong5 lok6',
                meaning: 'Internet / Network',
                example: '呢度嘅 WiFi 網絡速度好快。',
                example_meaning: 'The WiFi network speed here is very fast.',
                mastered: true,
                favorite: false
            },
            {
                id: 'w-17',
                word: '應用程式',
                jyutping: 'jing3 jung6 cing4 sik1',
                meaning: 'Application / App',
                example: '我寫咗個廣東話學習應用程式。',
                example_meaning: 'I wrote a Cantonese learning application.',
                mastered: false,
                favorite: true
            },
            {
                id: 'w-18',
                word: '充電器',
                jyutping: 'cung1 din6 hei3',
                meaning: 'Charger / Power Bank',
                example: '你有冇帶手提電話充電器？',
                example_meaning: 'Do you have a phone charger with you?',
                mastered: false,
                favorite: false
            }
        ]
    }
];

function ensureDataFile() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PROFILES_FILE)) {
        fs.writeFileSync(PROFILES_FILE, JSON.stringify(DEFAULT_PROFILES, null, 2), 'utf-8');
    }
}

const IMAGE_MAP = {
    '你好': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    '多謝': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    '唔該': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
    '早晨': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    '再見': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    '食咗飯未？': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    '冇問題': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    '呢個幾多錢？': 'https://images.unsplash.com/photo-1556742049-0a675659850e?auto=format&fit=crop&w=600&q=80',
    '凍檸茶': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    '蛋撻': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    '點心': 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    '埋單': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    '菠蘿包': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    '叉燒包': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    '手提電話': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    '網絡': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    '應用程式': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    '充電器': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80'
};

const MEANING_ZH_MAP = {
    '你好': '你好 / 招呼問候',
    '多謝': '多謝 / 感謝致謝',
    '唔該': '唔該 / 勞煩客氣',
    '早晨': '早晨 / 早上好',
    '再見': '再見 / 告別告辭',
    '食咗飯未？': '食飯未 / 日常問候',
    '冇問題': '冇問題 / 沒關係',
    '呢個幾多錢？': '多少錢 / 詢問價格',
    '凍檸茶': '凍檸茶 / 冰檸檬茶',
    '蛋撻': '蛋撻 / 酥皮雞蛋塔',
    '點心': '點心 / 飲茶點心',
    '埋單': '埋單 / 結賬買單',
    '菠蘿包': '菠蘿包 / 港式菠蘿油',
    '叉燒包': '叉燒包 / 港式點心包子',
    '手提電話': '手提電話 / 智能手機',
    '網絡': '網絡 / 互聯網',
    '應用程式': '應用程式 / 手機App',
    '充電器': '充電器 / 行動電源'
};

function readProfiles() {
    ensureDataFile();
    try {
        const raw = fs.readFileSync(PROFILES_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return parsed.map((p, idx) => ({
            author: p.author || 'Cantonese Community',
            difficulty: p.difficulty || (idx % 2 === 0 ? 'Beginner' : 'Intermediate'),
            likes: typeof p.likes === 'number' ? p.likes : 12 + idx * 5,
            ...p,
            items: (p.items || []).map(item => ({
                ...item,
                meaning_zh: item.meaning_zh || MEANING_ZH_MAP[item.word] || `${item.word} (廣東話詞彙)`,
                image: item.image || IMAGE_MAP[item.word] || `https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80`
            }))
        }));
    } catch (e) {
        console.error('Error reading profiles file:', e);
        return DEFAULT_PROFILES;
    }
}

function writeProfiles(profiles) {
    ensureDataFile();
    try {
        fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2), 'utf-8');
        return true;
    } catch (e) {
        console.error('Error writing profiles file:', e);
        return false;
    }
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const urlParts = req.url.split('?');
    const pathName = urlParts[0];

    // ==========================================
    // API ENDPOINT: LIKE COMMUNITY DECK
    // ==========================================
    if (pathName === '/api/profiles/like' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const currentProfiles = readProfiles();
                const profile = currentProfiles.find(p => p.id === data.profileId);
                if (profile) {
                    profile.likes = (profile.likes || 0) + 1;
                    writeProfiles(currentProfiles);
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: true, likes: profile.likes, profileId: profile.id }));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Profile not found' }));
                }
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
            }
        });
        return;
    }

    // ==========================================
    // API ENDPOINTS FOR SHARED PUBLIC PROFILES
    // ==========================================
    if (pathName === '/api/profiles') {
        if (req.method === 'GET') {
            const profiles = readProfiles();
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(profiles));
            return;
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    let currentProfiles = readProfiles();

                    if (Array.isArray(data)) {
                        currentProfiles = data;
                    } else if (data.action === 'create' && data.profile) {
                        if (!data.profile.author) data.profile.author = 'Community Learner';
                        if (!data.profile.likes) data.profile.likes = 1;
                        if (!data.profile.difficulty) data.profile.difficulty = 'Beginner';
                        currentProfiles.unshift(data.profile);
                    } else if (data.action === 'update' && data.profile) {
                        const idx = currentProfiles.findIndex(p => p.id === data.profile.id);
                        if (idx !== -1) currentProfiles[idx] = data.profile;
                        else currentProfiles.unshift(data.profile);
                    } else if (data.action === 'delete' && data.profileId) {
                        currentProfiles = currentProfiles.filter(p => p.id !== data.profileId);
                    } else if (data.action === 'reset') {
                        currentProfiles = DEFAULT_PROFILES;
                    } else if (data.name && data.items) {
                        if (!data.author) data.author = 'Community Learner';
                        if (!data.likes) data.likes = 1;
                        if (!data.difficulty) data.difficulty = 'Beginner';
                        currentProfiles.unshift(data);
                    }

                    writeProfiles(currentProfiles);
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: true, profiles: currentProfiles }));
                } catch (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON body' }));
                }
            });
            return;
        }
    }

    // Static File Serving
    let filePath = pathName === '/' ? '/index.html' : pathName;
    const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    const fullPath = path.join(__dirname, safePath);

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/plain';

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'index.html'), (indexErr, indexContent) => {
                    if (indexErr) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(indexContent);
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = {
    server,
    ensureDataFile,
    readProfiles,
    writeProfiles,
    DEFAULT_PROFILES
};

