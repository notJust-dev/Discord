import "react-native-gesture-handler";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat, Theme, DeepPartial } from "stream-chat-expo";
import AuthContext from "./src/contexts/AuthContext";
import { StreamColors } from "./src/constants/Colors";

const API_KEY = "tmdq3ta7ah6k";
const client = StreamChat.getInstance(API_KEY);

const theme: DeepPartial<Theme> = {
  colors: StreamColors,
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    // this is done when component mounts

    return () => {
      // this is done when component unmounts
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <OverlayProvider value={{ style: theme }}>
            <Chat client={client}>
              <Navigation colorScheme={"dark"} />
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
