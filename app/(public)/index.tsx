import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  return (
    <View className="flex-1 gap-10 items-center bg-background">
      <Image
        source={require("@/assets/images/login.png")}
        className="w-full h-[360] "
        resizeMode="cover"
      />
      <ScrollView className="flex-1 mx-6">
        <Text className="font-DMSansBold text-xl text-center">
          How would you like to use Threads?
        </Text>
        <View className="gap-4 mt-4">
          <TouchableOpacity className="bg-white p-4 rounded-md border-border border-[0.4px]">
            <View className="flex-row items-center gap-4">
              <Image
                source={require("@/assets/images/instagram_icon.webp")}
                resizeMode="contain"
                className="w-12 h-12"
              />

              <Text className="font-DMSansBold flex-1">
                Continue with Instagram
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#acacac" />
            </View>
            <Text className="font-DMSansRegular text-sm mt-2 text-border">
              Log in or create a THreads profile with your Instagram account.
              With a profile, you can post, interact and get personalised
              recommendations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-4 bg-white p-4 rounded-md border-border border-[0.4px]">
            <Text className="font-DMSansBold flex-1">Continue with Google</Text>
            <Ionicons name="chevron-forward" size={24} color="#acacac" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-md border-border border-[0.4px]">
            <View className="flex-row items-center gap-4">
              <Text className="font-DMSansBold flex-1">
                Continue without a profile
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#acacac" />
            </View>
            <Text className="font-DMSansRegular text-sm mt-2 text-border">
              Skip the profile creation and start using Threads right away. You
              can always create a profile later.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
