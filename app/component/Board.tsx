import { View, Text, Pressable, StyleSheet } from "react-native";
import { BoardSquare } from "../util/dataTypes";
interface BoardProps {
  board: BoardSquare[][] | undefined;
  onPressSquare: (id: number) => void;
}

export default function Board({ board, onPressSquare }: BoardProps) {
  if (!board)
    return (
      <View>
        <Text>Board not found</Text>
      </View>
    );

  return (
    <View>
      {board.map((array: BoardSquare[], index: number) => {
        return (
          <View style={styles.boardSquaresContainer} key={index + 10}>
            {array.map((square: BoardSquare) => {
              return (
                <View key={square.id}>
                  <Pressable onPress={() => onPressSquare(square.id)}>
                    <View style={styles.boardSquare}>
                      <Text
                        style={styles.boardSquareText}
                      >{`${square.state}`}</Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  boardSquaresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  boardSquare: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    width: 100,
    height: 100,
    margin: 5,
  },
  boardSquareText: {
    color: "white",
    fontSize: 50,
  },
});
