# Implementation Plan: Setup MVP

## Phase 1: Infrastructure & Setup
- [~] Task: Initialize Project Structure
    - [ ] Sub-task: Scaffold Vite + React + TypeScript project
    - [ ] Sub-task: Setup ESLint and Prettier
    - [ ] Sub-task: Configure Vitest for unit testing
- [ ] Task: Trello Integration Setup
    - [ ] Sub-task: Install Trello Power-Up Client library
    - [ ] Sub-task: Configure basic Power-Up manifest (index.html, capability handling)
    - [ ] Sub-task: Implement basic TrelloClient wrapper service
- [ ] Task: Conductor - User Manual Verification 'Infrastructure & Setup' (Protocol in workflow.md)

## Phase 2: Core Logic Implementation (TDD)
- [ ] Task: Implement Data Fetching Logic
    - [ ] Sub-task: Write tests for fetching cards/checklists (mocked)
    - [ ] Sub-task: Implement Trello API calls to fetch relevant data
- [ ] Task: Implement Filtering & Grouping Logic
    - [ ] Sub-task: Write tests for filtering by @username
    - [ ] Sub-task: Write tests for grouping by Label Name
    - [ ] Sub-task: Implement `filterAndGroupItems` utility function
- [ ] Task: Conductor - User Manual Verification 'Core Logic Implementation (TDD)' (Protocol in workflow.md)

## Phase 3: UI Construction
- [ ] Task: Build Search Component
    - [ ] Sub-task: Create SearchBar UI component
    - [ ] Sub-task: Handle user input state
- [ ] Task: Build Checklist Display Components
    - [ ] Sub-task: Create ProjectGroup (Accordion/Header) component
    - [ ] Sub-task: Create ChecklistItem component with checkbox
- [ ] Task: Integrate Logic with UI
    - [ ] Sub-task: Connect SearchBar to Filtering Logic
    - [ ] Sub-task: Render grouped results in the main view
- [ ] Task: Conductor - User Manual Verification 'UI Construction' (Protocol in workflow.md)

## Phase 4: Interaction & Updates
- [ ] Task: Implement Status Toggling
    - [ ] Sub-task: Write tests for toggle status function
    - [ ] Sub-task: Implement API call to update checklist item state in Trello
    - [ ] Sub-task: Optimistic UI update for immediate feedback
- [ ] Task: Conductor - User Manual Verification 'Interaction & Updates' (Protocol in workflow.md)

## Phase 5: Final Polish
- [ ] Task: Styling & Consistency Review
    - [ ] Sub-task: Ensure UI matches Trello native styles
    - [ ] Sub-task: Verify alphabetical sorting of groups
- [ ] Task: Final Testing
    - [ ] Sub-task: Run full suite of unit tests
    - [ ] Sub-task: Manual smoke test of the full flow
- [ ] Task: Conductor - User Manual Verification 'Final Polish' (Protocol in workflow.md)
