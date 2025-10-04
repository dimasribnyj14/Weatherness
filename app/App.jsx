import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function App(){
  const handlePress = () => {
    alert("Ти натиснув кнопку!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Weather AI</Text>
      <Text style={styles.text}>Твій розумний помічник погоди</Text>
      <Button title="Отримати рекомендацію" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});
