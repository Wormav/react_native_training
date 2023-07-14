import { ImageBackground } from "react-native";
import { s } from "./Container.styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import backgroundImg from "../../assets/background.png";

export function Container({ children }) {
  return (
    <ImageBackground
      source={backgroundImg}
      style={s.img_background}
      imageStyle={s.img}
    >
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>{children}</SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
