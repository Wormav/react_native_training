import { Text, TextInput, View } from "react-native";
import s from "./InputTemperature.styles";

export function InputTemperature({ defaultValue, onChangeText, unit }) {
  return (
    <View style={s.container}>
      <TextInput
        keyboardType="numeric"
        style={s.input}
        placeholder="Tape une température"
        maxLength={4}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
      />
      <Text style={s.unit}>{unit}</Text>
    </View>
  );
}
