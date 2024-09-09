import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useSelector } from "react-redux";
import { selectAllBlogsResponse } from "../home.slice";
import RenderHtml from 'react-native-render-html';

const Article = ({ route }) => {
    const allArticles = useSelector(selectAllBlogsResponse);
    const articleId = route.params.articleId;
    const currentArticle = allArticles.find((article) => article.id === articleId);
    const {title, content} = currentArticle.blogs || {}; 
    const { width } = useWindowDimensions();

    return(
        <View style={styles.articlePageContainer}>
            <View>
                <Text>{title}</Text>
                <RenderHtml
                    contentWidth={width}
                    source={{html: content}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    articlePageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Article;