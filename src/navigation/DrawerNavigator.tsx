import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChannelList } from "stream-chat-expo";
import Colors from "../constants/Colors";
import { useAuthContext } from "../contexts/AuthContext";
import ChannelScreen from "../screens/ChannelScreen";
import ChannelUsers from "../screens/ChannelUsers";
import NewGroup from "../screens/NewGroup";
import UserList from "../screens/UserList";
import { FontAwesome } from "@expo/vector-icons";

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
                onPress={() =>
                  navigation.navigate("ChannelMembers", {
                    channel: route.params.channel,
                  })
                }
              >
                <FontAwesome name="users" size={24} color="lightgray" />
              </Pressable>
            ),
        })}
      />
      <Drawer.Screen
        name="Users"
        component={UserList}
        options={{ title: "Users" }}
      />
      <Drawer.Screen
        name="NewGroup"
        component={NewGroup}
        options={{ title: "Create group" }}
      />
      <Drawer.Screen
        name="ChannelMembers"
        component={ChannelUsers}
        options={{ title: "Members" }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const [tab, setTab] = useState("public");
  const { navigation } = props;

  const onChannelSelect = (channel) => {
    // navigate to a screen for this channel
    navigation.navigate("ChannelScreen", { channel });
  };

  const { userId } = useAuthContext();

  const filters = { members: { $in: [userId] }, type: "messaging" };
  const publicFilters = {
    type: { $ne: "messaging" },
  };

  return (
    <SafeAreaView {...props} style={{ flex: 1 }}>
      <Text style={styles.title}>notJust Development</Text>

      <View style={styles.tabs}>
        <Text
          style={[
            styles.groupTitle,
            { color: tab === "public" ? "white" : "gray" },
          ]}
          onPress={() => setTab("public")}
        >
          Public
        </Text>
        <Text
          style={[
            styles.groupTitle,
            { color: tab === "private" ? "white" : "gray" },
          ]}
          onPress={() => setTab("private")}
        >
          Private
        </Text>
      </View>

      {tab === "public" ? (
        <>
          <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
          <Pressable
            onPress={() => navigation.navigate("NewGroup")}
            style={styles.btn}
          >
            <Text>Start a new groups</Text>
          </Pressable>
        </>
      ) : (
        <>
          <ChannelList onSelect={onChannelSelect} filters={filters} />
          <Pressable
            onPress={() => navigation.navigate("Users")}
            style={styles.btn}
          >
            <Text>Start a new chat</Text>
          </Pressable>
        </>
      )}
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
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  groupTitle: {
    color: "white",
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default DrawerNavigator;
