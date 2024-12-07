import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectMeditationClass, setActiveMeditationType } from "./meditation.slice";
import { useEffect } from "react";

const MeditationClass = ({ route }) => {
    const allMeditationClasses = useSelector(selectMeditationClass);
    const { meditationId } = route.params;

    useEffect(() => {
        if(meditationId) setActiveMeditationType(meditationId)
    }, [meditationId])
    return(
        <View style={styles.meditationClassContainer}>
            <Text>{meditationId}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    meditationClassContainer: {
        flex: 1,
        paddingLeft: 0,
        alignItems: 'center',
        paddingVertical: 40
    }
})

export default MeditationClass;