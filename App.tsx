import { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthContext, { IUser } from "./contexts/AuthContext";

import SignupScreen from "./screens/SignupScreen";
import AuthProvider from "./providers/AuthProvider";

function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Sign up" onPress={() => navigation.navigate("Signup")} />

      <Button title="Sign out" onPress={logout} />
      <StatusBar style="auto" />
    </View>
  );
}

function SettingsScreen() {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{user ? `${user.id} - ${user.email}` : "not authenticated"}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              tabBarButton: () => null,
            }}
          />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
