import Layout from './features/layout/layout';
import { Provider } from 'react-redux';
import { store } from './features/store/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AntDesign from '@expo/vector-icons/AntDesign';

import Home from './features/home/home';
import OnBoarding from './features/onboarding/onboarding';
import Meditation from './features/meditation/meditation';
import Profile from './features/profile/profile';
import Explore from './features/explore/explore';
import Article from './features/home/homeComponents/article';

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen options={{ headerShown: false }} name="MainHome" component={Home} />
      <HomeStack.Screen options={{ headerShown: false }} name="Article" component={Article} />
    </HomeStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
            iconColor = focused ? 'green' : 'black';
          } else if (route.name === 'Meditation') {
            iconName = focused ? 'hearto' : 'hearto';
            iconColor = focused ? 'green' : 'black';
          }

          else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
            iconColor = focused ? 'green' : 'black';
          }

          else if (route.name === 'Explore') {
            iconName = focused ? 'rightcircleo' : 'rightcircleo';
            iconColor = focused ? 'green' : 'black';
          }

          return <AntDesign name={iconName} size={24} color={iconColor} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'black',
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Meditation" component={Meditation} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;