import { Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useSelector } from "react-redux";
import { selectAllBlogsResponse } from "../home.slice";
import RenderHtml from 'react-native-render-html';

const {height, width} = Dimensions.get('window');

const ArticleMainImage = ({ source }) => {
    return(
        <View>
            <Image
                style={styles.articleMainImage}
                source={{
                    uri: source,
                }}
                />
        </View>
    )
}

const Article = ({ route }) => {
    const allArticles = useSelector(selectAllBlogsResponse);
    const articleId = route.params.articleId;
    const currentArticle = allArticles.find((article) => article.id === articleId);
    const { thumbnail } = currentArticle || {}; 
    const { title, content } = currentArticle.blogs || {}; 

    const renderersProps = {
        img: {
          enableExperimentalPercentWidth: true
        }
      };

    const htmlRendererStyles = {
        body: {
          whiteSpace: 'normal',
        //   fontFamily: 'Product Sans Regular',
          color: 'black',
          margin: 10,
          fontSize: 18
        },
        a: {
          color: 'green'
        }
    };

    const defaultTextProps = {
        style: {
            fontFamily: 'Product Sans Regular',
        },
    };

    return(
        <View style={styles.articlePageContainer}>
            <ScrollView>
                <View style={styles.articleMainImageContainer}>
                    <ArticleMainImage source={thumbnail} />
                </View>
                <Text style={styles.articleHeader}>{title}</Text>
                <RenderHtml
                    contentWidth={width}
                    source={{html: content}}
                    renderersProps={renderersProps}
                    tagsStyles={htmlRendererStyles}
                    defaultTextProps={defaultTextProps}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    articleMainImage: {
        height: height * 0.4,
        width: width*0.9,
        borderRadius: 20
    },
    articleMainImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    articleHeader: {
        fontFamily: 'Product Sans Bold',
        fontSize: 28,
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    articlePageContainer: {
        flex: 1,
        paddingTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default Article;