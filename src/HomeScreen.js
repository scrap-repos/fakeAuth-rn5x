import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "./AuthContext";

function HomeScreen() {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen </Text>
      <Button title="logout" onPress={() => signOut()} />
    </View>
  );
}

export default HomeScreen;
