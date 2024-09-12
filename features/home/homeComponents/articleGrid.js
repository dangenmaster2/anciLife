import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { useEffect } from "react";
const {height, width} = Dimensions.get('window');

const ArticleGrid = ({item, onPress, navigation}) => {
    // const [loaded, error] = useFonts({
    //     'Inter-Black': require('../../../assets/fonts/Rubik/Rubik-Italic-VariableFont_wght.ttf'),
    //   });
    
    //   if (!loaded && !error) {
    //     return null;
    //   }
    return(
        <Pressable onPress={onPress}>
            <View style={styles.articleGridContainer}>
                <Image
                    style={styles.blogThumbnail}
                    source={{
                        uri: item.blogThumnail,
                    }}
                />
                <Text numberOfLines={2} style={{ 
                    // fontFamily: 'Inter-Black', 
                    fontSize: 18,
                    fontWeight: 'bold'
                     }}>{item.title}</Text>
            </View>
        </Pressable>
    )
}

const AllArticlesHeader = ({ navigation }) => {

const allArticlesPressHandler = () => {
    navigation.navigate('RecentArticles')
}

return(
    <View style={styles.allArticlesHeader}>
        <Text style={{
            fontSize: 20, 
            paddingLeft: 5,
            fontWeight: 'bold'
            }}>Recent Articles</Text>
            <Pressable onPress={allArticlesPressHandler}>
                <AntDesign name="arrowright" size={24} color="green" />
            </Pressable>
    </View>
)
}

const ArticlesGrid = ({ blogs , navigation }) => {
    const articleGridPressHandler = (item) => {
        navigation.navigate('Article', {
            articleId: item.id
        });
    }

    useEffect(() => {
        return () => console.log('article grid unmounting');
        
    }, [])

    return(
        <View style={styles.articlesGridContainer}>
            <AllArticlesHeader navigation={navigation}/>
            <FlatList 
                data={blogs}
                style={styles.flatListArticleContainer}
                renderItem={({ item }) => <ArticleGrid 
                    item={item} 
                    onPress={() => {articleGridPressHandler(item)}}
                    />}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal = {true}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 2
    },
    allArticlesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50
    },
    articlesGridContainer: {
        flex: 1,
        paddingTop: 20
    },
    articleGridContainer: {
        height: (width/2.4),
        width: (width/2.4),
        borderRadius: 10,
        marginRight: 6.5
    },
    blogThumbnail: {
        height: (width/2.4),
        width: (width/2.4),
        borderRadius: 10
    },
    flatListArticleContainer: {
        
    },
    articleGridTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Inter-Black'
    }
})

export default ArticlesGrid;