import { Text, View, TouchableOpacity, Image, ActivityIndicator, Alert,ImageBackground, StatusBar} from 'react-native';
import { NASAurl, styles } from "../App.js"
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import SystemNavigationBar from 'react-native-system-navigation-bar';

SystemNavigationBar.navigationHide();
StatusBar.setHidden(true, 'fade');

export default function Main({ navigation, route }) {
    StatusBar.setHidden(true, 'fade');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [info, setInfo] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(require("../assets/weathers/Cloudy.png"));
    const [weatherCondition, setWeatherCondition] = useState("");
    useEffect(() => {

  }, []);
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

    function determineWeather(data) {
        try {
            const values = data?.properties?.parameter;
            if (!values) return "Unknown";

            const T2M = Object.values(values.T2M || {}).slice(-1)[0];       // Temperature
            const PRECTOT = Object.values(values.PRECTOT || {}).slice(-1)[0]; // Precipitation
            const SNODP = Object.values(values.SNODP || {}).slice(-1)[0];   // Snow depth
            const TS = Object.values(values.TS || {}).slice(-1)[0];         // Surface temperature

            // Determine condition:
            if (PRECTOT > 10) return "Thunder";
            if (PRECTOT > 1) return "Rain";
            if (SNODP > 0) return "Snow";
            if (T2M < 0) return "Cold";
            if (T2M > 30) return "Sun";
            return "Cloudy";
        } catch (e) {
            console.error("Error determining weather:", e);
            return "Unknown";
        }
    }

    function selectWeatherIcon(condition) {
        switch (condition) {
            case "Thunder": return require("../assets/weathers/Thunder.png");
            case "Rain": return require("../assets/weathers/Rain.png");
            case "Snow": return require("../assets/weathers/Cold.png");
            case "Cold": return require("../assets/weathers/Moon.png");
            case "Sun": return require("../assets/weathers/Sun.png");
            case "Cloudy": return require("../assets/weathers/Cloudy.png");
            default: return require("../assets/weathers/Fail.png");
        }
    }

    function getWeatherData({ la, lo, datastart, dataend }) {
        fetch(`${NASAurl}/temporal/hourly/point?parameters=T2M,PRECTOT,SNODP,TS&community=SB&longitude=${lo}&latitude=${la}&start=${datastart}&end=${dataend}&format=json&time-standard=UTC`)
            .then(response => response.json())
            .then(data => {
                console.log("Weather data received:", data);

                setErrorMsg(null);
                const condition = determineWeather(data);
                setWeatherCondition(condition);
                setWeatherIcon(selectWeatherIcon(condition));
                // setInfo(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                setWeatherCondition('Failed')
                setErrorMsg("Could not fetch weather data. " + error.message);
                setIsLoading(false);
            });
    }

    async function dateCalc() {
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
            setInfo({'coordsLatitude': la, "coordLongitude": lo, 'Data': dataEnd})
            getWeatherData({ la: la, lo: lo, datastart: dataStart, dataend: dataEnd });
        } catch (error) {
            console.error("Error getting location:", error);
            setErrorMsg('Error getting location. Check device settings.');
            setIsLoading(false);
            checkInternetConnection();
        }
    }

    const checkInternetConnection = () =>
        Alert.alert("Connection is failed!", 'Please! Check your internet connection.', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Try Again', onPress: dateCalc },
    ]);

    useEffect(() => {
        (async () => {
            await dateCalc();
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ height: '100%', width: "100%", alignItems: "center", justifyContent: "center" }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#81cae7ff" />
                ) : errorMsg ? (
<View style={styles.mainPos}>
                        <View style={{width: '100%', height: '30%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor:"#442266ff"}}>
                        <Image style={{    width: "60%", height: "100%"}} source={require("../assets/weathers/Fail.png")} />
                        <Text style={{ color: 'white', fontSize: 24, marginBottom: 50, fontFamily: 'monospace', fontWeight: 'bold' }}>{weatherCondition}</Text>
                        </View>

  <Image 
    style={{ height: '40%', width: '50%' }} 
    source={require("../assets/sadRobot.png")} 
  />

  <ImageBackground
    source={require('../assets/cloudPanel.png')}
    resizeMode="contain"
    style={{
      width: '100%',
      aspectRatio: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      gap: 40, // Optional spacing between buttons
    }}
  >
    <TouchableOpacity onPress={dateCalc}>
      <Image 
        style={{ height: 50, width: 50 }}  
        source={require("../assets/refresh.png")}
      />
    </TouchableOpacity>
  </ImageBackground>
</View>

                ) : (
                    <View style={styles.mainPos}>
                        <View style={{width: '100%', height: '30%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor:"#442266ff"}}>
                        <Image style={{    width: "60%", height: "100%"}} source={weatherIcon} />
                        <Text style={{ color: 'white', fontSize: 24, marginBottom: 50, fontFamily: 'monospace', fontWeight: 'bold' }}>{weatherCondition}</Text>
                        </View>

                        <Image style={{height: '40%',width: '50%'}} source={require("../assets/robotHappy.png")} />
                        <ImageBackground 
  source={require('../assets/cloudPanel.png')} 
  resizeMode="contain" 
  style={{
    width: '100%',
    aspectRatio: 3,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  }}
>
  <TouchableOpacity onPress={() => navigation.navigate('Chat', { weather: info })}>
    <Image style={{ height: 45, width: 45 }} source={require("../assets/chat.png")} />
  </TouchableOpacity>

  <TouchableOpacity onPress={dateCalc}>
    <Image style={{ height: 45, width: 45 }} source={require("../assets/refresh.png")} />
  </TouchableOpacity>
</ImageBackground>



                    </View>
                )}
            </View>
        </View>
    );
}
