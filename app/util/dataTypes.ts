export enum BoardSquareState {
  EMPTY = " ",
  X = "X",
  O = "O",
}

export enum WinningStatus {
  DRAW = "DRAW",
  X = "X",
  O = "O",
  NO_WINNER = " ",
}

export interface BoardSquare {
  state: BoardSquareState;
  id: number;
}
