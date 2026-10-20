# 📋 Changelog (更新日誌)

All notable changes to the **Cantonese Learner (粵語通)** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.11.0] - 2026-10-20 - Community Sentence Contributor & Hong Kong Slang/Xiehouyu Deck

### 🌟 Added
- **💬 Community Example Sentences & Colloquial Notes (社區地道例句與文化註釋眾包系統):**
  - Public learners and native speakers can now submit their own authentic Hong Kong Cantonese example sentences and cultural usage context for any vocabulary item directly inside the word detail inspector modal (`#modal-detail`).
  - Interactive collapsible submission form with input validation, Cantonese character parsing, author attribution, and XSS sanitization.
  - Community sentences render with full Jyutping 6-tone colorization pills, cultural context badges, native audio playback (`SpeechEngine`), and upvote thumbs-up counters (`👍`).
- **🌐 RESTful Community Sentences API Endpoints:**
  - `GET /api/community/sentences`: Search and retrieve community notes by `word` or `wordId` sorted by community upvotes.
  - `POST /api/community/sentences`: Validated submission endpoint with localized file persistence (`data/community_sentences.json`) and offline LocalStorage fallback.
  - `POST /api/community/sentences/like`: Real-time sentence upvoting and popularity incrementing.
- **🔥 New Official Community Deck - Hong Kong Slang & Xiehouyu (香港地道潮語與歇後語):**
  - Added new featured deck `prof-slang-04` with 8 essential colloquial slang terms and witty two-part allegorical sayings (歇後語):
    1. **食死貓** (Being scapegoated / wrongfully blamed)
    2. **炒魷魚** (Getting fired / dismissed from a job)
    3. **賣大包** (Offering huge discounts / extreme generosity)
    4. **執生** (Improvise / adapt on the fly)
    5. **放飛機** (Stand someone up / flake on an appointment)
    6. **搞掂** (All settled / done and dusted)
    7. **泥菩薩過江** (Clay idol crossing river — barely able to save oneself: 自身難保)
    8. **單眼佬睇榜** (One-eyed man looking at exam board — obvious at a glance: 一目了然)
- **🧪 Comprehensive Unit Testing Expansion:**
  - Added test suites in `test/server.test.js` covering community sentence validation, filtering, creation, upvoting, and slang deck tone integrity (29/29 tests passing).

---

## [v1.10.0] - 2026-10-19 - In-Progress Dictation Progress Auto-Save & Seamless Resumption

### 🌟 Added
- **💾 In-Progress Dictation Auto-Save & Manual "Save & Exit" (默書中途暫存與繼續進度):**
  - Added dedicated `StorageManager.saveInProgressDictation()`, `getInProgressDictation()`, and `clearInProgressDictation()` methods using localized storage keys.
  - Dictation header now features a dedicated **"💾 暫存進度 Save & Exit"** button (`#btn-dictation-save-exit`), preserving the exact word index (`currentIndex`), elapsed session timer, item sequence, and chosen filter scope.
  - Safe exit protection: exiting dictation midway automatically preserves progress when learners have completed at least one word or spent >3 seconds in the session.
- **▶️ Multi-Point Resumption UX (多端一鍵恢復默書進度):**
  - **Profile Detail View:** Displays an amber **"▶️ 繼續默書 Resume (Word X of Y)"** button (`#btn-profile-resume-dictation`) right in the deck header action bar.
  - **Dictation Setup Modal:** Renders an interactive In-Progress Alert Banner (`#dictation-setup-resume-box`) with paused position and elapsed time breakdown, providing 1-click **"繼續默書 Resume →"** or quick discard.
  - Resuming restores the stopwatch from the exact saved elapsed time, loads the current word card, and triggers native pronunciation audio.
- **🧹 Automatic Lifecycle Cleanup:**
  - In-progress dictation state is automatically purged upon completing all words in the session or when starting fresh with a new scope, preventing stale session prompts.
