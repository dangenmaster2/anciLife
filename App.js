import Layout from './features/layout/layout';
import { Provider } from 'react-redux';
import { store } from './features/store/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './features/home/home';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="layout" component={Layout} />
        <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;