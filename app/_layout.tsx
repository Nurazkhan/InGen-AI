import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import UserDetailContext from "./../context/UserDetailContext";
import { useState } from "react";
export default function RootLayout() {
const [userDetail,setUserDetail] = useState();

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login/index" />
        </Stack>
      </UserDetailContext.Provider>
    </ClerkProvider>
  );
}
