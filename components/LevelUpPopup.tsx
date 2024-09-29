import { useLevel } from "@/hooks/useLevel";
import { useEffect, useState } from "react";
import { Button, Image, Modal, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { DinoButton } from "./DinoButton";

export const LevelUpPopup = () => {
  const currentLevel = useLevel();
  const [cachedLevel, setCachedLevel] = useState(currentLevel);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (currentLevel > cachedLevel) {
      setShowPopup(true);
      setCachedLevel(currentLevel);
    }
  }, [currentLevel]);

  return (
    <Modal visible={showPopup} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000077",
          padding: 15,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#eee",
            borderWidth: 2,
            borderColor: "gray",
            borderRadius: 10,
            paddingVertical: 20,
            paddingHorizontal: 15,
            gap: 10,
            alignItems: "center",
          }}
          onStartShouldSetResponder={() => true}
        >
          <Image
            source={require("../assets/images/dino-companion.png")}
            style={{ height: 100, resizeMode: "contain" }}
          />
          <ThemedText type="subtitle">Thank you for being open and productive.</ThemedText>
          <ThemedText type="defaultSemiBold">Shelly is now level {currentLevel}!</ThemedText>
          <ThemedText>
            As you make accomplishments and talk about what's bothering you, Shelly grows with you.
          </ThemedText>
          <DinoButton title="Close" onPress={() => setShowPopup(false)} />
        </View>
      </View>
    </Modal>
  );
};
