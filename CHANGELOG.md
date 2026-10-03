# 📋 Changelog (更新日誌)

All notable changes to the **Cantonese Learner (粵語通)** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
