'use strict'



var gBoard
var gInterval
var countMoves = 0
var gIsPerson
var gIsValid = false

function init() {
    //create empty board=model
    gBoard = createBoard()
    console.table(gBoard);
    //render empty board-dom
    renderBoard(gBoard)
    document.querySelector('.restart').classList.add('hidden')
    document.querySelector('h2').innerText = '';
    countMoves = 0
    // first by randNum
    gIsPerson = (Math.random() > 0.5) ? false : true
    gIsValid = false
    gInterval = setInterval(playGame, 1000)
}



function playGame() {
    //function that calls func computer move
    if (!gIsPerson) computerMove()
    //function that calls func person move
    document.querySelector('.td').addEventListener("click", personMove);

    if (countMoves >= 8) {
        //call function restart
        document.querySelector('.restart').classList.remove('hidden')
        clearInterval(gInterval)
    }
}



function restart() {
    init()
}



function checkVictory(symbol, idxI, idxJ) {
    if (countRow(symbol, idxI) || countCol(symbol, idxJ) || primeDiagonal(symbol) || secondDiagonal(symbol)) return true
    return false
}

function countRow(symbol, idxI) {
    for (var i = 0; i < 3; i++) {
        if (gBoard[idxI][i] !== symbol) return false
    }
    return true
}

function countCol(symbol, idxJ) {
    for (var i = 0; i < 3; i++) {
        if (gBoard[i][idxJ] !== symbol) return false
    }
    return true
}

function primeDiagonal(symbol) {
    for (var i = 0; i < 3; i++) {
        if (gBoard[i][i] !== symbol) return false
    }
    return true
}

function secondDiagonal(symbol) {
    for (var i = 0; i < 3; i++) {
        if (gBoard[i][2 - i] !== symbol) return false
    }
    return true
}

function personMove(elCell, idxI, idxJ) {
    console.log(elCell);
    //update the model
    gBoard[idxI][idxJ] = 'X'
    console.table(gBoard)
    //update the dom
    elCell.innerText = 'X'
    countMoves++
    if (checkVictory('X', idxI, idxJ)) {
        console.log('person winns!!!');
        document.querySelector('h2').innerText = 'You win!';
        countMoves = 9
    }
    gIsPerson = !gIsPerson
}



function computerMove() {
    //2 random number, check if empty, if so-put o
    gIsValid = false
    while (!gIsValid) {
        var idxI = getRandomInt(0, 2)
        // console.log('idxI', idxI);
        var idxJ = getRandomInt(0, 2)
        // console.log('idxJ', idxJ);
        var cell = gBoard[idxI][idxJ]
        if (!cell) {
            gBoard[idxI][idxJ] = 'O' //model
            var elCell = document.querySelector(`[data-i="${idxI}"][data-j="${idxJ}"]`)
            elCell.innerText = 'O' //DOM
            countMoves++
            gIsValid = true
        } else continue
    }
    gIsPerson = !gIsPerson
    if (checkVictory('O', idxI, idxJ)) {
        console.log('computer winns!!!');
        document.querySelector('h2').innerText = 'Computer win!';
        countMoves = 9
    }

}



function createBoard() {
    var board = []
    for (var i = 0; i < 3; i++) {
        board[i] = []
        for (var j = 0; j < 3; j++) {
            board[i][j] = ''
        }
    }
    return board
}




function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < 3; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < 3; j++) {
            var cell = board[i][j]
            strHtml += `<td class="td" data-i="${i}" data-j="${j}"   onclick="personMove(this, ${i}, ${j})"> ${cell}</td>`
        }
        strHtml += `<tr>`
    }
    // console.log('strHtml', strHtml);
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHtml
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}




// function randomCell() {
//     while (!gIsValid) {
//         idxI = getRandomInt(0, 3)
//         idxJ = getRandomInt(0, 3)
//         if (!gBoard[idxI][idxJ]) return
//     }
// }

// function checkIfEmpty(idxI, idxJ) {
//     if (gBoard[idxI][idxJ] === '') return true
//     return false
// }