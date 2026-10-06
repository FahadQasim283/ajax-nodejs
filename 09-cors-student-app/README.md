# Step 9: Complete CORS student application

This is the first step with separate frontend and backend folders. Start the
backend first:

```powershell
cd backend
npm install
npm start
```

In a second terminal, open `frontend` with VS Code Live Server. Click
**Load students**, then submit the form. The backend runs on port `3004` and
the frontend runs on a different origin, so `cors()` allows the AJAX requests.

The POST example demonstrates request/response flow only; it does not save
students permanently.

