import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from "react-redux";
import { selectAllBlogsWithId } from "../home.slice";
import { navigate } from "../../../components/Utility";

const {height, width} = Dimensions.get('window');

const Header = ({ headerTitle }) => {
    return(
        <View style={styles.pageHeader}>
            <AntDesign name="arrowleft" size={24} color="green" />
            <Text style={{fontFamily: 'Product Sans Bold', fontSize: 22}}>{headerTitle}</Text>
            <Ionicons name="search-outline" size={24} color="green" />
        </View>
    )
}

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
                <View style={styles.titleMoreIconContainer}>
                    <Text numberOfLines={3} style={{ 
                        fontSize: 18,
                        fontFamily: 'Product Sans Regular',
                        }}>{item.title}
                    </Text>
                    <Text style={{
                        fontFamily: 'Product Sans Italic',
                        backgroundColor: 'green',
                        color:'white',
                        paddingLeft: 10,
                        borderRadius: 10,
                        width: '65%'
                        }}>{item.category}</Text>
                    <View style={styles.moreIconContainer}>
                        <MaterialCommunityIcons style={{marginRight: 15}} name="bookmark-plus" size={24} color="green" />
                        <Feather name="more-vertical" size={24} color="green" />
                    </View>
                </View>
                
            </View>
        </Pressable>
    )
}

const ArticlesList = ({route}) => {
    const blogsToRender = useSelector(selectAllBlogsWithId);
    const headerTitle = route.params.headerTitle;
    const articleGridPressHandler = (item) => {
        navigate('Article', {
            articleId: item.id
        });
    }

    return(
        <View style={styles.allArticles}>
            <Header headerTitle={headerTitle}/>
            <FlatList
                data={blogsToRender}
                // style={styles.articlesListContainer}
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
        width: '54%',
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
        paddingBottom: 10
    },
    headerCol1: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
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
        paddingTop: 53,
        paddingHorizontal: 15
    },
})

export default ArticlesList;