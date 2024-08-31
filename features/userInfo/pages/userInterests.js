import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import interestTopics from '../healthTopics.js';

const InterstGrid = ({ item }) => {
    return (
        <View style={styles.gridItem}>
            <View style={styles.imageContainer}>
                <Image source={item.img} style={[styles.image]}/>
            </View>
            <Text style={styles.interestGridTxt}>{item.topic}</Text>
        </View>
    );
};

const UserInterests = () => {
    console.log(interestTopics);
    return (
        <View style={styles.userInfoContainer}>
            <View style={styles.interestHeader}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Choose some Topic</Text>
                <Text style={{textAlign: 'center'}}>Please choose some topic below and you are ready to explore AnciLife</Text>
            </View>
            <FlatList 
                data={interestTopics}
                renderItem={({ item }) => <InterstGrid item={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    userInfoContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    gridItem: {
        paddingTop: 27,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {

    },
    image: {
        height: 100,
        width: 150,
        borderRadius: 10
    },
    interestGridTxt: {
        color: "#fff",
        fontWeight: 'bold',
        paddingTop: 8
    },
    interestHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        textAlign: 'center',
    }
});

export default UserInterests;
