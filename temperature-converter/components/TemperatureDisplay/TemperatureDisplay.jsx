import { Text } from "react-native";
import s from "./TemparatureDisplay.styles";

export function TemperatureDisplay({ value, unit }) {
  return (
    <Text style={s.text}>
      {value} {unit}
    </Text>
  );
}
