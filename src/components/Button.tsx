import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const Button = ({ onPress = () => {}, title = "Button" }) => {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Button;
