import { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import Navigation from "../navigation";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useAuthContext();

  const { client } = useChatContext();

  const connectUser = async () => {
    // sign in with your backend and get the user token

    await client.connectUser(
      {
        id: username,
        name: name,
        image:
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      },
      client.devToken(username)
    );

    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();

    setUserId(username);
  };

  const signUp = () => {
    connectUser();

    // navigate to the home page
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>We are so excited to see you again</Text>

        <Text style={styles.text}>ACCOUNT INFORMATION</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Username"
        />
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Full name"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Password"
        />

        <Text style={styles.forgotPasswordText}>Forgot password?</Text>

        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36393E",
    flex: 1,
    padding: 10,
    paddingVertical: 30,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#202225",
    marginVertical: 5,
    padding: 15,
    color: "white",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#5964E8",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#4CABEB",
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default SignUpScreen;
