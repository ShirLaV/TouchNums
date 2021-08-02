
var gNums;
var nextNum = 1;
var gBoardSize = 16;
var gStartTime;
var gTimerInterval;

function init() {
    gNums = createNums(gBoardSize);
    console.log(gNums);
    renderBoard();
}
function newGame() {
    nextNum = 1;
    var elPSpan = document.querySelector('p span');
    elPSpan.innerText = nextNum;
    clearInterval(gTimerInterval);
    document.querySelector('.timer').innerHTML='time: 00:000'
    init();
}
function renderBoard() {
    shuffle(gNums);
    var strHTML = '';
    var tableLength = Math.sqrt(gNums.length)
    for (i = 0; i < tableLength; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < tableLength; j++) {
            var num = drawNum();
            strHTML += `<td style="border-radius: 10px;" class="cell${num}" onclick="cellClicked(${num})">${num}</td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}
function cellClicked(clickedNum) {
    // console.log('gboardsize', gBoardSize)
    // console.log('nextnum', nextNum)
    if (nextNum === clickedNum) {
        if (clickedNum === 1) {
            gStartTime = new Date();
            gTimerInterval = setInterval(renderTimer, 10);
        }
        else if (nextNum === +gBoardSize) {
            clearInterval(gTimerInterval);
        }
        var elCell = document.querySelector('.cell' + clickedNum);
        elCell.classList.add('clicked');
        nextNum++
        var elPSpan = document.querySelector('p span');
        elPSpan.innerText = (nextNum <= gBoardSize) ? nextNum : 'complete!';

    }
}
function chooseBoardSize(elButton) {
    gBoardSize = elButton.getAttribute('data-inside');
    console.log('gBoardSize', gBoardSize)
    newGame();
}
function renderTimer() {
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - gStartTime);
    var sec = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();
    document.querySelector('.timer').innerHTML = 'Time: ' + (sec > 9 ? sec : '0' + sec) + ':' +
        (ms > 99 ? ms : ms > 9 ? '0' + ms : '00' + ms);
}
function createNums(length) {
    var nums = [];
    for (var i = 0; i < length; i++) {
        nums.push(i + 1);
    }
    return nums;
}
function drawNum() {
    return gNums.pop()
}
function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(1, items.length);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}