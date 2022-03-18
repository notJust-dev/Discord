import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const Button = ({ title = "Button", onPress = () => {} }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    margin: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Button;
