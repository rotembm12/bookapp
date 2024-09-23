# Welcome to Lupa Book Project! 🎉
We are excited to have you on board!
Below you will find all the information you need to get started with the project.

# Project Guidelines

## 1. Understand the PRD
Before starting any task:
- Clarify edge cases and challenges.
- Implement all design states: hover, active, focus, disabled, etc.
- Start with the lowest breakpoint and ensure responsive behavior.
- Ensure cross-browser compatibility.
- Understand how the feature handles all scenarios, including errors.

## 2. Folder Structure
Adopt the `bulletproof-react` folder structure for a scalable and maintainable architecture.
(Details to be defined)

## 3. Writing Maintainable Code
- **Readable:** Your code should be understandable at a glance, even for junior developers.
- **Easy to Debug:** Provide clear error handling and logging.
- **Extendable:** Code should be modular, making future feature additions simple.
- **Performant:** Use techniques like lazy loading, code splitting, and caching.
- **Testing:** Each feature should have end-to-end tests for all primary paths.
  - If working on shared components/hooks, ensure:
    1. Documented types.
    2. Storybook showcase.
    3. Unit tests (Cypress recommended).
    4. Visual tests (TBD).
- **Linting:** Leave no linter or TypeScript errors before submitting PRs.
- **Error Handling:** Use `try-catch` and provide user-friendly messages.
- **Custom Code vs Libraries:** Evaluate based on the project's needs and discuss each case.
- **Comment Wisely:** Focus comments on the "why" rather than the "what."

## 4. Tech Debt
- **0 Tech Debt Policy:** Keep the codebase clean and maintainable at all times.

## 5. Git Workflow
- **Commits:**
  - Use small, logical units of work.
  - Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), e.g., `feat: add login page`, `fix: resolve crash on mobile`.
  - Create branches from JIRA tickets.
- **Pull Requests:**
  - Keep PRs small and focused on one issue or feature.
  - Before submitting:
    1. Fill out the PR template for reviewer context.
    2. Create a video walkthrough:
       - Start with Figma design comparisons.
       - Showcase your feature.
       - Explain your code from top to bottom.
  - Request reviews from both the tech lead and a teammate for knowledge sharing.

## 6. Code Reviews
- **First CR:** Will be live to ensure alignment with review expectations.
- **Review Standards:** Follow best practices for readability, maintainability, and performance.
- **Constructive Feedback:** Ask questions and offer feedback that improves the code quality.
- **Approval:** Only the reviewer can resolve conversations and approve the PR.

## 7. Communication & Collaboration
- **Tools:**
  - Use Slack for communication.
  - JIRA for task management.
- **JIRA Tickets:**
  - Ensure tickets are clear, with acceptance criteria and design references.
  - Update task status regularly.
- **Team Meetings:** TBD.
- **UX Questions:** Use the dedicated Slack channel for UX discussions.
