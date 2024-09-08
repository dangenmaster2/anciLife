import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native"
// import AutoCode from '../../../svgs/autoCode.svg';
// import AncilifeLogo from '../../../assets/logo/ancilife_logo.svg';
import AutoCode from "../../../assets/logo/ancilife_logo";
import AnciLifeLogo from "../../../assets/logo/ancilife_logo";
import { useFonts } from 'expo-font';
const {height, width} = Dimensions.get('window');

const ArticleGrid = ({item}) => {
    const [loaded, error] = useFonts({
        'Inter-Black': require('../../../assets/fonts/Rubik/Rubik-Italic-VariableFont_wght.ttf'),
      });
    
      if (!loaded && !error) {
        return null;
      }
    return(
        <View style={styles.articleGridContainer}>
            <Image
                style={styles.blogThumbnail}
                source={{
                    uri: item.blogThumnail,
                }}
            />
            <Text style={{ fontFamily: 'Inter-Black', fontSize: 15 }}>{item.title}</Text>
        </View>
    )
}

const ArticlesGrid = ({ blogs }) => {
    return(
        <View style={styles.articlesGridContainer}>
            <FlatList 
                data={blogs}
                style={styles.flatListArticleContainer}
                renderItem={({ item }) => <ArticleGrid 
                    item={item} 
                    // onPress={() => {gridPressHandler(item)}}
                    // selectedId={selectedId}
                    // currentPressedIndex={currentPressedIndex}
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