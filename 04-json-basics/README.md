# Step 4: JSON Basics & Student Directory

Open `index.html` with VS Code Live Server (browsers usually block `fetch()` on `file://` URLs).

### What this example demonstrates
1. **Fetching Local JSON**: Uses vanilla `fetch("students.json")` and `.json()` parsing.
2. **Dynamic Card Generation**: Maps the array of student objects into styled student cards.
3. **Live Search Filtering**: Filter loaded students by name or city using the live `input` search event.
4. **Raw JSON Inspector**: Toggle the `{ } View Raw JSON` button to compare raw JSON structure with rendered DOM elements.
