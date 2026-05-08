# SMB AI Chatbot Widget

This is a dummy AI chatbot widget inspired by the design in concept-a.html. It is implemented as a floating React component (`ChatWidget.tsx`) and can be added to any page in the app.

## Features
- Floating chat button and panel UI, styled to match the concept-a design
- Demo quick replies and placeholder bot responses
- Message history with user/bot distinction
- Responsive and animated
- No backend or AI integration yet (UI only)

## Usage
1. Import and add the widget to your main layout or page:

```tsx
import { ChatWidget } from "@/components/chat/ChatWidget";

// ...
<ChatWidget />
```

2. The widget will appear in the bottom right of the screen.

## Future AI Integration
- Replace the demoReplies logic in `ChatWidget.tsx` with real API calls to your AI backend.
- Add authentication, context, and business logic as needed.

---

**Design and code based on concept-a.html.**
