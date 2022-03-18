import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { DefaultUserType, useChatContext } from "stream-chat-expo";
import UserListItem from "../components/UserListItem";
import { TextInput } from "react-native-gesture-handler";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext";

const NewGroup = () => {
  const { client } = useChatContext();
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const { userId } = useAuthContext();

  const createGroup = async () => {
    const channel = client.channel("team", name, {
      name,
    });
    // Here, 'travel' will be the channel ID
    await channel.create();
    await channel.addMembers([userId]);

    navigation.navigate("ChannelScreen", { channel });
  };

  return (
    <>
      <TextInput
        placeholder="Group name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor="lightgray"
      />
      <Button title="Create Group" onPress={createGroup} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 10,
    color: "white",
  },
});

export default NewGroup;
