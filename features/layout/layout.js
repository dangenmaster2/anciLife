import { StyleSheet, TextInput, View } from "react-native";
import Login from "../login/login";

export const ThemedButton = ({ text }) => {
    return(
        <View>
            <Button title={text} />
        </View>
    )
}

export const ThemedInput = (props) => {
    return(
        <View>
            {
                props.inputs.map((input, index) => (
                <TextInput key={index} style={styles.textInput} placeholder={input}/>
                    )
                )
            }
        </View>
    )
}
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
      width: '100%'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 330,
        margin: 8,
        height: 48,
        backgroundColor: 'white',
        paddingLeft: 16,
        borderRadius: 7
    },
  });
  

export default Layout;