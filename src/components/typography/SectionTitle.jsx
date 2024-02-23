import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/theme';

const SectionTitle = ({text, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {
    fontSize: 22,
    color: COLORS.black,
  },
});

export default SectionTitle;
