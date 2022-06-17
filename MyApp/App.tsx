
import * as React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';


const Cat = (props: {name: string}) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>I am {props.name} and I am {isHungry ? "hungry" : "full"}</Text>
      <Button title={isHungry ? "Feed me" : "Thank you"} onPress={() => {
        setIsHungry(false)
      }} disabled={!isHungry}/>
    </View>
  )
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <Cat name="Nhat"></Cat>
    </>

  );
};


export default App;
