import React, { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import { fadeOut, fadeIn, loadSoundForObject } from "../audioUtils";

const background_audio = require("../../assets/audio/Music/Explore.mp3");

export default function DinoDaddy(): JSX.Element {
  const router = useRouter();
  const backgroundSound = useRef(new Audio.Sound()).current;

  useEffect(() => {
    // Load and fade in audio when the component mounts
    const loadAndPlayBackground = async (): Promise<void> => {
      try {
        console.log("Loading audio");
        await loadSoundForObject(backgroundSound, background_audio);
        console.log("Playing audio");
        await fadeIn(backgroundSound, 500); // Fade in the background music over 1/2 seconds
      } catch (error) {
        console.log("Error loading or playing audio:", error);
      }
    };

    loadAndPlayBackground();

    return () => {
      try {
        if (backgroundSound) {
          backgroundSound.stopAsync();
        }
      } catch (error) {}
    };
  }, [backgroundSound]);

  useEffect(() => {
    // Set up the timer to navigate after 32 seconds and fade out the audio
    const timer = setTimeout(async () => {
      try {
        if (backgroundSound) {
          await fadeOut(backgroundSound, 500); // Fade out audio over 1/2 seconds
        }
      } catch (error) {}
      router.push("/dino-post-hatch");
    }, 32000);

    // Cleanup function: stop the sound and clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/gifs/dino-hatch.gif")} style={styles.gif} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 900,
    height: 900,
    resizeMode: "contain",
  },
});
