import { FlatList, StyleSheet, View, Animated } from "react-native";
import OnBoardingItem from "./onboardingItem";
import slides from "./slides";
import { useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Paginator from "./paginator";
import NextButton from "./nextButton";
import { useDispatch } from "react-redux";
import { setOnboardingCompleted } from "./onBoarding.slice";

const OnBoarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const slidesRef = useRef(null);

    const viewConfig = { viewAreaCoveragePercentThreshold: 50 };

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
        }

        else {
            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true');
                dispatch(setOnboardingCompleted(true));
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <View style={styles.onBoardingContainer}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnBoardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            
            <Paginator data={slides} scrollX={scrollX}/>
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100/slides.length)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    onBoardingContainer: {
        // flex: 1,
        // marginTop: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        // width: 300
    },
});

export default OnBoarding;
