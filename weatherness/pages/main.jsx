import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {NASAurl, styles} from "../App.js"
import { useState,useEffect, use } from 'react';
import * as Location from 'expo-location';

export default function Main({navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [info, setInfo] = useState(null)
    

    function calculateDates() {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}`;
        };
        return {
            dataEnd: formatDate(today),
            dataStart: formatDate(sevenDaysAgo)
        };
    }

    function getWeatherData({ la, lo, datastart, dataend }){
        fetch(`${NASAurl}/temporal/hourly/point?parameters=T2M,PRECTOT,SNODP,TS&community=SB&longitude=${lo}&latitude=${la}&start=${datastart}&end=${dataend}&format=json&time-standard=UTC`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Weather data received:", JSON.stringify(data));
            setInfo(JSON.stringify(data))
            setIsLoading(false);
            navigation.navigate('Chat', { weather: info, 
        updateWeather: () => {  } });
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            setErrorMsg("Could not fetch weather data. " + error.message);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        (async () => {

            setIsLoading(true);
            const { dataStart, dataEnd } = calculateDates();
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsLoading(false);
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});

                const la = location.coords.latitude;
                const lo = location.coords.longitude;

                getWeatherData({ la:la, lo:lo, datastart: dataStart, dataend: dataEnd });
                
            } catch (error) {
                console.error("Error getting location:", error);
                setErrorMsg('Error getting location. Check device settings.');
                setIsLoading(false);
            }
           
        })();
    }, []);
     
    
    return(
       <View style={styles.container}>
            <View style={{height: '100%',width: "100%", alignItems: "center", justifyContent: "center"}}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#81cae7ff" />
                ) : errorMsg ? (
                    <Text style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</Text>
                ) : (
                    <Text style={{ color: 'white', textAlign: 'center', height: '100%', width: '60%' }}>Weather data loaded {info}</Text> 
                )}
            </View>
        </View>
        
    )
  }
  