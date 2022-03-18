import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { DefaultUserType, useChatContext } from "stream-chat-expo";
import UserListItem from "../components/UserListItem";

const UserList = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState<DefaultUserType[]>([]);

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    console.log(response);
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default UserList;
