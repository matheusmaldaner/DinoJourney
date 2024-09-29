import { requiredXPForLevelUp } from "@/managers/levelManager";
import { getUserLevel, getUserXP } from "@/storage/userData";
import { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { useXP } from "@/hooks/useXP";
import { useLevel } from "@/hooks/useLevel";

type XPBarProps = {
  style?: ViewStyle;
};

export function XPBar({ style }: XPBarProps) {
  const xp = useXP();
  const level = useLevel();
  const [requiredXP, setRequiredXP] = useState(0);

  useEffect(() => {
    requiredXPForLevelUp().then((xp) => setRequiredXP(xp));
  }, [level]);

  const progress = xp / requiredXP;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignSelf: "stretch",
          gap: 5,
        },
        style,
      ]}
    >
      <ThemedText style={{}} type="subtitle">
        Level {level}
      </ThemedText>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: "gray",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: `${Math.round(progress * 100)}%`,
            backgroundColor: "green",
            alignSelf: "stretch",
          }}
        />
      </View>
      <ThemedText style={{}} type="subtitle">
        {xp} / {requiredXP} XP
      </ThemedText>
    </View>
  );
}
