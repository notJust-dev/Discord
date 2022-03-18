import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import { useChatContext } from "stream-chat-expo";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const NewChannelScreen = () => {
  const [name, setName] = useState("");
  const { client } = useChatContext();
  const { userId } = useAuthContext();

  const navigation = useNavigation();

  const createChannel = async () => {
    const channel = client.channel("team", uuidv4(), { name });
    await channel.create();
    await channel.addMembers([userId]);
    navigation.navigate("ChannelScreen", { channel });
  };

  return (
    <View style={styles.root}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Channel name"
        style={styles.input}
        placeholderTextColor="lightgray"
      />
      <Button title="Create channel" onPress={createChannel} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    color: "white",
  },
});

export default NewChannelScreen;
