import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import bell from '../../assets/bell.png';
import {COLORS} from '../../constants/theme';
import logoFull from '../../assets/logo-full.png';

const Header = ({onBackPress, hideNotificationIcon = false, title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress}>
            <Entypo name="chevron-thin-left" size={30} color={COLORS.black} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.middleSection}>
        <Image source={logoFull} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.rightSection}>
        {!hideNotificationIcon && (
          <TouchableOpacity style={styles.notificationButton}>
            <Image source={bell} style={styles.bellImage} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: '#fff',
  },
  bellImage: {
    height: 30,
    width: 30,
  },
  notificationButton: {
    marginLeft: 'auto',
  },
  middleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    height: 40,
  },
  logoName: {
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.black,
    marginLeft: 8,
  },
  rightSection: {
    height: 30,
    width: 30,
  },
  leftSection: {
    height: 30,
    width: 30,
  },
});

export default Header;
