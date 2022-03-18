import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Channel, useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";

const InviteMembersScreen = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { userId } = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute();
  const channel = route.params.channel;

  const fetchUsers = async () => {
    const existingMembers = await channel.queryMembers({});
    const existingMemberIds = existingMembers.members.map((m) => m.user_id);

    const response = await client.queryUsers({
      id: { $nin: existingMemberIds },
    });
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = (user) => {
    if (selectedUserIds.includes(user.id)) {
      setSelectedUserIds((existingUsers) =>
        existingUsers.filter((id) => id !== user.id)
      );
    } else {
      setSelectedUserIds((exisitingUsers) => [...exisitingUsers, user.id]);
    }
  };

  const inviteUsers = async () => {
    await channel.addMembers(selectedUserIds);
    navigation.goBack();
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UserListItem
          user={item}
          onPress={selectUser}
          isSelected={selectedUserIds.includes(item.id)}
        />
      )}
      ListHeaderComponent={() =>
        !!selectedUserIds.length && (
          <Button title="Invite" onPress={inviteUsers} />
        )
      }
    />
  );
};

export default InviteMembersScreen;
