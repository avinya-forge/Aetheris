# Engineering Conventions

## Documentation & SSOT (Single Source Of Truth)
* **Hierarchy**: `README.md` (Vision) -> `docs/roadmap.md` (Epics) -> `docs/backlog.md` (Tasks).
* **Backlog Schema**: Every task must follow the schema: `[ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size`.

## Code Quality
* **Tests**: Every new component/file must have a corresponding `.test.js` file in the `tests/` directory.
* **Coverage**: Core data logic must aim for **>95% coverage**.
* **AI Integration**: Logic must use **Gemini 1.5 Flash** for high-speed summarization and **Extractive Synthesis** (no speculative storytelling).

## Git Workflow
* **Commits**: Granular, atomic commits. Avoid monolithic merges.
* **Phases**: Group development into Phases (Strategy, Implementation, UI/UX, Production).

## Skill Patterns injected from skills.sh
- project-management-pdlc
- software-engineering-sdlc
- data-engineering-etl
- devops-iac
- cloud-native-pwa
- ai-llm-fine-tuning
- frontend-webgl-mapbox
- security-zero-trust
- performance-edge-computing
- uiux-minimalist-vector
