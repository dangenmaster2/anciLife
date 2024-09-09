import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
// import AutoCode from '../../../svgs/autoCode.svg';
// import AncilifeLogo from '../../../assets/logo/ancilife_logo.svg';
import AutoCode from "../../../assets/logo/ancilife_logo";
import AnciLifeLogo from "../../../assets/logo/ancilife_logo";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
const {height, width} = Dimensions.get('window');

const ArticleGrid = ({item, onPress, navigation}) => {
    const [loaded, error] = useFonts({
        'Inter-Black': require('../../../assets/fonts/Rubik/Rubik-Italic-VariableFont_wght.ttf'),
      });
    
      if (!loaded && !error) {
        return null;
      }
    return(
        <Pressable onPress={onPress}>
            <View style={styles.articleGridContainer} onPress={onPress}>
                <Image
                    style={styles.blogThumbnail}
                    source={{
                        uri: item.blogThumnail,
                    }}
                    navigation={navigation}
                />
                <Text style={{ fontFamily: 'Inter-Black', fontSize: 15 }}>{item.title}</Text>
            </View>
        </Pressable>
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
    articlesGridContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
        // justifyContent: 'center',
        // alignItems: 'flex-start'
    },
    articleGridContainer: {
        height: (width/2.4),
        width: (width/2.4),
        borderRadius: 10,
        margin: 2.5
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