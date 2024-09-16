import { StyleSheet, View } from 'react-native';

import Octicons from '@expo/vector-icons/Octicons';

const Navbar = () => {
  return (
    <View style={styles.navMainContainer}>
      <View style={styles.navSubCnt}>
        <Octicons name='dash' size={24} color='black' />
        <Octicons name='dash' size={24} color='black' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navMainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 1,
  },
  navSubCnt: {
    width: 47,
    height: 47,
    borderRadius: '50%',
    gap: 1,
  },
});

export default Navbar;
