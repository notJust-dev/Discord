import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";

const ChannelMembersScreen = () => {
  const [members, setMembers] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const channel = route.params.channel;

  const fetchMembers = async () => {
    const response = await channel.queryMembers({});
    setMembers(response.members);
  };

  useEffect(() => {
    fetchMembers();
  }, [channel]);

  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.user_id}
      renderItem={({ item }) => (
        <UserListItem user={item.user} onPress={() => {}} />
      )}
      ListHeaderComponent={() => (
        <Button
          title="Invite members"
          onPress={() => {
            navigation.navigate("InviteMembers", { channel });
          }}
        />
      )}
    />
  );
};

export default ChannelMembersScreen;
