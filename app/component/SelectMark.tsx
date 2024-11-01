import { View, Text, Button } from "react-native";
import { BoardSquareState } from "../util/dataTypes";
interface SelectMarkProps {
  onSelectMark: (id: BoardSquareState) => void;
}

export const SelectMark = ({ onSelectMark }: SelectMarkProps) => {
  return (
    <View>
      <View>
        <Text>Select a mark</Text>
      </View>
      <View>
        <Button onPress={() => onSelectMark(BoardSquareState.X)} title="X" />
        <Button onPress={() => onSelectMark(BoardSquareState.O)} title="O" />
      </View>
    </View>
  );
};
