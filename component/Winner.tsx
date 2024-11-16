import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Board from "./Board";
import {
  BoardSquare,
  BoardSquareState,
  WinningStatus,
} from "../util/dataTypes";
import { useEffect, useState } from "react";
import {
  defaultGradientColors,
  winnerGradientColors,
  failedGradientColors,
} from "../util/linearGradient";
import { Marks } from "../util/dataTypes";

interface WinnerProps {
  marks: Marks;
  board: BoardSquare[][] | undefined;
  winner: WinningStatus;
  onPressNewGame: () => void;
}

export default function Winner({
  marks,
  board,
  winner,
  onPressNewGame,
}: WinnerProps) {
  const [backgroundColor, setBackgroundColor] = useState<
    readonly [string, string]
  >(defaultGradientColors);

  function defineColor(): void {
    if (marks.playerMark === BoardSquareState.X && winner === WinningStatus.X) {
      setBackgroundColor(winnerGradientColors);
      return;
    }

    if (marks.playerMark === BoardSquareState.O && winner === WinningStatus.O) {
      setBackgroundColor(winnerGradientColors);
      return;
    }

    if (marks.playerMark === BoardSquareState.X && winner === WinningStatus.O) {
      setBackgroundColor(failedGradientColors);
      return;
    }

    if (marks.playerMark === BoardSquareState.O && winner === WinningStatus.X) {
      setBackgroundColor(failedGradientColors);
      return;
    }

    setBackgroundColor(defaultGradientColors);
  }

  useEffect(() => {
    defineColor();
  }, [winner]);

  return (
    <Modal
      animationType="slide"
      visible={winner === WinningStatus.NO_WINNER ? false : true}
    >
      <LinearGradient colors={backgroundColor} style={styles.modalContent}>
        <View style={styles.winnerContainer}>
          {winner !== WinningStatus.DRAW && (
            <Text style={styles.winnerText}>Winner</Text>
          )}
          <Text style={styles.winner}>{winner}</Text>
        </View>
        <View style={styles.boardContainer}>
          {board && <Board board={board} onPressSquare={() => {}} />}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={onPressNewGame}>
            <Text style={styles.buttonText}>New game</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "black",
    flex: 1,
  },
  boardContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
  winnerContainer: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  winnerText: {
    fontSize: 40,
    color: "white",
  },
  winner: {
    color: "white",
    fontSize: 50,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
