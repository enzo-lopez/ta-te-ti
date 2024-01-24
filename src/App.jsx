import {useState} from "react"
import {Square} from './components/Square.jsx'
import confetti from "canvas-confetti"
import { TURNS } from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameStorage } from "./storage/saveAndReset.js"
function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLS = window.localStorage.getItem('board')
    if(boardFromLS) return JSON.parse(boardFromLS)
    return Array(9).fill('')
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLS = window.localStorage.getItem('turn')
    return turnFromLS ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)//true->winner, false->empate

  const updateBoard = (index) => {
    if(board[index] !== '' || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({newBoard, newTurn})

    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame= () =>{
    setBoard(Array(9).fill(''))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <>
      <main className="board">
        <h1>Ta Te Ti</h1>
        <section className="game">
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          } 
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <button className="reset" onClick={resetGame}>Empezar de nuevo</button>
        <WinnerModal resetGame={resetGame} winner={winner}/>
      </main>
    </>
  )
}

export default App
