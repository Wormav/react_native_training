import { Image, Text, TouchableOpacity } from "react-native";
import check from "../../assets/check.png";
import s from "./Card.style";

export function Card({ todo }) {
  return (
    <TouchableOpacity style={s.card}>
      <Text
        style={[
          s.text,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.check} source={check} />}
    </TouchableOpacity>
  );
}
