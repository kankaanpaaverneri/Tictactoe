export enum BoardSquareState {
  EMPTY = " ",
  X = "X",
  O = "O",
}

export interface BoardSquare {
  state: BoardSquareState;
  id: number;
}
