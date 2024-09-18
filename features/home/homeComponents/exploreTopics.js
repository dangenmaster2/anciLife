import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Sample data to render the topics
const topics = [
  { id: '1', title: 'Travel', articles: 20423, image: 'https://example.com/travel.jpg' },
  { id: '2', title: 'Health', articles: 19842, image: 'https://example.com/health.jpg' },
  { id: '3', title: 'Science & Technology', articles: 14385, image: 'https://example.com/science.jpg' },
  { id: '4', title: 'Economy', articles: 15293, image: 'https://example.com/economy.jpg' },
  { id: '5', title: 'Food & Drink', articles: 12849, image: 'https://example.com/food.jpg' },
  { id: '6', title: 'Sports', articles: 18237, image: 'https://example.com/sports.jpg' },
  { id: '7', title: 'Lifestyle', articles: 10683, image: 'https://example.com/lifestyle.jpg' },
  { id: '8', title: 'Education', articles: 16843, image: 'https://example.com/education.jpg' },
  { id: '9', title: 'Business', articles: 13585, image: 'https://example.com/business.jpg' },
  { id: '10', title: 'Music', articles: 17488, image: 'https://example.com/music.jpg' },
  { id: '11', title: 'Politics', articles: 11384, image: 'https://example.com/politics.jpg' },
  { id: '12', title: 'Art & Design', articles: 13852, image: 'https://example.com/art.jpg' },
];

// Header component
const Header = () => (
  <View style={styles.header}>
    <AntDesign name="arrowleft" size={24} color="black" />
    <Text style={styles.headerTitle}>Explore by Topics</Text>
    <Ionicons name="search-outline" size={24} color="black" />
  </View>
);

// Each grid item (topic)
const TopicCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.articles}>{item.articles.toLocaleString()} articles</Text>
  </TouchableOpacity>
);

const ExploreTopics = () => {
  const handleTopicPress = (item) => {
    // Handle topic press, you can navigate to the articles list for the selected topic
    console.log(`Selected topic: ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={topics}
        numColumns={2} // Display two columns
        renderItem={({ item }) => <TopicCard item={item} onPress={handleTopicPress} />}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row} // To style the rows
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between', // Space between the two columns
    marginBottom: 15, // Space between rows
  },
  card: {
    width: width / 2 - 24, // Half of the screen width minus padding
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  articles: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default ExploreTopics;
