var sequence = [];
var csequence = [];
var level = 0;

function animatepress(number) {
    var colours = ["red", "yellow", "blue", "green"];
    $("." + colours[number]).addClass("pressed");
    setTimeout(function () {
        $("." + colours[number]).removeClass("pressed");
    }, 70);
}

function playsound(number) {
    var colours = ["red", "yellow", "blue", "green"];
    var song = new Audio("sounds/" + colours[number] + ".mp3");
    song.play();
}

function start() {
    sequence = []; // Reset the player's sequence at the start of each level
    var number = Math.floor(Math.random() * 4);
    level++;
    $("h1").text("Level " + level);
    csequence.push(number);
    animatepress(number);
    playsound(number);
    console.log("Game Sequence:", csequence);
}

function colourconverter(colour) {
    var colours = ["red", "yellow", "blue", "green"];
    var e = colours.indexOf(colour);
    console.log("User clicked:", colour, "which is index:", e);
    playsound(e);
    animatepress(e);
    sequence.push(e);
    checksequence(); // Check the sequence after each user click
}

function startover() {
    level = 0;
    csequence = [];
    sequence = [];
    $("h1").text("Press any key to restart the game");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $(document).one("keydown", function () {
        start(); // Restart the game when any key is pressed
    });
}

function checksequence() {
    console.log("Player Sequence:", sequence);
    console.log("Correct Sequence:", csequence);

    // Check if the latest entry matches the game sequence at the same position
    if (sequence[sequence.length - 1] !== csequence[sequence.length - 1]) {
        console.log("Sequences don't match");
        setTimeout(startover, 1000); // Restart the game if the sequences don't match
    } else if (sequence.length === csequence.length) {
        console.log("Sequences match");
        setTimeout(start, 1000); // Move to the next level if the sequence is complete and correct
    }
}

$(document).one("keydown", function () {
    start();
});

$(".btn").click(function () {
    var colour = $(this).attr("id");
    colourconverter(colour);
});









