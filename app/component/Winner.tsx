import { View, Modal, Text, StyleSheet, Button } from "react-native";
import { WinningStatus } from "../index";

interface WinnerProps {
  winner: WinningStatus;
  onPressNewGame: () => void;
}

export const Winner = ({ winner, onPressNewGame }: WinnerProps) => {
  return (
    <Modal visible={winner === WinningStatus.NO_WINNER ? false : true}>
      <View style={styles.winnerContainer}>
        {winner !== WinningStatus.DRAW && (
          <Text style={styles.winnerText}>Winner</Text>
        )}
        <Text style={styles.winner}>{winner}</Text>
        <Button onPress={onPressNewGame} title="New game" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  winnerContainer: {
    margin: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  winnerText: {
    fontSize: 40,
  },
  winner: {
    fontSize: 50,
  },
});
