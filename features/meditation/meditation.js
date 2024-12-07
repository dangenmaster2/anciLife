import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { 
    fetchAllMeditationsClasses, 
    fetchAllMeditationsData, 
    fetchAllMeditationsType,
    selectAllMeditationsDataFetchStatus, 
    selectAllMeditationsFetchStatus, 
    selectAllMeditationsType,
    selectMeditationTypeData } 
    from "./meditation.slice";
import { navigate } from "../../components/Utility";
import { useDispatch, useSelector } from "react-redux";
import { selectDeviceDimensions } from "../home/home.slice";
import { TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import MeditationAdvancedSVG from '../../assets/svgs/meditation/meditation-advanced.svg';
import MeditationBeginnerSVG from '../../assets/svgs/meditation/meditation-beginner.svg';
import concentrationAdvancedSVG from '../../assets/svgs/meditation/concentration-advanced.svg';
import concentrationBeginnerSVG from '../../assets/svgs/meditation/concentration-beginner.svg';
import concentrationIntermediateSVG from '../../assets/svgs/meditation/concentration-intermediate.svg';

const SVGRenderer = (id) => {
    const svgList = [
        { id: 'concentration-beginner', svgComponent: concentrationBeginnerSVG },
        { id: 'concentration-advanced', svgComponent: concentrationAdvancedSVG },
        { id: 'meditation-beginner', svgComponent: MeditationBeginnerSVG },
        { id: 'concentration-intermediate',  svgComponent: concentrationIntermediateSVG },
        { id: 'meditation-advanced',  svgComponent: MeditationAdvancedSVG },
      ];
    const svgItem = svgList.find(item => item.id === id);
    return svgItem ? svgItem.svgComponent : null;
}

const MeditationDescription = ({ description }) => {
    return (
        <View style={styles.meditationDescription}>
            <Text style={{fontFamily: 'Product Sans Italic'}}>{description}</Text>
        </View>
    )
}

const MeditationCard = ({ medtationTitleData, index }) => {
    const deviceDimensions = useSelector(selectDeviceDimensions);
    const {height, width} = deviceDimensions;
    const allMeditationTypeData = useSelector(selectMeditationTypeData);
    const currentMeditationTypeData = allMeditationTypeData[medtationTitleData];
    const { meditation, backgroundColor, meditationId, thumbnail } = currentMeditationTypeData;
    const SVGcomponent = SVGRenderer(meditationId);

    const cardHeight = height * 0.195;
    const cardWidth = width * 0.95;

    const commonCardStyle = {
        height: cardHeight, 
        width: cardWidth, 
        borderRadius: 30 
    }

    const handleMeditationCardPress = () => {
        console.log('meditation pressed ', medtationTitleData, index)
        navigate('MeditationClass', {
            meditationId: medtationTitleData
        });
    }

    return (
          <TouchableOpacity style={[
            styles.meditationCard, 
            {backgroundColor: `${backgroundColor}80`,  
            height: cardHeight, 
            width: cardWidth
            }]}
            onPress={handleMeditationCardPress}>
            <View style={styles.svgBackground}>
                <Image
                    style={commonCardStyle}
                    source= {{
                        uri: thumbnail
                    }}
                />
            </View>
            <View style={styles.meditationIconTextContainer}>
              <View style={styles.meditationText}>
                <Text style={{ fontSize: 35, fontFamily: 'Product Sans Bold', color: 'white' }}>10 lessons</Text>
                <Text style={{ fontSize: 18, fontFamily: 'Product Sans Regular', color: 'white' }}>{meditation?.mainTitle}</Text>
              </View>
              <AntDesign name="staro" size={24} color="blue" />
              {/* <MeditationDescription description={meditation.description}/> */}
            </View>
            <View style={styles.meditationSvgAndIcons}>
                <View>
                    <SVGcomponent height={100} width={100}/>
                </View>
            </View>
          </TouchableOpacity>
      );
}

const LevelAndPointTracker = () => {
    return(
        <View style={styles.levelAndPointTracker}>
            <View style={styles.levelTracker}>
                <FontAwesome name="level-up" size={14} color="blue" />
                <Text style={{fontFamily: 'Product Sans Regular', color: 'blue'}}> Level 1 </Text>
            </View>
            <View style={styles.levelTracker}>
                <FontAwesome5 name="cookie" size={14} color="#1cb517" />
                <Text style={{fontFamily: 'Product Sans Regular', color: '#1cb517'}}> 100 cookies</Text>
            </View>
        </View>
    )
}

const MeditationHeader = () => {
    return(
        <View style={styles.meditationHeader}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 30, fontFamily: 'Product Sans Bold'}}>Hello</Text>
                <Text style={{fontSize: 30, fontFamily: 'Product Sans Bold', color: '#c940d1'}}> Ganesh!</Text>
            </View>
            <LevelAndPointTracker />
        </View>
    )
}

const Meditation = () => {
    const dispatch = useDispatch();
    const allMeditationsFetchStatus = useSelector(selectAllMeditationsFetchStatus);
    const allMeditationsDataFetchStatus = useSelector(selectAllMeditationsDataFetchStatus)
    const allMeditationTypes = useSelector(selectAllMeditationsType);

    // console.log('allMeditationClasses ',allMeditationClasses)
    useEffect(() => {
        dispatch(fetchAllMeditationsType());
        dispatch(fetchAllMeditationsData());
        dispatch(fetchAllMeditationsClasses());
    }, [])

    return(
        <ScrollView>
            <View style={styles.meditationContainer}>
            {
                allMeditationsFetchStatus === 'loading' || allMeditationsDataFetchStatus === 'loading' ? 
                <Text>meditation Type Loading</Text> :
                <View>
                    <MeditationHeader />
                    <View>
                    {
                        allMeditationTypes.map((type, index) => (
                            <View key={index}>
                                <MeditationCard 
                                index={index}
                                medtationTitleData={type}/>
                            </View>
                        ))
                    }
                    </View>
                </View>
            }
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    meditationContainer: {
        flex: 1,
        paddingLeft: 0,
        alignItems: 'center',
        paddingVertical: 40
    },
    meditationCard: {
        margin: 2,
        marginBottom: 10,
        borderRadius: 30,
        flexDirection: 'row',
    },
    meditationHeader:{
        margin: 20,
    },
    meditationSvgAndIcons: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    meditationDescription: {
    },
    meditationText: {

    },
    levelAndPointTracker: {
        flexDirection: 'row'
    },
    meditationIconTextContainer: {
        justifyContent: 'space-evenly',
        width: '60%',
        margin: 20,
    },
    levelTracker: {
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    svgBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1, 
    },
    imageContainer: {
    }
})

export default Meditation;