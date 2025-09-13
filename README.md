# TechFix AI

**TechFix AI** is an AI-powered repair assistant designed for technicians and self-taught repairers.  
It aims to bridge the gap between raw schematics and actionable repair guidance.

---

## 🚀 Features (MVP & Planned)
- [x] Store and retrieve repair guides
- [ ] AI-driven fault diagnosis based on symptoms & current draw
- [ ] Smart schematic/board search
- [ ] Jumper way generator (alternative test/jumper points)
- [ ] Community repair logbook with searchable cases
- [ ] Component recognition from board images

---

## 🛠 Tech Stack
- **Frontend**: React + Tailwind (or Vite, depending on setup)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **AI/ML Layer**: OpenAI API (planned integration)

---

## 📂 Project Structure

techfix-ai/
├── src/ # Application source code
├── docs/ # Documentation
│ ├── specs/ # Feature specifications
│ ├── architecture/ # System diagrams and notes
│ ├── dev-log.md # Development progress log
│ └── decisions.md # Key architectural decisions
├── README.md # Project overview
├── CHANGELOG.md # Version history
└── .gitignore



---

## 📖 Documentation
- [Feature Specs](./docs/specs/)  
- [System Architecture](./docs/architecture/system-architecture.md)  
- [Development Log](./docs/dev-log.md)  
- [Decisions Log](./docs/decisions.md)  

---

## 🚧 Development Workflow
1. **Plan** → Write a spec in `/docs/specs/`.
2. **Build** → Code the feature in a feature branch.
3. **Test** → Manual or automated checks.
4. **Review** → Self-review or external review.
5. **Document** → Update `dev-log.md` and `README.md`.
6. **Release** → Update `CHANGELOG.md`.

---

## 📅 Progress Tracking
All progress is logged in [`/docs/dev-log.md`](./docs/dev-log.md).  
Major design decisions are recorded in [`/docs/decisions.md`](./docs/decisions.md).  

---

## 🤝 Contributing
Currently under **active development**.  
If you'd like to contribute ideas, suggestions, or test features, feel free to open an issue.  

---

## 📜 License
[MIT License](LICENSE) – free to use, modify, and share.

