import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const ModeButton = ({
  icon,
  renderIcon,
  title,
  onPress,
  style,
  small = false,
  withGradient = false,
  redBg = false,
}) => {
  const buttonHeight = small ? 50 : 68;
  const buttonPadding = small ? 6 : 10;
  const iconContainerHeight = small ? 40 : 50;
  const iconHeight = small ? 20 : 40;
  const titleFontSize = small ? 16 : 18;

  const colors = withGradient
    ? ['#6B6BDB', '#8858BC', '#964FAB', COLORS.primary]
    : redBg
    ? [COLORS.primary, COLORS.primary]
    : ['#eee', '#eee'];

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={[
          styles.button,
          {height: buttonHeight, padding: buttonPadding},
          style,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}>
        <Text
          style={[
            styles.buttonTitle,
            {
              fontSize: titleFontSize,
              color: withGradient || redBg ? COLORS.white : COLORS.black,
            },
          ]}>
          {title}
        </Text>
        <View
          style={[
            styles.iconContainer,
            {
              height: iconContainerHeight,
              width: iconContainerHeight,
              borderRadius: iconContainerHeight / 2,
            },
          ]}>
          {renderIcon ? (
            renderIcon({height: iconHeight, width: iconHeight})
          ) : (
            <Image
              source={icon}
              style={[styles.icon, {height: iconHeight, width: iconHeight}]}
              resizeMode="center"
            />
          )}
        </View>
      </LinearGradient>
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
    paddingLeft: 20,
  },
  buttonTitle: {fontWeight: 'bold', color: COLORS.black},
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  icon: {height: 40, width: 40},
});

export default ModeButton;
