import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import s from "./App.styles";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { useState } from "react";
import { Menu } from "./components/Menu/Menu";

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [todoList, setTodoList] = useState([]);

  function getFilteredList() {
    switch (selectedMenu) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id
    );

    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  function deleteTodo(todo) {
    Alert.alert("Suppression", "Supprimer cette tâche ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((t) => t.id !== todo.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>
              {getFilteredList().map((c) => (
                <View style={s.cardItem} key={c.id}>
                  <Card
                    onPress={updateTodo}
                    onLongPress={deleteTodo}
                    todo={c}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Menu
          todoList={todoList}
          onPress={setSelectedMenu}
          selectedMenu={selectedMenu}
        />
      </View>
    </>
  );
}
