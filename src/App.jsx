import "./App.css"
import {useState} from "react"
import {Square} from './components/Square.jsx'
import confetti from "canvas-confetti"

const TURNS = {
  X: "x",
  O: "o"
}
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function App() {
  const [board, setBoard] = useState(Array(9).fill(''))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)//true->winner, false->empate

  const checkWinner = (newBoard) => {
    WINNER_COMBOS.forEach(combo => {
      checkEndGame(newBoard)
      const [a, b, c] = combo
      if(
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]){
        
        confetti()
        return setWinner(newBoard[a])
      }
    })
    return null
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== '')
  }

  const updateBoard = (index) => {
    if(board[index] !== '') return
    if(winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    checkWinner(newBoard)
    if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame= () =>{
    setBoard(Array(9).fill(''))
    setTurn(TURNS.X)
    setWinner(null)
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
        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {winner ? 'Ganador:' : 'Empate'}
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button className="reset" onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }
      </main>
    </>
  )
}

export default App
