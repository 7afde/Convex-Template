import {
  router,
  Slot,
  useNavigationContainerRef,
  useSegments,
} from "expo-router";
import {
  ClerkProvider,
  ClerkLoaded,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";
import { LogBox } from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import * as Sentry from "@sentry/react-native";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}
LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

SplashScreen.preventAutoHideAsync();

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  attachScreenshot: true,
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  tracesSampleRate: 1.0,
  _experiments: {
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
    // Session replays
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  },
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableNativeFramesTracking: true,
    }),
    Sentry.mobileReplayIntegration(),
  ],
});

const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const user = useUser();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      router.push("/(auth)/(tabs)/feed");
    } else if (!isSignedIn && inAuthGroup) {
      router.push("/(public)");
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (user && user.user) {
      Sentry.setUser({
        id: user.user.id,
        email: user.user.emailAddresses[0].emailAddress,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  return <Slot />;
};

const RootLayout = () => {
  const ref = useNavigationContainerRef();

  useEffect(() => {
    routingInstrumentation.registerNavigationContainer(ref);
  }, [ref]);

  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <InitialLayout />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Sentry.wrap(RootLayout);
