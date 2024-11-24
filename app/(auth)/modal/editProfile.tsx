import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const editProfile = () => {
  const { biostring, linkstring, userId, imageUrl } = useLocalSearchParams<{
    biostring: string;
    linkstring: string;
    userId: string;
    imageUrl: string;
  }>();
  const [bio, setBio] = useState(biostring);
  const [link, setLink] = useState(linkstring);
  const [image, setImage] = useState(imageUrl);
  const updateUser = useMutation(api.users.updateUser);

  const onDone = async () => {
    await updateUser({
      _id: userId as Id<"users">,
      bio: bio,
      websiteUrl: link,
    });

    router.dismiss();
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={onDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.section}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          placeholder="Write a bio..."
          numberOfLines={4}
          multiline
          textAlignVertical="top"
          style={styles.bioInput}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Link</Text>
        <TextInput
          value={link}
          onChangeText={setLink}
          placeholder="Link"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default editProfile;

const styles = StyleSheet.create({
  doneButtonText: {
    fontWeight: "bold",
    color: Colors.submit,
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    padding: 8,
    margin: 16,
  },
  bioInput: {
    height: 100,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
});
