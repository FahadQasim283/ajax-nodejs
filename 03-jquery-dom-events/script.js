$("#showName").click(function () {
    const name = $("#name").val().trim();

    if (name === "") {
        $("#message").text("Please enter a name.");
        return;
    }

    $("#message").html(`<strong>Welcome, ${name}!</strong>`);
});
