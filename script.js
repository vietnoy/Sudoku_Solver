const grid = document.getElementsByClassName('grid')[0]

for(let i = 0; i < 9; i++) {
    const row = document.createElement('div')
    row.className = 'row'
    for (let j = 0; j < 9; j++) {
        cell = document.createElement('input')
        cell.className = 'cell'
        cell.type = 'text'
        cell.id = `${i}${j}`
        cell.addEventListener('input',(e) => {
            [a,b] = e.target.id.split('')
            sudoku[a][b] = parseInt(e.target.value)
        })
        row.appendChild(cell)
    }
    grid.appendChild(row)
}

const sudoku = []
for (let i = 0; i < 9; i++) {
    sudoku[i] = []
    for(let j = 0; j < 9; j++) {
        sudoku[i][j] = 0
    }
}

const solve = document.querySelector('.solve')
const clear = document.querySelector('.clear')

function sudokuSolution() {
    function check(row,col,value) {
        for (let i = 0 ; i < 9; i++) {
            if (sudoku[i][col] == value) return false
        }
        for (let j = 0; j < 9; j++) {
            if (sudoku[row][j] == value) return false
        }
        startRow = parseInt(row/3)*3
        startCol = parseInt(col/3)*3
        for( let i = startRow; i < startRow + 3; i++){
            for(let j = startCol; j < startCol + 3; j++) {
                if (sudoku[i][j] == value) return false
            }
        }
        return true
    }
    function backtracking(row, col) {
        if (row == 8 && col == 9) return true
        if (col == 9) {
            row += 1
            col = 0
        }
        if (sudoku[row][col] != 0) {
            return backtracking(row, col + 1)
        }
        for (let i = 1; i <= 9; i++) {
            if (check(row, col, i)) {
                sudoku[row][col] = i
                if (backtracking(row, col + 1)) return true
                sudoku[row][col] = 0
            }
        }
        return false
    }
    if (backtracking(0, 0)) {
        generateRespone()
    }
}

const result = document.querySelector('.result-grid')
result.classList.add('hid')
const generateRespone = () => {
    result.classList.remove('hid')
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('div')
        row.className = 'result-row'
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div')
            cell.className = 'result-cell'
            cell.innerHTML = sudoku[i][j]
            row.appendChild(cell)
        }
        result.appendChild(row)
    }
}

const generateClear = () => {
    result.innerHTML = ''
    result.classList.add('hid')
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudoku[i][j] = 0
            document.getElementById(`${i}${j}`).value = ''
        }
    }
}

solve.addEventListener('click', sudokuSolution)
clear.addEventListener('click', generateClear)