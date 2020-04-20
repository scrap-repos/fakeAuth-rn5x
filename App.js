import React, { useReducer, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator();

import { AuthContext } from "./src/AuthContext";

//screens
import SplashScreen from "./src/SplashScreen";
import SignInScreen from "./src/SignInScreen";
import HomeScreen from "./src/HomeScreen";

function App() {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case "RESTORE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };

      case "SIGN_IN":
        return {
          ...prevState,
          userToken: action.token,
        };

      case "SIGN_OUT":
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const _bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        //restore token failed
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    _bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        //console.log("signin");
        // do some authentication stuff here
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
    }),
    []
  );

  if (state.isLoading) {
    // we haven't finished cheking for the token yet
    return <SplashScreen />;
  }

  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              options={{
                title: "Sign in",
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
              component={SignInScreen}
            />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
