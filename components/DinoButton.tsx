import { ButtonProps, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type DinoButtonProps = ButtonProps;

export const DinoButton = (props: DinoButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "gray",
        borderRadius: 15,
        alignSelf: "stretch",
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
      onPress={props.onPress}
    >
      <ThemedText type="subtitle" style={{ color: "#eee" }}>
        {props.title}
      </ThemedText>
    </TouchableOpacity>
  );
};
