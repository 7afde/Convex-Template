import { View, Text, Button } from "react-native";
import * as Sentry from "@sentry/react-native";

const Page = () => {
  const testError = () => {
    try {
      throw new Error("Test Error");
    } catch (error) {
      const sentryID = Sentry.captureMessage("problem");
      console.log("sentryID :", sentryID);

      const userFeedback: Sentry.UserFeedback = {
        event_id: sentryID,
        name: "John Doe",
        email: "zouoyedhafed00@gmail.com",
        comments: "This is a test feedback",
      };

      Sentry.captureUserFeedback(userFeedback);
    }
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={testError} title="Error" />
    </View>
  );
};

export default Page;
