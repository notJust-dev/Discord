import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChannelList } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import ChannelScreen from "../screens/ChannelScreen";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import UserListScreen from "../screens/UserListScreen";
import Button from "../components/Button";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={{ title: "Channel" }}
      />
      <Drawer.Screen
        name="UserList"
        component={UserListScreen}
        options={{ title: "Users" }}
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

  const filters = { members: { $in: [userId] } };
  const publicFilters = { type: "livestream" };

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
        <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
      ) : (
        <>
          <Button
            title="Start new conversation"
            onPress={() => {
              navigation.navigate("UserList");
            }}
          />
          <ChannelList onSelect={onChannelSelect} filters={filters} />
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
});

export default DrawerNavigator;
