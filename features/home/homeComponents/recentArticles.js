import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from "react-redux";
import { selectAllBlogsWithId } from "../home.slice";
import { navigate } from "../../../App";

const {height, width} = Dimensions.get('window');

const Header = () => {
    return(
        <View style={styles.pageHeader}>
            <View style={styles.headerCol1}>
                <AntDesign name="arrowleft" size={24} color="green" />
                <Text style={{fontWeight: 'bold', fontSize: 22}}>Recent Articles</Text>
            </View>
            <View>
                <Ionicons name="search-outline" size={24} color="green" />
            </View>
        </View>
    )
}

const ArticleGrid = ({item, onPress}) => {
    console.log('item ttile ', item.title);
    
    return(
        <Pressable onPress={onPress}>
            <View style={styles.articleGridContainer}>
                <Image
                    style={styles.blogThumbnail}
                    source={{
                        uri: item.blogThumnail,
                    }}
                />
                <View style={styles.titleMoreIconContainer}>
                    <Text numberOfLines={3} style={{ 
                        fontSize: 18,
                        fontWeight: 'bold'
                        }}>{item.title}
                    </Text>
                    <View style={styles.moreIconContainer}>
                        <MaterialCommunityIcons style={{marginRight: 15}} name="bookmark-plus" size={24} color="green" />
                        <Feather name="more-vertical" size={24} color="green" />
                    </View>
                </View>
                
            </View>
        </Pressable>
    )
}

const RecentArticles = () => {
    const blogsToRender = useSelector(selectAllBlogsWithId);

    const articleGridPressHandler = (item) => {
        navigate('Article', {
            articleId: item.id
        });
    }

    return(
        <View style={styles.allArticles}>
            <Header />
            <FlatList
                data={blogsToRender}
                style={styles.recentArticlesContainer}
                renderItem={({ item }) => <ArticleGrid 
                    item={item} 
                    onPress={() => {articleGridPressHandler(item)}}
                    />}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
                
        </View>
    )
}

const styles = StyleSheet.create({
    articleGridContainer: {
        height: (width/2.4),
        width: (width/2.4),
        borderRadius: 10,
        marginRight: 6.5,
        marginTop: 20,
        flexDirection: 'row'
    },
    blogThumbnail: {
        height: (width/2.5),
        width: (width/2.5),
        borderRadius: 10,
        marginRight: 12
    },
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerCol1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 0.57
    },
    titleMoreIconContainer: {
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    moreIconContainer: {
        flexDirection: 'row',
        flex: 0.35
    },
    allArticles: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 30
        // alignItems: 'center',
        // justifyContent: 'center'
    },
})

export default RecentArticles;