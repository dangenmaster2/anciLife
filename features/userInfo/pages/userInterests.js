import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
import interestTopics from '../healthTopics.js';

const InterstGrid = ({item, onPress, selectedId, currentPressedIndex}) => {
  const isSelected = selectedId?.find(el => el === item.id) || false;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    if (isSelected && currentPressedIndex === item.id) {
      return {
        transform: [{scale: scale.value}],
      };
    } else {
      return {
        transform: [{scale: 1}],
      };
    }
  });

  useEffect(() => {
    scale.value = withRepeat(withSpring(0.9), 2, true);
  }, [selectedId]);
  return (
    <Pressable style={styles.gridItem} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={item.img}
          style={[styles.image, animatedStyle]}
        />
        {isSelected && (
          <AntDesign
            style={styles.tickIconContainer}
            name="checkcircle"
            size={24}
            color="black"
          />
        )}
      </View>
      <Text style={styles.interestGridTxt}>{item.topic}</Text>
    </Pressable>
  );
};

const UserInterests = ({userTopicInterests, setUserTopicInterests}) => {
  const [selectedId, setSelectedId] = useState([]);
  const [currentPressedIndex, setCurrentPressedIndex] = useState(0);

  const gridPressHandler = item => {
    let newSelectedId = selectedId;
    let newUserTopicInterests = userTopicInterests;
    setCurrentPressedIndex(item.id);
    if (!selectedId.includes(item.id)) {
      newSelectedId = [...selectedId, item.id];
      newUserTopicInterests = [
        ...userTopicInterests,
        {item_topic: item.topic, item_id: item.id},
      ];
      setSelectedId(newSelectedId);
      setUserTopicInterests(newUserTopicInterests);
    } else {
      const idIndex = selectedId.find(el => el === item.id);
      newSelectedId = [...selectedId.filter(item => item !== idIndex)];
      newUserTopicInterests = newUserTopicInterests.filter(
        interests => interests.item_id === item.id,
      );
      setSelectedId(newSelectedId);
      setUserTopicInterests(newUserTopicInterests);
    }
  };
  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.interestHeader}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Choose some Topic
        </Text>
        <Text style={{textAlign: 'center'}}>
          Please choose some topic below and you are ready to explore AnciLife
        </Text>
      </View>
      <FlatList
        data={interestTopics}
        style={styles.flatListGridContainer}
        renderItem={({item}) => (
          <InterstGrid
            item={item}
            onPress={() => {
              gridPressHandler(item);
            }}
            selectedId={selectedId}
            currentPressedIndex={currentPressedIndex}
          />
        )}
        keyExtractor={item => item.id.toString()}
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
    paddingTop: 50,
  },
  flatListGridContainer: {
    width: '80%',
  },
  gridItem: {
    paddingTop: 17,
    margin: 10,
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 150,
    borderRadius: 10,
  },
  tickIconContainer: {
    marginLeft: -26,
  },
  interestGridTxt: {
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 8,
  },
  interestHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

export default UserInterests;
