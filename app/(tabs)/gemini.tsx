import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, View, FlatList, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useRef, useState } from "react";
import { sendMessageAndGetResponse } from "@/gemini/responseGenerator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { XPBar } from "@/components/XPBar";
import { LevelUpPopup } from "@/components/LevelUpPopup";
import { Audio } from "expo-av";

// Import keyboard sound player utility
import { playTypingSound, unloadTypingSound } from "../keyboardSoundPlayer";

// Import the notification sound
const notificationSound = require("../../assets/audio/App_Sounds/msg_notif.wav");

type message = {
  user: boolean;
  text: string;
};

export default function GeminiTestScreen() {
  const [prompt, setPrompt] = useState("");
  const [messages, setResponses] = useState<message[]>([]);
  const insets = useSafeAreaInsets();
  const flatlist = useRef<FlatList<message>>(null);
  const previousTextRef = useRef<string>("");

  // Function to play the notification sound
  const playNotificationSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(notificationSound);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing notification sound:", error);
    }
  };

  useEffect(() => {
    // Initial API response on mount
    sendMessageAndGetResponse("hello").then((result) => {
      console.log("response:", result);
      setResponses((prevMessages) => [...prevMessages, { user: false, text: result }]);
      playNotificationSound(); // Play sound for received message
    });

    // Cleanup: Unload typing sound when the component unmounts
    return () => {
      unloadTypingSound();
    };
  }, []);

  const fetchResponse = async () => {
    console.log("fetching response for prompt:", prompt);
    if (prompt.trim() === "") return;
    setResponses([...messages, { user: true, text: prompt }]);
    playNotificationSound(); // Play sound for sent message

    setPrompt("");
    const result = await sendMessageAndGetResponse(prompt);
    console.log("response:", result);
    setResponses([...messages, { user: true, text: prompt }, { user: false, text: result }]);
    playNotificationSound(); // Play sound for received response
  };

  const handleTextChange = (text: string) => {
    // Determine which key was pressed by comparing the new and old text
    if (text.length < previousTextRef.current.length) {
      // User pressed backspace
      playTypingSound("backspace");
    } else if (text.endsWith("\n")) {
      // User pressed enter (usually mapped to new line)
      playTypingSound("enter");
    } else if (text.endsWith(" ")) {
      // User pressed space
      playTypingSound("space");
    } else {
      // Regular key press
      playTypingSound("key");
    }

    // Update the prompt and previousTextRef
    setPrompt(text);
    previousTextRef.current = text;
  };

  return (
    <LinearGradient
      colors={["#E3DFCC", "#7D7B70"]}
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: insets.bottom + 10,
        flex: 1,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <LevelUpPopup />
      <View
        style={{
          paddingTop: insets.top + 10,
          backgroundColor: "#00000020",
          borderBottomWidth: 1,
          borderColor: "gray",
          alignSelf: "stretch",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            paddingHorizontal: 10,
            marginBottom: 5,
          }}
        >
          <Image
            source={require("@/assets/images/dino-hatching.png")}
            resizeMethod="resize"
            style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: "gray" }}
          />
          <ThemedText type="title" style={{ color: "black" }}>
            Shelly
          </ThemedText>
        </View>
        <XPBar style={{ marginHorizontal: 5 }} />
      </View>
      <FlatList
        style={{ flex: 1, flexGrow: 1 }}
        ListHeaderComponent={
          <LinearGradient
            colors={["#00000020", "#00000000"]}
            style={{
              height: 15,
            }}
          />
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          gap: 15,
          paddingBottom: 10,
        }}
        data={messages}
        onContentSizeChange={() => {
          if (messages.length > 0) {
            setTimeout(() => {
              console.log("scrolling to end");
              if (flatlist.current) flatlist.current.scrollToEnd({ animated: true });
            }, 100);
          }
        }}
        ref={flatlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedText
            style={{
              color: "white",
              borderWidth: 1,
              borderRadius: 25,
              borderColor: "gray",
              backgroundColor: item.user ? "#519e57" : "#2a75c6",
              padding: 10,
              borderTopLeftRadius: item.user ? 25 : 0,
              borderTopRightRadius: item.user ? 0 : 25,
              marginHorizontal: 10,
            }}
          >
            {item.text.trim()}
          </ThemedText>
        )}
      />
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center", paddingHorizontal: 10 }}>
        <TextInput
          style={{
            color: "white",
            borderColor: "#E3DFCC",
            borderRadius: 5,
            padding: 10,
            borderWidth: 1,
            flex: 1,
          }}
          value={prompt}
          onChangeText={handleTextChange}
          onSubmitEditing={fetchResponse}
          multiline
          returnKeyType="done"
        />
        <TouchableOpacity onPress={fetchResponse} style={{ borderRadius: 5, minWidth: 35 }}>
          <Ionicons name="send" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
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
