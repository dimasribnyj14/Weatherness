import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";

const startDate = "20251001";
const endDate = "20251002";
const parameters = "T2M,WS10M,RH2M";

export default function Chat({ lat, lon }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return; // якщо координат ще немає, нічого не робимо

    const url = `https://power.larc.nasa.gov/api/temporal/hourly/point?parameters=${parameters}&community=RE&longitude=${lon}&latitude=${lat}&start=${startDate}&end=${endDate}&format=JSON`;

    const getWeatherFromNASA = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const json = await response.json();
        const weather = json.properties.parameter;
        setData(weather);
      } catch (err) {
        console.error("Ошибка запроса:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getWeatherFromNASA();
  }, [lat, lon]); // якщо lat або lon зміняться, useEffect виконається ще раз

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Загрузка данных NASA POWER...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={[styles.text, { color: "red" }]}>Ошибка: {error}</Text>
    </View>
  );

  if (!data) return (
    <View style={styles.center}>
      <Text style={styles.text}>Нет данных для отображения.</Text>
    </View>
  );

  const firstHour = Object.keys(data.T2M)[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🌍 Координаты: {lat}, {lon}</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Погодные данные NASA POWER</Text>
        <Text style={styles.text}>⏰ Первая запись: {firstHour}</Text>
        <Text style={styles.text}>🌡 Температура: {data.T2M[firstHour]} °C</Text>
        <Text style={styles.text}>💨 Ветер: {data.WS10M[firstHour]} м/с</Text>
        <Text style={styles.text}>💧 Влажность: {data.RH2M[firstHour]} %</Text>
      </View>

      <Text style={[styles.text, { marginTop: 20 }]}>📡 Источник: NASA POWER API</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#007AFF",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },
});
