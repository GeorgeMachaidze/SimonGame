
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userCilckedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//Click
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userCilckedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatedPress(userChosenColour);

  checkAnswer(userCilckedPattern.length-1);

});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userCilckedPattern[currentLevel]) {

    console.log("success");

    if (userCilckedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass("game-over");
    },2000)
    $('#level-title').text("Game Over, Press Any Key to Restart");

    startOver();
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();

  }
}


function nextSequence() {

  userCilckedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Button Flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}

function playSound(name) {
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}
//Animation
function animatedPress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

//Restart game
function startOver(){

  level = 0;
  gamePattern = [];
  started = false;

}
