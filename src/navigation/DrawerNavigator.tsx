import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChannelList } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import ChannelScreen from "../screens/ChannelScreen";
import { Auth } from "aws-amplify";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={{ title: "Channel" }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const onChannelSelect = (channel) => {
    // navigate to a screen for this channel
    props.navigation.navigate("ChannelScreen", { channel });
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

      <Text style={styles.groupTitle}>Public channels</Text>
      <ChannelList onSelect={onChannelSelect} filters={publicFilters} />

      <Text style={styles.groupTitle}>Your channels</Text>
      <ChannelList onSelect={onChannelSelect} filters={filters} />

      <Text
        style={{ color: "white", fontWeight: "bold", margin: 10 }}
        onPress={logout}
      >
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
    color: "white",
    margin: 10,
  },
});

export default DrawerNavigator;
