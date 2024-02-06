'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = 'o'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
    count: 60
}

var gBoard
let gCherryInterval

function onInit() {
    updateScore(0)
    gBoard = buildBoard()
    clearInterval(gIntervalGhosts)
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    playAgainModal()
    clearInterval(gCherryInterval)
    gCherryInterval = setInterval(pushCherry, 15000)
    document.querySelector('.in').innerText = 'you lost'
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }



        }
    }
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][8] = SUPERFOOD
    board[8][1] = SUPERFOOD

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
        gGame.count -= diff
        isVictory()
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    document.querySelector('.modal').style.display = 'block'
    gGame.count = 60
    gGame.isOn = false
}

function playAgainModal() {
    if (gGame.isOn = false) {
        document.querySelector('.modal').style.display = 'block'
    }
    if (gGame.isOn = true) {
        document.querySelector('.modal').style.display = 'none'
    }
}

function isVictory() {
    if (gGame.count <= 0) {
        document.querySelector('.in').innerText = 'you won!!!'
        gameOver()
    }
}

function getEmpIdx(board) {
    let emptyIdx = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyIdx.push({ i, j })
                // console.log(board)
            }


        }
    }
    if (emptyIdx.length === 0) return null

    const random = getRandomIntInclusive(0, emptyIdx.length - 1)
    return emptyIdx[random]
}

function pushCherry() {
    const emptyLocation = getEmpIdx(gBoard)
    if (!emptyLocation) return

    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation, CHERRY)

}