- **🧪 Unit Test Expansion:**
  - Added test suite in `test/server.test.js` validating state retention, multiple deck isolation, and lifecycle cleanup. All 27 tests passing.

---

## [v1.9.0] - 2026-10-14 - Granular Jyutping Tone-Pill Colorization & Dialogue Audio Karaoke Mode

### 🌟 Added
- **🎨 Granular Jyutping 6-Tone Pill Colorization (粵拼六聲色彩標記系統):**
  - Designed an intelligent syllable token parser (`UIManager.formatJyutpingWithToneColors`) that identifies and highlights individual Cantonese pitch contours based on LSHK tone numbers:
    - **Tone 1 (陰平 55)**: `#fda4af` / Rose (`.tone-pill-1`)
    - **Tone 2 (陰上 25)**: `#fed7aa` / Orange (`.tone-pill-2`)
    - **Tone 3 (陰去 33)**: `#fef08a` / Yellow (`.tone-pill-3`)
    - **Tone 4 (陽平 21)**: `#bbf7d0` / Green (`.tone-pill-4`)
    - **Tone 5 (陽上 23)**: `#bae6fd` / Sky Blue (`.tone-pill-5`)
    - **Tone 6 (陽去 22)**: `#e9d5ff` / Purple (`.tone-pill-6`)
  - Seamlessly applied across profile flashcards, vocabulary detail inspector modals, 3D study mode, and real-world scenario dialogues.

- **🎤 Interactive Dialogue Karaoke Playback Mode (情景對話卡拉OK跟讀模式):**
  - Integrated visual speaker focus animations (`.karaoke-active-speaker`) with glowing pulse borders and smooth auto-scrolling during dialogue audio playback.
  - Highlights active speaking turns in real time across single-line clicks and continuous full scenario dialogues (`Play Full Dialogue`).

- **🧪 Automated Unit Testing Expansion:**
  - Added new dedicated unit test suite in `test/server.test.js` validating Jyutping tone syllable tokenization, color class assignments, and fallback handling for toneless tokens. 26/26 tests passing.

---

## [v1.8.0] - 2026-10-10 - PWA Offline Mode, Universal Audio Speed & Community Upvoting

### 🌟 Added
- **📲 Progressive Web App (PWA) & Offline Capability (離線 PWA 漸進式應用):**
  - Installable application manifest (`manifest.json`) configured with standalone display, dark theme `#0f172a`, and quick shortcuts (`#scenarios`, `#dictation`, `#sentence-builder`).
  - High-resolution SVG vector application icon (`icons/icon.svg`) featuring the traditional character `粵` with modern audio-wave aesthetics.
  - Service Worker (`sw.js`) implementing stale-while-revalidate and cache-first caching strategy for instant offline loads of learning materials.
  - Smart PWA install button in header (`#btn-install-pwa`) with `beforeinstallprompt` interception.
  - Real-time offline connection banner (`#banner-offline-status`) that informs learners when disconnected while keeping flashcard drills and dialogues operable.

- **⚡ Universal Audio Playback Speed Controller (語音播放速度調節器):**
  - Instant tempo toggle button in navbar (`#btn-audio-speed-toggle`) cycling through **0.75x (Slow - Tone Practice)**, **0.9x (Standard)**, and **1.1x (Fast - Conversational)**.
  - Synchronized control across both native OS Web Speech Synthesis (`SpeechSynthesisUtterance.rate`) and high-fidelity Cloud Audio Streams (`audio.playbackRate`).
  - Persistent speed preference remembered via `localStorage`.

- **❤️ Scenario Community Upvoting & Sorting Engine (情景點讚推介與熱度排序):**
  - Added scenario like endpoint `POST /api/scenarios/like` with persistent counts saved in `data/scenarios.json`.
  - Interactive upvote heart badges (`❤️`) with optimistic UI feedback and local duplicate-vote prevention.
  - New sorting dropdown (`#scenario-sort-select`): Default, Most Popular (`🔥 Most Popular (Likes)`), Beginner → Advanced, and Advanced → Beginner.

