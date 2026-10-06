// Helper function to update event indicator
function setEventTag(eventName) {
    $("#activeEvent").text(eventName);
}

// 1. Core DOM manipulation on button click
$("#showName").click(function () {
    setEventTag("click (Button)");
    const name = $("#name").val().trim();

    if (name === "") {
        // Validation failure: show error card and shake input
        $("#message")
            .removeClass("success-card")
            .addClass("error-card")
            .text("Please enter a name.");

        $("#name").addClass("shake");
        setTimeout(() => $("#name").removeClass("shake"), 400);
        return;
    }

    // Success: build dynamic welcome card with avatar initial
    const initial = name.charAt(0).toUpperCase();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    $("#message")
        .removeClass("error-card")
        .addClass("success-card")
        .hide()
        .html(`
            <div class="greeting-avatar">${initial}</div>
            <strong>Welcome, ${name}!</strong>
            <span class="greeting-subtext">Active session started at ${currentTime}</span>
        `)
        .fadeIn(300);
});

// 2. Input Event: Live character counter & event tracking
$("#name").on("input", function () {
    const currentLength = $(this).val().length;
    $("#charCount").text(`${currentLength} char${currentLength === 1 ? "" : "s"}`);
    setEventTag("input (Typing)");
});

// 3. Keyboard Event: Press Enter to trigger Show Name
$("#name").on("keydown", function (e) {
    setEventTag(`keydown (${e.key})`);
    if (e.key === "Enter") {
        $("#showName").trigger("click");
    }
});

// 4. Quick preset chips (Click Event)
$(".chip").on("click", function () {
    const presetName = $(this).data("name");
    $("#name").val(presetName).trigger("input");
    setEventTag(`click (Preset: ${presetName})`);
    $("#showName").trigger("click");
});

// 5. Clear Button
$("#clearName").on("click", function () {
    $("#name").val("").trigger("input");
    $("#message").removeClass("success-card error-card").empty();
    setEventTag("click (Clear)");
    $("#name").focus();
});
