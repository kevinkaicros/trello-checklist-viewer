# Implementation Plan: Setup MVP

## Phase 1: Infrastructure & Setup [checkpoint: 18f6855]
- [x] Task: Initialize Project Structure [6525be2]
    - [ ] Sub-task: Scaffold Vite + React + TypeScript project
    - [ ] Sub-task: Setup ESLint and Prettier
    - [ ] Sub-task: Configure Vitest for unit testing
- [x] Task: Trello Integration Setup [b1e2a7a]
    - [ ] Sub-task: Install Trello Power-Up Client library
    - [ ] Sub-task: Configure basic Power-Up manifest (index.html, capability handling)
    - [ ] Sub-task: Implement basic TrelloClient wrapper service
- [x] Task: Conductor - User Manual Verification 'Infrastructure & Setup' (Protocol in workflow.md) [18f6855]

## Phase 2: Core Logic Implementation (TDD) [checkpoint: 6f07862]
- [x] Task: Implement Data Fetching Logic [6f07862]
    - [ ] Sub-task: Write tests for fetching cards/checklists (mocked)
    - [ ] Sub-task: Implement Trello API calls to fetch relevant data
- [x] Task: Implement Filtering & Grouping Logic [6f07862]
    - [ ] Sub-task: Write tests for filtering by @username
    - [ ] Sub-task: Write tests for grouping by Label Name
    - [ ] Sub-task: Implement `filterAndGroupItems` utility function
- [x] Task: Conductor - User Manual Verification 'Core Logic Implementation (TDD)' (Protocol in workflow.md) [6f07862]

## Phase 3: UI Construction [checkpoint: fb54983]
- [x] Task: Build Search Component [fb54983]
    - [ ] Sub-task: Create SearchBar UI component
    - [ ] Sub-task: Handle user input state
- [x] Task: Build Checklist Display Components [fb54983]
    - [ ] Sub-task: Create ProjectGroup (Accordion/Header) component
    - [ ] Sub-task: Create ChecklistItem component with checkbox
- [x] Task: Integrate Logic with UI [fb54983]
    - [ ] Sub-task: Connect SearchBar to Filtering Logic
    - [ ] Sub-task: Render grouped results in the main view
- [x] Task: Conductor - User Manual Verification 'UI Construction' (Protocol in workflow.md) [fb54983]

## Phase 4: Interaction & Updates [checkpoint: e4f6f01]
- [x] Task: Implement Status Toggling [e4f6f01]
    - [ ] Sub-task: Write tests for toggle status function
    - [ ] Sub-task: Implement API call to update checklist item state in Trello
    - [ ] Sub-task: Optimistic UI update for immediate feedback
- [x] Task: Conductor - User Manual Verification 'Interaction & Updates' (Protocol in workflow.md) [e4f6f01]

## Phase 5: Final Polish [checkpoint: 6ee459f]
- [x] Task: Styling & Consistency Review [6ee459f]
    - [ ] Sub-task: Ensure UI matches Trello native styles
    - [ ] Sub-task: Verify alphabetical sorting of groups
- [x] Task: Final Testing [6ee459f]
    - [ ] Sub-task: Run full suite of unit tests
    - [ ] Sub-task: Manual smoke test of the full flow
- [x] Task: Conductor - User Manual Verification 'Final Polish' (Protocol in workflow.md) [6ee459f]
