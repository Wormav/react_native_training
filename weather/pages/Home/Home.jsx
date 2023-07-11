import { Text, View } from "react-native";
import { s } from "./Home.styles";

export function Home({}) {
  return (
    <>
      <View style={s.meteo_basic}></View>
      <View style={s.searchbar_container}></View>
      <View style={s.meteo_advanced}></View>
    </>
  );
}
