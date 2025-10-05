import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { GoogleGenAI } from "@google/genai";
import Main from "./main";
import { useRoute } from '@react-navigation/native';
const ai = new GoogleGenAI({ apiKey: 'AIzaSyBJlbE-eI6IoFQkx8EYKQ28na1_Mvy4kKA' });


export default function Chat() {
    const route = useRoute();
    const updateWeather = route.params?.updateWeather;
    const weather = route.params?.weather;  
  const [request, setRequest] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      if (typeof updateWeather === 'function') {
        await updateWeather();
      }
      // Формуємо повний запит з погодою
      const fullRequest = request + (weather ? (' ' + weather) : '');
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullRequest,
      });
      setResponseText(response.text);
    } catch (e) {
      setResponseText(e.message || e.toString());
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.result}>
        We: {responseText}
      </Text>
      <Text style={styles.label}>Print your request:</Text>
      <TextInput
        style={styles.input}
        placeholder="For example: What is the weather like today?"
        placeholderTextColor="#aaa"
        value={request}
        onChangeText={setRequest}
      />
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handlePress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Завантаження..." : "Enter"}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#81cae7",
    backgroundColor: "#1e1e1e",
    color: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 1,
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    color: "#81cae7",
    fontSize: 18,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#81cae7',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});