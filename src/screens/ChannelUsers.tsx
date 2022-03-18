import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { DefaultUserType, useChatContext } from "stream-chat-expo";
import UserListItem from "../components/UserListItem";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChannelUsers = () => {
  const route = useRoute();
  const { client } = useChatContext();
  const [users, setUsers] = useState<DefaultUserType[]>([]);
  const { userId } = useAuthContext();
  const navigation = useNavigation();

  const channel = route.params.channel;

  const fetchUsers = async () => {
    const response = await channel.queryMembers({});
    console.log(response);
    setUsers(response.members);
  };

  useEffect(() => {
    fetchUsers();
  }, [channel]);

  const createChannel = async (user) => {
    const channel = client.channel("messaging", {
      members: [userId, user.id],
    });
    await channel.create();

    navigation.navigate("ChannelScreen", { channel });
  };

  return (
    <FlatList
      data={users}
      keyExtractor={({ user }) => user.id}
      renderItem={({ item }) => (
        <UserListItem user={item.user} onPress={createChannel} />
      )}
    />
  );
};

export default ChannelUsers;
