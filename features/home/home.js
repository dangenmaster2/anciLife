import { StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming, interpolateColor } from 'react-native-reanimated';
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs, fetchUserData, selectAllBlogFetchStatus, selectAllBlogsResponse, selectAllBlogsWithId, selectFetchUserDataStatus } from "./home.slice";
import ArticleGrid from "./homeComponents/articleGrid";
import AnciLifeLogo from "../../assets/logo/ancilife_logo";

const Colors = {
    start: {
      text: 'white'
    },
    end: {
      text: 'green'
    }
  }

const Home = ({navigation}) => {
    const { userLogoutFnc } = useLogout();
    const dispatch = useDispatch();
    const allBlogFetchStatus = useSelector(selectAllBlogFetchStatus);
    const blogsToRender = useSelector(selectAllBlogsWithId);

    const scale = useSharedValue(1);
    const fontSizeText = useSharedValue(20);
    const colorProgress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value}
            ],
        }
    })

    const textAnimatedStyle = useAnimatedStyle(()=> {
        return {
            fontSize: fontSizeText.value
        }
    })

    const textColorAnimateStyle = useAnimatedStyle(()=> {
        const backgroundColors = interpolateColor(
            colorProgress.value,
            [0,1],
            [Colors.start.text, Colors.end.text]
          )
          return { color: backgroundColors }
    })

    useEffect(() => {
        scale.value = withRepeat(withSpring(0.9), 2);
        fontSizeText.value = withSpring(40);
        colorProgress.value = withTiming(1);
    }, [])

    useEffect(()=> {
        dispatch(fetchUserData());
        dispatch(fetchAllBlogs());
    },[])

    return(
        <View style={styles.homeScreenContainer}>
            {
                allBlogFetchStatus !== 'succeeded' ? 
                <View>
                    <View style={{height: 70, justifyContent: 'center', alignItems: 'center'}}>
                        <AnciLifeLogo 
                            height={130} 
                            width={130} 
                            color='green' 
                            style={[animatedStyle, styles.loadingLogo]}/>
                    </View>
                    <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
                        <Animated.Text 
                        style={[styles.loadingText, textAnimatedStyle, textColorAnimateStyle]}
                        >AnciLife</Animated.Text>
                    </View>
                </View>
                :
                <View>
                    <ArticleGrid blogs={blogsToRender} navigation={navigation}/>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    loadingText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'PlaypenSans-Bold'
    },
    loadingLogo: {
        scale: 2
    },
    homeScreenContainer: {
        // flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40
    },
})

export default Home;

// const clearOnboarding = async () => {
    //     try {
    //         await AsyncStorage.removeItem('@viewedOnboarding')
    //     }
    //     catch(err) {
    //         console.log(err)
    //     }
    // }
    // const clearUserInfoData = async () => {
    //     try {
    //         await AsyncStorage.removeItem('@userInfoData')
    //         dispatch(setUserInfoCollected(false));
    //     }
    //     catch(err) {
    //         console.log(err)
    //     }
    // }