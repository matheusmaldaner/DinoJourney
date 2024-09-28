import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, TextInput, Button } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("[Redacted]");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GeminiTestScreen() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const fetchResponse = async () => {
    console.log("fetching response for prompt:", prompt);
    const result = await model.generateContent(prompt);
    console.log("response:", result.response.text());
    setResponse(result.response.text());
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Gemini</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <TextInput style={{ color: "white" }} value={prompt} onChangeText={setPrompt} />
      <Button title="Submit" onPress={fetchResponse} />
      <ThemedText>response: {response}</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
