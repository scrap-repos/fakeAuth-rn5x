import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "./AuthContext";

function SignInScreen() {
  const { signIn } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SignInScreen </Text>
      <Button title="sign me in " onPress={() => signIn()} />
    </View>
  );
}

export default SignInScreen;
