import { StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming, interpolateColor } from 'react-native-reanimated';
import useLogout from "../hooks/useLogout";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs, fetchAllCategories, fetchUserData, selectAllBlogFetchStatus, selectAllBlogsResponse, selectAllBlogsWithId, selectAllCategories, selectFetchUserDataStatus } from "./home.slice";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import ArticleGrid from "./homeComponents/articleGrid";
import AnciLifeLogo from "../../assets/logo/ancilife_logo";
import Quote from "./homeComponents/quote";
import ExploreTopics from "./homeComponents/exploreTopics";

const Colors = {
    start: {
      text: 'white'
    },
    end: {
      text: 'green'
    }
  }

const HomeHeader = () => {
    return(
        <View style={styles.homeHeaderView}>
            <View style={styles.HomeHeaderFirstCol}>
                <AnciLifeLogo 
                    height={30} 
                    width={30} 
                    color='green' 
                />
                <Text style={{fontSize: 20, paddingLeft: 10, fontWeight: 'bold'}}>anciLife</Text>
            </View>
            <View style={styles.HomeHeaderSecondCol}>
                <AntDesign name="notification" size={24} color="green" style={{paddingLeft: 90}}/>
                <Feather name="bookmark" size={24} color="green" />
            </View>
        </View>
    )
}

const RecentArticles = () => {
    const blogsToRender = useSelector(selectAllBlogsWithId);
    
    return (
        <ArticleGrid 
            blogs={blogsToRender} 
            headerTitle='Recent Articles'
            mainRoute='ArticlesList'
        />
    )
}

const RecommendedArticles = () => {
    const blogsToRender = useSelector(selectAllBlogsWithId);

    return (
        <ArticleGrid 
            blogs={blogsToRender} 
            headerTitle='Recommended For You'
            mainRoute='ArticlesList'
        />
    )
}

const ExploreByTopics = () => {
    const allTopicsArray = useSelector(selectAllCategories);
    
    return (
        <View>
            {/* <ExploreTopics /> */}
        </View>
    )
}

const Home = () => {
    const { userLogoutFnc } = useLogout();
    const dispatch = useDispatch();
    const allBlogFetchStatus = useSelector(selectAllBlogFetchStatus);
    const scale = useSharedValue(1);
    const fontSizeText = useSharedValue(20);
    const colorProgress = useSharedValue(0);

    const [loaded, error] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
        'Cabin': require('../../assets/fonts/Cabin-VariableFont_wdth,wght.ttf'),
        'Product Sans Italic': require('../../assets/fonts/Product Sans Italic.ttf'),
        'Product Sans Regular': require('../../assets/fonts/Product Sans Regular.ttf'),
        'Product Sans Bold': require('../../assets/fonts/Product Sans Bold.ttf'),
        'Product Sans Bold Italic': require('../../assets/fonts/Product Sans Bold Italic.ttf'),
      });

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
        dispatch(fetchAllCategories());
    },[])

    return(
        <View style={styles.homeScreenContainer}>
            {
                allBlogFetchStatus !== 'succeeded' && (!loaded && !error) ? 
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
                    <HomeHeader />
                    <Quote />
                    <RecentArticles />
                    <RecommendedArticles />
                    <ExploreByTopics />
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    loadingText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    loadingLogo: {
        scale: 2
    },
    homeHeaderView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    HomeHeaderFirstCol: {
        flexDirection: 'row',
        // flex: 2
    },
    HomeHeaderSecondCol: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: .65
    },
    homeScreenContainer: {
        // flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 55,
        paddingHorizontal: 15
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