import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

// TODO
// Fix the re-render issue in this component
const Bazz = ({children, value, setValue}) => {
  console.log('Bazz', value)
  const handler = () => setValue(value * 2)
  return (
    <View>
      <TouchableOpacity onPress={handler}>
        <Text>{value}</Text>
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const App = () => {
  const [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('../assets/fonts/OpenSans.ttf'),
  });

  const [foo, setFoo] = useState(5)
  const [bar, setBar] = useState(5)

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View className="flex-1 items-center justify-center" onLayout={onLayoutRootView}>
      <Bazz setValue={setFoo} value={foo}>Add Foo</Bazz>
      <Text className={'text-6xl font-[OpenSans-Regular]'}>Hello World</Text>
      <Bazz setValue={setBar} value={bar}>Add Bar</Bazz>
    </View>
  );
};

export default App;
