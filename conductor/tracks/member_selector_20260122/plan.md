# Implementation Plan - Track: Member Selection & Real API Integration

## Phase 1: Member Selector UI Implementation [checkpoint: 91e2944]
**Goal:** Replace the manual input field with a Trello-native style member selector dropdown.

- [x] Task: Create `MemberSelector` Component e9e0b0b
    - [x] Sub-task: Define Types for Member data (id, fullName, username, avatarUrl) based on Trello API. 212e258
    - [x] Sub-task: Create a mock version of the selector UI (Dropdown + Search Input + List) for visual testing. e9e0b0b
    - [x] Sub-task: Implement `MemberSelector` component using Trello-like styling. e9e0b0b
    - [x] Sub-task: Add unit tests for component rendering and selection interaction. e9e0b0b
- [x] Task: Integrate `MemberSelector` into Main View 63a5ae7
    - [x] Sub-task: Replace the existing input field in `SearchBar.tsx` (or `App.tsx`) with `MemberSelector`. 63a5ae7
    - [x] Sub-task: Wire up state management to handle the selected member object. 63a5ae7
- [x] Task: Conductor - User Manual Verification 'Phase 1: Member Selector UI Implementation' (Protocol in workflow.md) 91e2944

## Phase 2: Trello API Client & Data Fetching
**Goal:** Implement the logic to fetch real data from Trello, replacing mock data.

- [ ] Task: Update Trello Service (`src/services/trello.ts`)
    - [ ] Sub-task: Research and implement the specific Trello API call to fetch Board Members.
    - [ ] Sub-task: Research and implement the Trello API call to fetch Cards and Checklists (filtering logic may be needed here or client-side).
    - [ ] Sub-task: Update TypeScript interfaces in `src/types/trello.d.ts` to match real API responses.
- [ ] Task: Implement Data Fetching Logic (Lazy Loading)
    - [ ] Sub-task: Create a new hook or service function `useMemberChecklists(memberId)` that triggers the API call only when a member is selected.
    - [ ] Sub-task: Handle Loading and Error states in the UI.
    - [ ] Sub-task: Write integration tests for the data fetching logic (mocking the Trello API client).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Trello API Client & Data Fetching' (Protocol in workflow.md)

## Phase 3: End-to-End Integration & Polish
**Goal:** Connect the UI and API, ensuring the feature works as expected in the real environment.

- [ ] Task: Connect UI to Real API
    - [ ] Sub-task: Bind the `MemberSelector` to the real Board Members API.
    - [ ] Sub-task: Bind the Checklist Viewer to the real `useMemberChecklists` data.
    - [ ] Sub-task: Remove or deprecate `src/services/mock-data.ts`.
- [ ] Task: Final Polish
    - [ ] Sub-task: Ensure "Loading" indicators are visible and styled correctly during API fetches.
    - [ ] Sub-task: Verify error handling (e.g., if API fails).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: End-to-End Integration & Polish' (Protocol in workflow.md)