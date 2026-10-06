document.querySelector("#showStudents").addEventListener("click", function () {
    fetch("students.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not load students.json (${response.status})`);
            }

            return response.json();
        })
        .then((students) => {
            console.log("First student's name:", students[0].name);

            const list = students
                .map((student) => `<p>${student.id} - ${student.name} - ${student.city}</p>`)
                .join("");

            document.querySelector("#students").innerHTML = list;
        })
        .catch((error) => {
            document.querySelector("#students").textContent = error.message;
        });
});
