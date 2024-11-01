import { Text, View, Button, StyleSheet } from "react-native";
import { getHttp, postHttp, postMarks } from "./http/http";
import {
  getBoardPath,
  updateBoardPath,
  resetBoardPath,
  setMarksPath,
} from "./http/url";
import { useEffect, useState } from "react";
import { BoardSquare, BoardSquareState } from "./util/dataTypes";
import { SelectMark } from "./component/SelectMark";
import Board from "./component/Board";
import { Winner } from "./component/Winner";

export enum WinningStatus {
  DRAW = "DRAW",
  X = "X",
  O = "O",
  NO_WINNER = " ",
}

interface JSONData {
  board: BoardSquare[][];
  winner: WinningStatus;
}

export interface Marks {
  playerMark: BoardSquareState;
  programMark: BoardSquareState;
}

export default function Index() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [board, setBoard] = useState<BoardSquare[][] | undefined>();

  const [marks, setMarks] = useState<Marks>({
    playerMark: BoardSquareState.EMPTY,
    programMark: BoardSquareState.EMPTY,
  });

  const [winner, setWinner] = useState<WinningStatus>(WinningStatus.NO_WINNER);

  async function getBoard() {
    const boardItem: JSONData = await getHttp(getBoardPath);
    if (!boardItem.board) {
      console.error("Failed to get board data");
      setError("Failed to retrieve board");
      setLoading(() => false);
    }

    setBoard(boardItem.board);
    setWinner(() => boardItem.winner);
    setLoading(() => false);
  }

  function onSelectMark(id: BoardSquareState) {
    setMarks(() => {
      return {
        playerMark: id,
        programMark:
          id === BoardSquareState.X ? BoardSquareState.O : BoardSquareState.X,
      };
    });
  }

  function isDuplicatePress(id: number): boolean {
    if (!board) return false;

    for (let column = 0; column < board.length; column++) {
      for (let row = 0; row < board[column].length; row++) {
        const currentSquare = board[column][row];
        if (
          id === currentSquare.id &&
          currentSquare.state !== BoardSquareState.EMPTY
        )
          return true;
      }
    }
    return false;
  }

  async function onPressSquare(id: number) {
    if (isDuplicatePress(id)) return;
    const result = await postHttp(updateBoardPath, id, marks.playerMark);
    getBoard();
  }
  async function onPressReset() {
    const boardItem: { winner: WinningStatus } = await getHttp(resetBoardPath);
    setWinner(boardItem.winner);
    setMarks(() => {
      return {
        playerMark: BoardSquareState.EMPTY,
        programMark: BoardSquareState.EMPTY,
      };
    });
    setBoard(() => undefined);
  }

  useEffect(() => {
    async function sendMarks() {
      const result = await postMarks(setMarksPath, marks);
      await getBoard();
    }
    if (marks.playerMark !== BoardSquareState.EMPTY) sendMarks();
  }, [marks]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View>{error && <Text>{error}</Text>}</View>
      <View>{loading && <Text>Loading</Text>}</View>
      <View>
        <Winner onPressNewGame={onPressReset} winner={winner} />
        {marks.playerMark === BoardSquareState.EMPTY && (
          <View>
            <SelectMark onSelectMark={onSelectMark} />
          </View>
        )}
        {board && (
          <View>
            <Board board={board} onPressSquare={onPressSquare} />
            <Button onPress={onPressReset} title="Reset" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
