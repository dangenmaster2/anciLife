import { StyleSheet, TextInput, View } from "react-native";
import Login from "../login/login";

const Layout = ({ children }) => {
    return (
        <View style = {styles.appContainer}>
            <Login />
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
      paddingTop: 50,
      paddingHorizontal: 60,
      backgroundColor: '#e3e5d5',
      height: '100%',
      width: '100%',
    }
  });
  

export default Layout;