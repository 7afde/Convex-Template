import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

type UserProfileProps = {
  userId?: string;
};

const UserProfile = ({ userId }: UserProfileProps) => {
  const profile = useQuery(
    api.users.getUserById,
    userId ? { userId: userId as Id<"users"> } : "skip",
  );
  const { userProfile } = useUserProfile();
  const isSelf = userId === userProfile?._id;

  // console.log("profile", profile);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text style={styles.username}>@{profile?.username}</Text>
        </View>
        <Image source={{ uri: profile?.imageUrl }} style={styles.image} />
      </View>
      <Text style={styles.bio}>{profile?.bio || "No bio"}</Text>
      <Text style={styles.followers}>
        {profile?.followersCount} followers ·{" "}
        {profile?.websiteUrl || "No website"}
      </Text>
      <View style={styles.buttonRow}>
        {isSelf && (
          <>
            {/* <Link
              href={`/(modal)/edit-profile?biostring=${
                profile?.bio ? encodeURIComponent(profile?.bio) : ""
              }&linkstring=${profile?.websiteUrl ? encodeURIComponent(profile?.websiteUrl) : ""}&userId=${
                profile?._id
              }&imageUrl=${profile?.imageUrl ? encodeURIComponent(profile?.imageUrl) : ""}`}
              asChild
            > */}
            <Link
              href={`/(auth)/modal/editProfile?biostring=${
                profile?.bio ? encodeURIComponent(profile?.bio) : ""
              }&linkstring=${profile?.websiteUrl ? encodeURIComponent(profile?.websiteUrl) : ""}&userId=${
                profile?._id
              }&imageUrl=${profile?.imageUrl ? encodeURIComponent(profile?.imageUrl) : ""}`}
              asChild
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit profile</Text>
              </TouchableOpacity>
            </Link>
            {/* </Link> */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Share profile</Text>
            </TouchableOpacity>
          </>
        )}

        {!isSelf && (
          <>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Mention</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
  },
  followers: {
    fontSize: 11,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  fullButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});