- **🧪 Comprehensive Automated Unit Test Coverage:**
  - Added new integration test suites for manifest serving, service worker cache headers (`Service-Worker-Allowed: /`, `no-store`), and scenario upvoting. All 25 unit tests passing cleanly.

---

## [v1.7.0] - 2026-10-10 - Custom Scenario Creation & JSON Uploader Release

### 🌟 Added
- **💬 Custom Scenario Topic Creator & Builder (自訂情景主題建立器):**
  - Interactive modal builder (`#modal-create-scenario`) allowing community members to design custom Cantonese roleplay dialogue scenarios from scratch.
  - Multi-speaker configuration (Speaker A & B character names, avatars, and role assignments).
  - Dynamic dialogue turn builder with Cantonese text input, Jyutping romanization, English translation, and live audio testing buttons (`🔊 Test Audio`).
  - Key vocabulary terms creator to pair scenario words directly with 3D flashcards.
  - Category assignment (`Dining`, `Transport`, `Shopping`, `Medical`, `Workplace`, `Daily`, `Community`).

- **📤 JSON Scenario Uploader & Direct Code Editor (JSON 情景上載與匯入):**
  - Drag-and-drop / file selector `.json` importer supporting single scenario objects or arrays of scenarios.
  - Integrated raw JSON textarea editor with instant schema syntax validation and status reporting.
  - One-click template populator (**✨ Load Sample Template**) providing a ready-to-publish scenario example.

- **💾 Scenario JSON Exporter (情景 JSON 檔案匯出):**
  - Added an **"💾 Export JSON"** action button inside active scenario rooms allowing learners to download and share dialogue topics offline.

- **🌐 Backend REST API & Persistence (`/api/scenarios` & `data/scenarios.json`):**
  - `GET /api/scenarios`: Returns combined default baseline and user-contributed community scenarios.
  - `POST /api/scenarios`: Handles `create`, `import`, and `delete` actions with strict payload validation.
  - Protected baseline scenario safeguards preventing deletion of core system dialogues.

---

## [v1.6.0] - 2026-10-03 - Hands-Free Voice Dictation & Audio Stream Proxy Release

### 🌟 Added
- **🎙️ Dictation Hands-Free Voice Control (默書免提聲控助手):**
  - Continuous speech recognition engine powered by Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`).
  - Automatic **keep-alive watchdog** that reliably re-arms the recognition pipeline when browser silence timeouts trigger.
  - Built-in **700ms debounce buffer** prevents audio loop self-triggering from TTS sound output.
  - Fully bilingual voice command parsing:
    - ⏩ **"Next" / "下一個" / "下一句"**: Advances to the next word and automatically triggers native audio playback.
    - 🔁 **"Repeat" / "再聽" / "聽多次"**: Replays the current word's Cantonese pronunciation.
    - 👁️ **"Flip" / "睇答案" / "答案"**: Flips the dictation card to inspect the word and Jyutping.
    - ⏪ **"Back" / "上一個" / "上一個字"**: Returns to the previous word.
  - Dedicated Hands-Free toggle button card (`#dictation-handsfree-btn`) and live recognized speech badge pill (`#dictation-voice-pill`).
  - Automatic teardown and cleanup upon session completion or navigation away from Dictation view.

- **📋 Dictation Session Result History & Re-inspection (默書結果歷史檢視):**
  - Automatic `sessionStorage` persistence preserving the full outcome of the user's latest dictation session.
  - Added **"📋 Review Last Dictation (查看上次默書清單)"** button in the Dictation launch view, enabling users to re-open the complete result table even if the summary modal was closed accidentally.

- **🔊 High-Fidelity Cantonese TTS Audio Proxy API (`/api/tts`):**
  - Server-side streaming endpoint proxying and caching high-quality Cantonese speech.
  - In-memory audio buffer caching for ultra-low latency response times.
  - Seamless client-side fallback between local Web Speech Synthesis and remote TTS proxy streams.

