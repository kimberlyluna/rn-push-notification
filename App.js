import React from 'react';
import { useOktaAuth } from './app/util/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './app/containers/Login';
import Home from './app/containers/Home';

const NavigatorStaticOptions = {
  title: 'Cerby App',
}
const Stack = createStackNavigator();

const App = () => {
  const { authenticated } = useOktaAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          authenticated
            ? <Stack.Screen name="Home" options={{...NavigatorStaticOptions}} component={Home}/>
            : <Stack.Screen name="Login" options={{...NavigatorStaticOptions}} component={Login}/>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
