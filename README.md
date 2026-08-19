# 🇭🇰 Cantonese Vocabulary Learner (廣東話學習)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An interactive, open-source Cantonese Vocabulary Learning application featuring **3D flip flashcards**, **Jyutping (粵拼) 6-tone notation**, **Web Speech API audio pronunciation**, and **crowdsourced public deck sharing**.

---

## ✨ Features

- 🃏 **3D Interactive Flashcards:** Flip cards to toggle between Traditional Cantonese Characters, Jyutping Romanization, English Meanings, and Contextual Example Sentences.
- 🎯 **Cantonese Tone Ear Training Quiz:** Interactive listening drills to practice distinguishing the 6 Cantonese pitch contours (Tone 1 – Tone 6).
- 🧠 **Leitner Spaced Repetition (SRS):** Smart 5-box memory retention algorithm (1, 3, 7, 14, 30 days) with review ratings (🔴 Again, 🟡 Good, 🟢 Easy).
- 🎵 **Cantonese 6-Tone Pronunciation Chart:** Interactive audio pitch guide covering all 6 Jyutping tones (詩 `si1`, 史 `si2`, 試 `si3`, 時 `si4`, 市 `si5`, 事 `si6`).
- 🔊 **Web Speech & Audio Synthesis:** Hear native-style Cantonese pronunciation using browser SpeechSynthesis (`zh-HK`) with customized voice fallback.
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

## 🧪 Testing

Run the automated backend API test suite:

```bash
npm test
```

---

## 🤝 Contributing & Community Roadmap

We welcome contributions from language learners, linguists, and developers! 

- 🌟 **Feature Roadmap:**
  - [x] 3D Flashcards & Jyutping Support
  - [x] Community REST API for Shared Decks
  - [ ] User Profile Registration & Public Creator Cards
  - [ ] Spaced Repetition Algorithm (Leitner / Anki SRS Integration)
  - [ ] Anki Deck `.apkg` Import & Export

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).
