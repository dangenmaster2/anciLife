import { View } from 'react-native';
import Layout from './features/layout/layout';
import { Provider } from 'react-redux';
import { store } from './features/store/redux/store';

const App = () => {
  return(
    <Provider store={store}>
      <View>
        <Layout />
      </View>
    </Provider>
  )
}

export default App;