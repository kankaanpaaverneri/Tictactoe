import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Tic Tac Toe",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack>
  );
}
