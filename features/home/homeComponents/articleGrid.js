import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { navigate } from "../../../components/Utility";
const {height, width} = Dimensions.get('window');

const ArticleGrid = ({item, onPress}) => {
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
                    fontFamily: 'Product Sans Regular',
                    fontSize: 18,
                     }}>{item.title}</Text>
            </View>
        </Pressable>
    )
}

const AllArticlesHeader = ({ headerTitle, mainRoute }) => {

const allArticlesPressHandler = () => {
    navigate(mainRoute, {
        headerTitle
    })
}

return(
    <View style={styles.allArticlesHeader}>
        <Text style={{
            fontSize: 20, 
            paddingLeft: 5,
            fontFamily: 'Product Sans Bold'
            }}>{headerTitle}</Text>
            <Pressable onPress={allArticlesPressHandler}>
                <AntDesign name="arrowright" size={24} color="green" />
            </Pressable>
    </View>
)
}

const ArticlesGrid = ({ blogs, headerTitle, mainRoute }) => {
    const articleGridPressHandler = (item) => {
        navigate('Article', {
            articleId: item.id
        });
    }

    return(
        <View style={styles.articlesGridContainer}>
            <AllArticlesHeader headerTitle={headerTitle} mainRoute={mainRoute}/>
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
        paddingTop: 10
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