# Feature Specification: Interactive Item Management with Context Menu

## User Stories

### User Story 1 - Context Menu Interaction
**Acceptance Scenarios**:
1. **Given** a list of items, **When** a user long-presses an item for 700ms on mobile, **Then** a context menu appears at the touch location.
2. **Given** a list of items, **When** a user right-clicks an item on desktop, **Then** a context menu appears at the cursor location.
3. **Given** an open context menu, **When** the user clicks outside the menu or presses ESC, **Then** the menu closes.

### User Story 2 - Item Actions
**Acceptance Scenarios**:
1. **Given** a context menu for an item, **When** the user clicks "Pin", **Then** the item's pinned status is toggled in the UI immediately and updated in MongoDB.
2. **Given** a context menu for an item, **When** the user clicks "Mark Important", **Then** the item's important status is toggled in the UI immediately and updated in MongoDB.
3. **Given** a context menu for an item, **When** the user clicks "Delete", **Then** the item is removed from the list immediately and deleted from MongoDB.
4. **Given** a context menu for an item, **When** the user clicks "View", **Then** a modal opens showing the full details of the item.

### User Story 3 - Optimistic UI and Persistence
**Acceptance Scenarios**:
1. **Given** a network action (Pin/Important/Delete), **When** the action is initiated, **Then** the UI reflects the change before the server response is received.
2. **Given** a failed server update, **When** the error occurs, **Then** the UI reverts to the previous state and shows an error notification.

---

## Requirements
1. **Frontend**:
   - Implement long-press detection (700ms) for mobile.
   - Implement right-click support for desktop.
   - Context menu must include: View, Pin/Unpin, Mark/Unmark Important, Delete.
   - Use optimistic UI for all actions.
   - Implement a Modal for the "View" action.
2. **Backend**:
   - Ensure REST API endpoints exist for fetching, updating, and deleting cards. (Already exists in `backend/index.js`).
3. **General**:
   - Responsive design for both mobile and desktop.
   - Close menu on outside click or ESC key.

## Success Criteria
1. User can successfully toggle Pin/Important status and see immediate feedback.
2. User can delete an item and see it disappear instantly.
3. Long-press and right-click both trigger the same menu consistently.
4. Menu closes as expected when dismissed.
5. All changes persist in MongoDB after page refresh.
