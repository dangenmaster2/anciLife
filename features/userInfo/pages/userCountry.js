import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import InputField from '../../../components/InputField';

import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

import {fetchCountries} from '../userInfo.slice';

import {allCountriesNames} from '../userInfo.slice';

const CountryGrid = ({item}) => {
  // console.log(item);
  return (
    <Pressable style={styles.gridItem}>
      <Text style={styles.countryGridTxt}>{item}</Text>
    </Pressable>
  );
};

const UserCountry = ({setUserCountry}) => {
  // const [countryNameArr, setCountryNameArr] = useState();
  // const allCountryName = useSelector(state => state.userinfo.countriesResponse);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  const countriesName = allCountriesNames();
  // console.log(countryNameArr);
  return (
    <View
      style={{
        marginTop: 40,
      }}>
      <View style={styles.interestHeader}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            paddingBottom: 10,
            color: '#020001',
          }}>
          Which country are you form?
        </Text>
        {/* <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingBottom: 50,
            textAlign: 'center',
          }}>
          Please Select your country of origin for a better recommendations.
        </Text> */}
      </View>

      <View style={styles.interestHeader}>
        <InputField placeHolderText={'Search your country'} />
      </View>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={countriesName}
        renderItem={({item}) => <CountryGrid item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countryGridContainer: {},

  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatListGridMainContainer: {},

  flatListContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridItem: {
    margin: 10,
    // borderWidth: 2,
    borderRadius: 10,
    // borderColor: '#5f9ea0',
    marginBottom: 10,
    backgroundColor: 'hsl(360 100% 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    minWidth: '75%',
  },

  countryGridTxt: {
    textAlign: 'center',
    fontSize: 15,
  },

  interestHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

export default UserCountry;
