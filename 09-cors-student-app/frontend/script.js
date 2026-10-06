const apiUrl = "http://localhost:3004/api/students";

$("#loadStudents").click(function () {
    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (students) {
            $("#students").html("");

            $.each(students, function (index, student) {
                $("#students").append(`
                    <p>
                        ID: ${student.id} | Name: ${student.name}
                        | City: ${student.city} | Age: ${student.age}
                    </p>
                `);
            });
        },
        error: function () {
            $("#message").text("Could not load students.");
        }
    });
});

$("#addStudent").click(function () {
    const student = {
        name: $("#name").val().trim(),
        city: $("#city").val().trim(),
        age: Number($("#age").val())
    };

    $.ajax({
        url: apiUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(student),
        success: function (response) {
            $("#message").text(response.message);
        },
        error: function (error) {
            const message = error.responseJSON
                ? error.responseJSON.message
                : "Could not add student.";
            $("#message").text(message);
        }
    });
});
