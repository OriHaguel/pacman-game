'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (gPacman.isSuper === true) {
        if (nextCell === SUPERFOOD)
            return
        if (nextCell === GHOST) {
            var deletedGhostIdx = removeGhost(nextLocation)
            var deletedGhost = gGhosts.splice(deletedGhostIdx, 1)[0]
            if (deletedGhost)
                setTimeout(() => {
                    gGhosts.push(deletedGhost)
                }, 5000)
        }
    }

    if (nextCell === GHOST && gPacman.isSuper === false) {
        gameOver()
        return
    }

    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) {
        updateScore(10)
        console.log(gGame.count)
    }

    if (nextCell === SUPERFOOD) {
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
        }, 5000)

    }

    getEmpIdx(gBoard)
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    renderCell(nextLocation, PACMAN)

}

function removeGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (nextLocation.i === gGhosts[i].location.i && nextLocation.j === gGhosts[i].location.j) {
            return i
        }
    }
    return
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }

    return nextLocation
}