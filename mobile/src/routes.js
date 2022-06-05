import { NavigationContainer  } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const Stack = createNativeStackNavigator();

function Routes() {

  const defaultOptions = { headerTintColor: "#FFF", headerStyle: { backgroundColor: "#7D40e7" } }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ ...defaultOptions, title: "DevRadar" }} name="Home" component={Main} />
        <Stack.Screen  options={{ ...defaultOptions, title: "Perfil do Github" }} name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;