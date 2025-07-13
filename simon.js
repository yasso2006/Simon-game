var game = [];
var user = [];
var level = 0;
started = false;
var gameColours = ["green", "red", "yellow", "blue"];
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});
function nextSequence() {
  user = [];
  level++;
   $("#level-title").text("Level " + level);
  var random = Math.floor(Math.random() * 4);
  var randomColour = gameColours[random];
  game.push(randomColour);
  $("#" + randomColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + randomColour + ".mp3");
  audio.play();
}
$(".btn").click(function () {
  var userColour = $(this).attr("id");
  user.push(userColour);
  $("#" + userColour).addClass("pressed");
  setTimeout(function () {
    $("#" + userColour).removeClass("pressed");
  }, 100);
  var audio = new Audio("sounds/" + userColour + ".mp3");
  audio.play();
  checkAnswer(user.length - 1);
});
function checkAnswer(currentLevel) {
  if (game[currentLevel] === user[currentLevel]) {
    if (user.length === game.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, press any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
  function startOver() {
    level = 0;
    game = [];
    started = false;
  }
}
