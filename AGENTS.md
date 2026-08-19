# 🇭🇰 Cantonese Learner - Agent Instructions & Rules

Whenever the user says **"continuous developing"**, **"dev"**, or **"next iteration"**, automatically activate and execute the following full-stack development workflow:

---

## 🔄 Development & Iteration Workflow

1. **Repository Audit:**
   - Inspect existing files (`index.html`, `app.js`, `server.js`, `styles.css`, `package.json`, `README.md`, `test/*.test.js`, and `.github/workflows/ci.yml`).
   - Evaluate codebase maturity, UI features, backend API capabilities, unit test coverage, and open-source readiness.

2. **Web Research & Inspiration:**
   - Search the web for modern features in Cantonese learning apps (Jyutping pronunciation tools, Spaced Repetition/SRS algorithms, Web Speech API audio, and crowdsourced flashcard decks).
   - Search open-source standards to ensure the repo meets best practices for OpenAI/GitHub maintainer programs.

3. **Strategic Focus (2 Core Pillars):**
   - **Pillar A (Community & Crowdsourcing):** Evolve the site so public internet users can create accounts/profiles, publish custom vocabulary decks, contribute sample sentences, and vote/favorite community materials.
   - **Pillar B (OpenAI Program Eligibility):** Enhance open-source governance, automated unit/E2E tests (`npm test`), GitHub Actions CI/CD pipelines, issue/PR templates, and clean modular code.

4. **Action Plan & Implementation:**
   - Propose a prioritized, 3-step action plan for the current session.
   - Execute code/documentation edits, run `npm test` to verify everything passes, and provide a summary of the accomplishments.

---

## ⚡ Autonomous Execution & Command Approval

- **Default Allow / No Approval Prompting:** All commands (`run_command`), test executions (`npm test`), git operations (`git add`, `git commit`, `git push`), and file modifications are pre-approved and should be executed proactively and autonomously without pausing to ask for permission.

