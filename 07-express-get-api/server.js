const express = require("express");

const app = express();
const students = [
    { id: 1, name: "Ali", city: "Lahore" },
    { id: 2, name: "Usman", city: "Islamabad" },
    { id: 3, name: "Fahad", city: "Attock" }
];

app.get("/api/students", function (request, response) {
    response.json(students);
});

app.listen(3002, function () {
    console.log("Express GET API running at http://localhost:3002");
});
