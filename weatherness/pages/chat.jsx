import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { GoogleGenAI } from "@google/genai";
import Main from "./main";
import { useRoute } from '@react-navigation/native';
const ai = new GoogleGenAI({ apiKey: 'AIzaSyB-44Y1sx5OLWPVSoKCZuwJvlvQ7Yipez0' });


export default function Chat({ navigation, route }) {

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
      const fullRequest = "Make the answer so short (about conditions, temperature, city, country, recomendations about what clothes to wear on): " + request + (JSON.stringify(weather) ? (' ' + JSON.stringify(weather)) : '');
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
        {responseText}
      </Text>
      <Text style={styles.label}>Print your request:</Text>
      <TextInput
        style={styles.input}
        placeholder="For example: What is the weather like today?"
        placeholderTextColor="#aaa"
        value={request}
        onChangeText={setRequest}
      />
      <View style={{width: '100%', height: '15%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handlePress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Завантаження..." : "Enter"}
          </Text>
        </TouchableOpacity>
              <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={()=>{navigation.goBack()}}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

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
    top:250
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#81cae7",
    backgroundColor: "#1e1e1e",
    color: "white",
    borderRadius: 8,
    
    top: 250,
    paddingBottom: 50,
    
    
    fontSize: 16,
    height: "10%"
  },
  result: {
    align:"left",
    marginTop: 20,
    color: "#81cae7",
    fontSize: 18,
  },
  button: {
    top:250,
  backgroundColor: '#81cae7',
  paddingVertical: 10,
  paddingHorizontal: 50,
  borderRadius: 8,
  marginTop: 5, // 🔹 відстань між кнопками
  width: '100%'
},
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  
});