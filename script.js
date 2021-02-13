const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

let timer = [0, 0, 0, 0];
let intervalTimer = null;
let timerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadinZero (time) {
    if(time <= 9) {
        time = `0${time}`
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = `${timer[0]}:${timer[1]}:${timer[2]}`
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = leadinZero(Math.floor((timer[3]/100)/60))
    timer[1] = leadinZero(Math.floor((timer[3]/100) - (timer[0] * 60)))
    timer[2] = leadinZero(Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length)
    if(textEntered == originText) {
        testWrapper.style.borderColor = '#429890';
        clearInterval(intervalTimer);
    } else {
        if(textEntered == originTextMatch) {
            testWrapper.style.borderColor = '#65CCf3';
        } else {
            testWrapper.style.borderColor = 'red';
        }
    }
    
}


// Start the timer:
function start() {
    let textAreaLength = testArea.value.length;
    if(textAreaLength === 0 && timerRunning !== true) {
        intervalTimer = setInterval(runTimer, 10);
        timerRunning = true;
    }
    
}


// Reset everything:
function resetFn() {
    clearInterval(intervalTimer);
    intervalTimer = null;
    testArea.value = '';
    testWrapper.style.borderColor = 'grey';
    timer = [0, 0, 0, 0];
    timerRunning = false;
    theTimer.innerHTML = `00:00:00`;
    
}


// Event listeners for keyboard input and the reset button:

testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup', spellCheck, false);
resetButton.addEventListener('click', resetFn, false);
