import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import { OverlayProvider, Chat, Theme, DeepPartial } from "stream-chat-expo";
import { StreamColors } from "./src/constants/Colors";

import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { StreamChat } from "stream-chat";
import AuthContextComponent from "./src/contexts/AuthContext";

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const theme: DeepPartial<Theme> = {
  colors: StreamColors,
};

// const API_KEY = "tmdq3ta7ah6k";
// const client = StreamChat.getInstance(API_KEY);

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider value={{ style: theme }}>
          <AuthContextComponent>
            <Navigation colorScheme={"dark"} />
          </AuthContextComponent>
        </OverlayProvider>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
