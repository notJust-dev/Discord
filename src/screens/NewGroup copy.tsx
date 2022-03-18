import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { DefaultUserType, useChatContext } from "stream-chat-expo";
import UserListItem from "../components/UserListItem";
import { TextInput } from "react-native-gesture-handler";

const NewGroup = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState<DefaultUserType[]>([]);
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    console.log(response);
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = () => {
    
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
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserListItem user={item} onPress={selectUser} />
        )}
      />
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
