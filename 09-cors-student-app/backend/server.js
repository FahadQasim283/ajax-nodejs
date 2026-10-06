const express = require("express");
const cors = require("cors");

const app = express();
const students = [
    { id: 1, name: "Ali", city: "Lahore", age: 20 },
    { id: 2, name: "Usman", city: "Islamabad", age: 21 }
];

app.use(cors());
app.use(express.json());

app.get("/api/students", function (request, response) {
    response.json(students);
});

app.post("/api/students", function (request, response) {
    const student = request.body;

    if (!student.name || !student.city || student.age === undefined) {
        response.status(400).json({ message: "Name, city, and age are required." });
        return;
    }

    response.status(201).json({
        message: "Student received successfully",
        student: student
    });
});

app.listen(3004, function () {
    console.log("Student API running at http://localhost:3004");
});
