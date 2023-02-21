import { Slot } from "expo-router";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
} from "react-native";
import Analytics from '../components/Analytics'

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function Layout() {
  return (
    <AnimatedSplashScreen image={require('../assets/splash.png')}>
      <Slot />
      <Analytics />
    </AnimatedSplashScreen>
  );
}

function AnimatedSplashScreen({ children, image }) {
  const bounceAnimation = new Animated.Value(0.5);
  const fadeAnimation = new Animated.Value(1);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.parallel([
        Animated.spring(bounceAnimation, {
          toValue: 1,
          friction: 1,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = async () => {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  };

  return (
    <View className="flex-1">
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: fadeAnimation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: bounceAnimation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}