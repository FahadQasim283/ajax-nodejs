$("#heading").css("color", "navy");

$("#showCount").click(function () {
    const studentCount = $(".student").length;
    const paragraphCount = $("p").length;

    $("#output").text(
        `There are ${studentCount} student paragraphs and ${paragraphCount} paragraphs.`
    );
});
