import { Pressable, StyleSheet, Text, View } from "react-native"
import useLogout from "../hooks/useLogout";
import PrimaryButton from "../../components/PrimaryButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';
import AncilifeLogo from '../../assets/logo/ancilife_logo.svg';
import RenderHtml from 'react-native-render-html';
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoCollected } from "../layout/layout.slice";
import { selectAllUserInfo, setAllUserInfo } from "../userInfo/userInfo.slice";
import { fetchAllBlogs, fetchUserData, selectAllBlogFetchStatus, selectAllBlogsResponse, selectAllBlogsWithId, selectFetchUserDataStatus } from "./home.slice";
import ArticleGrid from "./homeComponents/articleGrid";
import AnciLifeLogo from "../../assets/logo/ancilife_logo";

const Home = ({navigation}) => {
    const { userLogoutFnc } = useLogout();
    const dispatch = useDispatch();
    const userDataFetchStatus = useSelector(selectFetchUserDataStatus);
    const allBlogFetchStatus = useSelector(selectAllBlogFetchStatus);
    const blogsToRender = useSelector(selectAllBlogsWithId);
    const { width } = useWindowDimensions();

    const clearUserInfoData = async () => {
        try {
            await AsyncStorage.removeItem('@userInfoData')
            dispatch(setUserInfoCollected(false));
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        dispatch(fetchUserData());
        dispatch(fetchAllBlogs());
    },[])

    return(
        <View style={styles.homeScreenContainer}>
            {
                allBlogFetchStatus !== 'succeeded' ? 
                <View>
                    <AnciLifeLogo height={130} width={130} color='green'/>
                </View>
                :
                <View>
                    <ArticleGrid blogs={blogsToRender} />
                    {/* {blogsToRender?.map((blog, index) => (
                        <View key={blog.id}>
                            <Text>{blog.title}</Text>
                            <RenderHtml 
                                contentWidth={width}
                                source={{html: blog.content}}
                            />
                        </View>
                    ))} */}
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    homeScreenContainer: {
        // flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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