import { ButtonProps, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type PurpleButtonProps = ButtonProps;

export const PurpleButton = (props: PurpleButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#7c7fad",
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
