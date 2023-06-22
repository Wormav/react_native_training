import { Text, TouchableOpacity } from "react-native";
import s from "./Button.styles";

export function Button({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.btn}>
      <Text style={s.text}>+ New todo</Text>
    </TouchableOpacity>
  );
}
