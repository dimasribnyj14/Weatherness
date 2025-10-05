import React, { useState } from "react";
import { StyleSheet, View, Text, Button, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Chat from './api';

export default function App() {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => setLocation(position),
      error => {
        console.log(error.code, error.message);
        setLocation(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Weather AI</Text>
      <Text style={styles.text}>Твій розумний помічник погоди</Text>
      <Button title="Отримати координати" onPress={getLocation} />

      {location && (
        <Chat
          lat={location.coords.latitude}
          lon={location.coords.longitude}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f4f8" },
  title: { fontSize: 24, marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 20 },
});
