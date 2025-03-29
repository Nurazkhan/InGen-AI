import { Text, View } from "react-native";
import {Redirect} from "expo-router"
import { useUser } from "@clerk/clerk-expo";
export default function Index() {

  const { isLoaded, user } = useUser();

  if (!isLoaded) return <View><Text>Loading...</Text></View>;
  
  return <Redirect href={user ? "(tabs)/home" : "/login"} />;
  
}
