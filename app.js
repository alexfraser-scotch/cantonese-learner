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

        // Daily Greetings & Common Phrases
        '你好': { jyutping: 'nei5 hou2', meaning_zh: '你好 / 招呼問候', meaning: 'Hello / How are you', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80', example: '你好！很高興認識你。', example_meaning: 'Hello! Nice to meet you.' },
        '多謝': { jyutping: 'do1 ze6', meaning_zh: '多謝 / 感謝致謝', meaning: 'Thank you (for gifts / favors)', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80', example: '多謝你的禮物，我好喜歡！', example_meaning: 'Thank you for your gift, I really like it!' },
        '唔該': { jyutping: 'm4 goi1', meaning_zh: '唔該 / 勞煩客氣', meaning: 'Thank you (for service) / Excuse me / Please', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80', example: '唔該，借借。', example_meaning: 'Excuse me, please let me through.' },
        '早晨': { jyutping: 'zou2 san4', meaning_zh: '早晨 / 早上好', meaning: 'Good morning', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', example: '早晨！今日天氣真係好。', example_meaning: 'Good morning! Today\'s weather is really nice.' },
        '再見': { jyutping: 'zoi3 gin3', meaning_zh: '再見 / 告別告辭', meaning: 'Goodbye / See you again', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', example: '我哋聽日再見！', example_meaning: 'We will see each other again tomorrow!' },
        '食咗飯未？': { jyutping: 'sik6 zo2 faan6 mei6?', meaning_zh: '食飯未 / 日常問候', meaning: 'Have you eaten yet? (Common greeting)', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', example: '食咗飯未呀？一齊去食啦！', example_meaning: 'Have you eaten yet? Let\'s go eat together!' },
        '冇問題': { jyutping: 'mou5 man6 tai4', meaning_zh: '冇問題 / 沒關係', meaning: 'No problem / You\'re welcome', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80', example: '冇問題，包喺我身上！', example_meaning: 'No problem, leave it all to me!' },
        '呢個幾多錢？': { jyutping: 'ni1 go3 gei2 do1 cin2?', meaning_zh: '多少錢 / 詢問價格', meaning: 'How much is this?', image: 'https://images.unsplash.com/photo-1556742049-0a675659850e?auto=format&fit=crop&w=600&q=80', example: '唔該，呢個幾多錢呀？', example_meaning: 'Excuse me, how much is this one?' },

        // Tech & Places
        '網絡': { jyutping: 'mong5 lok6', meaning_zh: '網絡 / 互聯網', meaning: 'Internet / Network', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', example: '呢度嘅 WiFi 網絡速度好快。', example_meaning: 'The WiFi network speed here is very fast.' },
        '應用程式': { jyutping: 'jing3 jung6 cing4 sik1', meaning_zh: '應用程式 / 手機App', meaning: 'Application / App', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', example: '我寫咗個廣東話學習應用程式。', example_meaning: 'I wrote a Cantonese learning application.' },
        '充電器': { jyutping: 'cung1 din6 hei3', meaning_zh: '充電器 / 行動電源', meaning: 'Charger / Power Bank', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', example: '你有冇帶手提電話充電器？', example_meaning: 'Do you have a phone charger with you?' },
        '手提電話': { jyutping: 'sau2 tai4 din6 waa2', meaning_zh: '手提電話 / 智能手機', meaning: 'Mobile Phone / Smartphone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', example: '我部手提電話快要冇電喇。', example_meaning: 'My mobile phone is almost out of battery.' },
        '香港': { jyutping: 'hoeng1 gong2', meaning_zh: '香港 / 港島九龍', meaning: 'Hong Kong', image: 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=600&q=80', example: '香港係一座美麗嘅城市。', example_meaning: 'Hong Kong is a beautiful city.' },
        '廁所': { jyutping: 'ci2 so2', meaning_zh: '廁所 / 洗手間', meaning: 'Bathroom / Restroom / Toilet', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', example: '請問廁所在哪裏？', example_meaning: 'Excuse me, where is the bathroom?' },
        '洗手間': { jyutping: 'sai2 sau2 gaan1', meaning_zh: '洗手間 / 廁所', meaning: 'Restroom / Washroom', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', example: '我想去一去洗手間。', example_meaning: 'I would like to go to the restroom.' }
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

    static getTopicImage(word, meaning = '') {
        const text = `${word} ${meaning}`.toLowerCase();

        // 1. Meals & Dining (Explicit Fixes for Breakfast, Lunch, Dinner, Rice, Noodles)
        if (text.includes('早餐') || text.includes('朝食') || text.includes('breakfast')) {
            return 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('午餐') || text.includes('晝食') || text.includes('午飯') || text.includes('lunch')) {
            return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('晚餐') || text.includes('夜飯') || text.includes('晚飯') || text.includes('dinner') || text.includes('supper')) {
            return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('白飯') || text.includes('米飯') || text.includes('steamed rice') || (text.includes('飯') && text.includes('rice'))) {
            return 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('麵條') || text.includes('麵') || text.includes('粉麵') || text.includes('noodle') || text.includes('ramen')) {
            return 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('粥') || text.includes('congee') || text.includes('porridge')) {
            return 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('麵包') || text.includes('面包') || text.includes('bread') || text.includes('toast')) {
            return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('蛋') || text.includes('雞蛋') || text.includes('egg')) {
            return 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('點心') || text.includes('dim sum')) {
            return 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('燒賣') || text.includes('siu mai')) {
            return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('蝦餃') || text.includes('har gow') || text.includes('dumpling')) {
            return 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('凍檸茶') || text.includes('檸茶') || text.includes('lemon tea')) {
            return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('奶茶') || text.includes('milk tea')) {
            return 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('咖啡') || text.includes('coffee')) {
            return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('茶') || text.includes('tea')) {
            return 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('蘋果') || text.includes('apple')) {
            return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('香蕉') || text.includes('banana')) {
            return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('西瓜') || text.includes('watermelon')) {
            return 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('水果') || text.includes('fruit')) {
            return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('牛肉') || text.includes('beef')) {
            return 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('雞肉') || text.includes('chicken')) {
            return 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('魚') || text.includes('fish')) {
            return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('飯') || text.includes('食') || text.includes('food') || text.includes('eat') || text.includes('meal')) {
            return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80';
        }

        // 2. Family & People Topics
        if (text.includes('爸爸') || text.includes('父親') || text.includes('father') || text.includes('dad')) {
            return 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('媽媽') || text.includes('母親') || text.includes('mother') || text.includes('mom')) {
            return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('哥哥') || text.includes('兄長') || text.includes('elder brother') || text.includes('brother')) {
            return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('姐姐') || text.includes('姊姊') || text.includes('elder sister') || text.includes('sister')) {
            return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('弟弟') || text.includes('胞弟') || text.includes('younger brother')) {
            return 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('妹妹') || text.includes('胞妹') || text.includes('younger sister')) {
            return 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('爺爺') || text.includes('祖父') || text.includes('公公') || text.includes('grandfather')) {
            return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('嫲嫲') || text.includes('婆婆') || text.includes('祖母') || text.includes('grandmother')) {
            return 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('家庭') || text.includes('家人') || text.includes('屋企人') || text.includes('family')) {
            return 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('朋友') || text.includes('friend')) {
            return 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('老師') || text.includes('先生') || text.includes('teacher')) {
            return 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('學生') || text.includes('student')) {
            return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('醫生') || text.includes('doctor')) {
            return 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('護士') || text.includes('nurse')) {
            return 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80';
        }

        // 3. Household, Technology & Places
        if (text.includes('廁所') || text.includes('洗手間') || text.includes('bathroom') || text.includes('toilet')) {
            return 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('椅子') || text.includes('chair')) {
            return 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('睡房') || text.includes('bedroom')) {
            return 'https://images.unsplash.com/photo-1540518614846-7ede433c5163?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('客廳') || text.includes('living room')) {
            return 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('廚房') || text.includes('kitchen')) {
            return 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('學校') || text.includes('school')) {
            return 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('醫院') || text.includes('hospital')) {
            return 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('機場') || text.includes('airport')) {
            return 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('公園') || text.includes('park')) {
            return 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('巴士') || text.includes('bus')) {
            return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('的士') || text.includes('taxi') || text.includes('cab')) {
            return 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('地鐵') || text.includes('mtr') || text.includes('subway')) {
            return 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('飛機') || text.includes('airplane') || text.includes('flight')) {
            return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('車') || text.includes('car')) {
            return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('書') || text.includes('book')) {
            return 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('手提電話') || text.includes('電話') || text.includes('phone') || text.includes('mobile')) {
            return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('電腦') || text.includes('computer') || text.includes('laptop')) {
            return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('錢') || text.includes('money')) {
            return 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('狗') || text.includes('dog')) {
            return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('貓') || text.includes('cat')) {
            return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('太陽') || text.includes('晴天') || text.includes('sun') || text.includes('sunny')) {
            return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
        }
        if (text.includes('雨') || text.includes('rain')) {
            return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=600&q=80';
        }

        // 4. Fallback Pool with Diverse High-Res Concept Images
        const fallbackPool = [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
        ];
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            hash = (hash << 5) - hash + word.charCodeAt(i);
            hash |= 0;
        }
        return fallbackPool[Math.abs(hash) % fallbackPool.length];
    }

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
                item.image = entry.image || this.getTopicImage(w, item.meaning || item.meaning_zh);
                isGenerated = true;
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
                if (force || !item.image) {
                    item.image = this.getTopicImage(w, item.meaning || item.meaning_zh);
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

                if (force || !item.image) {
                    item.image = this.getTopicImage(w, item.meaning || item.meaning_zh);
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
// 1. Supabase Auth Manager
// ==========================================
class AuthManager {
    static currentUser = null;
    static initialized = false;
    static STORAGE_KEY = 'cantonese_learner_user_session_v1';

    static resolveUserRole(user) {
        if (!user || !user.email) return 'guest';
        const cleanEmail = user.email.toLowerCase().trim();
        if (cleanEmail === 'canewjour@gmail.com') return 'root';
        if (user.role === 'root' || user.role === 'admin') return user.role;
        return 'user';
    }

    static saveSession(user) {
        try {
            if (user) {
                const sessionUser = {
                    uid: user.id || user.uid,
                    displayName: (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || (user.email ? user.email.split('@')[0] : 'Learner'),
                    email: user.email || '',
                    photoURL: (user.user_metadata && (user.user_metadata.avatar_url || user.user_metadata.picture)) || user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
                    role: this.resolveUserRole(user),
                    status: user.status || 'active'
                };
                const val = JSON.stringify(sessionUser);
                localStorage.setItem(this.STORAGE_KEY, val);
                sessionStorage.setItem(this.STORAGE_KEY, val);
                this.currentUser = sessionUser;
            }
        } catch (e) {
            console.warn('Failed to save user session:', e);
        }
    }

    static async syncUserBackend(user) {
        if (!user || !user.email) return user;
        try {
            const resp = await fetch('/api/auth/sync-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: user.id || user.uid,
                    email: user.email,
                    displayName: user.displayName || (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name))
                })
            });

            if (resp.status === 403) {
                const data = await resp.json();
                await this.signOut();
                alert(data.error || 'Your account has been disabled by an administrator.');
                return null;
            }

            if (resp.ok) {
                const data = await resp.json();
                if (data.success && data.user) {
                    if (this.currentUser) {
                        this.currentUser.role = data.user.role || 'user';
                        this.currentUser.status = data.user.status || 'active';
                        this.currentUser.displayName = data.user.displayName || this.currentUser.displayName;
                        this.saveSession(this.currentUser);
                    }
                    return data.user;
                }
            }
        } catch (e) {
            console.warn('Backend syncUser notice:', e.message);
        }
        return user;
    }

    static clearSession() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            sessionStorage.removeItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('Failed to clear user session:', e);
        }
    }

    static loadSession() {
        try {
            const savedUser = localStorage.getItem(this.STORAGE_KEY) || sessionStorage.getItem(this.STORAGE_KEY);
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                if (this.currentUser) {
                    this.currentUser.role = this.resolveUserRole(this.currentUser);
                }
                return this.currentUser;
            }
        } catch (e) {
            console.warn('Failed to load user session:', e);
        }
        return null;
    }

    static async init(onAuthChangeCallback = null) {
        StorageManager.initSupabase();
        const saved = this.loadSession();

        if (this.initialized) {
            if (onAuthChangeCallback) onAuthChangeCallback(this.currentUser || saved);
            return;
        }

        this.initialized = true;

        if (saved && onAuthChangeCallback) {
            onAuthChangeCallback(saved);
        }

        if (StorageManager.supabaseClient && StorageManager.supabaseClient.auth) {
            try {
                // 1. Restore active session
                const { data: { session } } = await StorageManager.supabaseClient.auth.getSession();
                if (session && session.user) {
                    this.saveSession(session.user);
                    await this.syncUserBackend(session.user);
                    if (onAuthChangeCallback) onAuthChangeCallback(this.currentUser);
                }

                // 2. Real-time auth state listener
                StorageManager.supabaseClient.auth.onAuthStateChange(async (event, session) => {
                    if (session && session.user) {
                        this.saveSession(session.user);
                        await this.syncUserBackend(session.user);
                        if (onAuthChangeCallback) onAuthChangeCallback(this.currentUser);
                    } else if (event === 'SIGNED_OUT') {
                        this.currentUser = null;
                        this.clearSession();
                        if (onAuthChangeCallback) onAuthChangeCallback(null);
                    }
                });
            } catch (e) {
                console.warn('Supabase auth getSession notice:', e);
            }
        }
    }

    static async registerWithEmail(email, password) {
        StorageManager.initSupabase();
        if (!email || !password) throw new Error('Please provide both email and password.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');

        if (StorageManager.supabaseClient && StorageManager.supabaseClient.auth) {
            const redirectUrl = window.location.origin && !window.location.origin.includes('localhost') 
                ? window.location.origin 
                : 'https://cantonese.swiftflowdigital.com/';
            const { data, error } = await StorageManager.supabaseClient.auth.signUp({
                email: email.trim(),
                password: password,
                options: {
                    emailRedirectTo: redirectUrl
                }
            });

            if (error) {
                throw error;
            }

            if (data && data.user) {
                if (data.session && data.session.user) {
                    this.saveSession(data.session.user);
                    await this.syncUserBackend(data.session.user);
                    await StorageManager.fetchUserProgress();
                    if (window.UIManager && typeof window.UIManager.handleAuthChange === 'function') {
                        window.UIManager.handleAuthChange(this.currentUser);
                    }
                }
                return { user: data.user, hasSession: !!data.session };
            }
        }

        throw new Error('Supabase authentication client is not available.');
    }

    static async signInWithEmail(email, password) {
        StorageManager.initSupabase();
        if (!email || !password) throw new Error('Please enter both email and password.');

        if (StorageManager.supabaseClient && StorageManager.supabaseClient.auth) {
            const { data, error } = await StorageManager.supabaseClient.auth.signInWithPassword({
                email: email.trim(),
                password: password
            });

            if (error) {
                throw error;
            }

            if (data && data.user) {
                this.saveSession(data.user);
                await this.syncUserBackend(data.user);
                await StorageManager.fetchUserProgress();
                if (window.UIManager && typeof window.UIManager.handleAuthChange === 'function') {
                    window.UIManager.handleAuthChange(this.currentUser);
                }
                return this.currentUser || data.user;
            }
        }

        throw new Error('Supabase authentication client is not available.');
    }

    static async signInWithGoogle() {
        StorageManager.initSupabase();
        if (StorageManager.supabaseClient && StorageManager.supabaseClient.auth) {
            try {
                const { data, error } = await StorageManager.supabaseClient.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: window.location.origin
                    }
                });
                if (error) throw error;
                return data;
            } catch (e) {
                console.warn('Supabase Google OAuth notice:', e);
                throw new Error(e.message || 'Google OAuth is not configured in Supabase console.');
            }
        }
        throw new Error('Supabase authentication client is not available.');
    }

    static async signOut() {
        StorageManager.initSupabase();
        if (StorageManager.supabaseClient && StorageManager.supabaseClient.auth) {
            try {
                await StorageManager.supabaseClient.auth.signOut();
            } catch (e) {
                console.warn('Supabase signOut error:', e);
            }
        }
        this.currentUser = null;
        this.clearSession();
        if (window.UIManager && typeof window.UIManager.handleAuthChange === 'function') {
            window.UIManager.handleAuthChange(null);
        }
    }
}

// ==========================================
// 2. Storage Manager (Server API & LocalStorage Fallback)
// ==========================================
class StorageManager {
    static STORAGE_KEY = 'cantonese_learner_profiles_v1';
    static SETTINGS_KEY = 'cantonese_learner_settings_v1';
    static USER_PROGRESS_KEY = 'cantonese_user_progress_v1';
    static API_URL = '/api/profiles';
    static PROGRESS_API_URL = '/api/user/progress';
    static cachedProfiles = null;
    static userProgress = { masteredItemIds: [], favoriteItemIds: [], likedProfileIds: [] };

    // Supabase Cloud Data Store & Realtime Sync
    static SUPABASE_URL = 'https://mdesdqrfqgjiuqaoninw.supabase.co';
    static SUPABASE_KEY = 'sb_publishable_yvbiFZQU7ISu9HGDruaeRA_0PQaM3lM';
    static supabaseClient = null;
    static realtimeChannel = null;

    static initSupabase() {
        if (window.supabase && !this.supabaseClient) {
            try {
                this.supabaseClient = window.supabase.createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
                console.log('⚡ Supabase Client initialized successfully!');
                this.setupRealtimeSubscription();
            } catch (e) {
                console.warn('Failed to initialize Supabase client:', e);
            }
        }
    }

    static setupRealtimeSubscription() {
        if (!this.supabaseClient || this.realtimeChannel) return;
        try {
            this.realtimeChannel = this.supabaseClient
                .channel('public:profiles')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (payload) => {
                    console.log('⚡ Realtime deck update from Supabase:', payload);
                    this.syncWithServer(() => {
                        if (window.UIManager && window.UIManager.currentView === 'dashboard') {
                            window.UIManager.renderDashboard();
                        }
                    });
                })
                .subscribe((status) => {
                    console.log('⚡ Supabase Realtime Subscription status:', status);
                });
        } catch (e) {
            console.warn('Supabase Realtime subscription error:', e);
        }
    }

    static async fetchUserProgress() {
        const userId = AuthManager.currentUser ? AuthManager.currentUser.uid : 'guest';
        this.initSupabase();

        let guestProgress = { masteredItemIds: [], favoriteItemIds: [], likedProfileIds: [] };
        try {
            const guestRaw = localStorage.getItem(`${this.USER_PROGRESS_KEY}_guest`) || localStorage.getItem(this.USER_PROGRESS_KEY);
            if (guestRaw) guestProgress = JSON.parse(guestRaw);
        } catch (e) {}

        // 1. Try Supabase Postgres user_progress table
        if (this.supabaseClient) {
            try {
                const { data, error } = await this.supabaseClient
                    .from('user_progress')
                    .select('*')
                    .eq('user_id', userId)
                    .single();
                if (data && !error) {
                    // Merge guest progress into cloud profile seamlessly
                    const masteredUnion = Array.from(new Set([...(data.mastered_item_ids || []), ...(guestProgress.masteredItemIds || [])]));
                    const favUnion = Array.from(new Set([...(data.favorite_item_ids || []), ...(guestProgress.favoriteItemIds || [])]));
                    const likedUnion = Array.from(new Set([...(data.liked_profile_ids || []), ...(guestProgress.likedProfileIds || [])]));

                    this.userProgress = {
                        masteredItemIds: masteredUnion,
                        favoriteItemIds: favUnion,
                        likedProfileIds: likedUnion
                    };
                    localStorage.setItem(`${this.USER_PROGRESS_KEY}_${userId}`, JSON.stringify(this.userProgress));

                    if (userId !== 'guest' && (guestProgress.masteredItemIds.length > 0 || guestProgress.favoriteItemIds.length > 0)) {
                        await this.saveUserProgress();
                    }
                    return this.userProgress;
                }
            } catch (e) {
                console.warn('Supabase fetchUserProgress error:', e);
            }
        }

        // 2. Fallback to Node server API / LocalStorage
        try {
            const res = await fetch(`${this.PROGRESS_API_URL}?userId=${encodeURIComponent(userId)}`);
            if (res.ok) {
                const data = await res.json();
                this.userProgress = data || { masteredItemIds: [], favoriteItemIds: [], likedProfileIds: [] };
                return this.userProgress;
            }
        } catch (e) {}

        try {
            const raw = localStorage.getItem(`${this.USER_PROGRESS_KEY}_${userId}`);
            if (raw) {
                this.userProgress = JSON.parse(raw);
            } else if (userId !== 'guest') {
                this.userProgress = guestProgress;
                await this.saveUserProgress();
            }
        } catch (e) {}
        return this.userProgress;
    }

    static async saveUserProgress() {
        const userId = AuthManager.currentUser ? AuthManager.currentUser.uid : 'guest';
        this.initSupabase();

        try {
            localStorage.setItem(`${this.USER_PROGRESS_KEY}_${userId}`, JSON.stringify(this.userProgress));
        } catch (e) {}

        // Save to Supabase
        if (this.supabaseClient) {
            try {
                await this.supabaseClient.from('user_progress').upsert({
                    user_id: userId,
                    mastered_item_ids: this.userProgress.masteredItemIds,
                    favorite_item_ids: this.userProgress.favoriteItemIds,
                    liked_profile_ids: this.userProgress.likedProfileIds,
                    updated_at: new Date().toISOString()
                });
            } catch (e) {
                console.warn('Supabase saveUserProgress error:', e);
            }
        }

        // Fallback save to Node API
        try {
            await fetch(this.PROGRESS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, ...this.userProgress })
            });
        } catch (e) {}
    }

    static formatForSupabase(p) {
        return {
            id: p.id,
            name: p.name || 'Untitled Profile',
            category: p.category || 'General',
            description: p.description || '',
            author: p.author || 'Cantonese Community',
            author_id: p.author_id || null,
            difficulty: p.difficulty || 'Beginner',
            likes: typeof p.likes === 'number' ? p.likes : 1,
            created_at: p.created_at || p.createdAt || new Date().toISOString(),
            items: p.items || []
        };
    }

    static formatFromSupabase(p) {
        return {
            ...p,
            createdAt: p.created_at || p.createdAt || new Date().toISOString(),
            items: Array.isArray(p.items) ? p.items : []
        };
    }

    static async syncWithServer(onSyncCallback = null) {
        this.initSupabase();

        let serverProfiles = null;

        // 1. Fetch from Supabase Postgres first!
        if (this.supabaseClient) {
            try {
                const { data, error } = await this.supabaseClient
                    .from('profiles')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (data && !error && data.length > 0) {
                    serverProfiles = data.map(p => this.formatFromSupabase(p));
                }
            } catch (e) {
                console.warn('Supabase sync error:', e);
            }
        }

        // 2. Fallback to Node server if Supabase did not return profiles
        if (!serverProfiles || serverProfiles.length === 0) {
            try {
                const res = await fetch(`${this.API_URL}?t=${Date.now()}`, {
                    headers: { 'Cache-Control': 'no-cache' }
                });
                if (res.ok) {
                    const fallbackData = await res.json();
                    if (Array.isArray(fallbackData) && fallbackData.length > 0) {
                        serverProfiles = fallbackData;
                    }
                }
            } catch (e) {
                console.warn('Unable to sync profiles from Node server:', e);
            }
        }

        const localProfiles = this.getProfiles();

        if (Array.isArray(serverProfiles) && serverProfiles.length > 0) {
            // Upload any local custom profiles missing from server to Supabase
            const serverIds = new Set(serverProfiles.map(p => p.id));
            const unsyncedProfiles = localProfiles.filter(p => !serverIds.has(p.id));

            for (const profile of unsyncedProfiles) {
                console.log('Uploading local profile to Supabase:', profile.name);
                delete profile.isLocalDraft;
                if (this.supabaseClient) {
                    try {
                        await this.supabaseClient.from('profiles').insert([this.formatForSupabase(profile)]);
                    } catch (e) {}
                }
                await this.pushToServer({ action: 'create', profile });
                serverProfiles.unshift(profile);
            }

            this.cachedProfiles = serverProfiles;
            this.saveLocalProfiles(serverProfiles);
            if (onSyncCallback) onSyncCallback(serverProfiles);
            return serverProfiles;
        }

        return localProfiles;
    }

    static enrichProfileItems(profiles) {
        if (!Array.isArray(profiles)) return profiles;
        const genericFallbacks = [
            'photo-1516589178581-6cd7833ae3b2',
            'photo-1507525428034-b723cf961d3e',
            'photo-1464822759023-fed622ff2c3b',
            'photo-1506970845246-18f21d533b20',
            'photo-1541696432-82c6da8ce7bf',
            'photo-1512941937669-90a1b58e7e9c',
            'photo-1451187580459-43490279c0fa'
        ];

        profiles.forEach(p => {
            if (Array.isArray(p.items)) {
                p.items.forEach(item => {
                    const isGenericFallback = item.image && genericFallbacks.some(f => item.image.includes(f));
                    const topicImg = CantoneseDictionary.getTopicImage(item.word, item.meaning || item.meaning_zh);
                    const isNewSpecificTopic = topicImg && !genericFallbacks.some(f => topicImg.includes(f));

                    if (!item.image || (isGenericFallback && isNewSpecificTopic)) {
                        item.image = topicImg;
                    }
                    CantoneseDictionary.enrichItem(item);
                });
            }
        });
        return profiles;
    }

    static getProfiles() {
        if (this.cachedProfiles && Array.isArray(this.cachedProfiles) && this.cachedProfiles.length > 0) {
            return this.enrichProfileItems(this.cachedProfiles);
        }
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) {
                this.saveLocalProfiles(DEFAULT_PROFILES);
                return this.enrichProfileItems(DEFAULT_PROFILES);
            }
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                this.saveLocalProfiles(DEFAULT_PROFILES);
                return this.enrichProfileItems(DEFAULT_PROFILES);
            }
            this.cachedProfiles = this.enrichProfileItems(parsed);
            return this.cachedProfiles;
        } catch (e) {
            console.error('Failed to parse localStorage profiles:', e);
            return this.enrichProfileItems(DEFAULT_PROFILES);
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
            const jsonStr = JSON.stringify(payload);
            const b64Data = btoa(unescape(encodeURIComponent(jsonStr)));
            const res = await fetch(`${this.API_URL}?t=${Date.now()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: b64Data })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.profiles) {
                    return data.profiles;
                }
            }
        } catch (e) {}
        return null;
    }

    static getProfileById(id) {
        const profiles = this.getProfiles();
        return profiles.find(p => p.id === id);
    }

    static async createProfile(name, category, description, items) {
        this.initSupabase();

        const profiles = this.getProfiles();
        const authorName = AuthManager.currentUser ? (AuthManager.currentUser.displayName || (AuthManager.currentUser.email ? AuthManager.currentUser.email.split('@')[0] : 'Learner')) : 'Community Learner';
        const newProfile = {
            id: 'prof-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            name: name || 'Untitled Profile',
            category: category || 'General',
            description: description || '',
            author: authorName,
            difficulty: 'Beginner',
            likes: 1,
            created_at: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            items: items || []
        };

        // Save locally
        profiles.unshift(newProfile);
        this.saveLocalProfiles(profiles);

        // Insert into Supabase Postgres
        if (this.supabaseClient) {
            try {
                const { error } = await this.supabaseClient.from('profiles').insert([this.formatForSupabase(newProfile)]);
                if (error) console.warn('Supabase createProfile error:', error);
                else console.log('⚡ Profile created successfully in Supabase Postgres!');
            } catch (e) {
                console.warn('Supabase insert failed:', e);
            }
        }

        // Fallback upload to Node server
        await this.pushToServer({ action: 'create', profile: newProfile });

        return newProfile;
    }

    static async updateProfile(updatedProfile) {
        this.initSupabase();
        const profiles = this.getProfiles();
        const index = profiles.findIndex(p => p.id === updatedProfile.id);
        if (index !== -1) {
            profiles[index] = updatedProfile;
            this.saveLocalProfiles(profiles);
            if (this.supabaseClient) {
                try {
                    await this.supabaseClient.from('profiles').upsert(this.formatForSupabase(updatedProfile));
                } catch (e) {}
            }
            this.pushToServer({ action: 'update', profile: updatedProfile });
        }
    }

    static async deleteProfile(id) {
        this.initSupabase();
        let profiles = this.getProfiles();
        profiles = profiles.filter(p => p.id !== id);
        this.saveLocalProfiles(profiles);
        if (this.supabaseClient) {
            try {
                await this.supabaseClient.from('profiles').delete().eq('id', id);
            } catch (e) {}
        }
        this.pushToServer({ action: 'delete', profileId: id });
    }

    static async resetToDefault() {
        this.initSupabase();
        this.saveLocalProfiles(DEFAULT_PROFILES);
        if (this.supabaseClient) {
            try {
                for (const p of DEFAULT_PROFILES) {
                    await this.supabaseClient.from('profiles').upsert(this.formatForSupabase(p));
                }
            } catch (e) {}
        }
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

        if (window.UIManager && typeof window.UIManager.updateSpeechBannerStatus === 'function') {
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
                let jyutping = (parts[1] || '').trim();
                let meaning_zh = '';
                let meaning = '';
                let example = '';
                let example_meaning = '';
                let image = '';

                if (parts.length >= 7) {
                    meaning_zh = (parts[2] || '').trim();
                    meaning = (parts[3] || '').trim();
                    example = (parts[4] || '').trim();
                    example_meaning = (parts[5] || '').trim();
                    image = (parts[6] || '').trim();
                } else if (parts.length === 6) {
                    meaning_zh = (parts[2] || '').trim();
                    meaning = (parts[3] || '').trim();
                    example = (parts[4] || '').trim();
                    example_meaning = (parts[5] || '').trim();
                } else {
                    meaning = (parts[2] || '').trim();
                    example = (parts[3] || '').trim();
                    example_meaning = (parts[4] || '').trim();
                    image = (parts[5] || '').trim();
                }

                let item = {
                    id: 'item-parsed-' + Date.now() + '-' + idx,
                    word: word,
                    jyutping: jyutping,
                    meaning_zh: meaning_zh,
                    meaning: meaning,
                    example: example,
                    example_meaning: example_meaning,
                    image: image,
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
// 5. Spaced Repetition System (Leitner SRS Engine)
// ==========================================
class SRSEngine {
    static INTERVALS = [0, 1, 3, 7, 14, 30]; // Review intervals in days per box

    static processReview(item, rating) {
        if (!item) return { box: 1, days: 1 };

        let box = item.srsBox || 1;
        
        if (rating === 1) {
            box = 1; // Demote / Reset to Box 1
        } else if (rating === 'good') {
            box = Math.min(box + 1, 5); // Advance +1 Box
        } else if (rating === 5) {
            box = 5; // Direct to Box 5 (Mastered)
        }

        const days = this.INTERVALS[box] || 1;
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + days);

        item.srsBox = box;
        item.nextReviewDate = nextReviewDate.toISOString();
        item.lastReviewed = new Date().toISOString();
        item.mastered = (box >= 5);

        return { box, days, nextReviewDate };
    }

    static isDueForReview(item) {
        if (!item || !item.nextReviewDate) return true;
        return new Date(item.nextReviewDate) <= new Date();
    }

    static getBoxStats(items) {
        if (!Array.isArray(items)) return { box1: 0, box2: 0, box3: 0, box4: 0, box5: 0, due: 0 };
        const stats = { box1: 0, box2: 0, box3: 0, box4: 0, box5: 0, due: 0 };
        items.forEach(item => {
            const box = item.srsBox || 1;
            if (box >= 1 && box <= 5) stats[`box${box}`]++;
            if (this.isDueForReview(item)) stats.due++;
        });
        return stats;
    }
}

// ==========================================
// 5.5 Voice Recorder Engine (MediaRecorder API)
// ==========================================
class VoiceRecorderEngine {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordedAudioUrl = null;
        this.isRecording = false;
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    this.audioChunks.push(e.data);
                }
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            return true;
        } catch (err) {
            console.error('Microphone recording error:', err);
            return false;
        }
    }

    stopRecording() {
        return new Promise((resolve) => {
            if (!this.mediaRecorder || !this.isRecording) {
                resolve(null);
                return;
            }

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.recordedAudioUrl = URL.createObjectURL(audioBlob);
                this.isRecording = false;

                if (this.mediaRecorder.stream) {
                    this.mediaRecorder.stream.getTracks().forEach(t => t.stop());
                }

                resolve(this.recordedAudioUrl);
            };

            this.mediaRecorder.stop();
        });
    }

    playRecording() {
        if (this.recordedAudioUrl) {
            const audio = new Audio(this.recordedAudioUrl);
            audio.play();
        }
    }
}

// ==========================================
// 6. UI Manager (SPA Views & Component Controller)
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
        this.authMode = 'signin';

        this.dashCategoryFilter = 'all';
        this.dashSearchQuery = '';

        this.studyCardFlipped = false;
        this.studyIndex = 0;

        this.quizState = {
            questions: [],
            currentIndex: 0,
            score: 0,
            userAnswers: [],
            isFinished: false
        };

        this.dictationState = {
            items: [],
            currentIndex: 0,
            isRevealed: false,
            isFinished: false,
            isAutoPlaying: false,
            autoPlaySeconds: 10,
            autoPlayIntervalSeconds: 3,
            autoPlayTimer: null,
            autoPlaySubTimer: null,
            countdownTimer: null,
            remainingSeconds: 10,
            startTime: null,
            elapsedSeconds: 0,
            stopwatchTimer: null
        };

        try {
            AuthManager.init((user) => this.handleAuthChange(user));
        } catch (e) {
            console.warn('AuthManager init error:', e);
        }

        this.initDOM();
        this.bindEvents();

        try {
            this.renderDashboard();
            StorageManager.syncWithServer(() => this.renderDashboard());
        } catch (e) {
            console.warn('Initial dashboard render/sync error:', e);
        }

        this.checkEmailConfirmationRedirect();
    }

    initDOM() {
        this.viewDashboard = document.getElementById('view-dashboard');
        this.viewProfileDetail = document.getElementById('view-profile-detail');
        this.viewStudyMode = document.getElementById('view-study-mode');
        this.viewQuizMode = document.getElementById('view-quiz-mode');
        this.viewDictationMode = document.getElementById('view-dictation-mode');
        this.viewToneQuiz = document.getElementById('view-tone-quiz');
        this.viewAdminPortal = document.getElementById('view-admin-portal');
        this.viewPrintSheet = document.getElementById('view-print-sheet');

        this.speechWarningBanner = document.getElementById('speech-warning-banner');
        this.modalCreateProfile = document.getElementById('modal-create-profile');
        this.modalDetail = document.getElementById('modal-detail');
        this.modalVoiceHelp = document.getElementById('modal-voice-help');
        this.toastContainer = document.getElementById('toast-container');

        this.modalAuth = document.getElementById('modal-auth');
        this.btnOpenAuth = document.getElementById('btn-open-auth-modal');
        this.btnCloseAuth = document.getElementById('btn-close-auth-modal');
        this.btnGoogleSignin = document.getElementById('btn-google-signin');
        this.btnUserSignout = document.getElementById('btn-user-signout');
        this.formEmailAuth = document.getElementById('form-email-auth');
        this.btnAuthRegister = document.getElementById('btn-auth-register');

        this.navDashboardBtn = document.getElementById('nav-dashboard-btn');
        this.navNewProfileBtn = document.getElementById('nav-new-profile-btn');
        this.heroCreateProfileBtn = document.getElementById('hero-create-profile-btn');
        this.navSyncBtn = document.getElementById('nav-sync-btn');
        this.btnNavAdminPortal = document.getElementById('btn-nav-admin-portal');
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
        if (this.navSyncBtn) {
            this.navSyncBtn.addEventListener('click', async () => {
                this.showToast('Syncing latest community decks...', 'info');
                await StorageManager.syncWithServer(() => this.renderDashboard());
                this.showToast('Community decks synced!', 'success');
            });
        }
        // Admin Portal Search & Filter Bindings
        const adminSearchUsers = document.getElementById('admin-search-users');
        if (adminSearchUsers) {
            adminSearchUsers.addEventListener('input', () => this.filterAndRenderAdminUsers());
        }
        const adminFilterRole = document.getElementById('admin-filter-role');
        if (adminFilterRole) {
            adminFilterRole.addEventListener('change', () => this.filterAndRenderAdminUsers());
        }
        const adminSearchDecks = document.getElementById('admin-search-decks');
        if (adminSearchDecks) {
            adminSearchDecks.addEventListener('input', () => this.filterAndRenderAdminDecks());
        }

        // User Avatar Dropdown Toggle
        const btnUserAvatar = document.getElementById('btn-user-avatar');
        const userDropdownMenuBox = document.getElementById('user-dropdown-menu-box');
        if (btnUserAvatar && userDropdownMenuBox) {
            btnUserAvatar.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdownMenuBox.classList.toggle('hidden');
            });
            document.addEventListener('click', (e) => {
                if (!btnUserAvatar.contains(e.target) && !userDropdownMenuBox.contains(e.target)) {
                    userDropdownMenuBox.classList.add('hidden');
                }
            });
        }

        // Auth UI Bindings
        if (this.btnOpenAuth) {
            this.btnOpenAuth.addEventListener('click', () => this.openAuthModal());
        }
        if (this.btnCloseAuth) {
            this.btnCloseAuth.addEventListener('click', () => this.closeAuthModal());
        }

        const tabSignIn = document.getElementById('tab-auth-signin');
        if (tabSignIn) {
            tabSignIn.addEventListener('click', () => this.setAuthMode('signin'));
        }

        const tabRegister = document.getElementById('tab-auth-register');
        if (tabRegister) {
            tabRegister.addEventListener('click', () => this.setAuthMode('register'));
        }

        const btnGoogleSignin = document.getElementById('btn-google-signin');
        if (btnGoogleSignin) {
            btnGoogleSignin.addEventListener('click', async () => {
                const errorAlert = document.getElementById('auth-error-alert');
                const errorMsg = document.getElementById('auth-error-message');
                if (errorAlert) errorAlert.classList.add('hidden');

                try {
                    await AuthManager.signInWithGoogle();
                } catch (err) {
                    if (errorAlert && errorMsg) {
                        errorMsg.textContent = err.message || 'Google sign-in error';
                        errorAlert.classList.remove('hidden');
                    }
                    this.showToast(err.message || 'Google sign-in error', 'warning');
                }
            });
        }

        if (this.btnUserSignout) {
            this.btnUserSignout.addEventListener('click', async () => {
                await AuthManager.signOut();
                this.showToast('Signed out successfully.', 'info');
            });
        }

        const formEmailAuth = document.getElementById('form-email-auth');
        if (formEmailAuth) {
            formEmailAuth.addEventListener('submit', async (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('input-auth-email');
                const passwordInput = document.getElementById('input-auth-password');
                const submitBtn = document.getElementById('btn-auth-submit');
                const submitLabel = document.getElementById('btn-auth-submit-label');
                const errorAlert = document.getElementById('auth-error-alert');
                const errorMsg = document.getElementById('auth-error-message');

                if (errorAlert) errorAlert.classList.add('hidden');

                const email = emailInput ? emailInput.value.trim() : '';
                const password = passwordInput ? passwordInput.value : '';

                if (!email || !password) {
                    if (errorAlert && errorMsg) {
                        errorMsg.textContent = 'Please enter both your email address and password.';
                        errorAlert.classList.remove('hidden');
                    }
                    return;
                }

                if (this.authMode === 'register' && password.length < 6) {
                    if (errorAlert && errorMsg) {
                        errorMsg.textContent = 'Password must be at least 6 characters long.';
                        errorAlert.classList.remove('hidden');
                    }
                    return;
                }

                const origText = submitLabel ? submitLabel.textContent : 'Submit';
                if (submitLabel) submitLabel.textContent = this.authMode === 'register' ? 'Creating account...' : 'Signing in...';
                if (submitBtn) submitBtn.disabled = true;

                try {
                    if (this.authMode === 'register') {
                        const res = await AuthManager.registerWithEmail(email, password);
                        if (res && res.hasSession) {
                            this.closeAuthModal();
                            this.showToast(`🎉 Account created! Welcome, ${(res.user && res.user.email) ? res.user.email.split('@')[0] : 'Learner'}!`, 'success');
                        } else {
                            if (errorAlert && errorMsg) {
                                errorAlert.className = "p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-start gap-2 block";
                                errorMsg.innerHTML = `<strong>✉️ Confirmation Email Sent!</strong><br>We've sent a confirmation link to <span class="font-bold text-slate-100">${email}</span>. Please check your inbox (or spam folder) and click the link to confirm your email address.`;
                            }
                            this.showToast(`✉️ Confirmation email sent to ${email}! Please check your inbox.`, 'info');
                        }
                    } else {
                        const user = await AuthManager.signInWithEmail(email, password);
                        this.closeAuthModal();
                        this.showToast(`👋 Welcome back, ${user.displayName || 'Learner'}!`, 'success');
                    }
                } catch (err) {
                    console.warn('Auth submission error:', err);
                    let displayError = err.message || 'Authentication failed. Please check your credentials.';
                    if (displayError.includes('Invalid login credentials')) {
                        displayError = 'Invalid email or password. If you do not have an account yet, click "Create Account".';
                    } else if (displayError.includes('User already registered')) {
                        displayError = 'An account with this email already exists. Please switch to "Sign In".';
                    }
                    if (errorAlert && errorMsg) {
                        errorMsg.textContent = displayError;
                        errorAlert.classList.remove('hidden');
                    }
                    this.showToast(displayError, 'error');
                } finally {
                    if (submitLabel) submitLabel.textContent = origText;
                    if (submitBtn) submitBtn.disabled = false;
                }
            });
        }

        const btnCloseConfirmed = document.getElementById('btn-close-email-confirmed');
        if (btnCloseConfirmed) {
            btnCloseConfirmed.addEventListener('click', () => {
                const modal = document.getElementById('modal-email-confirmed');
                if (modal) modal.classList.add('hidden');
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

        const btnDownloadCSV = document.getElementById('btn-download-csv-template');
        if (btnDownloadCSV) {
            btnDownloadCSV.addEventListener('click', () => this.downloadCSVTemplate());
        }

        const btnAutoGenerate = document.getElementById('btn-auto-generate-details');
        if (btnAutoGenerate) {
            btnAutoGenerate.addEventListener('click', () => this.triggerAutoGenerateDrafts());
        }

        const btnAutoGeneratePictures = document.getElementById('btn-auto-generate-pictures-only');
        if (btnAutoGeneratePictures) {
            btnAutoGeneratePictures.addEventListener('click', () => this.triggerAutoGeneratePicturesOnly());
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

        const btnModalToggleEdit = document.getElementById('btn-modal-toggle-edit');
        if (btnModalToggleEdit) {
            btnModalToggleEdit.addEventListener('click', () => this.toggleModalEditMode());
        }

        const btnModalCancelEdit = document.getElementById('btn-modal-cancel-edit');
        if (btnModalCancelEdit) {
            btnModalCancelEdit.addEventListener('click', () => this.closeModalEditMode());
        }

        const btnModalSaveEdit = document.getElementById('btn-modal-save-edit');
        if (btnModalSaveEdit) {
            btnModalSaveEdit.addEventListener('click', () => this.saveModalWordEdit());
        }

        const btnModalAutoPick = document.getElementById('btn-modal-auto-pick-image');
        if (btnModalAutoPick) {
            btnModalAutoPick.addEventListener('click', () => this.autoPickModalEditImage());
        }

        const btnModalClearImage = document.getElementById('btn-modal-clear-image');
        if (btnModalClearImage) {
            btnModalClearImage.addEventListener('click', () => this.clearModalEditImage());
        }

        const inputModalEditImage = document.getElementById('input-modal-edit-image');
        if (inputModalEditImage) {
            inputModalEditImage.addEventListener('input', () => this.updateModalEditImagePreview());
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
            } else if (this.currentView === 'dictation-mode') {
                if (e.key === ' ') {
                    e.preventDefault();
                    this.playDictationCurrentWord();
                }
                if (e.key === 'f' || e.key === 'F') {
                    this.toggleDictationFlip();
                }
                if (e.key === 'ArrowLeft') this.navigateDictation(-1);
                if (e.key === 'ArrowRight') this.navigateDictation(1);
                if (e.key === 'Escape') this.exitDictationMode();
            }
        });
    }

    switchView(targetView, params = {}) {
        this.currentView = targetView;
        
        this.viewDashboard.classList.add('hidden');
        this.viewProfileDetail.classList.add('hidden');
        this.viewStudyMode.classList.add('hidden');
        this.viewQuizMode.classList.add('hidden');
        if (this.viewDictationMode) this.viewDictationMode.classList.add('hidden');
        if (this.viewToneQuiz) this.viewToneQuiz.classList.add('hidden');
        if (this.viewAdminPortal) this.viewAdminPortal.classList.add('hidden');
        if (this.viewPrintSheet) this.viewPrintSheet.classList.add('hidden');

        // Stop dictation auto-play if leaving dictation view
        if (targetView !== 'dictation-mode' && this.dictationState && this.dictationState.isAutoPlaying) {
            this.stopDictationAutoPlay();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (targetView === 'dashboard') {
            this.renderDashboard();
            this.viewDashboard.classList.remove('hidden');
        } else if (targetView === 'admin-portal') {
            const user = AuthManager.currentUser;
            const role = AuthManager.resolveUserRole(user);
            if (role !== 'admin' && role !== 'root') {
                this.showToast('⛔ Access Denied: Admin privileges required.', 'error');
                this.switchView('dashboard');
                return;
            }
            if (this.viewAdminPortal) {
                this.viewAdminPortal.classList.remove('hidden');
                this.loadAdminData();
            }
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
        } else if (targetView === 'dictation-mode') {
            this.activeProfile = StorageManager.getProfileById(params.profileId) || this.activeProfile;
            if (this.activeProfile && this.activeProfile.items.length > 0) {
                this.initDictationMode();
                if (this.viewDictationMode) this.viewDictationMode.classList.remove('hidden');
            } else {
                this.showToast('Profile has no vocabulary items for dictation.', 'warning');
                this.switchView('profile-detail', { profileId: params.profileId });
            }
        } else if (targetView === 'tone-quiz') {
            this.initToneQuizMode();
            if (this.viewToneQuiz) this.viewToneQuiz.classList.remove('hidden');
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

    filterDashboardCategory(category, buttonElem) {
        this.dashCategoryFilter = category;
        const catBtns = document.querySelectorAll('.dash-cat-btn');
        catBtns.forEach(btn => {
            btn.className = 'dash-cat-btn px-3.5 py-1.5 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200 transition-all';
        });
        if (buttonElem) {
            buttonElem.className = 'dash-cat-btn px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all';
        }
        this.renderDashboard();
    }

    handleDashboardSearch(query) {
        this.dashSearchQuery = query.toLowerCase().trim();
        this.renderDashboard();
    }

    renderDashboard() {
        const profiles = StorageManager.getProfiles();

        const totalProfiles = profiles.length;
        let totalWords = 0;
        let totalMastered = 0;

        let allItems = [];
        profiles.forEach(p => {
            totalWords += p.items.length;
            totalMastered += p.items.filter(i => i.mastered).length;
            allItems.push(...p.items);
        });

        document.getElementById('stat-total-profiles').textContent = totalProfiles;
        document.getElementById('stat-total-words').textContent = totalWords;
        document.getElementById('stat-total-mastered').textContent = totalMastered;
        document.getElementById('stat-mastery-rate').textContent = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) + '%' : '0%';

        const srsStats = SRSEngine.getBoxStats(allItems);
        const box1Elem = document.getElementById('srs-box1-count');
        const box24Elem = document.getElementById('srs-box24-count');
        const box5Elem = document.getElementById('srs-box5-count');
        const dueElem = document.getElementById('srs-due-badge');

        if (box1Elem) box1Elem.textContent = srsStats.box1;
        if (box24Elem) box24Elem.textContent = srsStats.box2 + srsStats.box3 + srsStats.box4;
        if (box5Elem) box5Elem.textContent = srsStats.box5;
        if (dueElem) dueElem.textContent = `${srsStats.due} Due Today`;

        const gridContainer = document.getElementById('dashboard-profiles-grid');
        gridContainer.innerHTML = '';

        let filteredProfiles = [...profiles];

        if (this.dashCategoryFilter && this.dashCategoryFilter !== 'all') {
            const catLower = this.dashCategoryFilter.toLowerCase();
            filteredProfiles = filteredProfiles.filter(p => (p.category || '').toLowerCase().includes(catLower));
        }

        if (this.dashSearchQuery) {
            const q = this.dashSearchQuery;
            filteredProfiles = filteredProfiles.filter(p => 
                p.name.toLowerCase().includes(q) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                (p.author && p.author.toLowerCase().includes(q)) ||
                p.items.some(i => i.word.toLowerCase().includes(q) || i.jyutping.toLowerCase().includes(q) || i.meaning.toLowerCase().includes(q))
            );
        }

        if (filteredProfiles.length === 0) {
            gridContainer.innerHTML = `
                <div class="col-span-full text-center py-16 px-4 glass-card rounded-2xl border border-slate-700/50">
                    <div class="w-16 h-16 bg-slate-800 text-sky-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </div>
                    <h3 class="text-xl font-bold text-slate-100 mb-2">No Community Decks Found</h3>
                    <p class="text-slate-400 max-w-md mx-auto mb-6 text-sm">No decks match your filter or search query. Try adjusting your search keywords!</p>
                    <div class="flex items-center justify-center gap-3">
                        <button onclick="window.UIManager.openCreateProfileModal()" class="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-sky-500/20 transition-all">Create New Profile</button>
                    </div>
                </div>
            `;
            return;
        }

        filteredProfiles.forEach(p => {
            const masteredCount = p.items.filter(i => i.mastered).length;
            const pct = p.items.length > 0 ? Math.round((masteredCount / p.items.length) * 100) : 0;

            const card = document.createElement('div');
            card.className = 'glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative group cursor-pointer border border-slate-800';
            card.innerHTML = `
                <div>
                    <div class="flex items-start justify-between gap-3 mb-3">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            ${p.featured ? '<span class="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[11px] font-bold flex items-center gap-1">⭐ Featured</span>' : ''}
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

        const masteredSet = new Set(StorageManager.userProgress.masteredItemIds || []);
        const favSet = new Set(StorageManager.userProgress.favoriteItemIds || []);

        let items = this.activeProfile.items.map(i => ({
            ...i,
            mastered: masteredSet.has(i.id),
            favorite: favSet.has(i.id)
        }));

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
                    <img src="${this.escapeHTML(item.image)}" alt="${this.escapeHTML(item.word)}" class="w-full h-full object-cover" onerror="this.parentElement.style.display='none'">
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

        const masteredSet = new Set(StorageManager.userProgress.masteredItemIds || []);
        const favSet = new Set(StorageManager.userProgress.favoriteItemIds || []);
        const isMastered = masteredSet.has(item.id);
        const isFavorite = favSet.has(item.id);

        const btnModalMastered = document.getElementById('modal-btn-toggle-mastered');
        if (btnModalMastered) {
            if (isMastered) {
                btnModalMastered.className = 'px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm';
                btnModalMastered.innerHTML = '✓ Mastered';
            } else {
                btnModalMastered.className = 'px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5';
                btnModalMastered.innerHTML = 'Mark as Mastered';
            }
            btnModalMastered.onclick = (e) => {
                e.stopPropagation();
                this.toggleMastered(item.id);
                this.openDetailModal(this.activeWordIndex);
                if (this.currentView === 'profile-detail') this.renderProfileDetail();
            };
        }

        const btnModalFav = document.getElementById('modal-btn-toggle-favorite');
        if (btnModalFav) {
            if (isFavorite) {
                btnModalFav.className = 'px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm';
                btnModalFav.innerHTML = '⭐ Favorite';
            } else {
                btnModalFav.className = 'px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5';
                btnModalFav.innerHTML = '☆ Add to Favorites';
            }
            btnModalFav.onclick = (e) => {
                e.stopPropagation();
                this.toggleFavorite(item.id);
                this.openDetailModal(this.activeWordIndex);
                if (this.currentView === 'profile-detail') this.renderProfileDetail();
            };
        }
        
        const meaningZhElem = document.getElementById('modal-meaning-zh');
        if (meaningZhElem) meaningZhElem.textContent = item.meaning_zh || item.word;

        const meaningEnElem = document.getElementById('modal-meaning-en');
        if (meaningEnElem) meaningEnElem.textContent = item.meaning || 'Meaning translation';

        // Image Handling
        const imgContainer = document.getElementById('modal-image-container');
        const imgElem = document.getElementById('modal-image');
        if (item.image && imgContainer && imgElem) {
            imgElem.onload = () => {
                if (imgContainer) imgContainer.classList.remove('hidden');
            };
            imgElem.onerror = () => {
                if (imgContainer) imgContainer.classList.add('hidden');
            };
            imgElem.src = item.image;
            if (imgElem.complete && imgElem.naturalWidth > 0) {
                imgContainer.classList.remove('hidden');
            } else if (imgElem.complete && imgElem.naturalWidth === 0) {
                imgContainer.classList.add('hidden');
            }
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

        this.closeModalEditMode();
        this.modalDetail.classList.remove('hidden');
    }

    toggleModalEditMode() {
        const editContainer = document.getElementById('modal-edit-container');
        if (editContainer && !editContainer.classList.contains('hidden')) {
            this.closeModalEditMode();
        } else {
            this.openModalEditMode();
        }
    }

    openModalEditMode() {
        if (!this.activeProfile || this.activeWordIndex < 0 || this.activeWordIndex >= this.activeProfile.items.length) return;
        const item = this.activeProfile.items[this.activeWordIndex];

        const viewContainer = document.getElementById('modal-view-container');
        const editContainer = document.getElementById('modal-edit-container');
        const toggleBtn = document.getElementById('btn-modal-toggle-edit');

        if (viewContainer) viewContainer.classList.add('hidden');
        if (editContainer) editContainer.classList.remove('hidden');
        if (toggleBtn) {
            toggleBtn.innerHTML = '👁️ View Mode';
            toggleBtn.classList.replace('text-sky-400', 'text-amber-400');
        }

        // Populate edit input fields
        const inputWord = document.getElementById('input-modal-edit-word');
        if (inputWord) inputWord.value = item.word || '';

        const inputJyutping = document.getElementById('input-modal-edit-jyutping');
        if (inputJyutping) inputJyutping.value = item.jyutping || '';

        const inputMeaningZh = document.getElementById('input-modal-edit-meaning-zh');
        if (inputMeaningZh) inputMeaningZh.value = item.meaning_zh || item.word || '';

        const inputMeaningEn = document.getElementById('input-modal-edit-meaning-en');
        if (inputMeaningEn) inputMeaningEn.value = item.meaning || '';

        const inputImage = document.getElementById('input-modal-edit-image');
        if (inputImage) inputImage.value = item.image || '';

        const inputExample = document.getElementById('input-modal-edit-example');
        if (inputExample) inputExample.value = item.example || '';

        const inputExampleMeaning = document.getElementById('input-modal-edit-example-meaning');
        if (inputExampleMeaning) inputExampleMeaning.value = item.example_meaning || '';

        this.updateModalEditImagePreview();
    }

    closeModalEditMode() {
        const viewContainer = document.getElementById('modal-view-container');
        const editContainer = document.getElementById('modal-edit-container');
        const toggleBtn = document.getElementById('btn-modal-toggle-edit');

        if (viewContainer) viewContainer.classList.remove('hidden');
        if (editContainer) editContainer.classList.add('hidden');
        if (toggleBtn) {
            toggleBtn.innerHTML = '✏️ Edit Word / Picture';
            toggleBtn.classList.replace('text-amber-400', 'text-sky-400');
        }
    }

    updateModalEditImagePreview() {
        const imgInput = document.getElementById('input-modal-edit-image');
        const previewImg = document.getElementById('modal-edit-image-preview');
        const noImgText = document.getElementById('modal-edit-no-image-text');
        const url = imgInput ? imgInput.value.trim() : '';

        if (url && previewImg && noImgText) {
            previewImg.onload = () => {
                previewImg.classList.remove('hidden');
                noImgText.classList.add('hidden');
            };
            previewImg.onerror = () => {
                previewImg.classList.add('hidden');
                noImgText.classList.remove('hidden');
            };
            previewImg.src = url;
            if (previewImg.complete && previewImg.naturalWidth > 0) {
                previewImg.classList.remove('hidden');
                noImgText.classList.add('hidden');
            }
        } else if (previewImg && noImgText) {
            previewImg.classList.add('hidden');
            noImgText.classList.remove('hidden');
        }
    }

    autoPickModalEditImage() {
        const inputWord = document.getElementById('input-modal-edit-word');
        const inputEn = document.getElementById('input-modal-edit-meaning-en');
        const inputZh = document.getElementById('input-modal-edit-meaning-zh');
        
        const word = inputWord ? inputWord.value.trim() : '';
        const meaning = (inputEn ? inputEn.value.trim() : '') || (inputZh ? inputZh.value.trim() : '');

        if (!word) {
            this.showToast('Please enter a Cantonese word first.', 'warning');
            return;
        }

        const pickedUrl = CantoneseDictionary.getTopicImage(word, meaning);
        const imgInput = document.getElementById('input-modal-edit-image');
        if (imgInput) {
            imgInput.value = pickedUrl;
            this.updateModalEditImagePreview();
            this.showToast('🪄 Image suggested based on Cantonese topic!', 'info');
        }
    }

    clearModalEditImage() {
        const imgInput = document.getElementById('input-modal-edit-image');
        if (imgInput) {
            imgInput.value = '';
            this.updateModalEditImagePreview();
            this.showToast('Picture removed from this word.', 'info');
        }
    }

    saveModalWordEdit() {
        if (!this.activeProfile || this.activeWordIndex < 0 || this.activeWordIndex >= this.activeProfile.items.length) return;
        const item = this.activeProfile.items[this.activeWordIndex];

        const word = (document.getElementById('input-modal-edit-word') || {}).value || '';
        const jyutping = (document.getElementById('input-modal-edit-jyutping') || {}).value || '';
        const meaningZh = (document.getElementById('input-modal-edit-meaning-zh') || {}).value || '';
        const meaningEn = (document.getElementById('input-modal-edit-meaning-en') || {}).value || '';
        const image = (document.getElementById('input-modal-edit-image') || {}).value || '';
        const example = (document.getElementById('input-modal-edit-example') || {}).value || '';
        const exampleMeaning = (document.getElementById('input-modal-edit-example-meaning') || {}).value || '';

        if (!word.trim()) {
            this.showToast('Cantonese word cannot be empty.', 'warning');
            return;
        }

        item.word = word.trim();
        item.jyutping = jyutping.trim() || CantoneseDictionary.getJyutping(item.word);
        item.meaning_zh = meaningZh.trim();
        item.meaning = meaningEn.trim();
        item.image = image.trim();
        item.example = example.trim();
        item.example_meaning = exampleMeaning.trim();

        // Persist update in profile & cloud database
        StorageManager.updateProfile(this.activeProfile);
        this.showToast(`Saved changes for "${item.word}"! 🎉`, 'success');

        this.closeModalEditMode();
        this.openDetailModal(this.activeWordIndex);

        if (this.currentView === 'profile-detail') {
            this.renderProfileDetail();
        }
    }

    closeDetailModal() {
        if (this.modalDetail) {
            this.closeModalEditMode();
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

        const btnStudyFav = document.getElementById('btn-study-favorite');
        if (btnStudyFav) {
            btnStudyFav.onclick = (e) => {
                e.stopPropagation();
                const currentItem = this.activeProfile.items[this.studyIndex];
                if (currentItem) {
                    this.toggleFavorite(currentItem.id);
                    this.renderStudyCard();
                }
            };
        }

        const btnStudyMastered = document.getElementById('btn-study-mastered');
        if (btnStudyMastered) {
            btnStudyMastered.onclick = (e) => {
                e.stopPropagation();
                const currentItem = this.activeProfile.items[this.studyIndex];
                if (currentItem) {
                    this.toggleMastered(currentItem.id);
                    this.renderStudyCard();
                }
            };
        }
    }

    renderStudyCard() {
        if (!this.activeProfile || !this.activeProfile.items.length) return;

        const item = this.activeProfile.items[this.studyIndex];
        const cardInner = document.getElementById('study-card-inner');

        this.studyCardFlipped = false;
        if (cardInner) cardInner.classList.remove('is-flipped');

        const masteredSet = new Set(StorageManager.userProgress.masteredItemIds || []);
        const favSet = new Set(StorageManager.userProgress.favoriteItemIds || []);
        const isMastered = masteredSet.has(item.id);
        const isFavorite = favSet.has(item.id);

        document.getElementById('study-front-word').textContent = item.word;
        document.getElementById('study-front-jyutping').textContent = item.jyutping;

        const studyImgContainer = document.getElementById('study-front-image-container');
        const studyImgElem = document.getElementById('study-front-image');
        if (item.image && studyImgContainer && studyImgElem) {
            studyImgElem.onload = () => {
                if (studyImgContainer) studyImgContainer.classList.remove('hidden');
            };
            studyImgElem.onerror = () => {
                if (studyImgContainer) studyImgContainer.classList.add('hidden');
            };
            studyImgElem.src = item.image;
            if (studyImgElem.complete && studyImgElem.naturalWidth > 0) {
                studyImgContainer.classList.remove('hidden');
            } else if (studyImgElem.complete && studyImgElem.naturalWidth === 0) {
                studyImgContainer.classList.add('hidden');
            }
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

        const srsBoxElem = document.getElementById('srs-box-badge');
        if (srsBoxElem) srsBoxElem.textContent = `Box ${item.srsBox || 1}`;

        const srsDueElem = document.getElementById('srs-due-text');
        if (srsDueElem) {
            const days = SRSEngine.INTERVALS[item.srsBox || 1] || 1;
            srsDueElem.textContent = item.nextReviewDate ? `Next review: ${days} day(s)` : 'Next review: Today';
        }

        const btnFavorite = document.getElementById('btn-study-favorite');
        if (btnFavorite) {
            if (isFavorite) {
                btnFavorite.className = 'px-3.5 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm';
                btnFavorite.innerHTML = '⭐ Favorite';
            } else {
                btnFavorite.className = 'px-3.5 py-2 bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all';
                btnFavorite.innerHTML = '☆ Favorite';
            }
        }

        const btnMastered = document.getElementById('btn-study-mastered');
        if (btnMastered) {
            if (isMastered) {
                btnMastered.className = 'px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm';
                btnMastered.innerHTML = '✓ Mastered';
            } else {
                btnMastered.className = 'px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all';
                btnMastered.innerHTML = 'Mark as Mastered';
            }
        }
    }

    processSRSReview(rating) {
        if (!this.activeProfile || !this.activeProfile.items.length) return;
        const item = this.activeProfile.items[this.studyIndex];
        if (!item) return;

        const result = SRSEngine.processReview(item, rating);
        StorageManager.updateProfile(this.activeProfile);

        let feedback = `Moved to Box ${result.box}! Review in ${result.days} day(s).`;
        if (result.box >= 5) feedback = 'Mastered! Moved to Box 5 🎉';
        this.showToast(feedback, result.box >= 5 ? 'success' : 'info');

        this.renderStudyCard();
        setTimeout(() => this.navigateStudyCard(1), 250);
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
    // Dictation Mode (默書模式) Handlers
    // ==========================================
    startDictationMode() {
        this.switchView('dictation-mode', { profileId: this.activeProfile ? this.activeProfile.id : null });
    }

    initDictationMode() {
        if (!this.activeProfile || !this.activeProfile.items || this.activeProfile.items.length === 0) return;
        this.stopDictationAutoPlay();
        this.stopDictationStopwatch();

        // 1. Randomize all words at once for dictation
        const itemsCopy = [...this.activeProfile.items];
        const randomized = itemsCopy.sort(() => 0.5 - Math.random());

        this.dictationState.items = randomized;
        this.dictationState.currentIndex = 0;
        this.dictationState.isRevealed = false;
        this.dictationState.isFinished = false;
        this.dictationState.remainingSeconds = this.dictationState.autoPlaySeconds;

        // Start Stopwatch
        this.startDictationStopwatch();

        this.renderDictationCard();
        // Play word audio on initial entry
        setTimeout(() => this.playDictationCurrentWord(), 300);
    }

    startDictationStopwatch() {
        this.stopDictationStopwatch();
        this.dictationState.startTime = Date.now();
        this.dictationState.elapsedSeconds = 0;
        this.updateStopwatchDisplay();

        this.dictationState.stopwatchTimer = setInterval(() => {
            this.dictationState.elapsedSeconds++;
            this.updateStopwatchDisplay();
        }, 1000);
    }

    stopDictationStopwatch() {
        if (this.dictationState.stopwatchTimer) {
            clearInterval(this.dictationState.stopwatchTimer);
            this.dictationState.stopwatchTimer = null;
        }
    }

    formatStopwatchTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    updateStopwatchDisplay() {
        const timerElem = document.getElementById('dictation-stopwatch-timer');
        if (timerElem) {
            timerElem.textContent = this.formatStopwatchTime(this.dictationState.elapsedSeconds);
        }
    }

    renderDictationCard() {
        const cardContainer = document.getElementById('dictation-card-container');
        const summaryContainer = document.getElementById('dictation-summary-container');
        if (!cardContainer || !summaryContainer) return;

        if (this.dictationState.isFinished) {
            this.stopDictationAutoPlay();
            this.stopDictationStopwatch();
            cardContainer.classList.add('hidden');
            summaryContainer.classList.remove('hidden');

            const badge = document.getElementById('dictation-mode-badge');
            if (badge) {
                badge.className = 'px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1.5';
                badge.innerHTML = '<span>✅</span> 默書完成 Finished';
            }

            const progressText = document.getElementById('dictation-progress-text');
            if (progressText) progressText.textContent = `Completed ${this.dictationState.items.length} words`;

            // Display total elapsed time spent
            const summaryTime = document.getElementById('dictation-summary-time');
            if (summaryTime) {
                summaryTime.textContent = this.formatStopwatchTime(this.dictationState.elapsedSeconds);
            }

            // Render complete word list in one page
            const summaryList = document.getElementById('dictation-summary-list');
            if (summaryList) {
                summaryList.innerHTML = '';
                this.dictationState.items.forEach((item, idx) => {
                    const row = document.createElement('div');
                    row.className = 'p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-500/30 transition-all';
                    row.innerHTML = `
                        <div class="flex items-start sm:items-center gap-3">
                            <span class="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-xs font-bold font-mono shrink-0">${idx + 1}</span>
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-xl font-bold text-slate-100 font-cantonese">${this.escapeHTML(item.word)}</span>
                                    <span class="jyutping-badge px-2.5 py-0.5 rounded-lg text-xs font-mono font-semibold">${this.escapeHTML(item.jyutping)}</span>
                                </div>
                                <div class="text-xs text-slate-300 font-medium mt-0.5">
                                    <span>${this.escapeHTML(item.meaning_zh || '')}</span>
                                    <span class="text-slate-400 text-[11px] ml-1.5">(${this.escapeHTML(item.meaning || '')})</span>
                                </div>
                                ${item.example ? `<p class="text-[11px] text-purple-300 font-cantonese mt-1">${this.escapeHTML(item.example)} <span class="text-slate-500 text-[10px]">(${this.escapeHTML(item.example_meaning || '')})</span></p>` : ''}
                            </div>
                        </div>
                        <button onclick="window.UIManager.playAudioText('${this.escapeQuotes(item.word)}')" class="p-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30 transition-all text-xs flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                            Listen
                        </button>
                    `;
                    summaryList.appendChild(row);
                });
            }
            return;
        }

        cardContainer.classList.remove('hidden');
        summaryContainer.classList.add('hidden');

        const badge = document.getElementById('dictation-mode-badge');
        if (badge) {
            badge.className = 'px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold flex items-center gap-1.5';
            badge.innerHTML = '<span>✍️</span> 默書中 In Progress';
        }

        const currentItem = this.dictationState.items[this.dictationState.currentIndex];
        if (!currentItem) return;

        // Progress Text
        const progressText = document.getElementById('dictation-progress-text');
        if (progressText) {
            progressText.textContent = `Word ${this.dictationState.currentIndex + 1} of ${this.dictationState.items.length}`;
        }

        // Next Button Text
        const nextBtnText = document.getElementById('btn-dictation-next-text');
        if (nextBtnText) {
            if (this.dictationState.currentIndex === this.dictationState.items.length - 1) {
                nextBtnText.textContent = '完成默書 Finish Dictation 🏁';
            } else {
                nextBtnText.textContent = '下一個 Next Word →';
            }
        }

        // Card Views: Hidden vs Revealed
        const hiddenView = document.getElementById('dictation-hidden-view');
        const revealedView = document.getElementById('dictation-revealed-view');
        const flipText = document.getElementById('dictation-flip-text');
        const flipIcon = document.getElementById('dictation-flip-icon');

        if (this.dictationState.isRevealed) {
            if (hiddenView) hiddenView.classList.add('hidden');
            if (revealedView) revealedView.classList.remove('hidden');
            if (flipText) flipText.textContent = '隱藏答案 Hide Details';
            if (flipIcon) flipIcon.textContent = '🙈';

            document.getElementById('dictation-word-text').textContent = currentItem.word;
            document.getElementById('dictation-word-jyutping').textContent = currentItem.jyutping;
            document.getElementById('dictation-word-meaning-zh').textContent = currentItem.meaning_zh || currentItem.word;
            document.getElementById('dictation-word-meaning-en').textContent = currentItem.meaning || 'Definition';

            const exampleBox = document.getElementById('dictation-example-box');
            if (currentItem.example && exampleBox) {
                exampleBox.classList.remove('hidden');
                document.getElementById('dictation-word-example').textContent = currentItem.example;
                document.getElementById('dictation-word-example-meaning').textContent = currentItem.example_meaning || '';
            } else if (exampleBox) {
                exampleBox.classList.add('hidden');
            }
        } else {
            if (hiddenView) hiddenView.classList.remove('hidden');
            if (revealedView) revealedView.classList.add('hidden');
            if (flipText) flipText.textContent = '翻牌對答案 Flip Details';
            if (flipIcon) flipIcon.textContent = '👀';
        }
    }

    playDictationCurrentWord() {
        const item = this.dictationState.items[this.dictationState.currentIndex];
        if (item && item.word) {
            this.playAudioText(item.word, 'btn-dictation-listen');
        }
    }

    toggleDictationFlip() {
        this.dictationState.isRevealed = !this.dictationState.isRevealed;
        this.renderDictationCard();
    }

    navigateDictation(direction) {
        if (this.dictationState.isAutoPlaying) {
            this.stopDictationAutoPlay();
        }

        if (direction === 1) {
            if (this.dictationState.currentIndex >= this.dictationState.items.length - 1) {
                this.dictationState.isFinished = true;
                this.renderDictationCard();
                this.showToast('Dictation session completed! 🎉', 'success');
                return;
            }
            this.dictationState.currentIndex++;
        } else if (direction === -1) {
            if (this.dictationState.currentIndex > 0) {
                this.dictationState.currentIndex--;
            }
        }

        this.dictationState.isRevealed = false; // Details hidden by default for next/prev word
        this.renderDictationCard();
        setTimeout(() => this.playDictationCurrentWord(), 200);
    }

    setDictationAutoPlayDuration(seconds) {
        this.dictationState.autoPlaySeconds = Math.max(3, parseInt(seconds, 10) || 10);
        if (this.dictationState.isAutoPlaying) {
            this.startDictationAutoPlay(); // Restart cycle with new configured duration
        }
    }

    toggleDictationAutoPlay() {
        if (this.dictationState.isAutoPlaying) {
            this.stopDictationAutoPlay();
            this.showToast('Auto play paused ⏸️', 'info');
        } else {
            this.startDictationAutoPlay();
            this.showToast(`Auto play started ▶️ (${this.dictationState.autoPlaySeconds}s per word)`, 'info');
        }
    }

    startDictationAutoPlay() {
        this.stopDictationAutoPlay();
        this.dictationState.isAutoPlaying = true;

        const btnIcon = document.getElementById('dictation-autoplay-btn-icon');
        const btnText = document.getElementById('dictation-autoplay-btn-text');
        const btn = document.getElementById('btn-dictation-toggle-autoplay');

        if (btnIcon) btnIcon.textContent = '⏸️';
        if (btnText) btnText.textContent = 'Pause Auto Play';
        if (btn) btn.className = 'px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 animate-pulse';

        this.runDictationAutoPlayCycle();
    }

    runDictationAutoPlayCycle() {
        if (!this.dictationState.isAutoPlaying || this.dictationState.isFinished) return;

        this.dictationState.isRevealed = false;
        this.renderDictationCard();

        let elapsed = 0;
        const totalSec = this.dictationState.autoPlaySeconds;
        let playCount = 0;

        const playAudio = () => {
            if (!this.dictationState.isAutoPlaying) return;
            playCount++;
            this.playDictationCurrentWord();
        };

        // Play audio immediately at t=0
        playAudio();

        // Repeated audio playback every 3 seconds
        this.dictationState.autoPlaySubTimer = setInterval(() => {
            if (!this.dictationState.isAutoPlaying) return;
            playAudio();
        }, 3000);

        // Update countdown status every 1 second
        const statusElem = document.getElementById('dictation-autoplay-status');
        if (statusElem) {
            statusElem.textContent = `⏳ Next word in ${totalSec}s... (Audio repeat every 3s)`;
        }

        this.dictationState.countdownTimer = setInterval(() => {
            if (!this.dictationState.isAutoPlaying) return;
            elapsed++;
            const remaining = Math.max(0, totalSec - elapsed);
            if (statusElem) {
                statusElem.textContent = `⏳ Next word in ${remaining}s... (Played ${playCount} times)`;
            }

            if (elapsed >= totalSec) {
                clearInterval(this.dictationState.countdownTimer);
                clearInterval(this.dictationState.autoPlaySubTimer);

                if (this.dictationState.currentIndex < this.dictationState.items.length - 1) {
                    this.dictationState.currentIndex++;
                    this.runDictationAutoPlayCycle();
                } else {
                    this.stopDictationAutoPlay();
                    this.dictationState.isFinished = true;
                    this.renderDictationCard();
                    this.showToast('Dictation completed! 🎉', 'success');
                }
            }
        }, 1000);
    }

    stopDictationAutoPlay() {
        this.dictationState.isAutoPlaying = false;
        if (this.dictationState.countdownTimer) clearInterval(this.dictationState.countdownTimer);
        if (this.dictationState.autoPlaySubTimer) clearInterval(this.dictationState.autoPlaySubTimer);
        if (this.dictationState.autoPlayTimer) clearTimeout(this.dictationState.autoPlayTimer);

        const btnIcon = document.getElementById('dictation-autoplay-btn-icon');
        const btnText = document.getElementById('dictation-autoplay-btn-text');
        const btn = document.getElementById('btn-dictation-toggle-autoplay');
        const statusElem = document.getElementById('dictation-autoplay-status');

        if (btnIcon) btnIcon.textContent = '▶️';
        if (btnText) btnText.textContent = 'Start Auto Play';
        if (btn) btn.className = 'px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5';
        if (statusElem) statusElem.textContent = 'Play audio every 3s within duration';
    }

    exitDictationMode() {
        this.stopDictationAutoPlay();
        this.stopDictationStopwatch();
        this.switchView('profile-detail', { profileId: this.activeProfile ? this.activeProfile.id : null });
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
        this.showToast(`✨ Generated details & pictures for ${this.draftParsedItems.length} word(s)!`, 'success');
    }

    triggerAutoGeneratePicturesOnly() {
        if (this.draftParsedItems.length === 0) {
            const rawText = document.getElementById('input-paste-text').value;
            if (rawText.trim()) {
                this.draftParsedItems = ParserEngine.parseText(rawText, false);
            } else {
                this.showToast('Please enter or paste words first.', 'warning');
                return;
            }
        }

        let countImages = 0;
        this.draftParsedItems = this.draftParsedItems.map(item => {
            const topicImg = CantoneseDictionary.getTopicImage(item.word, item.meaning || item.meaning_zh);
            if (topicImg) {
                item.image = topicImg;
                item.autoGeneratedImage = true;
                countImages++;
            }
            return item;
        });

        this.renderLiveParserTable();
        this.showToast(`🖼️ Generated pictures for ${countImages} word(s) while preserving your text details!`, 'success');
    }

    downloadCSVTemplate() {
        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(
            "word,jyutping,meaning_zh,meaning,example,example_meaning,image\n" +
            "蛋撻,daan6 taat3,蛋撻 / 酥皮雞蛋塔,Egg Tart,呢間餅店嘅酥皮蛋撻好出名。,This bakery's egg tarts are famous.,https://images.unsplash.com/photo-1587314168485-3236d6710814\n" +
            "凍檸茶,dung3 ning4 caa4,凍檸茶 / 冰檸檬茶,Iced Lemon Tea,唔該要一杯凍檸茶，少甜走冰！,One iced lemon tea please, less sweet and no ice!,https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd\n" +
            "你好,nei5 hou2,你好 / 招呼問候,Hello / How are you,你好！很高興認識你。,Hello! Nice to meet you.,https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2\n" +
            "多謝,do1 ze6,多謝 / 感謝致謝,Thank you (for gifts / favors),多謝你的禮物，我好喜歡！,Thank you for your gift, I really like it!,https://images.unsplash.com/photo-1549465220-1a8b9238cd48\n"
        );
        const anchor = document.createElement('a');
        anchor.setAttribute("href", csvContent);
        anchor.setAttribute("download", "cantonese_vocab_template.csv");
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        this.showToast('Downloaded sample CSV template!', 'success');
    }

    renderLiveParserTable() {
        const tbody = document.getElementById('parser-preview-tbody');
        document.getElementById('parsed-items-count').textContent = `${this.draftParsedItems.length} items parsed`;

        if (this.draftParsedItems.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="py-6 text-center text-slate-500 text-xs">No valid vocabulary terms parsed yet.</td></tr>';
            return;
        }

        tbody.innerHTML = '';
        this.draftParsedItems.forEach((item, idx) => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors text-xs text-slate-300';
            
            const badge = item.autoGenerated ? '<span class="ml-1 px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded text-[10px]">✨ Auto</span>' : '';
            const imgPreview = item.image ? `<img src="${this.escapeHTML(item.image)}" alt="preview" class="w-7 h-7 rounded object-cover border border-slate-700 inline-block mr-1" onerror="this.style.display='none'">` : '';

            tr.innerHTML = `
                <td class="py-2 px-2.5 font-cantonese font-bold text-slate-100 min-w-[120px]">
                    <div class="flex items-center gap-1">
                        <input type="text" value="${this.escapeHTML(item.word)}" onchange="window.UIManager.updateDraftItemField(${idx}, 'word', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-sky-500 font-cantonese">
                        ${badge}
                    </div>
                </td>
                <td class="py-2 px-2.5 min-w-[100px]">
                    <input type="text" value="${this.escapeHTML(item.jyutping)}" placeholder="Jyutping" onchange="window.UIManager.updateDraftItemField(${idx}, 'jyutping', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500">
                </td>
                <td class="py-2 px-2.5 min-w-[120px]">
                    <input type="text" value="${this.escapeHTML(item.meaning)}" placeholder="English Meaning" onchange="window.UIManager.updateDraftItemField(${idx}, 'meaning', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500">
                </td>
                <td class="py-2 px-2.5 min-w-[140px]">
                    <input type="text" value="${this.escapeHTML(item.example)}" placeholder="Example sentence" onchange="window.UIManager.updateDraftItemField(${idx}, 'example', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 font-cantonese focus:outline-none focus:border-sky-500">
                </td>
                <td class="py-2 px-2.5 min-w-[150px]">
                    <div class="flex items-center gap-1">
                        ${imgPreview}
                        <input type="text" value="${this.escapeHTML(item.image || '')}" placeholder="Image URL (https://...)" onchange="window.UIManager.updateDraftItemField(${idx}, 'image', this.value)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-400 focus:outline-none focus:border-sky-500 truncate">
                    </div>
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

    async handleSaveNewProfile(e) {
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

        this.showToast('Uploading profile to community...', 'info');

        const newProf = await StorageManager.createProfile(name, category, desc, this.draftParsedItems);
        this.closeCreateProfileModal();
        this.showToast(`✨ Profile "${name}" published successfully!`, 'success');
        this.switchView('profile-detail', { profileId: newProf.id });
    }

    async likeProfile(profileId) {
        const profiles = StorageManager.getProfiles();
        const profile = profiles.find(p => p.id === profileId);
        if (profile) {
            profile.likes = (profile.likes || 0) + 1;
            StorageManager.saveLocalProfiles(profiles);
            if (StorageManager.supabaseClient) {
                try {
                    await StorageManager.supabaseClient.from('profiles').update({ likes: profile.likes }).eq('id', profileId);
                } catch (e) {}
            }
            try {
                await fetch('/api/profiles/like', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profileId })
                });
            } catch (e) {}
            this.showToast('Upvoted community deck! 👍', 'success');
            this.renderDashboard();
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
            const masteredIds = StorageManager.userProgress.masteredItemIds || [];
            const idx = masteredIds.indexOf(itemId);
            if (idx !== -1) {
                masteredIds.splice(idx, 1);
                item.mastered = false;
            } else {
                masteredIds.push(itemId);
                item.mastered = true;
            }
            StorageManager.userProgress.masteredItemIds = masteredIds;
            StorageManager.saveUserProgress();
            this.renderFilteredFlashcards();
            this.showToast(item.mastered ? 'Marked as Mastered! 🎉' : 'Moved back to Learning.', 'info');
        }
    }

    toggleFavorite(itemId) {
        if (!this.activeProfile) return;
        const item = this.activeProfile.items.find(i => i.id === itemId);
        if (item) {
            const favIds = StorageManager.userProgress.favoriteItemIds || [];
            const idx = favIds.indexOf(itemId);
            if (idx !== -1) {
                favIds.splice(idx, 1);
                item.favorite = false;
            } else {
                favIds.push(itemId);
                item.favorite = true;
            }
            StorageManager.userProgress.favoriteItemIds = favIds;
            StorageManager.saveUserProgress();
            this.renderFilteredFlashcards();
        }
    }

    openVoiceHelpModal() {
        this.modalVoiceHelp.classList.remove('hidden');
        document.getElementById('btn-close-voice-help').onclick = () => {
            this.modalVoiceHelp.classList.add('hidden');
        };
    }

    openTonesGuideModal() {
        const modal = document.getElementById('modal-tones-guide');
        if (modal) modal.classList.remove('hidden');
    }

    closeTonesGuideModal() {
        const modal = document.getElementById('modal-tones-guide');
        if (modal) modal.classList.add('hidden');
    }

    // ==========================================
    // Tone Ear Training Quiz Handlers
    // ==========================================
    initToneQuizMode() {
        const pool = [
            { word: '詩', jyutping: 'si1', tone: 1, toneName: '陰平 (High Level 55)' },
            { word: '史', jyutping: 'si2', tone: 2, toneName: '陰上 (High Rising 25)' },
            { word: '試', jyutping: 'si3', tone: 3, toneName: '陰去 (Mid Level 33)' },
            { word: '時', jyutping: 'si4', tone: 4, toneName: '陽平 (Low Falling 21)' },
            { word: '市', jyutping: 'si5', tone: 5, toneName: '陽上 (Low Rising 23)' },
            { word: '事', jyutping: 'si6', tone: 6, toneName: '陽去 (Low Level 22)' },
            { word: '你好', jyutping: 'nei5 hou2', tone: 5, toneName: '陽上 (Low Rising 23)' },
            { word: '多謝', jyutping: 'do1 ze6', tone: 1, toneName: '陰平 (High Level 55)' },
            { word: '唔該', jyutping: 'm4 goi1', tone: 4, toneName: '陽平 (Low Falling 21)' },
            { word: '食飯', jyutping: 'sik6 faan6', tone: 6, toneName: '陽去 (Low Level 22)' }
        ];

        const shuffled = pool.sort(() => 0.5 - Math.random());
        this.toneQuizState = {
            questions: shuffled.slice(0, 10),
            currentIndex: 0,
            score: 0,
            isFinished: false
        };

        this.renderToneQuizQuestion();
    }

    renderToneQuizQuestion() {
        const card = document.getElementById('tone-quiz-card');
        const summary = document.getElementById('tone-quiz-summary');
        if (!card || !summary) return;

        if (this.toneQuizState.isFinished) {
            card.classList.add('hidden');
            summary.classList.remove('hidden');

            const pct = Math.round((this.toneQuizState.score / this.toneQuizState.questions.length) * 100);
            document.getElementById('tone-quiz-final-score').textContent = `${this.toneQuizState.score} / ${this.toneQuizState.questions.length} (${pct}%)`;
            return;
        }

        card.classList.remove('hidden');
        summary.classList.add('hidden');

        const q = this.toneQuizState.questions[this.toneQuizState.currentIndex];

        document.getElementById('tone-quiz-progress').textContent = `Tone Drill ${this.toneQuizState.currentIndex + 1} of ${this.toneQuizState.questions.length}`;
        document.getElementById('tone-quiz-score-badge').textContent = `Score: ${this.toneQuizState.score}`;
        document.getElementById('tone-quiz-word-prompt').textContent = `Listen: "${q.word}"`;

        const btnAudio = document.getElementById('btn-play-tone-audio');
        if (btnAudio) {
            btnAudio.onclick = () => this.playAudioText(`${q.word}`, 'btn-play-tone-audio');
        }

        setTimeout(() => this.playAudioText(`${q.word}`, 'btn-play-tone-audio'), 200);

        const btns = document.querySelectorAll('.tone-quiz-btn');
        btns.forEach(b => {
            b.disabled = false;
            b.className = 'tone-quiz-btn p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition-all group';
        });
    }

    answerToneQuiz(selectedTone, clickedBtn) {
        const q = this.toneQuizState.questions[this.toneQuizState.currentIndex];
        const isCorrect = selectedTone === q.tone;

        const btns = document.querySelectorAll('.tone-quiz-btn');
        btns.forEach(b => b.disabled = true);

        if (isCorrect) {
            this.toneQuizState.score++;
            clickedBtn.className = 'tone-quiz-btn p-4 bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500 rounded-2xl text-left transition-all font-bold';
            this.showToast(`Correct! Tone ${q.tone} (${q.toneName}) 🎉`, 'success');
        } else {
            clickedBtn.className = 'tone-quiz-btn p-4 bg-rose-500/20 text-rose-300 border-2 border-rose-500 rounded-2xl text-left transition-all font-bold';
            this.showToast(`Incorrect! It was Tone ${q.tone} (${q.toneName}).`, 'error');
        }

        setTimeout(() => {
            this.toneQuizState.currentIndex++;
            if (this.toneQuizState.currentIndex >= this.toneQuizState.questions.length) {
                this.toneQuizState.isFinished = true;
            }
            this.renderToneQuizQuestion();
        }, 1200);
    }

    setAuthMode(mode = 'signin') {
        this.authMode = mode;
        const tabSignIn = document.getElementById('tab-auth-signin');
        const tabRegister = document.getElementById('tab-auth-register');
        const titleElem = document.getElementById('auth-modal-title');
        const subtitleElem = document.getElementById('auth-modal-subtitle');
        const submitLabel = document.getElementById('btn-auth-submit-label');
        const errorAlert = document.getElementById('auth-error-alert');

        if (errorAlert) errorAlert.classList.add('hidden');

        if (mode === 'signin') {
            if (tabSignIn) {
                tabSignIn.className = 'flex-1 py-2 text-xs font-bold rounded-xl transition-all bg-sky-500 text-white shadow-md';
            }
            if (tabRegister) {
                tabRegister.className = 'flex-1 py-2 text-xs font-bold rounded-xl transition-all text-slate-400 hover:text-slate-200';
            }
            if (titleElem) titleElem.textContent = 'Welcome to Cantonese Learner';
            if (subtitleElem) subtitleElem.textContent = 'Sign in to access and sync your Mastered words & Favorites.';
            if (submitLabel) submitLabel.textContent = 'Sign In';
        } else {
            if (tabRegister) {
                tabRegister.className = 'flex-1 py-2 text-xs font-bold rounded-xl transition-all bg-sky-500 text-white shadow-md';
            }
            if (tabSignIn) {
                tabSignIn.className = 'flex-1 py-2 text-xs font-bold rounded-xl transition-all text-slate-400 hover:text-slate-200';
            }
            if (titleElem) titleElem.textContent = 'Create New Account';
            if (subtitleElem) subtitleElem.textContent = 'Register with email & password to save decks and track progress in cloud.';
            if (submitLabel) submitLabel.textContent = 'Create Account';
        }
    }

    openAuthModal() {
        if (this.modalAuth) {
            this.setAuthMode('signin');
            const errorAlert = document.getElementById('auth-error-alert');
            if (errorAlert) errorAlert.classList.add('hidden');
            this.modalAuth.classList.remove('hidden');
        }
    }

    closeAuthModal() {
        if (this.modalAuth) {
            const errorAlert = document.getElementById('auth-error-alert');
            if (errorAlert) errorAlert.classList.add('hidden');
            this.modalAuth.classList.add('hidden');
        }
    }

    async handleAuthChange(user) {
        const btnOpenAuth = document.getElementById('btn-open-auth-modal');
        const userMenu = document.getElementById('user-profile-menu');
        const userAvatarImg = document.getElementById('user-avatar-img');
        const userDisplayName = document.getElementById('user-display-name');
        const userEmailText = document.getElementById('user-email-text');
        const btnNavAdmin = document.getElementById('btn-nav-admin-portal');
        const btnNavAdminHeader = document.getElementById('nav-admin-portal-header-btn');
        const userRoleBadge = document.getElementById('user-role-badge');
        const userDropdownRoleTag = document.getElementById('user-dropdown-role-tag');
        const adminCurrentBadge = document.getElementById('admin-user-current-badge');

        if (user) {
            if (btnOpenAuth) btnOpenAuth.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (userAvatarImg) userAvatarImg.src = user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
            if (userDisplayName) userDisplayName.textContent = user.displayName || (user.email ? user.email.split('@')[0] : 'Learner');
            if (userEmailText) userEmailText.textContent = user.email || '';

            const role = AuthManager.resolveUserRole(user);
            const isStaff = role === 'admin' || role === 'root';

            if (btnNavAdmin) {
                if (isStaff) btnNavAdmin.classList.remove('hidden');
                else btnNavAdmin.classList.add('hidden');
            }

            if (btnNavAdminHeader) {
                if (isStaff) btnNavAdminHeader.classList.remove('hidden');
                else btnNavAdminHeader.classList.add('hidden');
            }

            if (userRoleBadge) {
                userRoleBadge.textContent = role === 'root' ? '👑 Root' : (role === 'admin' ? '🛡️ Admin' : 'Learner');
                userRoleBadge.classList.remove('hidden');
            }

            if (userDropdownRoleTag) {
                userDropdownRoleTag.textContent = `Role: ${role === 'root' ? '👑 Root Superadmin' : (role === 'admin' ? '🛡️ Admin' : '👤 Standard User')}`;
            }

            if (adminCurrentBadge) {
                adminCurrentBadge.textContent = role === 'root' ? '👑 Root Superadmin' : '🛡️ Platform Admin';
            }
        } else {
            if (btnOpenAuth) btnOpenAuth.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
            if (btnNavAdmin) btnNavAdmin.classList.add('hidden');
            if (btnNavAdminHeader) btnNavAdminHeader.classList.add('hidden');
            if (userRoleBadge) userRoleBadge.classList.add('hidden');
        }

        await StorageManager.fetchUserProgress();
        this.renderDashboard();
        if (this.activeProfile) this.renderFilteredFlashcards();
    }

    // ==========================================
    // Admin Portal & RBAC Management Methods
    // ==========================================
    switchAdminTab(tab) {
        this.currentAdminTab = tab;
        const tabUsers = document.getElementById('tab-admin-users');
        const tabDecks = document.getElementById('tab-admin-decks');
        const tabMaint = document.getElementById('tab-admin-maintenance');

        const panelUsers = document.getElementById('admin-panel-users');
        const panelDecks = document.getElementById('admin-panel-decks');
        const panelMaint = document.getElementById('admin-panel-maintenance');

        const activeClasses = 'px-4 py-2 text-xs font-bold rounded-xl transition-all bg-sky-500 text-white shadow-md flex items-center gap-2';
        const inactiveClasses = 'px-4 py-2 text-xs font-bold rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900 flex items-center gap-2';

        if (tabUsers) tabUsers.className = tab === 'users' ? activeClasses : inactiveClasses;
        if (tabDecks) tabDecks.className = tab === 'decks' ? activeClasses : inactiveClasses;
        if (tabMaint) tabMaint.className = tab === 'maintenance' ? activeClasses : inactiveClasses;

        if (panelUsers) panelUsers.classList.toggle('hidden', tab !== 'users');
        if (panelDecks) panelDecks.classList.toggle('hidden', tab !== 'decks');
        if (panelMaint) panelMaint.classList.toggle('hidden', tab !== 'maintenance');
    }

    async loadAdminData() {
        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        try {
            const resp = await fetch(`/api/admin/users?adminEmail=${encodeURIComponent(user.email)}`);
            if (resp.ok) {
                const data = await resp.json();
                this.adminUsersCache = data.users || [];
                this.filterAndRenderAdminUsers();

                const totalUsersElem = document.getElementById('admin-stat-total-users');
                const totalAdminsElem = document.getElementById('admin-stat-total-admins');
                if (totalUsersElem) totalUsersElem.textContent = this.adminUsersCache.length;
                if (totalAdminsElem) {
                    const adminCount = this.adminUsersCache.filter(u => u.role === 'admin' || u.role === 'root').length;
                    totalAdminsElem.textContent = adminCount;
                }
            } else if (resp.status === 403) {
                this.showToast('⛔ Admin authorization failed', 'error');
                this.switchView('dashboard');
                return;
            }
        } catch (e) {
            console.warn('Failed to load admin users:', e);
        }

        this.filterAndRenderAdminDecks();
    }

    filterAndRenderAdminUsers() {
        const tbody = document.getElementById('admin-users-table-body');
        if (!tbody) return;

        const searchInput = document.getElementById('admin-search-users');
        const roleSelect = document.getElementById('admin-filter-role');

        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const roleFilter = roleSelect ? roleSelect.value : 'all';

        let users = [...(this.adminUsersCache || [])];

        if (q) {
            users = users.filter(u => 
                (u.email && u.email.toLowerCase().includes(q)) || 
                (u.displayName && u.displayName.toLowerCase().includes(q))
            );
        }

        if (roleFilter !== 'all') {
            if (roleFilter === 'disabled') {
                users = users.filter(u => u.status === 'disabled');
            } else {
                users = users.filter(u => u.role === roleFilter);
            }
        }

        if (users.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-slate-500">No users found matching filter.</td></tr>`;
            return;
        }

        tbody.innerHTML = users.map(u => {
            const isRoot = u.role === 'root' || u.isRoot || (u.email && u.email.toLowerCase() === 'canewjour@gmail.com');
            const isAdmin = u.role === 'admin';
            const isActive = u.status === 'active' || !u.status;

            let roleBadge = '<span class="px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-md text-[11px] font-mono">👤 User</span>';
            if (isRoot) roleBadge = '<span class="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md text-[11px] font-mono font-bold">👑 Root Superadmin</span>';
            else if (isAdmin) roleBadge = '<span class="px-2 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-md text-[11px] font-mono font-bold">🛡️ Admin</span>';

            const statusBadge = isActive
                ? '<span class="px-2 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-md text-[10px] font-semibold flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active</span>'
                : '<span class="px-2 py-0.5 bg-rose-500/15 text-rose-300 border border-rose-500/30 rounded-md text-[10px] font-semibold flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Disabled</span>';

            const createdDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A';

            return `
                <tr class="hover:bg-slate-900/40 transition-colors">
                    <td class="py-3 px-4">
                        <div class="flex items-center gap-2.5">
                            <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="Avatar" class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700">
                            <div>
                                <p class="font-bold text-slate-200">${this.escapeHTML(u.displayName || 'Learner')}</p>
                                <p class="text-[11px] text-slate-400 font-mono">${this.escapeHTML(u.email || '')}</p>
                            </div>
                        </div>
                    </td>
                    <td class="py-3 px-4">${roleBadge}</td>
                    <td class="py-3 px-4">${statusBadge}</td>
                    <td class="py-3 px-4 text-slate-400 font-mono text-[11px]">${createdDate}</td>
                    <td class="py-3 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            ${isRoot ? '<span class="text-[11px] text-amber-400/80 font-mono px-2 py-1 bg-amber-500/10 rounded-lg">Protected</span>' : `
                                <select onchange="window.UIManager.handleAdminChangeRole('${u.id}', this.value)" class="bg-slate-900 border border-slate-800 text-[11px] text-slate-200 rounded-lg px-2 py-1 focus:outline-none">
                                    <option value="user" ${u.role === 'user' ? 'selected' : ''}>Role: User</option>
                                    <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Role: Admin</option>
                                </select>
                                <button onclick="window.UIManager.handleAdminToggleStatus('${u.id}', '${u.status}')" title="${isActive ? 'Disable user access' : 'Enable user access'}" class="p-1.5 ${isActive ? 'text-amber-400 hover:bg-amber-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'} rounded-lg border border-slate-800 transition-all text-xs font-semibold">
                                    ${isActive ? '⏸️ Lock' : '▶️ Unlock'}
                                </button>
                                <button onclick="window.UIManager.openAdminResetPasswordModal('${u.id}', '${this.escapeQuotes(u.email || '')}')" title="Reset password" class="p-1.5 text-sky-400 hover:bg-sky-500/10 rounded-lg border border-slate-800 transition-all text-xs">
                                    🔑
                                </button>
                                <button onclick="window.UIManager.handleAdminDeleteUser('${u.id}', '${this.escapeQuotes(u.email || '')}')" title="Permanently delete user" class="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg border border-slate-800 transition-all text-xs">
                                    🗑️
                                </button>
                            `}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    filterAndRenderAdminDecks() {
        const tbody = document.getElementById('admin-decks-table-body');
        if (!tbody) return;

        const profiles = StorageManager.loadProfiles() || [];
        const totalDecksElem = document.getElementById('admin-stat-total-decks');
        const badgeElem = document.getElementById('admin-decks-count-badge');
        if (totalDecksElem) totalDecksElem.textContent = profiles.length;
        if (badgeElem) badgeElem.textContent = `${profiles.length} Decks`;

        const searchInput = document.getElementById('admin-search-decks');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

        let filtered = [...profiles];
        if (q) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(q) || 
                (p.author && p.author.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q))
            );
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-500">No community decks found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(p => {
            const isFeatured = !!p.featured;
            return `
                <tr class="hover:bg-slate-900/40 transition-colors">
                    <td class="py-3 px-4">
                        <p class="font-bold text-slate-100">${this.escapeHTML(p.name)}</p>
                        <span class="text-[10px] text-sky-400 font-mono">${this.escapeHTML(p.category || 'General')}</span>
                    </td>
                    <td class="py-3 px-4 text-slate-300 text-xs">${this.escapeHTML(p.author || 'Community')}</td>
                    <td class="py-3 px-4 font-mono text-slate-400">${p.items ? p.items.length : 0}</td>
                    <td class="py-3 px-4 text-amber-400 font-mono font-bold">👍 ${p.likes || 0}</td>
                    <td class="py-3 px-4">
                        <button onclick="window.UIManager.handleAdminToggleFeatureDeck('${p.id}', ${!isFeatured})" class="px-2.5 py-1 ${isFeatured ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-slate-900 text-slate-400 border-slate-800'} border rounded-lg text-xs font-semibold transition-all flex items-center gap-1">
                            ${isFeatured ? '⭐ Pinned (Featured)' : '☆ Standard'}
                        </button>
                    </td>
                    <td class="py-3 px-4 text-right">
                        <button onclick="window.UIManager.handleAdminDeleteDeck('${p.id}', '${this.escapeQuotes(p.name)}')" class="px-2.5 py-1 text-rose-400 hover:bg-rose-500/10 border border-slate-800 rounded-lg text-xs transition-all flex items-center gap-1 ml-auto">
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    async handleAdminChangeRole(targetUserId, newRole) {
        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        try {
            const resp = await fetch('/api/admin/users/role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminEmail: user.email,
                    targetUserId: targetUserId,
                    newRole: newRole
                })
            });
            const data = await resp.json();
            if (resp.ok && data.success) {
                this.showToast(`Role updated to ${newRole.toUpperCase()}!`, 'success');
                this.loadAdminData();
            } else {
                this.showToast(data.error || 'Failed to update user role', 'error');
                this.loadAdminData();
            }
        } catch (e) {
            this.showToast('Error modifying user role', 'error');
        }
    }

    async handleAdminToggleStatus(targetUserId, currentStatus) {
        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        const newStatus = currentStatus === 'disabled' ? 'active' : 'disabled';
        if (!confirm(`Are you sure you want to ${newStatus === 'disabled' ? 'DISABLE' : 'ENABLE'} this user account?`)) return;

        try {
            const resp = await fetch('/api/admin/users/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminEmail: user.email,
                    targetUserId: targetUserId,
                    newStatus: newStatus
                })
            });
            const data = await resp.json();
            if (resp.ok && data.success) {
                this.showToast(`User account is now ${newStatus.toUpperCase()}!`, 'success');
                this.loadAdminData();
            } else {
                this.showToast(data.error || 'Failed to change user status', 'error');
            }
        } catch (e) {
            this.showToast('Error modifying user status', 'error');
        }
    }

    async handleAdminDeleteUser(targetUserId, email) {
        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        if (!confirm(`⚠️ PERMANENT ACTION:\nAre you sure you want to completely delete user ${email}? All user progress will be removed.`)) return;

        try {
            const resp = await fetch('/api/admin/users/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminEmail: user.email,
                    targetUserId: targetUserId
                })
            });
            const data = await resp.json();
            if (resp.ok && data.success) {
                this.showToast(`User ${email} deleted successfully.`, 'info');
                this.loadAdminData();
            } else {
                this.showToast(data.error || 'Failed to delete user', 'error');
            }
        } catch (e) {
            this.showToast('Error deleting user', 'error');
        }
    }

    openAdminResetPasswordModal(targetUserId, email) {
        this.adminTargetResetUserId = targetUserId;
        this.adminTargetResetEmail = email;

        const emailLabel = document.getElementById('admin-reset-target-email');
        if (emailLabel) emailLabel.textContent = email;

        const modal = document.getElementById('modal-admin-reset-password');
        if (modal) modal.classList.remove('hidden');
    }

    async handleAdminSendPasswordResetLink() {
        if (!this.adminTargetResetEmail) return;
        try {
            if (StorageManager.supabaseClient && StorageManager.supabaseClient.auth) {
                const { error } = await StorageManager.supabaseClient.auth.resetPasswordForEmail(this.adminTargetResetEmail, {
                    redirectTo: 'https://cantonese.swiftflowdigital.com/'
                });
                if (error) throw error;
                this.showToast(`✉️ Password reset email sent to ${this.adminTargetResetEmail}!`, 'success');
                const modal = document.getElementById('modal-admin-reset-password');
                if (modal) modal.classList.add('hidden');
            } else {
                this.showToast('Supabase Auth client not initialized', 'warning');
            }
        } catch (e) {
            this.showToast(e.message || 'Failed to dispatch reset email', 'error');
        }
    }

    async handleAdminSetTempPassword(e) {
        e.preventDefault();
        const input = document.getElementById('input-admin-temp-password');
        const tempPass = input ? input.value : '';
        if (!tempPass || tempPass.length < 6) {
            this.showToast('Temporary password must be at least 6 characters.', 'warning');
            return;
        }

        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        try {
            const resp = await fetch('/api/admin/users/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminEmail: user.email,
                    targetUserId: this.adminTargetResetUserId,
                    newTempPassword: tempPass
                })
            });
            const data = await resp.json();
            if (resp.ok && data.success) {
                this.showToast(`🔑 Temporary password registered for ${this.adminTargetResetEmail}!`, 'success');
                const modal = document.getElementById('modal-admin-reset-password');
                if (modal) modal.classList.add('hidden');
                if (input) input.value = '';
            } else {
                this.showToast(data.error || 'Failed to set temp password', 'error');
            }
        } catch (err) {
            this.showToast('Error registering temp password', 'error');
        }
    }

    async handleAdminToggleFeatureDeck(profileId, featured) {
        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        try {
            const resp = await fetch('/api/admin/decks/feature', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminEmail: user.email,
                    profileId: profileId,
                    featured: featured
                })
            });
            const data = await resp.json();
            if (resp.ok && data.success) {
                this.showToast(featured ? '⭐ Deck pinned as Featured!' : 'Deck unpinned from Featured', 'success');
                await StorageManager.syncWithServer(() => {
                    this.filterAndRenderAdminDecks();
                    this.renderDashboard();
                });
            } else {
                this.showToast(data.error || 'Failed to toggle featured status', 'error');
            }
        } catch (e) {
            this.showToast('Error modifying deck status', 'error');
        }
    }

    async handleAdminDeleteDeck(profileId, deckName) {
        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        if (!confirm(`Are you sure you want to delete community deck "${deckName}"?`)) return;

        try {
            const resp = await fetch('/api/admin/decks/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminEmail: user.email,
                    profileId: profileId
                })
            });
            const data = await resp.json();
            if (resp.ok && data.success) {
                this.showToast(`Deck "${deckName}" deleted.`, 'info');
                await StorageManager.syncWithServer(() => {
                    this.filterAndRenderAdminDecks();
                    this.renderDashboard();
                });
            } else {
                this.showToast(data.error || 'Failed to delete deck', 'error');
            }
        } catch (e) {
            this.showToast('Error deleting deck', 'error');
        }
    }

    async handleAdminResetProfilesPrompt() {
        const user = AuthManager.currentUser;
        if (!user || !user.email) return;

        if (!confirm('⚠️ SYSTEM WARNING:\nThis will reset all starter profiles to default factory state. Proceed?')) return;

        try {
            const resp = await fetch('/api/admin/reset-profiles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminEmail: user.email
                })
            });
            const data = await resp.json();
            if (resp.ok && data.success) {
                this.showToast('✅ Default profiles have been restored to factory settings!', 'success');
                await StorageManager.syncWithServer(() => {
                    this.renderDashboard();
                    this.filterAndRenderAdminDecks();
                });
            } else {
                this.showToast(data.error || 'Failed to reset profiles', 'error');
            }
        } catch (e) {
            this.showToast('Error executing system profiles reset', 'error');
        }
    }

    checkEmailConfirmationRedirect() {
        const hash = window.location.hash || '';
        const search = window.location.search || '';

        const isConfirmed = hash.includes('type=signup') || 
                            hash.includes('type=email_confirmation') || 
                            hash.includes('type=recovery') || 
                            hash.includes('access_token') || 
                            search.includes('type=signup') || 
                            search.includes('type=email_confirmation') ||
                            search.includes('code=');

        if (isConfirmed) {
            // Clean URL hash so token isn't left visible in browser address bar
            try {
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, document.title, window.location.pathname);
                }
            } catch (e) {}

            setTimeout(() => {
                const userEmail = (AuthManager.currentUser && AuthManager.currentUser.email) 
                    ? AuthManager.currentUser.email 
                    : (localStorage.getItem('cantonese_learner_user_session_v1') ? JSON.parse(localStorage.getItem('cantonese_learner_user_session_v1')).email : 'Verified Learner');

                const emailElem = document.getElementById('confirmed-user-email');
                if (emailElem && userEmail) emailElem.textContent = userEmail;

                const modal = document.getElementById('modal-email-confirmed');
                if (modal) modal.classList.remove('hidden');

                this.showToast('🎉 Email confirmed! Welcome to Cantonese Learner!', 'success');
            }, 400);
        }
    }

    // ==========================================
    // Voice Recorder Practice Methods
    // ==========================================
    async toggleVoiceRecording() {
        if (!this.voiceRecorder) this.voiceRecorder = new VoiceRecorderEngine();

        const btnRecord = document.getElementById('btn-record-voice');
        const btnPlay = document.getElementById('btn-play-recording');
        const badge = document.getElementById('recording-status-badge');

        if (!this.voiceRecorder.isRecording) {
            const started = await this.voiceRecorder.startRecording();
            if (started) {
                if (btnRecord) {
                    btnRecord.className = 'flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white border border-rose-500 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 animate-pulse';
                    btnRecord.innerHTML = '⏹️ Stop Recording';
                }
                if (badge) {
                    badge.className = 'text-[10px] px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-md font-mono font-bold';
                    badge.textContent = '● Recording...';
                }
                this.showToast('Speak now... Recording your voice!', 'info');
            } else {
                this.showToast('Microphone access denied or unavailable in this browser.', 'error');
            }
        } else {
            const audioUrl = await this.voiceRecorder.stopRecording();
            if (btnRecord) {
                btnRecord.className = 'flex-1 py-2 px-3 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5';
                btnRecord.innerHTML = '🎙️ Record My Voice';
            }
            if (badge) {
                badge.className = 'text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md font-mono font-bold';
                badge.textContent = '✓ Recorded';
            }
            if (btnPlay) {
                btnPlay.disabled = false;
                btnPlay.className = 'flex-1 py-2 px-3 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer opacity-100';
            }
            this.showToast('Recording saved! Click "Play Recording" to listen.', 'success');
        }
    }

    playUserRecording() {
        if (this.voiceRecorder && this.voiceRecorder.recordedAudioUrl) {
            this.voiceRecorder.playRecording();
            this.showToast('Playing your voice recording...', 'info');
        }
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
    try {
        const raw = localStorage.getItem('cantonese_learner_user_session_v1') || sessionStorage.getItem('cantonese_learner_user_session_v1');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.email && parsed.email.toLowerCase().trim() === 'canewjour@gmail.com') {
                parsed.role = 'root';
                const updated = JSON.stringify(parsed);
                localStorage.setItem('cantonese_learner_user_session_v1', updated);
                sessionStorage.setItem('cantonese_learner_user_session_v1', updated);
            }
        }
    } catch (e) {}

    window.UIManager = new UIManager();
});
