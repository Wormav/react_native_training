import { Image, TouchableOpacity, View } from "react-native";
import { Txt } from "../Txt/Txt.jsx";
import { s } from "./MeteoBasic.styles.js";
import { Clock } from "../Clock/Clock.jsx";

export function MeteoBasic({ onPress, temperature, city, interpretation }) {
  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>

      <Txt>{city}</Txt>

      <Txt style={s.weather_label}>{interpretation.label}</Txt>

      <View style={s.temperature_box}>
        <TouchableOpacity onPress={onPress}>
          <Txt style={s.temperature}>{temperature}°</Txt>
        </TouchableOpacity>
        <Image style={s.image} source={interpretation.image} />
      </View>
    </>
  );
}
