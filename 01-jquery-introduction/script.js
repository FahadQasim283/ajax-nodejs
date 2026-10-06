// 1. Select element with jQuery and update its text (Core demonstration)
const heading = $("#heading");

heading.text("Hello from jQuery");
console.log("The heading was selected with jQuery:", heading.text());

// Helper function to log events to the on-screen console
function logEvent(action, detail) {
    const time = new Date().toLocaleTimeString();
    const logItem = $(`
        <li class="log-item">
            <span class="time">[${time}]</span>
            <span class="action">${action}:</span> ${detail}
        </li>
    `);
    $("#eventLog").prepend(logItem);
}

// Log initial selection
logEvent("jQuery Init", '$("#heading").text("Hello from jQuery")');

// 2. Input & Keyboard Events: Update heading text live as user types
$("#customText").on("input keyup", function (e) {
    const newText = $(this).val();
    if (newText.trim() === "") {
        heading.text("Hello from jQuery");
    } else {
        heading.text(newText);
    }
    logEvent("Keyboard Event", `Event: ${e.type} | Value: "${newText}"`);
});

// Reset button
$("#resetHeading").on("click", function () {
    $("#customText").val("");
    heading.text("Hello from jQuery");
    logEvent("Click Event", "Heading reset to default");
});

// 3. Mouse Events: Hover & Click on heading box
const colors = ["#312e81", "#0284c7", "#059669", "#7c3aed", "#db2777"];
let colorIndex = 0;

$("#headingContainer")
    .on("mouseenter", function () {
        $(this).addClass("highlight");
        logEvent("Mouse Event", "mouseenter on #headingContainer");
    })
    .on("mouseleave", function () {
        $(this).removeClass("highlight");
        logEvent("Mouse Event", "mouseleave from #headingContainer");
    })
    .on("click", function () {
        colorIndex = (colorIndex + 1) % colors.length;
        heading.css("color", colors[colorIndex]);
        logEvent("Click Event", `Heading color changed to ${colors[colorIndex]}`);
    });

// 4. jQuery Animation Effects
$("#fadeToggleBtn").on("click", function () {
    $("#headingContainer").fadeToggle(300, function () {
        logEvent("Animation", "fadeToggle completed");
    });
});

$("#slideToggleBtn").on("click", function () {
    $("#headingContainer").slideToggle(300, function () {
        logEvent("Animation", "slideToggle completed");
    });
});

$("#colorCycleBtn").on("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    heading.css("color", colors[colorIndex]);
    logEvent("jQuery .css()", `Applied color: ${colors[colorIndex]}`);
});

// Clear log button
$("#clearLogBtn").on("click", function () {
    $("#eventLog").empty();
});
