import { WINNER_COMBOS } from "../constants"

export const checkWinner = (newBoard) => {
for(const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if(
    newBoard[a] &&
    newBoard[a] === newBoard[b] &&
    newBoard[a] === newBoard[c]){
    
    return newBoard[a]
    }
}
return null
}

export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== '')
}