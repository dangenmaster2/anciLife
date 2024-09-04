import { Pressable, StyleSheet, Text, View } from "react-native";
import { selectUserInfoFocusSection, USER_GENDER } from "../userInfo.slice";
import { useSelector } from "react-redux";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";

const RenderIcons = ({gender, index, pressedIconIndex, onPress}) => {
    const genderIcons = ['gender-male', 'gender-female', 'gender-non-binary'];
    const genderColorCombo = ['#1517af', '#ed8e99', '#b77bb7'];
    const pressColorCombo = ['#161de5', '#6e25bc', '#1685e5'];

    const width = useSharedValue(100);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        if(index !== pressedIconIndex) return {
            width: width.value,
            backgroundColor: '#fff',

        };
        return {
            transform: [
                {scale: scale.value}
            ],
            width: width.value,
            backgroundColor: pressColorCombo[pressedIconIndex]
        }
    })

    useEffect(() => {
        scale.value = withRepeat(withSpring(0.9), 2, true);
    }, [pressedIconIndex])
    
    return(
        <Pressable onPress={onPress}>
            <Animated.View style={[styles.gridWrapper,  animatedStyle]} key={index}>
                <MaterialCommunityIcons 
                    name={genderIcons[index]} 
                    size={40} 
                    color={genderColorCombo[index]} 
                />
                <Text style={styles.genderText}>{gender}</Text>
            </Animated.View>
        </Pressable>
    )
}

const UserGender = ({setGender}) => {
    const [pressedIconIndex, setPressedIconIndex] = useState(-1);
    const genderList = ['Male', 'Female', 'Others'];

    const pressHandler = (index) => {
        setPressedIconIndex(index);
        setGender(genderList[index]);
    }

    return (
        <View style={styles.genderInfoContainer}>
            <Text style={styles.selctGender}>Select your gender</Text>
            <Text style={styles.genderRecommendationText}>
                To make sure you receive the best recommendation we need to know your gender
            </Text>
            <View style={styles.genderGridContainer}>
                {genderList.map((gender, index) => (
                    <View key={index.toString()}>
                        <RenderIcons 
                            gender={gender} 
                            index={index} 
                            pressedIconIndex={pressedIconIndex}
                            onPress = {() =>{
                                pressHandler(index)
                                }
                            }
                            />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    selctGender: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    genderRecommendationText: {
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    genderInfoContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    genderButtonContainer: {
        height: '20%',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    gridWrapper: {
        backgroundColor: 'white',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRadius: 5
    },
    genderGridContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 30,
    },
    genderText: {
        fontSize: 17,
        paddingTop: 6,
        fontWeight: 'bold',
    },
});

export default UserGender;
