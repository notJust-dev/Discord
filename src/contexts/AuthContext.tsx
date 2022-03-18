import { Auth, API, graphqlOperation } from "aws-amplify";
import { createContext, useState, useContext, useEffect } from "react";
import { getStreamToken } from "../graphql/queries";
import { Alert } from "react-native";

const AuthContext = createContext({
  userId: null,
  setUserId: (newId: string) => {},
});

const AuthContextComponent = ({ children, client }) => {
  const [userId, setUserId] = useState(null);

  const connectStreamChatUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, email } = userData.attributes;

    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;
    if (!token) {
      Alert.alert("Failed to fetch the token");
      return;
    }

    await client.connectUser(
      {
        id: sub,
        name: email,
        image:
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      },
      token
    );

    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();

    setUserId(sub);
  };

  useEffect(() => {
    connectStreamChatUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
