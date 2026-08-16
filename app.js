/**
 * Cantonese Vocabulary Learner - SPA Core Logic
 * Stack: Vanilla JavaScript (ES6+), Web Speech API, LocalStorage
 */

// ==========================================
// 0. Master Cantonese Dictionary & Auto-Generator Engine
// ==========================================
class CantoneseDictionary {
    // Comprehensive Master Database for Cantonese Words, Numbers, Elements, Nature, Food, Daily Terms
    static DB = {
        // Numbers & Quantifiers
        '一': { jyutping: 'jat1', meaning_zh: '一 / 數字 1', meaning: 'One / Single / First', example: '祝你有愉快嘅一日！', example_meaning: 'Wish you have a pleasant day!' },
        '二': { jyutping: 'ji6', meaning_zh: '二 / 數字 2', meaning: 'Two / Second', example: '我有二個好朋友。', example_meaning: 'I have two good friends.' },
        '三': { jyutping: 'saam1', meaning_zh: '三 / 數字 3', meaning: 'Three', example: '三位請隨便入座。', example_meaning: 'Three people please take a seat freely.' },
        '四': { jyutping: 'sei3', meaning_zh: '四 / 數字 4', meaning: 'Four', example: '一年有四個季節。', example_meaning: 'A year has four seasons.' },
        '五': { jyutping: 'ng5', meaning_zh: '五 / 數字 5', meaning: 'Five', example: '星期五大家心情最開心。', example_meaning: 'Everyone is happiest on Friday.' },
        '六': { jyutping: 'lok6', meaning_zh: '六 / 數字 6', meaning: 'Six', example: '星期六我哋一齊去飲茶。', example_meaning: 'Let\'s go for dim sum together on Saturday.' },
        '七': { jyutping: 'cat1', meaning_zh: '七 / 數字 7', meaning: 'Seven', example: '一星期有七日。', example_meaning: 'A week has seven days.' },
        '八': { jyutping: 'baat3', meaning_zh: '八 / 發財', meaning: 'Eight / Prosperous', example: '八號風球要留喺屋企。', example_meaning: 'Stay home during Typhoon Signal No. 8.' },
        '九': { jyutping: 'gau2', meaning_zh: '九 / 數字 9', meaning: 'Nine', example: '九龍係香港重要嘅區域。', example_meaning: 'Kowloon is an important district in Hong Kong.' },
        '十': { jyutping: 'sap6', meaning_zh: '十 / 十全十美', meaning: 'Ten / Complete', example: '十分感謝你嘅熱情幫忙！', example_meaning: 'Thank you ten times / very much for your warm help!' },
        '百': { jyutping: 'baak3', meaning_zh: '百 / 數百', meaning: 'Hundred', example: '考試拎到一百分真開心。', example_meaning: 'Really happy to get one hundred marks in the exam.' },
        '千': { jyutping: 'cin1', meaning_zh: '千 / 數千', meaning: 'Thousand', example: '呢件外套要幾千蚊。', example_meaning: 'This jacket costs several thousand dollars.' },
        '萬': { jyutping: 'maan6', meaning_zh: '萬 / 萬事', meaning: 'Ten Thousand / Myriad', example: '祝你萬事如意，身體健康！', example_meaning: 'Wish you all the best and good health!' },
        '億': { jyutping: 'jik1', meaning_zh: '億 / 數億', meaning: 'Hundred Million', example: '香港有幾百億美元外匯儲備。', example_meaning: 'Hong Kong has hundreds of billions in foreign reserves.' },
        '零': { jyutping: 'ling4', meaning_zh: '零 / 零度', meaning: 'Zero / Nil', example: '氣溫跌到攝氏零度。', example_meaning: 'The temperature dropped to zero degrees Celsius.' },
        '第一': { jyutping: 'dai6 jat1', meaning_zh: '第一 / 冠軍', meaning: 'First / Number 1', example: '佢喺比賽中勇奪第一名。', example_meaning: 'He won first place in the competition.' },
        '兩': { jyutping: 'loeng5', meaning_zh: '兩 / 一雙', meaning: 'Two (used with measure words)', example: '唔該畀兩杯凍檸茶我。', example_meaning: 'Please give me two iced lemon teas.' },

        // Elements & Nature
        '水': { jyutping: 'seoi2', meaning_zh: '水 / 液體', meaning: 'Water / Liquid', image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80', example: '唔該畀一杯水我。', example_meaning: 'Please give me a glass of water, thank you.' },
        '火': { jyutping: 'fo2', meaning_zh: '火 / 火焰', meaning: 'Fire / Flame', image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80', example: '小心火燭，注意安全。', example_meaning: 'Be careful with fire, pay attention to safety.' },
        '木': { jyutping: 'muk6', meaning_zh: '木 / 木材 / 樹木', meaning: 'Wood / Tree / Timber', image: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=600&q=80', example: '呢張檯係用實木做嘅。', example_meaning: 'This table is made of solid wood.' },
        '土': { jyutping: 'tou2', meaning_zh: '土 / 泥土 / 土地', meaning: 'Earth / Soil / Land', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80', example: '花園嘅土地好肥沃。', example_meaning: 'The soil in the garden is very fertile.' },
        '金': { jyutping: 'gam1', meaning_zh: '金 / 金屬 / 黃金', meaning: 'Gold / Metal / Money', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=600&q=80', example: '這條金項鍊好美麗。', example_meaning: 'This gold necklace is very beautiful.' },
        '日': { jyutping: 'jat6', meaning_zh: '日 / 太陽 / 日子', meaning: 'Sun / Day', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', example: '祝你有愉快嘅一日！', example_meaning: 'Wish you have a pleasant day!' },
        '月': { jyutping: 'jyut6', meaning_zh: '月 / 月亮 / 月份', meaning: 'Moon / Month', image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=600&q=80', example: '今晚嘅月亮好光。', example_meaning: 'The moon tonight is very bright.' },
        '天': { jyutping: 'tin1', meaning_zh: '天 / 天空 / 天氣', meaning: 'Sky / Heaven / Day', example: '今日天晴，氣溫好舒服。', example_meaning: 'Today is sunny and the temperature is comfortable.' },
        '地': { jyutping: 'dei6', meaning_zh: '地 / 地面 / 場所', meaning: 'Ground / Earth / Place', example: '地下好滑，行路要小心。', example_meaning: 'The ground is slippery, walk carefully.' },
        '風': { jyutping: 'fung1', meaning_zh: '風 / 風吹', meaning: 'Wind / Breeze', example: '海邊嘅海風吹得好涼爽。', example_meaning: 'The sea breeze by the shore is very refreshing.' },
        '雨': { jyutping: 'jyu5', meaning_zh: '雨 / 雨水', meaning: 'Rain', example: '出面落緊大雨，記得帶遮。', example_meaning: 'It\'s raining heavily outside, remember to bring an umbrella.' },
        '雪': { jyutping: 'syut3', meaning_zh: '雪 / 下雪', meaning: 'Snow', example: '冬天落雪嘅風景好靚。', example_meaning: 'The scenery of snowing in winter is very pretty.' },
        '山': { jyutping: 'saan1', meaning_zh: '山 / 高山', meaning: 'Mountain / Hill', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', example: '星期六我哋一齊去爬山。', example_meaning: 'We are going hiking up the mountain on Saturday.' },
        '海': { jyutping: 'hoi2', meaning_zh: '海 / 大海 / 海洋', meaning: 'Sea / Ocean', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', example: '香港嘅維多利亞港出名海景好靚。', example_meaning: 'Hong Kong\'s Victoria Harbour is famous for its beautiful ocean view.' },
        '石': { jyutping: 'sek6', meaning_zh: '石 / 石頭', meaning: 'Stone / Rock', example: '沙灘上有好多五顏六色嘅石頭。', example_meaning: 'There are many colorful stones on the beach.' },
        '光': { jyutping: 'gwong1', meaning_zh: '光 / 陽光', meaning: 'Light / Brightness', example: '陽光照進房間好溫暖。', example_meaning: 'Sunlight shining into the room is very warm.' },
        '電': { jyutping: 'din6', meaning_zh: '電 / 電池 / 電力', meaning: 'Electricity / Lightning', example: '手提電話快要冇電喇。', example_meaning: 'The mobile phone battery is almost drained.' },

        // Food & Cha Chaan Teng
        '蛋撻': { jyutping: 'daan6 taat3', meaning_zh: '蛋撻 / 酥皮雞蛋塔', meaning: 'Egg Tart', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80', example: '呢間餅店嘅酥皮蛋撻好出名。', example_meaning: 'This bakery\'s puff pastry egg tarts are very famous.' },
        '凍檸茶': { jyutping: 'dung3 ning4 caa4', meaning_zh: '凍檸茶 / 冰檸檬茶', meaning: 'Iced Lemon Tea', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', example: '唔該要一杯凍檸茶，少甜走冰！', example_meaning: 'One iced lemon tea please, less sweet and no ice!' },
        '菠蘿包': { jyutping: 'bo1 lo4 baau1', meaning_zh: '菠蘿包 / 港式菠蘿油', meaning: 'Pineapple Bun', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', example: '熱菠蘿油加一杯熱奶茶最正。', example_meaning: 'Hot pineapple bun with butter plus a hot milk tea is the absolute best.' },
        '叉燒包': { jyutping: 'caa1 siu1 baau1', meaning_zh: '叉燒包 / 港式點心包子', meaning: 'BBQ Pork Bun', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', example: '蒸籠入面嘅叉燒包熱辣辣。', example_meaning: 'The BBQ pork buns inside the bamboo steamer are piping hot.' },
        '點心': { jyutping: 'dim2 sam1', meaning_zh: '點心 / 飲茶點心', meaning: 'Dim Sum', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80', example: '星期日我們全家人去飲茶食點心。', example_meaning: 'On Sunday our whole family goes to drink tea and eat dim sum.' },
        '埋單': { jyutping: 'maai4 daan1', meaning_zh: '埋單 / 結賬買單', meaning: 'Check / Bill please', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', example: '夥計，唔該埋單！', example_meaning: 'Waiter, check please!' },

        // Tech & Places
        '手提電話': { jyutping: 'sau2 tai4 din6 waa2', meaning_zh: '手提電話 / 智能手機', meaning: 'Mobile Phone / Smartphone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', example: '我部手提電話快要冇電喇。', example_meaning: 'My mobile phone is almost out of battery.' },
        '香港': { jyutping: 'hoeng1 gong2', meaning_zh: '香港 / 港島九龍', meaning: 'Hong Kong', image: 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=600&q=80', example: '香港係一座美麗嘅城市。', example_meaning: 'Hong Kong is a beautiful city.' }
    };

    // Master Character Jyutping Map covering Hundreds of Common Chinese Characters
    static CHAR_JYUTPING = {
        // Numbers
        '一': 'jat1', '二': 'ji6', '三': 'saam1', '四': 'sei3', '五': 'ng5',
        '六': 'lok6', '七': 'cat1', '八': 'baat3', '九': 'gau2', '十': 'sap6',
        '百': 'baak3', '千': 'cin1', '萬': 'maan6', '億': 'jik1', '零': 'ling4', '兩': 'loeng5',

        // Five Elements & Nature
        '水': 'seoi2', '火': 'fo2', '木': 'muk6', '土': 'tou2', '金': 'gam1',
        '日': 'jat6', '月': 'jyut6', '天': 'tin1', '地': 'dei6', '風': 'fung1',
        '雨': 'jyu5', '雪': 'syut3', '電': 'din6', '山': 'saan1', '石': 'sek6',
        '海': 'hoi2', '江': 'gong1', '河': 'ho4', '湖': 'wu4', '空': 'hung1',
        '光': 'gwong1', '星': 'sing1', '雲': 'wan4', '氣': 'hei3', '花': 'faa1',
        '草': 'cou2', '樹': 'syu6', '葉': 'jip6', '竹': 'zuk1', '林': 'lam4',

        // Body Parts & People
        '人': 'jan4', '口': 'hau2', '目': 'muk6', '耳': 'ji5', '手': 'sau2',
        '足': 'zuk1', '腳': 'goek3', '心': 'sam1', '頭': 'tau4', '眼': 'ngaan5',
        '骨': 'gwat1', '肉': 'juk6', '身': 'san1', '體': 'tai2',

        // Directions
        '東': 'dung1', '南': 'naam4', '西': 'sai1', '北': 'bak1', '中': 'zung1',
        '上': 'soeng5', '下': 'haa6', '左': 'zo2', '右': 'jau6', '前': 'cin4', '後': 'hau6',

        // Basics & Actions
        '好': 'hou2', '的': 'dik1', '嗎': 'maa1', '媽': 'maa1', '爸': 'baa1',
        '我': 'ngo5', '你': 'nei5', '佢': 'heoi5', '哋': 'dei6', '係': 'hai6',
        '唔': 'm4', '有': 'jau5', '冇': 'mou5', '去': 'heoi3', '食': 'sik6',
        '飲': 'jam2', '睇': 'tai2', '聽': 'ting1', '講': 'gong2', '諗': 'nam2',
        '想': 'soeng2', '要': 'jiu3', '做': 'zou6', '玩': 'waan2', '行': 'haang4',
        '走': 'zau2', '嚟': 'lai4', '返': 'faan1', '出': 'ceot1', '入': 'jap6',
        '落': 'lok6', '過': 'gwo3', '畀': 'bei2', '拎': 'ling1', '買': 'maai5',
        '賣': 'maai6', '用': 'jung6', '見': 'gin3', '學': 'hok6', '寫': 'se2',
        '讀': 'duk6', '開': 'hoi1', '關': 'gwaan1', '坐': 'co5', '企': 'kei5',
        '瞓': 'fan3', '醒': 'sing2', '愛': 'oi3', '家': 'gaa1', '年': 'nin4',
        '時': 'si4', '分': 'fan1', '大': 'daai6', '小': 'siu2', '多': 'do1',
        '少': 'siu2', '長': 'coeng4', '高': 'gou1', '新': 'san1', '舊': 'gau6',
        '快': 'faai3', '慢': 'maan6', '熱': 'jit6', '冷': 'laang5', '凍': 'dung3',
        '紅': 'hung4', '藍': 'laam4', '黃': 'wong4', '綠': 'luk6', '白': 'baak6',
        '黑': 'hak1', '紫': 'zi2', '橙': 'caang2'
    };

    // Dictionary of Chinese Numbers to English Meaning Map
    static NUMBER_MAP = {
        '一': 'Number 1 (One)', '二': 'Number 2 (Two)', '三': 'Number 3 (Three)',
        '四': 'Number 4 (Four)', '五': 'Number 5 (Five)', '六': 'Number 6 (Six)',
        '七': 'Number 7 (Seven)', '八': 'Number 8 (Eight)', '九': 'Number 9 (Nine)',
        '十': 'Number 10 (Ten)', '百': 'Hundred (100)', '千': 'Thousand (1,000)',
        '萬': 'Ten Thousand (10,000)', '億': 'Hundred Million', '零': 'Zero (0)',
        '兩': 'Two (Pair)'
    };

    /**
     * Looks up or generates missing details for a given Cantonese word item.
     * @param {Object} item - { word, jyutping, meaning, example, example_meaning }
     * @param {Boolean} force - If true, forces overwriting missing fields even if item had empty values.
     */
    static enrichItem(item, force = false) {
        if (!item || !item.word) return item;

        // Clean trailing/leading commas, Chinese punctuation, spaces
        const cleanWord = item.word.replace(/^[\s,，.；;│|"'`]+|[\s,，.；;│|"'`]+$/g, '').trim();
        if (cleanWord) {
            item.word = cleanWord;
        }

        const w = item.word;
        const entry = this.DB[w];

        let isGenerated = false;

        // 1. Direct Match in Curated DB
        if (entry) {
            if (force || !item.jyutping || item.jyutping.trim() === '') {
                item.jyutping = entry.jyutping;
                isGenerated = true;
            }
            if (force || !item.meaning || item.meaning.trim() === '' || item.meaning.includes('(Cantonese term)')) {
                item.meaning = entry.meaning;
                isGenerated = true;
            }
            if (force || !item.meaning_zh || item.meaning_zh.trim() === '') {
                item.meaning_zh = entry.meaning_zh || `${w} (${entry.meaning.split('/')[0].trim()})`;
                isGenerated = true;
            }
            if (force || !item.image) {
                if (entry.image) {
                    item.image = entry.image;
                    isGenerated = true;
                }
            }
            if (force || !item.example || item.example.trim() === '' || item.example.includes('呢個詞語「')) {
                item.example = entry.example;
                isGenerated = true;
            }
            if (force || !item.example_meaning || item.example_meaning.trim() === '' || item.example_meaning.includes('This Cantonese term is')) {
                item.example_meaning = entry.example_meaning;
                isGenerated = true;
            }
        } else {
            // 2. Smart Pattern Recognizer (Numbers / Digits)
            if (this.NUMBER_MAP[w]) {
                if (force || !item.jyutping || item.jyutping.trim() === '') {
                    item.jyutping = this.CHAR_JYUTPING[w] || 'zi1';
                    isGenerated = true;
                }
                if (force || !item.meaning || item.meaning.trim() === '' || item.meaning.includes('(Cantonese term)')) {
                    item.meaning = this.NUMBER_MAP[w];
                    isGenerated = true;
                }
                if (force || !item.meaning_zh || item.meaning_zh.trim() === '') {
                    item.meaning_zh = `數字 ${w}`;
                    isGenerated = true;
                }
                if (force || !item.example || item.example.trim() === '' || item.example.includes('呢個詞語「')) {
                    item.example = `呢度有「${w}」個蘋果。`;
                    isGenerated = true;
                }
                if (force || !item.example_meaning || item.example_meaning.trim() === '' || item.example_meaning.includes('This Cantonese term is')) {
                    item.example_meaning = `There are ${this.NUMBER_MAP[w]} apples here.`;
                    isGenerated = true;
                }
            } else {
                // 3. Algorithmic Fallback Generation for Compound/Unknown Words
                if (force || !item.jyutping || item.jyutping.trim() === '') {
                    const jyutList = [];
                    for (let char of w) {
                        jyutList.push(this.CHAR_JYUTPING[char] || 'zi1');
                    }
                    item.jyutping = jyutList.join(' ');
                    isGenerated = true;
                }

                if (force || !item.meaning || item.meaning.trim() === '' || item.meaning.includes('(Cantonese term)')) {
                    item.meaning = `${w} (Vocabulary term)`;
                    isGenerated = true;
                }

                if (force || !item.meaning_zh || item.meaning_zh.trim() === '') {
                    item.meaning_zh = `${w} (粵語詞彙)`;
                    isGenerated = true;
                }

                if (force || !item.example || item.example.trim() === '' || item.example.includes('呢個詞語「')) {
                    item.example = `呢個詞語「${w}」喺廣東話好常用。`;
                    isGenerated = true;
                }

                if (force || !item.example_meaning || item.example_meaning.trim() === '' || item.example_meaning.includes('This Cantonese term is')) {
                    item.example_meaning = `The word "${w}" is commonly used in Cantonese.`;
                    isGenerated = true;
                }
            }
        }

        if (isGenerated) {
            item.autoGenerated = true;
        }

        return item;
    }
}

// ==========================================
// 1. Default Sample Datasets
// ==========================================
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

// ==========================================
// 2. Storage Manager (Server API & LocalStorage Fallback)
// ==========================================
class StorageManager {
    static STORAGE_KEY = 'cantonese_learner_profiles_v1';
    static SETTINGS_KEY = 'cantonese_learner_settings_v1';
    static API_URL = '/api/profiles';
    static cachedProfiles = null;

    static async syncWithServer(onSyncCallback = null) {
        try {
            const res = await fetch(this.API_URL);
            if (res.ok) {
                const profiles = await res.json();
                if (Array.isArray(profiles) && profiles.length > 0) {
                    this.cachedProfiles = profiles;
                    this.saveLocalProfiles(profiles);
                    if (onSyncCallback) onSyncCallback(profiles);
                    return profiles;
                }
            }
        } catch (e) {
            console.warn('Unable to sync profiles from server, using local storage cache:', e);
        }
        return this.getProfiles();
    }

    static getProfiles() {
        if (this.cachedProfiles) return this.cachedProfiles;
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) {
                this.saveLocalProfiles(DEFAULT_PROFILES);
                return DEFAULT_PROFILES;
            }
            this.cachedProfiles = JSON.parse(raw);
            return this.cachedProfiles;
        } catch (e) {
            console.error('Failed to parse localStorage profiles:', e);
            return DEFAULT_PROFILES;
        }
    }

    static saveLocalProfiles(profiles) {
        try {
            this.cachedProfiles = profiles;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    static async pushToServer(payload) {
        try {
            const res = await fetch(this.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.profiles) {
                    this.saveLocalProfiles(data.profiles);
                }
            }
        } catch (e) {
            console.warn('Failed to push profile update to server:', e);
        }
    }

    static getProfileById(id) {
        const profiles = this.getProfiles();
        return profiles.find(p => p.id === id);
    }

    static createProfile(name, category, description, items) {
        const profiles = this.getProfiles();
        const newProfile = {
            id: 'prof-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            name: name || 'Untitled Profile',
            category: category || 'General',
            description: description || '',
            createdAt: new Date().toISOString(),
            items: items || []
        };
        profiles.unshift(newProfile);
        this.saveLocalProfiles(profiles);
        this.pushToServer({ action: 'create', profile: newProfile });
        return newProfile;
    }

    static updateProfile(updatedProfile) {
        const profiles = this.getProfiles();
        const index = profiles.findIndex(p => p.id === updatedProfile.id);
        if (index !== -1) {
            profiles[index] = updatedProfile;
            this.saveLocalProfiles(profiles);
            this.pushToServer({ action: 'update', profile: updatedProfile });
        }
    }

    static deleteProfile(id) {
        let profiles = this.getProfiles();
        profiles = profiles.filter(p => p.id !== id);
        this.saveLocalProfiles(profiles);
        this.pushToServer({ action: 'delete', profileId: id });
    }

    static resetToDefault() {
        this.saveLocalProfiles(DEFAULT_PROFILES);
        this.pushToServer({ action: 'reset' });
        return DEFAULT_PROFILES;
    }
}

// ==========================================
// 3. Audio Speech Engine (Zero-Installation Hybrid Cantonese TTS)
// STRICT CONSTRAINT: Cantonese (zh-HK) Audio with Zero-Installation Cloud Fallback
// ==========================================
class SpeechEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.cantoneseVoice = null;
        this.isVoiceAvailable = true; // Always true because Cloud Audio Stream is active
        this.speechRate = 0.9;
        this.currentAudio = null;
        this.init();
    }

    init() {
        this.updateVoiceList();
        if (this.synth && this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.updateVoiceList();
        }
    }

    updateVoiceList() {
        if (this.synth) {
            const voices = this.synth.getVoices();
            const hkVoice = voices.find(v => 
                v.lang.toLowerCase().includes('zh-hk') ||
                v.lang.toLowerCase().includes('zh_hk') ||
                v.lang.toLowerCase().includes('yue') ||
                v.name.toLowerCase().includes('cantonese') ||
                v.name.toLowerCase().includes('hong kong') ||
                v.name.includes('Sin-ji') ||
                v.name.includes('HiuGaai')
            );

            if (hkVoice) {
                this.cantoneseVoice = hkVoice;
                console.log('Native Cantonese (zh-HK) OS voice detected:', hkVoice.name);
            } else {
                this.cantoneseVoice = null;
                console.log('Native zh-HK OS voice not installed. Using Cloud Cantonese Audio Stream.');
            }
        }

        if (window.UIManager) {
            window.UIManager.updateSpeechBannerStatus(true, this.cantoneseVoice);
        }
    }

    speak(text, onStartCallback = null, onEndCallback = null) {
        if (!text) return;
        this.stop();

        // 1. If native OS Cantonese voice exists, use SpeechSynthesis
        if (this.cantoneseVoice && this.synth) {
            try {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'zh-HK';
                utterance.rate = this.speechRate;
                utterance.voice = this.cantoneseVoice;

                utterance.onstart = () => { if (onStartCallback) onStartCallback(); };
                utterance.onend = () => { if (onEndCallback) onEndCallback(); };
                utterance.onerror = (e) => {
                    console.warn('Native speech error, falling back to Cloud Audio Stream:', e);
                    this.playCloudAudio(text, onStartCallback, onEndCallback);
                };

                this.synth.speak(utterance);
                return;
            } catch (err) {
                console.warn('Native speech exception:', err);
            }
        }

        // 2. Zero-installation Cloud Cantonese Audio Stream (Works 100% on all OS/devices!)
        this.playCloudAudio(text, onStartCallback, onEndCallback);
    }

    playCloudAudio(text, onStartCallback = null, onEndCallback = null) {
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-HK&client=tw-ob&q=${encodeURIComponent(text)}`;
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        if (onStartCallback) onStartCallback();

        audio.onended = () => {
            this.currentAudio = null;
            if (onEndCallback) onEndCallback();
        };

        audio.onerror = (e) => {
            console.error('Cloud audio stream error:', e);
            this.currentAudio = null;
            if (onEndCallback) onEndCallback();
        };

        audio.play().catch(err => {
            console.warn('Browser auto-play policy prevented audio:', err);
            if (onEndCallback) onEndCallback();
        });
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
    }
}

// ==========================================
// 4. Parser Engine (Pasted Text / CSV / JSON)
// ==========================================
class ParserEngine {
    static parseText(inputStr, autoEnrich = true) {
        if (!inputStr || !inputStr.trim()) return [];

        const lines = inputStr.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const parsedItems = [];

        lines.forEach((line, idx) => {
            if (idx === 0 && (line.toLowerCase().includes('jyutping') || line.toLowerCase().includes('meaning'))) {
                return;
            }

            let parts = [];
            if (line.includes('|')) {
                parts = line.split('|').map(s => s.trim());
            } else if (line.includes('\t')) {
                parts = line.split('\t').map(s => s.trim());
            } else if (line.includes(',')) {
                parts = this.parseCSVLine(line);
            } else {
                parts = [line];
            }

            const word = (parts[0] || '').replace(/^[\s,，.；;│|"'`]+|[\s,，.；;│|"'`]+$/g, '').trim();

            if (word) {
                let item = {
                    id: 'item-parsed-' + Date.now() + '-' + idx,
                    word: word,
                    jyutping: (parts[1] || '').trim(),
                    meaning: (parts[2] || '').trim(),
                    example: (parts[3] || '').trim(),
                    example_meaning: (parts[4] || '').trim(),
                    mastered: false,
                    favorite: false
                };

                if (autoEnrich) {
                    item = CantoneseDictionary.enrichItem(item, true);
                }

                parsedItems.push(item);
            }
        });

        return parsedItems;
    }

    static parseCSVLine(text) {
        const re = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,\s"]*))\s*(?:,|$)/g;
        const arr = [];
        text.replace(re, (m0, m1, m2, m3) => {
            if (m1 !== undefined) arr.push(m1.replace(/\\'/g, "'"));
            else if (m2 !== undefined) arr.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined && m3.trim() !== '') arr.push(m3.trim());
            return '';
        });
        return arr;
    }

    static parseJSON(jsonString, autoEnrich = true) {
        try {
            const data = JSON.parse(jsonString);
            let rawList = [];
            if (Array.isArray(data)) {
                rawList = data;
            } else if (data.items && Array.isArray(data.items)) {
                rawList = data.items;
            }

            return rawList.map((item, idx) => {
                let obj = {
                    id: item.id || ('w-json-' + idx),
                    word: (item.word || item.traditional || item.cantonese || '').trim(),
                    jyutping: (item.jyutping || item.pinyin || '').trim(),
                    meaning: (item.meaning || item.definition || item.english || '').trim(),
                    example: (item.example || item.sentence || '').trim(),
                    example_meaning: (item.example_meaning || item.exampleMeaning || item.sentence_translation || '').trim(),
                    mastered: Boolean(item.mastered),
                    favorite: Boolean(item.favorite)
                };

                if (autoEnrich) {
                    obj = CantoneseDictionary.enrichItem(obj, true);
                }

                return obj;
            });
        } catch (e) {
            console.error('Failed to parse JSON file:', e);
            return [];
        }
    }
}

// ==========================================
// 5. UI Manager (SPA Views & Component Controller)
// ==========================================
class UIManager {
    constructor() {
        this.speechEngine = new SpeechEngine();
        this.currentView = 'dashboard';
        this.activeProfile = null;
        this.activeWordIndex = 0;
        this.searchQuery = '';
        this.filterTab = 'all';
        this.draftParsedItems = [];

        this.studyCardFlipped = false;
        this.studyIndex = 0;

        this.quizState = {
            questions: [],
            currentIndex: 0,
            score: 0,
            userAnswers: [],
            isFinished: false
        };

        this.initDOM();
        this.bindEvents();
    }

    initDOM() {
        this.viewDashboard = document.getElementById('view-dashboard');
        this.viewProfileDetail = document.getElementById('view-profile-detail');
        this.viewStudyMode = document.getElementById('view-study-mode');
        this.viewQuizMode = document.getElementById('view-quiz-mode');

        this.speechWarningBanner = document.getElementById('speech-warning-banner');
        this.modalCreateProfile = document.getElementById('modal-create-profile');
        this.modalDetail = document.getElementById('modal-detail');
        this.modalVoiceHelp = document.getElementById('modal-voice-help');
        this.toastContainer = document.getElementById('toast-container');

        this.navDashboardBtn = document.getElementById('nav-dashboard-btn');
        this.navNewProfileBtn = document.getElementById('nav-new-profile-btn');
        this.heroCreateProfileBtn = document.getElementById('hero-create-profile-btn');
        this.navResetBtn = document.getElementById('nav-reset-btn');

        this.renderDashboard();
        StorageManager.syncWithServer(() => this.renderDashboard());
    }

    bindEvents() {
        if (this.navDashboardBtn) {
            this.navDashboardBtn.addEventListener('click', () => this.switchView('dashboard'));
        }
        if (this.navNewProfileBtn) {
            this.navNewProfileBtn.addEventListener('click', () => this.openCreateProfileModal());
        }
        if (this.heroCreateProfileBtn) {
            this.heroCreateProfileBtn.addEventListener('click', () => this.openCreateProfileModal());
        }
        if (this.navResetBtn) {
            this.navResetBtn.addEventListener('click', () => {
                if (confirm('Reset all vocabulary lists back to default sample profiles? Custom lists will be overwritten.')) {
                    StorageManager.resetToDefault();
                    this.showToast('Reset profiles to defaults successfully.', 'info');
                    this.switchView('dashboard');
                }
            });
        }

        const speechHelpBtn = document.getElementById('speech-help-btn');
        if (speechHelpBtn) {
            speechHelpBtn.addEventListener('click', () => this.openVoiceHelpModal());
        }

        // Create Profile Modal Events
        const btnCloseCreateModal = document.getElementById('btn-close-create-modal');
        if (btnCloseCreateModal) {
            btnCloseCreateModal.addEventListener('click', () => this.closeCreateProfileModal());
        }

        const inputPasteText = document.getElementById('input-paste-text');
        if (inputPasteText) {
            inputPasteText.addEventListener('input', () => this.handleTextareaParsePreview());
        }

        const chkAutoGenerate = document.getElementById('chk-auto-generate-on-parse');
        if (chkAutoGenerate) {
            chkAutoGenerate.addEventListener('change', () => this.handleTextareaParsePreview());
        }

        const inputFileUpload = document.getElementById('input-file-upload');
        if (inputFileUpload) {
            inputFileUpload.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        const btnAutoGenerate = document.getElementById('btn-auto-generate-details');
        if (btnAutoGenerate) {
            btnAutoGenerate.addEventListener('click', () => this.triggerAutoGenerateDrafts());
        }

        const formCreateProfile = document.getElementById('form-create-profile');
        if (formCreateProfile) {
            formCreateProfile.addEventListener('submit', (e) => this.handleSaveNewProfile(e));
        }

        // Detail Modal Events
        const btnCloseDetailModal = document.getElementById('btn-close-detail-modal');
        if (btnCloseDetailModal) {
            btnCloseDetailModal.addEventListener('click', () => this.closeDetailModal());
        }

        const btnModalPrevWord = document.getElementById('btn-modal-prev-word');
        if (btnModalPrevWord) {
            btnModalPrevWord.addEventListener('click', () => this.navigateDetailModal(-1));
        }

        const btnModalNextWord = document.getElementById('btn-modal-next-word');
        if (btnModalNextWord) {
            btnModalNextWord.addEventListener('click', () => this.navigateDetailModal(1));
        }

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.modalDetail && !this.modalDetail.classList.contains('hidden')) {
                if (e.key === 'ArrowLeft') this.navigateDetailModal(-1);
                if (e.key === 'ArrowRight') this.navigateDetailModal(1);
                if (e.key === 'Escape') this.closeDetailModal();
                if (e.key === ' ') {
                    e.preventDefault();
                    this.playCurrentModalAudio();
                }
            } else if (this.currentView === 'study-mode') {
                if (e.key === ' ') {
                    e.preventDefault();
                    this.toggleStudyCardFlip();
                }
                if (e.key === 'ArrowLeft') this.navigateStudyCard(-1);
                if (e.key === 'ArrowRight') this.navigateStudyCard(1);
            }
        });
    }

    switchView(targetView, params = {}) {
        this.currentView = targetView;
        
        this.viewDashboard.classList.add('hidden');
        this.viewProfileDetail.classList.add('hidden');
        this.viewStudyMode.classList.add('hidden');
        this.viewQuizMode.classList.add('hidden');

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (targetView === 'dashboard') {
            this.renderDashboard();
            this.viewDashboard.classList.remove('hidden');
        } else if (targetView === 'profile-detail') {
            this.activeProfile = StorageManager.getProfileById(params.profileId);
            if (this.activeProfile) {
                this.renderProfileDetail();
                this.viewProfileDetail.classList.remove('hidden');
            } else {
                this.switchView('dashboard');
            }
        } else if (targetView === 'study-mode') {
            this.activeProfile = StorageManager.getProfileById(params.profileId);
            if (this.activeProfile && this.activeProfile.items.length > 0) {
                this.initStudyMode();
                this.viewStudyMode.classList.remove('hidden');
            } else {
                this.showToast('Profile has no vocabulary items to study.', 'warning');
                this.switchView('profile-detail', { profileId: params.profileId });
            }
        } else if (targetView === 'quiz-mode') {
            this.activeProfile = StorageManager.getProfileById(params.profileId);
            if (this.activeProfile && this.activeProfile.items.length >= 2) {
                this.initQuizMode();
                this.viewQuizMode.classList.remove('hidden');
            } else {
                this.showToast('Need at least 2 vocabulary items to generate a quiz.', 'warning');
                this.switchView('profile-detail', { profileId: params.profileId });
            }
        }
    }

    updateSpeechBannerStatus(isAvailable, voiceObj) {
        if (!this.speechWarningBanner) return;
        
        const voiceNameElem = document.getElementById('speech-voice-name');
        if (isAvailable) {
            this.speechWarningBanner.className = 'bg-emerald-950/80 border-b border-emerald-500/30 text-emerald-300 px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between shadow-sm backdrop-blur-md';
            if (voiceNameElem) {
                voiceNameElem.innerHTML = `<span class="inline-flex items-center gap-1.5 font-medium"><svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Audio Ready: ${voiceObj ? voiceObj.name : 'Cantonese (zh-HK)'}</span>`;
            }
        } else {
            this.speechWarningBanner.className = 'bg-amber-950/90 border-b border-amber-500/40 text-amber-200 px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between shadow-sm backdrop-blur-md';
            if (voiceNameElem) {
                voiceNameElem.innerHTML = `<span class="inline-flex items-center gap-1.5 font-medium text-amber-300"><svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg> Cantonese (zh-HK) Voice Not Found</span> <span class="hidden md:inline text-amber-200/80">Speech synthesis will use default audio fallback.</span>`;
            }
        }
    }

    renderDashboard() {
        const profiles = StorageManager.getProfiles();

        const totalProfiles = profiles.length;
        let totalWords = 0;
        let totalMastered = 0;

        profiles.forEach(p => {
            totalWords += p.items.length;
            totalMastered += p.items.filter(i => i.mastered).length;
        });

        document.getElementById('stat-total-profiles').textContent = totalProfiles;
        document.getElementById('stat-total-words').textContent = totalWords;
        document.getElementById('stat-total-mastered').textContent = totalMastered;
        document.getElementById('stat-mastery-rate').textContent = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) + '%' : '0%';

        const gridContainer = document.getElementById('dashboard-profiles-grid');
        gridContainer.innerHTML = '';

        if (profiles.length === 0) {
            gridContainer.innerHTML = `
                <div class="col-span-full text-center py-16 px-4 glass-card rounded-2xl border border-slate-700/50">
                    <div class="w-16 h-16 bg-slate-800 text-sky-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </div>
                    <h3 class="text-xl font-bold text-slate-100 mb-2">No Profiles Found</h3>
                    <p class="text-slate-400 max-w-md mx-auto mb-6 text-sm">You haven't created any vocabulary lists yet. Create your first profile or load default sample lists!</p>
                    <div class="flex items-center justify-center gap-3">
                        <button onclick="window.UIManager.openCreateProfileModal()" class="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-sky-500/20 transition-all">Create New Profile</button>
                        <button onclick="StorageManager.resetToDefault(); window.UIManager.renderDashboard();" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl border border-slate-700 transition-all">Load Default Lists</button>
                    </div>
                </div>
            `;
            return;
        }

        profiles.forEach(p => {
            const masteredCount = p.items.filter(i => i.mastered).length;
            const pct = p.items.length > 0 ? Math.round((masteredCount / p.items.length) * 100) : 0;

            const card = document.createElement('div');
            card.className = 'glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative group cursor-pointer border border-slate-800';
            card.innerHTML = `
                <div>
                    <div class="flex items-start justify-between gap-3 mb-3">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="px-2.5 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-[11px] font-semibold uppercase tracking-wider">${this.escapeHTML(p.category || 'General')}</span>
                            <span class="px-2 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full text-[11px] font-semibold">${this.escapeHTML(p.difficulty || 'Beginner')}</span>
                        </div>
                        <div class="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                            <button onclick="event.stopPropagation(); window.UIManager.likeProfile('${p.id}')" title="Upvote Community Deck" class="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                                👍 ${p.likes || 0}
                            </button>
                            <button onclick="event.stopPropagation(); window.UIManager.exportProfileJSON('${p.id}')" title="Export Profile as JSON" class="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                            </button>
                            <button onclick="event.stopPropagation(); window.UIManager.deleteProfileConfirm('${p.id}')" title="Delete Profile" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-slate-100 group-hover:text-sky-300 transition-colors mb-1 font-cantonese">${this.escapeHTML(p.name)}</h3>
                    <div class="text-[11px] text-slate-400 mb-2 flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span>Created by <strong class="text-slate-300 font-medium">${this.escapeHTML(p.author || 'Cantonese Community')}</strong></span>
                    </div>
                    <p class="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">${this.escapeHTML(p.description || 'No description provided.')}</p>
                </div>

                <div>
                    <div class="mb-4">
                        <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                            <span>${p.items.length} Vocabulary Terms</span>
                            <span class="text-emerald-400 font-medium">${masteredCount} Mastered (${pct}%)</span>
                        </div>
                        <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
                            <div class="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                        <button onclick="event.stopPropagation(); window.UIManager.switchView('study-mode', { profileId: '${p.id}' })" class="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-sky-300 font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-all">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            3D Study
                        </button>
                        <button onclick="event.stopPropagation(); window.UIManager.switchView('quiz-mode', { profileId: '${p.id}' })" class="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-emerald-300 font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-all">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            Take Quiz
                        </button>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                this.switchView('profile-detail', { profileId: p.id });
            });

            gridContainer.appendChild(card);
        });
    }

    renderProfileDetail() {
        if (!this.activeProfile) return;

        const p = this.activeProfile;

        document.getElementById('profile-detail-title').textContent = p.name;
        document.getElementById('profile-detail-category').textContent = p.category || 'General';
        document.getElementById('profile-detail-desc').textContent = p.description || 'Vocabulary list detail view.';

        const btnStudy = document.getElementById('btn-profile-study');
        if (btnStudy) {
            btnStudy.onclick = () => this.switchView('study-mode', { profileId: p.id });
        }

        const btnQuiz = document.getElementById('btn-profile-quiz');
        if (btnQuiz) {
            btnQuiz.onclick = () => this.switchView('quiz-mode', { profileId: p.id });
        }

        const btnExport = document.getElementById('btn-profile-export');
        if (btnExport) {
            btnExport.onclick = () => this.exportProfileJSON(p.id);
        }

        const inputSearch = document.getElementById('profile-search-input');
        if (inputSearch) {
            inputSearch.value = this.searchQuery;
            inputSearch.oninput = (e) => {
                this.searchQuery = e.target.value;
                this.renderFilteredFlashcards();
            };
        }

        const filterTabs = document.querySelectorAll('.filter-tab-btn');
        filterTabs.forEach(tab => {
            tab.onclick = () => {
                filterTabs.forEach(t => t.className = 'filter-tab-btn px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200 transition-all');
                tab.className = 'filter-tab-btn px-4 py-2 text-xs font-semibold rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all';
                this.filterTab = tab.dataset.filter;
                this.renderFilteredFlashcards();
            };
        });

        this.renderFilteredFlashcards();
    }

    renderFilteredFlashcards() {
        if (!this.activeProfile) return;

        const container = document.getElementById('flashcards-grid');
        container.innerHTML = '';

        let items = [...this.activeProfile.items];

        if (this.filterTab === 'learning') {
            items = items.filter(i => !i.mastered);
        } else if (this.filterTab === 'mastered') {
            items = items.filter(i => i.mastered);
        } else if (this.filterTab === 'favorites') {
            items = items.filter(i => i.favorite);
        }

        if (this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase().trim();
            items = items.filter(i => 
                i.word.toLowerCase().includes(q) ||
                i.jyutping.toLowerCase().includes(q) ||
                i.meaning.toLowerCase().includes(q) ||
                (i.meaning_zh && i.meaning_zh.toLowerCase().includes(q)) ||
                (i.example && i.example.toLowerCase().includes(q))
            );
        }

        document.getElementById('flashcard-count-badge').textContent = `${items.length} of ${this.activeProfile.items.length} words`;

        if (items.length === 0) {
            container.innerHTML = `
                <div class="col-span-full py-12 text-center glass-card rounded-2xl border border-slate-800">
                    <p class="text-slate-400 text-sm">No vocabulary words match your filter criteria.</p>
                </div>
            `;
            return;
        }

        items.forEach((item, index) => {
            const realIndex = this.activeProfile.items.findIndex(orig => orig.id === item.id);

            const imageMarkup = item.image ? `
                <div class="w-full h-36 rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800/80 shadow-md">
                    <img src="${this.escapeHTML(item.image)}" alt="${this.escapeHTML(item.word)}" class="w-full h-full object-cover">
                </div>
            ` : '';

            const card = document.createElement('div');
            card.className = 'glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between border border-slate-800/80 relative group cursor-pointer';
            card.innerHTML = `
                <div>
                    ${imageMarkup}
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <button onclick="event.stopPropagation(); window.UIManager.toggleMastered('${item.id}')" title="Toggle Mastered Status" class="px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${item.mastered ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'}">
                            ${item.mastered ? '✓ Mastered' : 'Learning'}
                        </button>
                        <div class="flex items-center gap-1">
                            <button id="btn-audio-word-${item.id}" onclick="event.stopPropagation(); window.UIManager.playAudioText('${this.escapeQuotes(item.word)}', 'btn-audio-word-${item.id}')" title="Play Audio (Cantonese zh-HK)" class="p-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/20 transition-all flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                            </button>
                            <button onclick="event.stopPropagation(); window.UIManager.toggleFavorite('${item.id}')" title="Favorite" class="p-2 text-slate-500 hover:text-amber-400 rounded-xl transition-all">
                                <svg class="w-4 h-4 ${item.favorite ? 'text-amber-400 fill-amber-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                            </button>
                        </div>
                    </div>

                    <div class="mb-1">
                        <h4 class="text-3xl font-extrabold text-slate-100 font-cantonese tracking-wide group-hover:text-sky-300 transition-colors">${this.escapeHTML(item.word)}</h4>
                    </div>

                    <div class="mb-3">
                        <span class="jyutping-badge inline-block px-3 py-1 rounded-lg text-xs font-mono font-semibold">${this.escapeHTML(item.jyutping)}</span>
                    </div>

                    <div class="space-y-1 mb-3">
                        <p class="text-sky-300 text-xs font-bold font-cantonese truncate">🇨🇳 中文: ${this.escapeHTML(item.meaning_zh || item.word)}</p>
                        <p class="text-slate-300 text-xs font-medium truncate">🇬🇧 EN: ${this.escapeHTML(item.meaning)}</p>
                    </div>
                </div>

                <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span class="truncate max-w-[180px] italic font-cantonese opacity-80">${this.escapeHTML(item.example || '')}</span>
                    <span class="text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                        Details →
                    </span>
                </div>
            `;

            card.onclick = () => this.openDetailModal(realIndex);
            container.appendChild(card);
        });
    }

    openDetailModal(index) {
        if (!this.activeProfile || index < 0 || index >= this.activeProfile.items.length) return;

        this.activeWordIndex = index;
        const item = this.activeProfile.items[index];

        document.getElementById('modal-word').textContent = item.word;
        document.getElementById('modal-jyutping').textContent = item.jyutping;
        
        const meaningZhElem = document.getElementById('modal-meaning-zh');
        if (meaningZhElem) meaningZhElem.textContent = item.meaning_zh || item.word;

        const meaningEnElem = document.getElementById('modal-meaning-en');
        if (meaningEnElem) meaningEnElem.textContent = item.meaning || 'Meaning translation';

        // Image Handling
        const imgContainer = document.getElementById('modal-image-container');
        const imgElem = document.getElementById('modal-image');
        if (item.image && imgContainer && imgElem) {
            imgElem.src = item.image;
            imgContainer.classList.remove('hidden');
        } else if (imgContainer) {
            imgContainer.classList.add('hidden');
        }

        document.getElementById('modal-example').textContent = item.example || 'No example sentence provided.';
        document.getElementById('modal-example-meaning').textContent = item.example_meaning || '';

        const btnAudioWord = document.getElementById('modal-btn-audio-word');
        if (btnAudioWord) {
            btnAudioWord.onclick = () => this.playAudioText(item.word, 'modal-btn-audio-word');
        }

        const btnAudioExample = document.getElementById('modal-btn-audio-example');
        if (btnAudioExample && item.example) {
            btnAudioExample.onclick = () => this.playAudioText(item.example, 'modal-btn-audio-example');
        }

        document.getElementById('modal-word-counter').textContent = `${index + 1} of ${this.activeProfile.items.length}`;

        this.modalDetail.classList.remove('hidden');
    }

    closeDetailModal() {
        if (this.modalDetail) {
            this.modalDetail.classList.add('hidden');
            this.speechEngine.stop();
        }
    }

    navigateDetailModal(direction) {
        if (!this.activeProfile) return;
        let nextIndex = this.activeWordIndex + direction;
        if (nextIndex < 0) nextIndex = this.activeProfile.items.length - 1;
        if (nextIndex >= this.activeProfile.items.length) nextIndex = 0;
        this.openDetailModal(nextIndex);
    }

    playCurrentModalAudio() {
        if (this.activeProfile && this.activeProfile.items[this.activeWordIndex]) {
            this.playAudioText(this.activeProfile.items[this.activeWordIndex].word, 'modal-btn-audio-word');
        }
    }

    playAudioText(text, buttonId) {
        if (!text) return;

        const btn = document.getElementById(buttonId);
        let origHTML = '';
        if (btn) {
            origHTML = btn.innerHTML;
            btn.innerHTML = `
                <div class="soundwave-playing flex items-center justify-center h-4">
                    <span></span><span></span><span></span><span></span>
                </div>
            `;
            btn.classList.add('scale-105', 'bg-sky-500/30');
        }

        this.speechEngine.speak(
            text,
            () => {},
            () => {
                if (btn) {
                    btn.innerHTML = origHTML;
                    btn.classList.remove('scale-105', 'bg-sky-500/30');
                }
            }
        );
    }

    initStudyMode() {
        this.studyIndex = 0;
        this.studyCardFlipped = false;
        this.renderStudyCard();

        document.getElementById('btn-study-prev').onclick = () => this.navigateStudyCard(-1);
        document.getElementById('btn-study-next').onclick = () => this.navigateStudyCard(1);
        document.getElementById('btn-study-flip').onclick = () => this.toggleStudyCardFlip();
        
        const cardInner = document.getElementById('study-card-inner');
        if (cardInner) {
            cardInner.onclick = () => this.toggleStudyCardFlip();
        }

        document.getElementById('btn-study-mastered').onclick = (e) => {
            e.stopPropagation();
            const currentItem = this.activeProfile.items[this.studyIndex];
            if (currentItem) {
                this.toggleMastered(currentItem.id);
                this.renderStudyCard();
            }
        };
    }

    renderStudyCard() {
        if (!this.activeProfile || !this.activeProfile.items.length) return;

        const item = this.activeProfile.items[this.studyIndex];
        const cardInner = document.getElementById('study-card-inner');

        this.studyCardFlipped = false;
        if (cardInner) cardInner.classList.remove('is-flipped');

        document.getElementById('study-front-word').textContent = item.word;
        document.getElementById('study-front-jyutping').textContent = item.jyutping;

        const studyImgContainer = document.getElementById('study-front-image-container');
        const studyImgElem = document.getElementById('study-front-image');
        if (item.image && studyImgContainer && studyImgElem) {
            studyImgElem.src = item.image;
            studyImgContainer.classList.remove('hidden');
        } else if (studyImgContainer) {
            studyImgContainer.classList.add('hidden');
        }

        const backZhElem = document.getElementById('study-back-meaning-zh');
        if (backZhElem) backZhElem.textContent = item.meaning_zh || item.word;

        const backEnElem = document.getElementById('study-back-meaning-en');
        if (backEnElem) backEnElem.textContent = item.meaning || 'English Definition';

        document.getElementById('study-back-example').textContent = item.example || '';
        document.getElementById('study-back-example-meaning').textContent = item.example_meaning || '';

        document.getElementById('btn-study-audio-front').onclick = (e) => {
            e.stopPropagation();
            this.playAudioText(item.word, 'btn-study-audio-front');
        };
        document.getElementById('btn-study-audio-back').onclick = (e) => {
            e.stopPropagation();
            this.playAudioText(item.word, 'btn-study-audio-back');
        };

        const pct = Math.round(((this.studyIndex + 1) / this.activeProfile.items.length) * 100);
        document.getElementById('study-progress-bar').style.width = pct + '%';
        document.getElementById('study-counter-text').textContent = `Card ${this.studyIndex + 1} of ${this.activeProfile.items.length}`;

        const btnMastered = document.getElementById('btn-study-mastered');
        if (item.mastered) {
            btnMastered.className = 'px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm';
            btnMastered.innerHTML = '✓ Mastered';
        } else {
            btnMastered.className = 'px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all';
            btnMastered.innerHTML = 'Mark as Mastered';
        }
    }

    toggleStudyCardFlip() {
        this.studyCardFlipped = !this.studyCardFlipped;
        const cardInner = document.getElementById('study-card-inner');
        if (cardInner) {
            cardInner.classList.toggle('is-flipped', this.studyCardFlipped);
        }
    }

    navigateStudyCard(direction) {
        if (!this.activeProfile) return;
        this.studyIndex += direction;
        if (this.studyIndex < 0) this.studyIndex = this.activeProfile.items.length - 1;
        if (this.studyIndex >= this.activeProfile.items.length) this.studyIndex = 0;
        this.renderStudyCard();
    }

    initQuizMode() {
        if (!this.activeProfile || this.activeProfile.items.length < 2) return;

        const items = [...this.activeProfile.items];
        const shuffled = items.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(10, shuffled.length));

        this.quizState = {
            questions: selected.map(item => this.generateQuizQuestion(item, items)),
            currentIndex: 0,
            score: 0,
            userAnswers: [],
            isFinished: false
        };

        this.renderQuizQuestion();
    }

    generateQuizQuestion(item, allItems) {
        const type = Math.random() > 0.5 ? 'word-to-meaning' : 'jyutping-to-word';
        const options = [item];

        const otherItems = allItems.filter(i => i.id !== item.id);
        const shuffledOthers = otherItems.sort(() => 0.5 - Math.random());
        options.push(...shuffledOthers.slice(0, Math.min(3, shuffledOthers.length)));

        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        return {
            item,
            type,
            options: shuffledOptions,
            correctId: item.id
        };
    }

    renderQuizQuestion() {
        const container = document.getElementById('quiz-question-container');
        const summaryContainer = document.getElementById('quiz-summary-container');

        if (this.quizState.isFinished) {
            container.classList.add('hidden');
            summaryContainer.classList.remove('hidden');

            const scorePct = Math.round((this.quizState.score / this.quizState.questions.length) * 100);
            document.getElementById('quiz-final-score').textContent = `${this.quizState.score} / ${this.quizState.questions.length} (${scorePct}%)`;

            document.getElementById('btn-quiz-retry').onclick = () => this.initQuizMode();
            document.getElementById('btn-quiz-back').onclick = () => this.switchView('profile-detail', { profileId: this.activeProfile.id });
            return;
        }

        container.classList.remove('hidden');
        summaryContainer.classList.add('hidden');

        const q = this.quizState.questions[this.quizState.currentIndex];
        
        document.getElementById('quiz-progress-text').textContent = `Question ${this.quizState.currentIndex + 1} of ${this.quizState.questions.length}`;
        document.getElementById('quiz-score-badge').textContent = `Score: ${this.quizState.score}`;

        const promptTitle = document.getElementById('quiz-prompt-title');
        const promptSubtitle = document.getElementById('quiz-prompt-subtitle');

        if (q.type === 'word-to-meaning') {
            promptTitle.textContent = q.item.word;
            promptTitle.className = 'text-4xl font-extrabold text-slate-100 font-cantonese mb-2';
            promptSubtitle.textContent = `Select the correct English definition for this Cantonese word. (${q.item.jyutping})`;
        } else {
            promptTitle.textContent = q.item.jyutping;
            promptTitle.className = 'text-3xl font-mono font-bold text-sky-400 mb-2';
            promptSubtitle.textContent = 'Select the Cantonese word matching this Jyutping pronunciation.';
        }

        const audioBtn = document.getElementById('btn-quiz-audio');
        if (audioBtn) {
            audioBtn.onclick = () => this.playAudioText(q.item.word, 'btn-quiz-audio');
        }

        const optionsGrid = document.getElementById('quiz-options-grid');
        optionsGrid.innerHTML = '';

        q.options.forEach((opt, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'p-5 glass-card glass-card-hover rounded-2xl text-left border border-slate-800 transition-all font-medium flex items-center justify-between text-slate-200';
            
            const labelText = q.type === 'word-to-meaning' ? opt.meaning : `${opt.word} (${opt.meaning})`;
            
            btn.innerHTML = `
                <span class="text-sm font-semibold flex items-center gap-3">
                    <span class="w-7 h-7 bg-slate-800 text-sky-400 rounded-lg flex items-center justify-center text-xs font-bold border border-slate-700">${String.fromCharCode(65 + optIdx)}</span>
                    <span class="font-cantonese">${this.escapeHTML(labelText)}</span>
                </span>
            `;

            btn.onclick = () => this.handleQuizAnswer(opt.id, q.correctId, btn);
            optionsGrid.appendChild(btn);
        });
    }

    handleQuizAnswer(selectedId, correctId, clickedBtn) {
        const q = this.quizState.questions[this.quizState.currentIndex];
        const isCorrect = selectedId === correctId;

        if (isCorrect) {
            this.quizState.score++;
            clickedBtn.className = 'p-5 bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500 rounded-2xl text-left transition-all font-medium flex items-center justify-between shadow-lg shadow-emerald-500/10';
            this.showToast('Correct! +1 Point', 'success');
        } else {
            clickedBtn.className = 'p-5 bg-rose-500/20 text-rose-300 border-2 border-rose-500 rounded-2xl text-left transition-all font-medium flex items-center justify-between';
            this.showToast('Incorrect!', 'error');
        }

        const allBtns = document.querySelectorAll('#quiz-options-grid button');
        allBtns.forEach(b => b.disabled = true);

        setTimeout(() => {
            this.quizState.currentIndex++;
            if (this.quizState.currentIndex >= this.quizState.questions.length) {
                this.quizState.isFinished = true;
            }
            this.renderQuizQuestion();
        }, 1000);
    }

    // ==========================================
    // Create Profile Modal & Live Parser Handlers
    // ==========================================
    openCreateProfileModal() {
        this.draftParsedItems = [];
        document.getElementById('input-profile-name').value = '';
        document.getElementById('input-profile-category').value = 'General';
        document.getElementById('input-profile-desc').value = '';
        document.getElementById('input-paste-text').value = '';
        document.getElementById('parsed-items-count').textContent = '0 items parsed';
        document.getElementById('parser-preview-tbody').innerHTML = '<tr><td colspan="5" class="py-6 text-center text-slate-500 text-xs">Paste Cantonese words or upload a CSV/JSON file to preview parsed terms live.</td></tr>';

        this.modalCreateProfile.classList.remove('hidden');
    }

    closeCreateProfileModal() {
        if (this.modalCreateProfile) {
            this.modalCreateProfile.classList.add('hidden');
        }
    }

    handleTextareaParsePreview() {
        const rawText = document.getElementById('input-paste-text').value;
        const autoEnrichCheckbox = document.getElementById('chk-auto-generate-on-parse');
        const shouldEnrich = autoEnrichCheckbox ? autoEnrichCheckbox.checked : true;

        const parsed = ParserEngine.parseText(rawText, shouldEnrich);
        this.draftParsedItems = parsed;
        this.renderLiveParserTable();
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const autoEnrichCheckbox = document.getElementById('chk-auto-generate-on-parse');
        const shouldEnrich = autoEnrichCheckbox ? autoEnrichCheckbox.checked : true;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            if (file.name.endsWith('.json')) {
                this.draftParsedItems = ParserEngine.parseJSON(content, shouldEnrich);
            } else {
                this.draftParsedItems = ParserEngine.parseText(content, shouldEnrich);
            }
            this.renderLiveParserTable();
            this.showToast(`Loaded ${this.draftParsedItems.length} terms from ${file.name}`, 'success');
        };
        reader.readAsText(file);
    }

    triggerAutoGenerateDrafts() {
        if (this.draftParsedItems.length === 0) {
            const rawText = document.getElementById('input-paste-text').value;
            if (rawText.trim()) {
                this.draftParsedItems = ParserEngine.parseText(rawText, true);
            } else {
                this.showToast('Please enter or paste words first.', 'warning');
                return;
            }
        }

        let countEnriched = 0;
        this.draftParsedItems = this.draftParsedItems.map(item => {
            const enriched = CantoneseDictionary.enrichItem(item, true);
            if (enriched.autoGenerated) countEnriched++;
            return enriched;
        });

        this.renderLiveParserTable();
        this.showToast(`✨ Generated details for ${this.draftParsedItems.length} word(s)!`, 'success');
    }

    renderLiveParserTable() {
        const tbody = document.getElementById('parser-preview-tbody');
        document.getElementById('parsed-items-count').textContent = `${this.draftParsedItems.length} items parsed`;

        if (this.draftParsedItems.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-slate-500 text-xs">No valid vocabulary terms parsed yet.</td></tr>';
            return;
        }

        tbody.innerHTML = '';
        this.draftParsedItems.forEach((item, idx) => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors text-xs text-slate-300';
            
            const badge = item.autoGenerated ? '<span class="ml-1 px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded text-[10px]">✨ Auto</span>' : '';

            tr.innerHTML = `
                <td class="py-2 px-2.5 font-cantonese font-bold text-slate-100">
                    <div class="flex items-center gap-1">
                        <input type="text" value="${this.escapeHTML(item.word)}" onchange="window.UIManager.updateDraftItemField(${idx}, 'word', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-sky-500 font-cantonese">
                        ${badge}
                    </div>
                </td>
                <td class="py-2 px-2.5">
                    <input type="text" value="${this.escapeHTML(item.jyutping)}" placeholder="Jyutping" onchange="window.UIManager.updateDraftItemField(${idx}, 'jyutping', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500">
                </td>
                <td class="py-2 px-2.5">
                    <input type="text" value="${this.escapeHTML(item.meaning)}" placeholder="Meaning" onchange="window.UIManager.updateDraftItemField(${idx}, 'meaning', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500">
                </td>
                <td class="py-2 px-2.5">
                    <input type="text" value="${this.escapeHTML(item.example)}" placeholder="Example sentence" onchange="window.UIManager.updateDraftItemField(${idx}, 'example', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 font-cantonese focus:outline-none focus:border-sky-500">
                </td>
                <td class="py-2 px-2.5 text-center">
                    <button type="button" onclick="window.UIManager.removeDraftParsedItem(${idx})" class="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors" title="Delete item">✕</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    updateDraftItemField(index, field, value) {
        if (this.draftParsedItems[index]) {
            this.draftParsedItems[index][field] = value.trim();
        }
    }

    removeDraftParsedItem(index) {
        this.draftParsedItems.splice(index, 1);
        this.renderLiveParserTable();
    }

    handleSaveNewProfile(e) {
        e.preventDefault();

        const name = document.getElementById('input-profile-name').value.trim();
        const category = document.getElementById('input-profile-category').value.trim();
        const desc = document.getElementById('input-profile-desc').value.trim();

        if (!name) {
            this.showToast('Please enter a profile name.', 'warning');
            return;
        }

        if (this.draftParsedItems.length === 0) {
            this.showToast('Please paste or upload at least one vocabulary term.', 'warning');
            return;
        }

        const newProf = StorageManager.createProfile(name, category, desc, this.draftParsedItems);
        this.closeCreateProfileModal();
        this.showToast(`Profile "${name}" created successfully!`, 'success');
        this.switchView('profile-detail', { profileId: newProf.id });
    }

    async likeProfile(profileId) {
        try {
            const res = await fetch('/api/profiles/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profileId })
            });
            const data = await res.json();
            if (data.success) {
                const profiles = StorageManager.getProfiles();
                const profile = profiles.find(p => p.id === profileId);
                if (profile) {
                    profile.likes = data.likes;
                    StorageManager.saveProfiles(profiles);
                }
                this.showToast('Upvoted community deck! 👍', 'success');
                this.renderDashboard();
            }
        } catch (e) {
            console.error('Error upvoting deck:', e);
            const profiles = StorageManager.getProfiles();
            const profile = profiles.find(p => p.id === profileId);
            if (profile) {
                profile.likes = (profile.likes || 0) + 1;
                StorageManager.saveProfiles(profiles);
                this.renderDashboard();
            }
        }
    }

    exportProfileJSON(profileId) {
        const prof = StorageManager.getProfileById(profileId);
        if (!prof) return;

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prof, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `${prof.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_vocab.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        this.showToast(`Exported "${prof.name}" as JSON.`, 'info');
    }

    deleteProfileConfirm(profileId) {
        const prof = StorageManager.getProfileById(profileId);
        if (prof && confirm(`Are you sure you want to delete profile "${prof.name}"?`)) {
            StorageManager.deleteProfile(profileId);
            this.showToast(`Deleted profile "${prof.name}".`, 'info');
            this.renderDashboard();
        }
    }

    toggleMastered(itemId) {
        if (!this.activeProfile) return;
        const item = this.activeProfile.items.find(i => i.id === itemId);
        if (item) {
            item.mastered = !item.mastered;
            StorageManager.updateProfile(this.activeProfile);
            this.renderFilteredFlashcards();
            this.showToast(item.mastered ? 'Marked as Mastered! 🎉' : 'Moved back to Learning.', 'info');
        }
    }

    toggleFavorite(itemId) {
        if (!this.activeProfile) return;
        const item = this.activeProfile.items.find(i => i.id === itemId);
        if (item) {
            item.favorite = !item.favorite;
            StorageManager.updateProfile(this.activeProfile);
            this.renderFilteredFlashcards();
        }
    }

    openVoiceHelpModal() {
        this.modalVoiceHelp.classList.remove('hidden');
        document.getElementById('btn-close-voice-help').onclick = () => {
            this.modalVoiceHelp.classList.add('hidden');
        };
    }

    showToast(msg, type = 'info') {
        if (!this.toastContainer) return;

        const toast = document.createElement('div');
        let bgClass = 'bg-slate-800 border-slate-700 text-slate-100';
        if (type === 'success') bgClass = 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200';
        if (type === 'error') bgClass = 'bg-rose-950/90 border-rose-500/40 text-rose-200';
        if (type === 'warning') bgClass = 'bg-amber-950/90 border-amber-500/40 text-amber-200';

        toast.className = `px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium shadow-xl backdrop-blur-md flex items-center gap-2 transform transition-all duration-300 translate-y-2 ${bgClass}`;
        toast.innerHTML = `<span>${this.escapeHTML(msg)}</span>`;

        this.toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.remove('translate-y-2'), 10);

        setTimeout(() => {
            toast.classList.add('opacity-0', '-translate-y-2');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function(m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m];
        });
    }

    escapeQuotes(str) {
        if (!str) return '';
        return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
    }
}

// Global App Initialization
document.addEventListener('DOMContentLoaded', () => {
    window.UIManager = new UIManager();
});
