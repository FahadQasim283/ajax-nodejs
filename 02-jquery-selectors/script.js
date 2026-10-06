// 1. Select by ID (#heading) and change style
$("#heading").css("color", "navy");

// 2. Click event handler to count matching elements
$("#showCount").click(function () {
    const studentCount = $(".student").length;
    const paragraphCount = $("p").length;

    $("#output").text(
        `There are ${studentCount} student paragraphs and ${paragraphCount} paragraphs.`
    );
});

// 3. Interactive Selector Spotlight Handlers
function clearAllHighlights() {
    $("#heading").removeClass("highlight-id");
    $("p").removeClass("highlight-class highlight-tag");
}

$("#highlightId").click(function () {
    clearAllHighlights();
    $("#heading").addClass("highlight-id");
});

$("#highlightClass").click(function () {
    clearAllHighlights();
    $(".student").addClass("highlight-class");
});

$("#highlightTag").click(function () {
    clearAllHighlights();
    $("p").addClass("highlight-tag");
});

$("#clearHighlights").click(function () {
    clearAllHighlights();
});

// 4. Dynamic DOM Addition: Append new student elements and trigger re-counts
function addNewStudent() {
    const nameInput = $("#newStudentName");
    const name = nameInput.val().trim();

    if (name === "") return;

    // Dynamically append new <p class="student"> element
    const newStudent = $(`<p class="student">${name}</p>`).hide();
    $("#elementsContainer").append(newStudent);
    newStudent.fadeIn(300);

    nameInput.val("");

    // Automatically refresh counts if output is visible
    if ($("#output").text() !== "") {
        $("#showCount").trigger("click");
    }
}

$("#addStudentBtn").click(addNewStudent);

// Keyboard event: Press Enter in the input to add student
$("#newStudentName").keypress(function (e) {
    if (e.which === 13) {
        addNewStudent();
    }
});
