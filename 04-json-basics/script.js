let loadedStudents = [];

// 1. Fetch JSON and render student cards
document.querySelector("#showStudents").addEventListener("click", function () {
    const showBtn = document.querySelector("#showStudents");
    showBtn.textContent = "⏳ Loading...";
    showBtn.disabled = true;

    fetch("students.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not load students.json (${response.status})`);
            }

            return response.json();
        })
        .then((students) => {
            console.log("First student's name:", students[0].name);
            loadedStudents = students;

            renderStudents(students);

            // Populate Raw JSON viewer
            const jsonContent = document.querySelector("#jsonContent");
            if (jsonContent) {
                jsonContent.textContent = JSON.stringify(students, null, 2);
            }

            showBtn.textContent = "✓ Students Loaded";
            setTimeout(() => {
                showBtn.textContent = "🔄 Refresh students";
                showBtn.disabled = false;
            }, 1000);
        })
        .catch((error) => {
            document.querySelector("#students").textContent = error.message;
            showBtn.textContent = "❌ Failed";
            showBtn.disabled = false;
        });
});

// Render helper function creating student cards
function renderStudents(students) {
    const container = document.querySelector("#students");

    if (students.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No students found matching your search.</p>';
        return;
    }

    const list = students
        .map((student) => `
            <div class="student-card" data-name="${student.name.toLowerCase()}" data-city="${student.city.toLowerCase()}">
                <div class="student-avatar">${student.name.slice(0, 2).toUpperCase()}</div>
                <div class="student-info">
                    <div class="student-header">
                        <span class="student-id">ID: ${student.id}</span>
                    </div>
                    <strong class="student-name">${student.name}</strong>
                    <span class="student-city">📍 ${student.city}</span>
                </div>
            </div>
        `)
        .join("");

    container.innerHTML = list;
}

// 2. Input Event: Live Search / Filter
document.querySelector("#searchInput").addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase().trim();
    if (!loadedStudents.length) return;

    const filtered = loadedStudents.filter((student) =>
        student.name.toLowerCase().includes(query) ||
        student.city.toLowerCase().includes(query)
    );

    renderStudents(filtered);
});

// 3. Toggle Raw JSON Panel
document.querySelector("#toggleJsonBtn").addEventListener("click", function () {
    const jsonViewer = document.querySelector("#jsonViewer");
    const isVisible = jsonViewer.style.display === "block";

    if (isVisible) {
        jsonViewer.style.display = "none";
        this.textContent = "{ } View Raw JSON";
    } else {
        jsonViewer.style.display = "block";
        this.textContent = "✕ Hide Raw JSON";
    }
});
