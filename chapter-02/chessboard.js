function chessboard(size) {
  let board = '';
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      board += col % 2 !== row % 2 ? '#' : ' ';
    }
    board += '\n';
  }

  return board;
}

console.log(chessboard(8));
console.log(chessboard(16));
console.log(chessboard(120));
