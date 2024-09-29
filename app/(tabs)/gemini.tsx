import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, View, FlatList, TouchableOpacity, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useEffect, useRef, useState } from "react";
import { sendMessageAndGetResponse } from "@/gemini/responseGenerator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type message = {
  user: boolean;
  text: string;
};

export default function GeminiTestScreen() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setResponses] = useState<message[]>([]);
  const insets = useSafeAreaInsets();
  const flatlist = useRef<FlatList<message>>(null);

  useEffect(() => {
    sendMessageAndGetResponse("hello").then((result) => {
      console.log("response:", result);
      setResponse(result);
      setResponses([...messages, { user: false, text: result }]);
    });
  }, []);

  const fetchResponse = async () => {
    console.log("fetching response for prompt:", prompt);
    setResponses([...messages, { user: true, text: prompt }]);
    setPrompt("");
    const result = await sendMessageAndGetResponse(prompt);
    console.log("response:", result);
    setResponse(result);
    setResponses([...messages, { user: true, text: prompt }, { user: false, text: result }]);
  };

  return (
    <LinearGradient
      colors={["#E3DFCC", "#7D7B70"]}
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: insets.bottom + 10,
        paddingHorizontal: 10,
        flex: 1,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <Image
          source={require("@/assets/images/dino-hatching.png")}
          resizeMethod="resize"
          style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: "gray" }}
        />
        <ThemedText type="title" style={{ color: "black" }}>
          Shelly
        </ThemedText>
      </View>
      <FlatList
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ gap: 15, paddingTop: 10, paddingBottom: 10 }}
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
            }}
          >
            {item.text.trim()}
          </ThemedText>
        )}
      />
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
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
          onChangeText={setPrompt}
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
