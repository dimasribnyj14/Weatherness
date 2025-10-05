import { StyleSheet, LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// Pages
import Main from "./pages/main"
import Chat from "./pages/chat"
//
const Stack = createNativeStackNavigator()
export const NASAurl = `https://power.larc.nasa.gov/api`
export const GeminiURL = ``
LogBox.ignoreAllLogs();
StatusBar.setHidden(true);
// Func APP
export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen options={{headerShown: false}} name="Main" component={Main}/>
      {/* <Stack.Screen options={{headerShown: false}} name="Chat" component={Chat}/> */}
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  blackBG:{
    backgroundColor:"#252124"
  },
  blackLightBG:{
    backgroundColor:"#4F4F4F"
  },
  orangeBG:{
    backgroundColor:"#E19A38"
  },
  white:{
    color:"#fff",
  },
  black:{
    color:"#252124",
  },
  orange:{
    color: "#E19A38"
  },
  red:{
    color: "#E15638"
  },
  font40:{
    fontSize:40
  },
  font32:{
    fontSize:32
  },
  font24:{
    fontSize:24
  },
  font20:{
    fontSize:20
  },
  font16:{
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
