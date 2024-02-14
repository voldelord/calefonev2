import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import bell from '../../assets/bell.png';

const Header = ({onBackPress, hideNotificationIcon = false, title}) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Entypo name="chevron-thin-left" size={30} />
        </TouchableOpacity>
      )}

      {title && <Text style={styles.title}>{title}</Text>}

      {!hideNotificationIcon && <TouchableOpacity style={styles.notificationButton}>
        <Image source={bell} style={styles.bellImage} />
      </TouchableOpacity>}
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
    backgroundColor: '#fff'
  },
  bellImage: {
    height: 30,
    width: 30,
  },
  notificationButton: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10
  }
});

export default Header;
