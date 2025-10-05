import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";

const ai = new GoogleGenAI({ apiKey: 'PUT_YOUR_API_KEY_HERE' });
export default function Chat({ navigation, route }) {

const updateWeather = route.params?.updateWeather;
const weather = route.params?.weather;  
  const [request, setRequest] = useState("");
  const [messages, setMessages] = useState([]); // {from: 'user'|'ai', text: string}
  const [loading, setLoading] = useState(false);



  const handlePress = async () => {
    if (!request.trim()) return;
    setLoading(true);
    // Add user message
    setMessages(prev => [...prev, { from: 'user', text: request }]);
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
      setMessages(prev => [...prev, { from: 'ai', text: response.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { from: 'ai', text: e.message || e.toString() }]);
    }
    setRequest("");
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 10 }}
          ref={ref => { if (ref) ref.scrollToEnd({ animated: true }); }}
        >
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} from={msg.from} text={msg.text} />
          ))}
        </ScrollView>
      </View>
      <View style={{ width: '100%', height: 1, backgroundColor: '#444' }}></View>
      <View style={[styles.inputContainer, { width: '90%' }]}>  
        <Text style={styles.label}>Print your request:</Text>
        <TextInput
          style={styles.input}
          placeholder="For example: What is the weather like today?"
          placeholderTextColor="#aaa"
          value={request}
          onChangeText={setRequest}
          editable={!loading}
        />
        <View style={{ width: '100%', height: '25%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
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
            onPress={() => { navigation.goBack(); }}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    paddingVertical: 0,
  },
  bubbleContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    // Remove marginTop and marginBottom for better flex spacing
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    height: '30%',
    // No margin needed, spacing handled by flex
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#a259e6",
    backgroundColor: "#1e1e1e",
    color: "white",
    borderRadius: 8,
    fontSize: 16,
    height: 60,
    marginBottom: 10,
    paddingHorizontal: 20,
    // Remove height: "20%" for better layout
  },
  button: {
    backgroundColor: '#a259e6',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 5,
    width: '100%'
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  userBubble: {
    backgroundColor: '#a259e6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#23272f',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#a259e6',
  },
  bubbleText: {
    color: '#fff',
    fontSize: 16,
  },
  userText: {
    color: '#121212',
  },
});


function ChatBubble({ from, text }) {
  const isUser = from === 'user';
  return (
    <View style={{
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginVertical: 4,
      marginHorizontal: 8,
    }}>

      {!isUser && (
        <Image
          source={require('../assets/adaptive-icon.png')}
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 6 }}
        />
      )}

      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[
          styles.bubbleText,
          isUser && styles.userText
        ]}>
          {text}
        </Text>
      </View>
    </View>
  );
}
