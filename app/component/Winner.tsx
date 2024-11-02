import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Board from "./Board";
import { BoardSquare, WinningStatus } from "../util/dataTypes";

import { linearGradientColors } from "../util/linearGradient";

interface WinnerProps {
  board: BoardSquare[][] | undefined;
  winner: WinningStatus;
  onPressNewGame: () => void;
}

export default function Winner({ board, winner, onPressNewGame }: WinnerProps) {
  return (
    <Modal
      animationType="slide"
      visible={winner === WinningStatus.NO_WINNER ? false : true}
    >
      <LinearGradient colors={linearGradientColors} style={styles.modalContent}>
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
