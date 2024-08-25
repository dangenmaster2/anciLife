import { Pressable, StyleSheet, Text, View } from "react-native"
import useLogout from "../hooks/useLogout";
import PrimaryButton from "../../components/PrimaryButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db,  collection, getDocs } from "../../firebase/firebase";
import { useEffect } from "react";

const Home = ({navigation}) => {
    const { userLogoutFnc } = useLogout();
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')
        }
        catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const colRef = collection(db, 'articles');
        getDocs(colRef).then((snapshot) => {
            let articles = [];
            console.log('docs ', snapshot.docs)
            snapshot.docs.forEach((doc) => {
                // console.log('---data ', doc.data())
                // articles.push({...doc.data(), id:doc.id})
            })
        })
    }, [])
    return(
        <View style={styles.homeScreenContainer}>
            <PrimaryButton
                onPress={() => {
                    navigation.navigate('layout')
                    userLogoutFnc();
                    clearOnboarding();
                }}
                buttonText='LOG OUT'
            >
            </PrimaryButton>
        </View>
    )
}
const styles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Home;