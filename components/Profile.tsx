import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

type ProfileProps = {
  userId?: Id<"users">;
  showBackButton?: boolean;
};

const Profile = ({ userId, showBackButton = false }: ProfileProps) => {
  const { userProfile } = useUserProfile();
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <FlatList
        data={[]}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <>
            <Text>No Data</Text>
          </>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View
              // className="flex-row items-center justify-between px-8"
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 12,
              }}
            >
              {showBackButton ? (
                <Text
                // className="text-green-800 text-xl"
                >
                  Back
                </Text>
              ) : (
                <MaterialCommunityIcons name="web" size={24} />
              )}
              <View>
                <Ionicons name="logo-instagram" size={24} />
                <TouchableOpacity onPress={() => signOut()}>
                  <Ionicons name="log-out-outline" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
