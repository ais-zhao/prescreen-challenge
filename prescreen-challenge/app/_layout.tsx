import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(home-tabs)' options={{ headerShown: false, presentation: "modal", }} />
      </Stack>
    </>


  );
}
