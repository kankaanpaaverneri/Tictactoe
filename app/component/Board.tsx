import { View, Text, Button, StyleSheet } from "react-native";
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
                <View style={styles.boardSquare} key={square.id}>
                  <Button
                    onPress={() => onPressSquare(square.id)}
                    title={`${square.state}`}
                  />
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
  },
  boardSquare: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 2,
    borderWidth: 2,
    width: 100,
    height: 100,
  },
});
