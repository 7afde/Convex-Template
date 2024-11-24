import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal/create"
        options={{
          presentation: "modal",
          title: "New Thread",
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal-circle" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="modal/editProfile"
        options={{
          presentation: "modal",
          title: "Edit Profile",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "grey",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
