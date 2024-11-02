import { View, Text, StyleSheet, Pressable } from "react-native";
import { BoardSquareState } from "../util/dataTypes";
interface SelectMarkProps {
  onSelectMark: (id: BoardSquareState) => void;
}

export const SelectMark = ({ onSelectMark }: SelectMarkProps) => {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: 40,
          }}
        >
          Select a mark
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Pressable onPress={() => onSelectMark(BoardSquareState.X)}>
            <Text style={styles.button}>{BoardSquareState.X}</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => onSelectMark(BoardSquareState.O)}>
            <Text style={styles.button}>{BoardSquareState.O}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    padding: 30,
    margin: 20,
    backgroundColor: "none",
    color: "white",
    fontSize: 50,
  },
});
