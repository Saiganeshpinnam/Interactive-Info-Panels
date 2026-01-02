# Technical Specification: Interactive Item Management

## Technical Context
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Communication**: Axios for HTTP requests.

## Technical Implementation Brief
- **State Management**: Use `useState` in `App.jsx` for the list of cards. Implement optimistic UI by updating the local state immediately and reverting on error.
- **Interaction**:
    - `HoverCard` handles `onContextMenu` (right-click) and `onTouchStart/End` (long-press 700ms).
    - `App` manages the visibility and position of `ContextMenu`.
- **Menu Actions**:
    - `View`: Opens a `ViewModal`.
    - `Pin`: PUT `/api/cards/:id` with `{ isPinned: !card.isPinned }`.
    - `Important`: PUT `/api/cards/:id` with `{ isImportant: !card.isImportant }`.
    - `Delete`: DELETE `/api/cards/:id`.
- **Responsive**: `ContextMenu` uses `fixed` positioning with `z-50`.

## Source Code Structure
- `frontend/src/App.jsx`: Main entry point, state management, API integration.
- `frontend/src/components/HoverCard.jsx`: Item display and interaction detection.
- `frontend/src/components/ContextMenu.jsx`: Popup menu UI.
- `frontend/src/components/ViewModal.jsx`: (New) Modal for viewing item details.

## Contracts

### Data Model (Mongoose)
```javascript
const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false }
});
```

### API Endpoints
- `GET /api/cards`: Returns `Card[]` sorted by `isPinned` and `_id`.
- `PUT /api/cards/:id`: Updates `isPinned` or `isImportant`.
- `DELETE /api/cards/:id`: Deletes the card.

## Delivery Phases
1. **Phase 1: Wiring and Context Menu**: Connect `App.jsx` to `HoverCard` and `ContextMenu`. Implement menu positioning and basic visibility.
2. **Phase 2: Actions and Optimistic UI**: Implement Pin, Mark Important, and Delete actions with optimistic updates.
3. **Phase 3: View Modal**: Implement the `ViewModal` component and "View" action.
4. **Phase 4: Robustness**: Add error handling (revert on failure) and ensure mobile/desktop consistency.

## Verification Strategy
- **Manual Verification**:
    - Right-click on desktop to open menu.
    - Long-press (700ms) on mobile/touch-emulation to open menu.
    - Check if "Pin" moves item to top (due to backend sorting on refresh).
    - Check if "Delete" removes item instantly.
    - Check if ESC/Outside-click closes menu.
- **Automated Verification**:
    - Run `npm run lint` in frontend.
    - Check browser console for Axios errors.
