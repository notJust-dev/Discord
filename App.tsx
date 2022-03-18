import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat, Theme, DeepPartial } from "stream-chat-expo";
import { StreamColors } from "./src/constants/Colors";

import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";

Amplify.configure(awsconfig);

const API_KEY = "tmdq3ta7ah6k";
const client = StreamChat.getInstance(API_KEY);

const theme: DeepPartial<Theme> = {
  colors: StreamColors,
};

function App() {
  const isLoadingComplete = useCachedResources();
  const [isConnected, setIsConnected] = useState(false);

  const connectUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log(Object.getPrototypeOf(userData));
    const { sub, email } = userData.attributes;

    console.log(sub);

    // sign in with your backend and get the user token

    await client.connectUser(
      {
        id: sub,
        name: email,
        image:
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODQ5NGEzNWEtNWFiOC00NjZmLTk3OWUtYmE2MmIzNmRjYzQxIn0.bwnwGu14AdmceJfstIwe7PWLjsAHtBzBOUxlprzQ9Dg"
    );

    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();

    setIsConnected(true);
  };

  useEffect(() => {
    // this is done when component mounts
    connectUser();
    return () => {
      // this is done when component unmounts
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete || !isConnected) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider value={{ style: theme }}>
          <Chat client={client}>
            <Navigation colorScheme={"dark"} />
          </Chat>
        </OverlayProvider>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
