import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { FlatList } from "react-native-gesture-handler";
import UserListItem from "../components/UserListItem";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const UserListScreen = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const { userId } = useAuthContext();
  const navigation = useNavigation();

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startChannel = async (user) => {
    const channel = client.channel("messaging", {
      members: [userId, user.id],
    });
    await channel.create();

    navigation.navigate("ChannelScreen", { channel });
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UserListItem user={item} onPress={startChannel} />
      )}
    />
  );
};

export default UserListScreen;
