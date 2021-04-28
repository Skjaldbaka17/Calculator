import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import CalculatorScreen from './screens/CalculatorScreen'

function App({ }) {

  return (

    <View style={{ backgroundColor: "#1C1C1C", flex: 1, justifyContent: "flex-end" }}>

      <SafeAreaView>
        <StatusBar barStyle="light-content" translucent={true} />
        <CalculatorScreen />
      </SafeAreaView>

    </View>
  )
}

export default App;