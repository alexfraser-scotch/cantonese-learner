# 🤝 Contributing to Cantonese Learner

Thank you for your interest in contributing to **Cantonese Learner (廣東話學習)**! We welcome contributions of all types—whether you are adding new vocabulary decks, fixing bugs, improving UI/UX, or enhancing documentation.

---

## 📜 Code of Conduct

Please maintain a welcoming, inclusive, and respectful environment for all contributors.

---

## 🚀 How to Contribute

### 1. Contributing Vocabulary Decks & Materials

You can contribute new Cantonese flashcard categories or decks directly via JSON or through the app:

1. **Vocabulary Schema:**
   Each word entry should follow this structure:
   ```json
   {
     "id": "unique-id",
     "word": "廣東話",
     "jyutping": "gwong2 dung1 waa2",
     "meaning": "Cantonese language",
     "example": "我好想學好廣東話。",
     "example_meaning": "I really want to learn Cantonese well.",
     "mastered": false,
     "favorite": false
   }
   ```

2. **Jyutping Standards:**
   - Please use standard **LSHK Jyutping (粵拼)** romanization with numerical tone numbers (1–6).
   - Ensure Traditional Cantonese characters (繁體中文) are used for words and example sentences.

---

### 2. Development Workflow

1. **Fork & Clone:**
   ```bash
   git clone https://github.com/alexfraser-scotch/cantonese-learner.git
   cd cantonese-learner
   ```

2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Run Tests Locally:**
   Make sure all tests pass before submitting your Pull Request:
   ```bash
   npm test
   ```

4. **Submit a Pull Request:**
   Push your branch to GitHub and create a Pull Request detailing your changes and features.

---

## 🐛 Reporting Bugs & Requesting Features

- Search existing GitHub Issues before opening a new one.
- Provide clear steps to reproduce any bug, including browser version and error logs if available.
