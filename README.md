# 🇭🇰 Cantonese Vocabulary Learner (廣東話學習)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI Pipeline](https://github.com/alexfraser-scotch/cantonese-learner/actions/workflows/ci.yml/badge.svg)](https://github.com/alexfraser-scotch/cantonese-learner/actions)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-cantonese.swiftflowdigital.com-orange)](https://cantonese.swiftflowdigital.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An interactive, open-source Cantonese Vocabulary Learning platform featuring **3D flip flashcards**, **Jyutping (粵拼) 6-tone notation**, **Web Speech API audio pronunciation**, **Leitner Spaced Repetition (SRS)**, and **crowdsourced public deck sharing**.

🌐 **Live Application:** [https://cantonese.swiftflowdigital.com](https://cantonese.swiftflowdigital.com)  
📦 **GitHub Repository:** [https://github.com/alexfraser-scotch/cantonese-learner](https://github.com/alexfraser-scotch/cantonese-learner)

---

## ✨ Features

- 🃏 **3D Interactive Flashcards:** Flip cards to toggle between Traditional Cantonese Characters, Jyutping Romanization, English Meanings, and Contextual Example Sentences.
- 🎯 **Cantonese Tone Ear Training Quiz:** Interactive listening drills to practice distinguishing the 6 Cantonese pitch contours (Tone 1 – Tone 6).
- 🧠 **Leitner Spaced Repetition (SRS):** Smart 5-box memory retention algorithm (1, 3, 7, 14, 30 days) with review ratings (🔴 Again, 🟡 Good, 🟢 Easy).
- 🎵 **Cantonese 6-Tone Pronunciation Chart:** Interactive audio pitch guide covering all 6 Jyutping tones (詩 `si1`, 史 `si2`, 試 `si3`, 時 `si4`, 市 `si5`, 事 `si6`).
- 🎙️ **Voice Recording & Audio Comparison:** Live microphone recording using HTML5 `MediaRecorder` API allowing learners to record their own Cantonese pronunciation and compare it against native TTS audio.
- 📊 **SRS Retention Analytics Bar:** Dashboard stats bar visualizing card distribution across Leitner Box 1–5 retention tiers and tracking cards due for review today.
- 🖨️ **Printable Flashcard Sheet Generator:** Generate beautifully formatted 3x3 print-ready physical flashcard sheets with cut-lines and `@media print` CSS rules for offline study or classroom handouts.
- 📥 **Anki Deck Export (.csv / .txt):** Export any custom vocabulary profile into Anki-compatible TSV/CSV format with custom tags (`Cantonese::Category`) and formatted card notes for seamless import into Anki and CrowdAnki.
- 🎯 **Daily Learning Target (每日學習目標 & 連續打卡 Streak):** Set custom daily study routines with flexible deck scope (**All Profiles 跨詞庫** or specific profile), word list type (**Learning 學習中**, **All Words**, **Mastered**, or **⭐ Favorites**), and daily word goal (e.g. 5, 10, 20, 30 words/day). Features live progress bars, real-time study tracking, and daily streak counters 🔥.
- ✍️ **Cantonese Dictation Mode (默書模式):** Comprehensive listening dictation system with custom word list selection (**All Words**, **Learning**, **Mastered**, or **⭐ Favorites**). Features instant word list randomization, hidden details by default, real-time stopwatch session timer, audio playback, flip-to-check answers, previous/next navigation, configurable auto-play interval timer (repeatedly playing audio every 3 seconds per word), and a full end-of-session review summary in one page.
- 🌐 **Crowdsourced Deck & Profile Sharing:** Public community REST API allowing users to create, upvote (👍), upload, and share custom Cantonese vocabulary decks.
- 🎯 **Mastery & Favoriting System:** Track your learning progress with card completion toggles and favorite quick-lists.
- ⚡ **Lightweight & Dependency-Free:** Built with vanilla modern JavaScript, HTML5/CSS3, and native Node.js HTTP API server.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alexfraser-scotch/cantonese-learner.git
   cd cantonese-learner
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:8080` in your web browser.

---

## 🛠️ API Reference (`/api/profiles`)

The backend provides RESTful endpoints to read, create, update, and manage public community vocabulary profiles:

### Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/profiles` | Fetch all public Cantonese vocabulary decks & user profiles |
| `POST` | `/api/profiles` | Create a new community deck or modify existing deck data |

#### Example Request Body (Create Deck)
```json
{
  "action": "create",
  "profile": {
    "id": "prof-custom-01",
    "name": "Dim Sum Delights (飲茶點心)",
    "category": "Food",
    "description": "Essential vocabulary for ordering Dim Sum in Hong Kong.",
    "createdAt": "2026-08-15T00:00:00.000Z",
    "items": [
      {
        "id": "w-dim-1",
        "word": "蝦餃",
        "jyutping": "haa1 gaau2",
        "meaning": "Shrimp Dumpling (Har Gow)",
        "example": "唔該一籠蝦餃！",
        "example_meaning": "One basket of shrimp dumplings, please!",
        "mastered": false,
        "favorite": true
      }
    ]
  }
}
```

---

## 🏗️ Architecture & Technical Highlights

```
┌─────────────────────────────────────────────────────────────┐
│                       Client (SPA)                          │
├───────────────────┬─────────────────────┬───────────────────┤
│  3D Flashcards    │ Leitner 5-Box SRS   │ Tone Pitch Chart  │
│  CSS3 Transforms  │ Interval Engine     │ 6-Tone Drills     │
├───────────────────┼─────────────────────┼───────────────────┤
│ Web Speech TTS    │ MediaRecorder API   │ Anki & Print Gen  │
│ (zh-HK synthesis) │ (Voice Comparison)  │ (TSV / @media)    │
└───────────────────┴──────────┬──────────┴───────────────────┘
                               │ HTTP / REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Node.js Native HTTP Server                  │
│              (Zero External Runtime Dependencies)           │
├─────────────────────────────────────────────────────────────┤
│  REST API Routing (/api/profiles) & Static File Server      │
│  Atomic Data Persistence (data/profiles.json)               │
│  Payload Validation, Sanitization & CORS Handling           │
└─────────────────────────────────────────────────────────────┘
```

* **Zero External Dependencies:** Built entirely with vanilla modern JavaScript, HTML5/CSS3, and native Node.js standard libraries (`http`, `fs`, `path`). No heavy framework bloat, fast load times, and minimal maintenance overhead.
* **Dual Audio Architecture:** Combines native browser `window.speechSynthesis` configured with the Cantonese `zh-HK` voice engine alongside the HTML5 `MediaRecorder` API for real-time learner voice playback.
* **Leitner SRS Engine:** Mathematically scheduled review intervals (1, 3, 7, 14, 30 days) with retention analytics and daily due-card queues.
* **Data Portability:** Full two-way support for digital export (Anki `.txt`/TSV with tags) and physical study (3x3 grid printable flashcards).

---

## 🧪 Testing & CI/CD

The repository maintains an automated native test suite verified across Node.js versions:

```bash
npm test
```

### Continuous Integration
All pull requests and commits trigger automated GitHub Actions workflows running across **Node.js 18.x, 20.x, and 22.x** to verify:
* REST API payload handling and data persistence.
* Spaced Repetition (SRS) interval calculations.
* Tone extraction algorithms.
* Open-source governance files (`LICENSE`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `.github/`).

---

## 🤝 Contributing & Community Roadmap

We welcome contributions from language learners, linguists, and software engineers! Please see [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for contribution guidelines.

### 🌟 Project Roadmap
- [x] 3D Flip Flashcards & Jyutping 6-tone notation
- [x] Community REST API for Shared Decks (`/api/profiles`)
- [x] Spaced Repetition Algorithm (Leitner 5-Box SRS Engine)
- [x] Cantonese 6-Tone Ear Training Quiz & Tone Pitch Chart
- [x] Voice Recording & Audio Pronunciation Comparison (`MediaRecorder`)
- [x] Printable Flashcard Handout Generator (`@media print` 3x3 layout)
- [x] Anki Deck TSV/CSV Export with `Cantonese::Category` tagging
- [x] Automated GitHub Actions CI Matrix (`18.x`, `20.x`, `22.x`)
- [x] Security Policy (`SECURITY.md`) and Code of Conduct (`CODE_OF_CONDUCT.md`)
- [ ] Progressive Web App (PWA) offline service worker caching
- [ ] AI-assisted example sentence & tone generation (OpenAI Codex API)

---

## 🛡️ Security

For vulnerability disclosures and reporting procedures, please refer to [SECURITY.md](SECURITY.md).

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).
