import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../constants/theme';

const ModeButton = ({icon, title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <View style={styles.iconContainer}>
        <Image
          source={icon}
          style={styles.icon}
          resizeMode="center"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECECEC',
    borderRadius: 35,
    height: 70,
    padding: 10,
    paddingLeft: 20,
  },
  buttonTitle: {fontWeight: 'bold', fontSize: 18, color: COLORS.black},
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  icon: {height: 40, width: 40}
});

export default ModeButton;
