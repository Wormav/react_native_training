import { Text, TouchableOpacity, View } from "react-native";
import s from "./Menu.styles";

export function Menu({ onPress, selectedMenu, todoList }) {
  const countByStatus = todoList.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.done++ : acc.inProgress++;
      return acc;
    },
    { all: todoList.length, inProgress: 0, done: 0 }
  );

  function getTexTStyle(tabName) {
    return {
      fontWeight: "bold",
      color: tabName === selectedMenu ? "#2F76E5" : "black",
    };
  }

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <Text style={getTexTStyle("all")}>ALL ({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("inProgress")}>
        <Text style={getTexTStyle("inProgress")}>
          IN progress ({countByStatus.inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("done")}>
        <Text style={getTexTStyle("done")}>Done ({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
}
