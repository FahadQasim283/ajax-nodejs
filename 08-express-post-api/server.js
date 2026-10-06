const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/students", function (request, response) {
    const student = request.body;

    console.log("Received student:", student);
    response.json({
        message: "Student received successfully",
        student: student
    });
});

app.listen(3003, function () {
    console.log("Express POST API running at http://localhost:3003");
});
