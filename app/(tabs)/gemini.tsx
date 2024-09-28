import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, TextInput, Button, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useState } from "react";
import { sendMessageAndGetResponse } from "@/gemini/responseGenerator";
import { useThemeColor } from "@/hooks/useThemeColor";

type message = {
  user: boolean;
  text: string;
};

export default function GeminiTestScreen() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setResponses] = useState<message[]>([]);
  const textColor = useThemeColor({ light: "black", dark: "white" }, "text");

  const fetchResponse = async () => {
    console.log("fetching response for prompt:", prompt);
    setResponses([...messages, { user: true, text: prompt }]);
    const result = await sendMessageAndGetResponse(prompt);
    console.log("response:", result);
    setResponse(result);
    setResponses([...messages, { user: true, text: prompt }, { user: false, text: result }]);
    setPrompt("");
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
      {messages.map((response, index) => (
        <ThemedText
          key={index}
          style={{
            color: "white",
            borderWidth: 1,
            borderRadius: 25,
            backgroundColor: response.user ? "green" : "blue",
            padding: 10,
            borderBottomLeftRadius: response.user ? 25 : 0,
            borderBottomRightRadius: response.user ? 0 : 25,
          }}
        >
          {response.text}
        </ThemedText>
      ))}
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TextInput
          style={{
            color: textColor,
            borderColor: "green",
            borderRadius: 5,
            padding: 10,
            borderWidth: 1,
            flex: 1,
          }}
          value={prompt}
          onChangeText={setPrompt}
          onSubmitEditing={fetchResponse}
          multiline
        />
        <Button title="Send" onPress={fetchResponse} />
      </View>
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
