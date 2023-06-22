import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import s from "./App.styles";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { useEffect, useState } from "react";
import { Menu } from "./components/Menu/Menu";
import { Button } from "./components/Button/Button";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [dialogVisible, setDiablogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  async function saveTodoList() {
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (err) {
      alert("Erreur " + err);
    }
  }

  async function loadTodoList() {
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todoList");
      if (stringifiedTodoList) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert("Erreur " + err);
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

  function showAddDialod() {
    setDiablogVisible(true);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setDiablogVisible(false);
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
            <Button onPress={showAddDialod} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <Menu
        todoList={todoList}
        onPress={setSelectedMenu}
        selectedMenu={selectedMenu}
      />
      <Dialog.Container
        visible={dialogVisible}
        onBackdropPress={() => setDiablogVisible(false)}
      >
        <Dialog.Title> Créer une tâche</Dialog.Title>
        <Dialog.Description>Choisi un nom</Dialog.Description>
        <Dialog.Input onChangeText={setInputValue} />
        <Dialog.Button
          disabled={inputValue.trim().lenght === 0}
          label="Créer"
          onPress={addTodo}
        />
      </Dialog.Container>
    </>
  );
}
