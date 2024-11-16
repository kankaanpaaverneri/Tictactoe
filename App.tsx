import { Text, View, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getHttp, postHttp, postMarks } from "./http/http";
import {
  getBoardPath,
  updateBoardPath,
  resetBoardPath,
  setMarksPath,
} from "./http/url";
import { useEffect, useState } from "react";
import { BoardSquare, BoardSquareState, WinningStatus } from "./util/dataTypes";
import { SelectMark } from "./component/SelectMark";
import Board from "./component/Board";
import Winner from "./component/Winner";
import { defaultGradientColors } from "./util/linearGradient";
import { Marks, JSONData } from "./util/dataTypes";

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [board, setBoard] = useState<BoardSquare[][] | undefined>();
  const [wait, setWait] = useState<boolean>(false);

  const [marks, setMarks] = useState<Marks>({
    playerMark: BoardSquareState.EMPTY,
    programMark: BoardSquareState.EMPTY,
  });

  const [winner, setWinner] = useState<WinningStatus>(WinningStatus.NO_WINNER);

  async function getBoard() {
    const boardItem: JSONData = await getHttp(getBoardPath, setError);
    if (!boardItem.board) {
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

    if (wait) return;

    setWait(() => true);

    const result = await postHttp(
      updateBoardPath,
      id,
      marks.playerMark,
      setError,
    );
    await getBoard();
    setWait(() => false);
  }
  async function onPressReset() {
    const boardItem: { winner: WinningStatus } = await getHttp(
      resetBoardPath,
      setError,
    );
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
    async function resetBoard() {
      await getHttp(resetBoardPath, setError);
    }
    resetBoard();
  }, []);

  useEffect(() => {
    async function sendMarks() {
      setLoading(() => true);
      const result = await postMarks(setMarksPath, marks, setError);
      await getBoard();
      setLoading(() => false);
    }
    if (marks.playerMark !== BoardSquareState.EMPTY) sendMarks();
  }, [marks]);

  return (
    <LinearGradient
      colors={defaultGradientColors}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <View>{loading && <Text style={styles.loadingText}>Loading</Text>}</View>

      <View>
        <Winner
          marks={marks}
          board={board}
          onPressNewGame={onPressReset}
          winner={winner}
        />
        {marks.playerMark === BoardSquareState.EMPTY && (
          <View>
            <SelectMark onSelectMark={onSelectMark} />
          </View>
        )}
        {board && (
          <View>
            <View style={styles.boardContainer}>
              <Board board={board} onPressSquare={onPressSquare} />
            </View>
            <View style={styles.resetButtonContainer}>
              <Pressable onPress={onPressReset}>
                <Text style={styles.resetButtonText}>Restart</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <View style={styles.errorContainer}>
        {error !== "" && <Text style={{ color: "white" }}>{error}</Text>}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
  },
  loadingText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  errorContainer: {
    marginTop: "10",
  },
  gameAreaContainer: {},
  boardContainer: {
    margin: 25,
  },
  resetButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 25,
  },
});
