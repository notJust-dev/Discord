import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChannelList } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import ChannelScreen from "../screens/ChannelScreen";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import UserListScreen from "../screens/UserListScreen";
import Button from "../components/Button";
import ChannelMembersScreen from "../screens/ChannelMembersScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import NewChannelScreen from "../screens/NewChannelScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={({ navigation, route }) => ({
          title: "Channel",
          headerRight: () =>
            route?.params?.channel && (
              <Pressable
                style={styles.icon}
                onPress={() =>
                  navigation.navigate("ChannelMembers", {
                    channel: route.params.channel,
                  })
                }
              >
                <FontAwesome5 name="users" size={24} color="lightgray" />
              </Pressable>
            ),
        })}
      />
      <Drawer.Screen
        name="UserList"
        component={UserListScreen}
        options={{ title: "Users" }}
      />
      <Drawer.Screen
        name="ChannelMembers"
        component={ChannelMembersScreen}
        options={{ title: "Channel Members" }}
      />
      <Drawer.Screen
        name="NewChannel"
        component={NewChannelScreen}
        options={{ title: "New Channel" }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const [tab, setTab] = useState("private");
  const { navigation } = props;

  const onChannelSelect = (channel) => {
    // navigate to a screen for this channel
    navigation.navigate("ChannelScreen", { channel });
  };

  const { userId } = useAuthContext();

  const privateFilters = { type: "messaging", members: { $in: [userId] } };
  const publicFilters = {
    type: { $ne: "messaging" },
    members: { $in: [userId] },
  };

  const logout = () => {
    Auth.signOut();
  };

  return (
    <SafeAreaView {...props} style={{ flex: 1 }}>
      <Text style={styles.title}>notJust Development</Text>

      <View style={styles.tabs}>
        <Text
          onPress={() => setTab("public")}
          style={[
            styles.groupTitle,
            { color: tab === "public" ? "white" : "gray" },
          ]}
        >
          Public
        </Text>
        <Text
          onPress={() => setTab("private")}
          style={[
            styles.groupTitle,
            { color: tab === "private" ? "white" : "gray" },
          ]}
        >
          Private
        </Text>
      </View>

      {tab === "public" ? (
        <>
          <Button
            title="Start new channel"
            onPress={() => {
              navigation.navigate("NewChannel");
            }}
          />
          <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
        </>
      ) : (
        <>
          <Button
            title="Start new conversation"
            onPress={() => {
              navigation.navigate("UserList");
            }}
          />
          <ChannelList onSelect={onChannelSelect} filters={privateFilters} />
        </>
      )}

      <Text style={styles.logout} onPress={logout}>
        Logout
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
    margin: 10,
  },
  groupTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  logout: {
    color: "white",
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default DrawerNavigator;