---

## [v1.5.0] - 2026-09-30 - Scenario Dialogues & Sentence Builder Release

### 🌟 Added
- **💬 Real-World Cantonese Scenario Dialogues & Roleplay (情景對話模擬器):**
  - Interactive dialogue rooms for 5 authentic Hong Kong scenarios:
    1. 🥟 **茶餐廳點餐 (Ordering at Cha Chaan Teng)**: Breakfast sets, customized egg styles, and milk tea orders.
    2. 🚕 **搭的士過海 (Taking a Red Taxi)**: Giving route directions, choosing harbour tunnels (西隧 vs 紅隧), and drop-off spots.
    3. 🛍️ **旺角買嘢講價 (Shopping & Bargaining in Mong Kok)**: Authentic street price bargaining and closing friendly deals.
    4. 🏥 **診所睇醫生 (Visiting the Clinic)**: Describing fever, sore throat symptoms, and understanding medication instructions.
    5. 🫖 **飲茶搭檯叫點心 (Dim Sum Table Sharing & Tea Ordering)**: Traditional tea selection and etiquette.
  - Turn-by-turn native Cantonese TTS audio stream (`zh-HK`).
  - Interactive **Roleplay Mode**: Hide Speaker A or Speaker B lines to test your speaking ability with reveal buttons.
  - **1-Click Deck Export**: Convert scenario keywords and sentences into a study deck with a single click.

- **🧩 Cantonese Sentence Builder & Grammar Scrambler (造句組句練習):**
  - Interactive grammar drill game to assemble natural Cantonese sentences from scrambled word tokens.
  - Comprehensive focus on Cantonese aspect markers:
    - `咗` (`zo2`): Completed action.
    - `緊` (`gan2`): Continuous action.
    - `曬` (`saai3`): Complete / all.
    - `過` (`gwo3`): Experiential marker.
    - `埋` (`maai4`): Convergence / together.
  - Click-to-place and click-to-remove word chip mechanic with real-time validation, hints, and score streaks.

- **🏠 Interactive Practice Hub on Dashboard:**
  - 4 quick-launch modules directly on the dashboard home (💬 Scenarios, 🧩 Sentence Builder, 🎯 Tone Quiz, ✍️ Dictation).

---

## [v1.4.0] - 2026-09-02 - Daily Target & Dictation Enhancements

### 🌟 Added
- **🎯 Daily Learning Target (每日學習目標 & 連續打卡):**
  - Customizable routine tracker across All Profiles or specific decks.
  - Flexible word scopes (**Learning 學習中**, **All Words**, **Mastered**, **Favorites**).
  - Daily streak multiplier and celebratory completion modals.
- **✍️ Dictation Mode Scope Customization (默書模式範圍選擇):**
  - Scope selector modal supporting Learning, Mastered, All, and Favorites decks.
  - Integrated stopwatch timer and interval auto-play loop.

---

## [v1.3.0] - 2026-08-22 - RBAC & Open-Source Maintainer Governance

### 🌟 Added
- **🛡️ Role-Based Access Control (RBAC):**
  - Multi-tier privileges (`root`, `admin`, `user`).
  - Immutable root superadmin protection and moderation audit trail.
  - Admin control portal for deck feature pinning and user account lifecycle.
- **🖼️ HD Thematic Photography Auto-Matcher:**
  - Precision word-boundary regex detection pairing cards with curated Unsplash photography.
  - Manual interactive image gallery selector modal.

---

## [v1.2.0] - 2026-08-18 - Audio Comparison & Flashcard Print Sheets

### 🌟 Added
- **🎙️ Voice Recording (`MediaRecorder` API):** Real-time learner microphone capture and waveform playback comparison.
- **🖨️ Printable Flashcard Sheets:** `@media print` 3x3 layout generator with cut lines.
- **📥 Anki TSV/CSV Export:** Formatted tag export for spaced repetition study in Anki.
