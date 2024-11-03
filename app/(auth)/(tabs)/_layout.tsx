import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";

const CreateTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => {
  return (
    <View className="bg-itemBackground p-[6] rounded-[8]">
      <Ionicons
        name={focused ? "add" : "add-outline"}
        size={size}
        color={color}
      />
    </View>
  );
};

const Layout = () => {
  const { signOut } = useAuth();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: CreateTabIcon,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // Haptics.selectionAsync();
            router.push("/(auth)/modal/create");
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()} className="pr-4">
              <Ionicons name="log-out" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
