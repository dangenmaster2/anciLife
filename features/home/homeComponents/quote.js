import { Image, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { fetchQuotes, selectQuoteFetchStatus, selectQuoteResponse } from "../home.slice";
import { useEffect } from "react";

const Quote = () => {
    const dispatch = useDispatch();
    const generatedQuote = useSelector(selectQuoteResponse);
    const quoteFetchStatus = useSelector(selectQuoteFetchStatus);
    
    // let fetchInterval = null;
    // const intervalFetchQuotes = () => {
    //     fetchInterval = setInterval(() => {
    //         dispatch(fetchQuotes());
    //     }, 30000);
    // }

    // useEffect(() => {
    //     intervalFetchQuotes();
    //     return () => {
    //         clearInterval(fetchInterval);
    //         fetchInterval = null;
    //     }
    // }, [])
    return(
        <View style={styles.quoteContainer}>
            <Text style={{
                fontSize: 23, 
                    fontFamily: 'Product Sans Bold Italic',
                    color: '#fff',
                    padding: 10,
                    width: '70%'
                }}>{
                    // quoteFetchStatus === 'loading' ? <Text>Quote Loading...</Text> : 
                    <Text>
                        {/* {generatedQuote?.quote} */}
                        Jai Shree Krishna
                    </Text>
                }</Text>
                {
                    quoteFetchStatus !== 'loading' &&
                    <Image
                    style={styles.blogThumbnail}
                    source={{
                        uri: generatedQuote.thumbnail,
                    }}
                />
                }
            </View>
    )
}

const styles = StyleSheet.create({
    quoteContainer: {
        marginTop: 20,
        height: 'auto',
        backgroundColor: '#20a357',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: 100
    },
    blogThumbnail: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
})

export default Quote;