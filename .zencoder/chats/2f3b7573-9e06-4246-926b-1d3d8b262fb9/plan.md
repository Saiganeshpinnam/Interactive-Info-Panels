# Feature development workflow

---

## Workflow Steps

### [x] Step: Requirements
...
Save the PRD into `c:\Users\Saiganesh Pinnam\OneDrive\Desktop\mernProject\.zencoder\chats\2f3b7573-9e06-4246-926b-1d3d8b262fb9/requirements.md`.

### [x] Step: Technical Specification
...
Save the spec to `c:\Users\Saiganesh Pinnam\OneDrive\Desktop\mernProject\.zencoder\chats\2f3b7573-9e06-4246-926b-1d3d8b262fb9/spec.md`.

### [x] Step: Implementation Plan
...
Format each task as

```
### [ ] Step: <task_name>
Task instructions
```

### [x] Step: Setup Context Menu State in App.jsx
- Import `ContextMenu` and `AnimatePresence` in `App.jsx`.
- Add state for `menuPosition` ({ x, y }), `selectedCard`, and `showMenu`.
- Create `handleContextMenu` function to set state and show menu.
- Update `HoverCard` mapping to pass `card` object and `onContextMenu`.
- Render `ContextMenu` component conditionally.

### [x] Step: Implement Menu Actions and Optimistic UI
- Create `handleMenuAction` in `App.jsx`.
- For 'pin' and 'important':
    - Update local `cards` state immediately.
    - Call backend PUT endpoint.
    - If error, revert local state and show alert.
- For 'delete':
    - Remove from local `cards` state immediately.
    - Call backend DELETE endpoint.
    - If error, restore local state and show alert.

### [x] Step: Create ViewModal Component
- Create `frontend/src/components/ViewModal.jsx` using `framer-motion` for transition.
- Component should display `title` and `description` of the selected card.
- Include a close button and handle ESC key.

### [ ] Step: Wire "View" Action
- Add state `showViewModal` in `App.jsx`.
- In `handleMenuAction`, if action is 'view', set `showViewModal` to true.
- Render `ViewModal` conditionally in `App.jsx`.

### [ ] Step: Final Polish and Mobile Testing
- Ensure `700ms` long-press works in `HoverCard`.
- Verify menu positioning on different screen sizes.
- Run `npm run lint` and fix any issues.

