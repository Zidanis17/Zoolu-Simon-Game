let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0


$(document).keydown(function (event) { 
    if(level  === 0){
        nextSequence();   
    }
});

$(".btn").click(function(button){
    handler(button)
})

async function nextSequence(){
    level++
    $('h1').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    for(let button of gamePattern){
        await new Promise((resolve) => {
            setTimeout(() => {
                    $(`#${button}`).fadeOut(100).fadeIn(100)

                    playSound(button)
                    resolve();
                } , 1000)
            }
        )
    }
}

function handler(button){
    let userChosenColour = button.target.id;

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    let currentAnswerCorrect = checkCurrentAnswerCorrect(userClickedPattern.length - 1);
    
    console.log(userClickedPattern, gamePattern)
    if(currentAnswerCorrect){
        if(patternFinished()){
            userClickedPattern = [];
            nextSequence();        
        }
    }else{
        startOver();

        $("body").addClass("game-over");
        playSound('wrong');
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200)

    }
}

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(colorPressed){
    $(`#${colorPressed}`).addClass('pressed');

    setTimeout(() => {
        $(`#${colorPressed}`).removeClass('pressed');
    }, 100)
}

function patternFinished(){
    if(userClickedPattern.join('') === gamePattern.join('')){
        return true
    }else{
        return false
    }
}

function checkCurrentAnswerCorrect(i){
    console.log(userClickedPattern[i], gamePattern[i])
    if(userClickedPattern[i] === gamePattern[i]){
        return true
    }else{
        return false
    }
}

function startOver(){
    gamePattern = []
    userClickedPattern = []
    level = 0
}