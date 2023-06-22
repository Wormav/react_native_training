import { Image, Text } from "react-native";
import logo from "../../assets/logo.png";
import s from "./Hearder.styles";

export function Header({}) {
  return (
    <>
      <Image style={s.img} source={logo} resizeMode="contain" />
      <Text style={s.text}>Tu as probablement un truc à faire</Text>
    </>
  );
}
