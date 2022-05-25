import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { AxiosError } from "axios";

import { postSignup } from "../helpers/api";
import { storeJwt } from "../helpers/token-storage";

interface IServerErrorBody {
  error: string;
}

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      const { userId, jwt } = await postSignup({ email, password });
      await storeJwt(jwt);
      console.log(userId, jwt);
    } catch (err) {
      const errObj = err as Error;
      let message = errObj.message;
      if (errObj instanceof AxiosError) {
        if (errObj?.response?.data) {
          const resBody = errObj?.response?.data as IServerErrorBody;
          message += ` - details: ${resBody.error}`;
        }
      }
      console.error(message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput onChangeText={setEmail} value={email} />

      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        textContentType="password"
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Sign up" onPress={onSubmit} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontWeight: "bold",
  },
});
