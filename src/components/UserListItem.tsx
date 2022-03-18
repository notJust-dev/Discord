import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";

const UserListItem = ({ user, onPress }) => {
  return (
    <Pressable style={styles.userContainer} onPress={() => onPress(user)}>
      <Image source={{ uri: user.image }} style={styles.image} />

      <View>
        <Text style={styles.userName}>{user.name as string}</Text>
        {user.online && <Text style={styles.online}>online</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: "white",
    fontSize: 16,
  },
  online: {
    color: "green",
  },
});

export default UserListItem;
