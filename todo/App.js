import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import s from "./App.styles";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { useState } from "react";

export default function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "manger une pizza", isCompleted: true },
    { id: 2, title: "Boire une bierre", isCompleted: true },
    { id: 3, title: "Chanter sous la pluie", isCompleted: false },
    { id: 4, title: "jouer à diablo", isCompleted: true },
  ]);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>
              {todoList.map((c) => (
                <View style={s.cardItem} key={c.id}>
                  <Card todo={c} />
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
