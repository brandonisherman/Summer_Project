/**
 * Toggles between three different forms, each with its own distinct fields and submit button.
 */
function showStreet() {

    document.getElementById("street").style.display = "initial";
    document.getElementById("ruralRoute").style.display = "none";
    document.getElementById("POBox").style.display = "none";
}

function showRural() {

    document.getElementById("street").style.display = "none";
    document.getElementById("ruralRoute").style.display = "initial";
    document.getElementById("POBox").style.display = "none";
}

function showPOBox() {

    document.getElementById("street").style.display = "none";
    document.getElementById("ruralRoute").style.display = "none";
    document.getElementById("POBox").style.display = "initial";

}