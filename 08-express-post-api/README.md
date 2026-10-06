# Step 8: Express POST API

Install and start this step from its folder:

```powershell
npm install
npm start
```

Send JSON to `POST http://localhost:3003/api/students`. For example, use
Postman or this PowerShell command:

```powershell
Invoke-RestMethod -Uri http://localhost:3003/api/students -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"Ali","city":"Lahore","age":20}'
```

The server parses the JSON with `express.json()` and returns it in the
response. It does not permanently save data.

