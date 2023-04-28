// randomly show the pics
const images_layer1 = ['./src/camera1.gif', './src/dog1.gif', './src/football1.gif'];
const images_layer2 = ['./src/camera2.gif', './src/dog2.gif', './src/football2.gif'];
const images_layer3 = ['./src/camera3.gif', './src/dog3.gif', './src/football3.gif'];
const images_layer4 = ['./src/camera4.gif', './src/dog4.gif', './src/football4.gif'];
// Generate a random number between 0 and 2
const randomIndex = Math.floor(Math.random() * 3);
// Set the src attribute of the image element to a random image path
const img_layer1 = document.getElementById('GIF 1');
const img_layer2 = document.getElementById('GIF 2');
const img_layer3 = document.getElementById('GIF 3');
const img_layer4 = document.getElementById('GIF 4');
img_layer1.setAttribute('src', images_layer1[randomIndex]);
img_layer2.setAttribute('src', images_layer2[randomIndex]);
img_layer3.setAttribute('src', images_layer3[randomIndex]);
img_layer4.setAttribute('src', images_layer4[randomIndex]);

// Count Down

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let again = 1;

document.getElementById("time_count").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

startTimer();

function onTimesUp() {

    // clearInterval(timerInterval);
    timePassed = -1;
    timeLeft = TIME_LIMIT;
    timerInterval = null;
    remainingPathColor = COLOR_CODES.info.color;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `00:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(alert.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    } else if (timeLeft > alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(alert.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(info.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

// Slides Change
var slideInterval = setInterval(nextSlide, 31000);
function nextSlide() {
    var current = $('.flex--active').data('slide'),
        // get button data-slide
        next = (current + 1) % 4;

    $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
    $('.flex--active').addClass('animate--end');
    setTimeout(function() {
        $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
        $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
    }, 800);

    if (current === 3) {
        window.location.replace("./replay.html");
    }
}

// P5.JS For Exhibition

// // access the mic
// // let mic;
//
// // speech recognition object
// let myRec = new p5.SpeechRec();
// // allow partial recognition (faster, less accurate)
// myRec.interimResults = false;
// // do continuous recognition
// myRec.continuous = true;
//
// let word;
// let words = [];
// let textRec;
// let textPre = "";
//
// // for words print
// let blocks = [];
// let graphics;
// let letters = [];
// let single;
// let num = 0;
//
// // extention
// let amplitude = 0;
//
// function setup() {
//     let cnv = createCanvas(437, 800);
//     cnv.parent('container');
//     // mic = new p5.AudioIn();
//     // mic.start();
//     myRec.start();
//
//     // bind callback function to trigger when speech is recognized
//     myRec.onResult = getVolume;
//
//     // for words print
//     matter.init();
//     matter.changeGravity(0, -0.1);
//     platform_top = matter.makeBarrier(width / 2, 0, width, 100);
//     platform_bottom = matter.makeBarrier(width / 2, height, width, 100);
//     platform_left = matter.makeBarrier(0, height / 2, 5, height);
//     platform_right = matter.makeBarrier(width, height / 2, 5, height);
// }
//
// // add word ti blocks
// function makeWord(x, y, d) {
//     tSize = random(d / 2, d);
//     textSize(tSize);
//     let b = matter.makeSign(letters[num], x, y);
//     b.textSize = tSize;
//     blocks.push(b);
//     num++;
// }
//
// function draw() {
//     background(0);
//
//     startRecognize();
// }
//
// function startRecognize() {
//     background(0);
//     textFont("Shadows Into Light");
//
//     // convert the speech into string
//     if (myRec.resultValue == true) {
//         textRec = myRec.resultString;
//         words = split(textRec, " ");
//         // print(words);
//
//         // store words into the letters
//         if (textRec != textPre) {
//             // print('textRec:'+textRec);
//             for (let i = 0; i < words.length; i++) {
//                 append(letters, words[i]);
//                 // further work: decide the d depending on amplitude
//                 let d = random(width / 9, width / 5);
//                 let x = random(width / 2 - d / 2, width / 2 + d / 2);
//                 let y = random(height - d / 3, height - d / 2);
//                 makeWord(x, y, d);
//             }
//             // print(letters);
//         }
//         textPre = textRec;
//     }
//
//     printWords();
// }
//
// function printWords() {
//     for (let i = blocks.length - 1; i >= 0; i--) {
//         let b = blocks[i];
//         let p = b.body.position;
//         push();
//         translate(p.x, p.y, 0);
//         rotate(b.body.angle);
//         fill(255, 255, 255);
//         textAlign(CENTER, CENTER);
//         // textStyle(BOLD);
//         textSize(b.textSize);
//         text(b.text, 0, 0);
//         pop();
//     }
//
//     push();
//     let g = get();
//     clear();
//     background(0, 0, 0);
//     image(g, 0, 0);
//     pop();
// }
//
// function getVolume() {
//     // amplitude = mic.getLevel();
//     // print(`Amplitude: ${amplitude}`);
// }


// P5.JS for test
let blocks = [];
let graphics;
let letters_football = [
    ["A", "small", "elephant"],
    ["A", "cow", "A", "cow", "In", "the", "grass"],
    ["I", "think", "it's", "a", "football", "near", "the", "lake"],
    ["A", "football", "with", "a", "headphone", "on", "the", "playground"],
];
let letters_dog = [
    ["It", "likes", "a", "strange", "ghost"],
    ["A", "sad", "man", "In", "the", "church"],
    ["I", "see", "a", "cat", "and", "a", "butterfly"],
    ["A", "dog", "in", "the", "garden"],
];
let letters_camera = [
    ["Illusion", "in", "mind"],
    ["Ahh", "dancing", "in", "the", "club"],
    ["Camera", "and", "a", "bag"],
    ["Camera", "Cup", "of", "caffe", "and", "a", "cake"],
];

let word;
let layer = 0;
let num = 0;
let nowtime = 0;
let moments = [20, 18, 13, 8];
let triger = false;

function setup() {
    let cnv = createCanvas(437, 800);
    cnv.parent('container');
    frameRate(30);

    matter.init();
    matter.changeGravity(0, -0.1);
    platform_top = matter.makeBarrier(width / 2, 0, width, 100);
    platform_bottom = matter.makeBarrier(width / 2, height, width, 100);
    platform_left = matter.makeBarrier(0, height / 2, 5, height);
    platform_right = matter.makeBarrier(width, height / 2, 5, height);
}

function makeWord(x, y, d) {
    tSize = random(d / 2, d);
    textSize(tSize);
    let b;
    // data control
    if (randomIndex == 0) {
        if (letters_camera[layer][num] != undefined) {
            b = matter.makeSign(letters_camera[layer][num], x, y);
            b.textSize = tSize;
            blocks.push(b);
            num++;
        }
    } else if (randomIndex == 1) {
        if (letters_dog[layer][num] != undefined) {
            b = matter.makeSign(letters_dog[layer][num], x, y);
            b.textSize = tSize;
            blocks.push(b);
            num++;
        }
    } else if (randomIndex == 2) {
        if (letters_football[layer][num] != undefined) {
            b = matter.makeSign(letters_football[layer][num], x, y);
            b.textSize = tSize;
            blocks.push(b);
            num++;
        }
    }
}

function draw() {
    clear();
    textFont("Shadows Into Light");

    // time control
    if (nowtime % 900 == 0 && nowtime != 0) {
        nowtime = 0;
        layer++;
        num = 0;
        triger = false;
    }

    if (frameCount - layer * 900 == moments[layer] * 30) {
        triger = true;
    }

    if (triger == true) {
        if (frameCount % 30 == 0) {
            let d = random(width / 9, width / 5);
            let x = random(width / 2 - d / 2, width / 2 + d / 2);
            let y = random(height - d / 3, height - d / 2);
            makeWord(x, y, d);
        }
    }

    // print
    for (let i = blocks.length - 1; i >= 0; i--) {
        let b = blocks[i];
        let p = b.body.position;
        push();
        translate(p.x, p.y, 0);
        rotate(b.body.angle);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        // textStyle(BOLD);
        textSize(b.textSize);
        text(b.text, 0, 0);
        pop();
    }

    push();
    let g = get();
    clear();
    background(0, 0, 0);
    image(g, 0, 0);
    pop();

    nowtime++;
}
