import { Auth } from "aws-amplify";
import { createContext, useState, useContext, useEffect } from "react";
import { StreamChat } from "stream-chat";

const AuthContext = createContext({
  userId: null,
  setUserId: (newId: string) => {},
});

const API_KEY = "tmdq3ta7ah6k";
const client = StreamChat.getInstance(API_KEY);

const AuthContextComponent = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const connectUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log(userData);
    console.log(Object.getPrototypeOf(userData));
    const { sub, email } = userData.attributes;
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
    setUserId(sub);
  };

  useEffect(() => {
    // this is done when component mounts
    connectUser();
    return () => {
      // this is done when component unmounts
      client.disconnectUser();
    };
  }, []);
  console.log(userId);
  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
