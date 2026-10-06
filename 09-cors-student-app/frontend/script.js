const apiUrl = "http://localhost:3004/api/students";
let enrolledRoster = [];

// Helper function to render student roster
function renderRoster(students) {
    $("#students").html("");

    if (students.length === 0) {
        $("#students").html('<p style="text-align: center; color: #64748b; padding: 24px;">No students found matching search.</p>');
        return;
    }

    $.each(students, function (index, student) {
        const initials = student.name ? student.name.slice(0, 2).toUpperCase() : "ST";

        $("#students").append(`
            <div class="student-card" data-name="${(student.name || '').toLowerCase()}" data-city="${(student.city || '').toLowerCase()}">
                <div class="student-left">
                    <div class="student-avatar">${initials}</div>
                    <div class="student-details">
                        <h4>${student.name}</h4>
                        <p>📍 ${student.city}</p>
                    </div>
                </div>
                <div class="student-badges">
                    <span class="pill-id">ID: ${student.id}</span>
                    <span class="pill-age">${student.age} yrs</span>
                </div>
            </div>
        `);
    });
}

// 1. GET Request: Load students from backend API
$("#loadStudents").click(function () {
    const btn = $(this);
    btn.prop("disabled", true).text("⏳ Loading...");

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (students) {
            enrolledRoster = students;
            renderRoster(students);
            btn.prop("disabled", false).text("🔄 Refresh roster");
        },
        error: function () {
            $("#message")
                .removeClass("success")
                .addClass("error")
                .text("Could not load students. Is the backend server running on port 3004?");
            btn.prop("disabled", false).text("🔄 Load students");
        }
    });
});

// 2. POST Request: Submit new student to backend API
$("#addStudent").click(function () {
    const nameVal = $("#name").val().trim();
    const cityVal = $("#city").val().trim();
    const ageVal = $("#age").val();

    if (!nameVal || !cityVal || !ageVal) {
        $("#message")
            .removeClass("success")
            .addClass("error")
            .text("Please fill in all fields (Name, City, and Age).");
        return;
    }

    const student = {
        name: nameVal,
        city: cityVal,
        age: Number(ageVal)
    };

    const addBtn = $(this);
    addBtn.prop("disabled", true).text("⏳ Adding...");

    $.ajax({
        url: apiUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(student),
        success: function (response) {
            $("#message")
                .removeClass("error")
                .addClass("success")
                .text(response.message);

            // Clear input fields
            $("#name").val("");
            $("#city").val("");
            $("#age").val("");

            addBtn.prop("disabled", false).text("➕ Add student");

            // Automatically refresh the roster so new student shows up immediately
            $("#loadStudents").trigger("click");
        },
        error: function (error) {
            const message = error.responseJSON
                ? error.responseJSON.message
                : "Could not add student. Make sure backend is running.";
            $("#message")
                .removeClass("success")
                .addClass("error")
                .text(message);

            addBtn.prop("disabled", false).text("➕ Add student");
        }
    });
});

// 3. Keyboard Event: Press Enter inside any input to trigger Add Student
$("#name, #city, #age").on("keydown", function (e) {
    if (e.key === "Enter") {
        $("#addStudent").trigger("click");
    }
});

// 4. Input Event: Live Search / Filter on roster
$("#filterStudents").on("input", function () {
    const query = $(this).val().toLowerCase().trim();
    if (!enrolledRoster.length) return;

    const filtered = enrolledRoster.filter(function (s) {
        return (s.name && s.name.toLowerCase().includes(query)) ||
               (s.city && s.city.toLowerCase().includes(query));
    });

    renderRoster(filtered);
});
