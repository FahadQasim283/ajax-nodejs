# Step 5: AJAX with a Public GET API

Run `index.html` with VS Code Live Server and click **Load products**.

### What this example demonstrates
1. **jQuery AJAX GET Request**: Sends an asynchronous request to DummyJSON via `$.ajax()`.
2. **Dynamic UI Rendering**: Iterates over `response.products` with `$.each()` and generates responsive product cards.
3. **Limit Selection**: Change the dropdown limit (5, 8, 12) to see dynamic query parameters in action.
4. **Live Search Filtering**: Filter loaded products instantly by name or category using the input event.
5. **Request State Feedback**: Visual loading, success, and error indicators.
