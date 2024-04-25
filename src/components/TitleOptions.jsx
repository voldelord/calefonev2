import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TitleOptionButton from './TitleOptionButton';
import {StyleSheet, View} from 'react-native';

const TitleOptions = ({
  onQrPressed,
  qrDisabled,
  onEditPress,
  editDisabled,
  onDeletePress,
  deleteDisabled,
}) => (
  <View style={styles.container}>
    {onQrPressed && (
      <TitleOptionButton
        icon="qrcode"
        IconProvider={AntDesign}
        onPress={onQrPressed}
        disabled={qrDisabled}
      />
    )}
    <TitleOptionButton
      icon="edit"
      IconProvider={MaterialIcons}
      onPress={onEditPress}
      disabled={editDisabled}
    />
    <TitleOptionButton
      style={{paddingRight: 0}}
      icon="trash-can-outline"
      IconProvider={MaterialCommunityIcons}
      onPress={onDeletePress}
      disabled={deleteDisabled}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
});

export default TitleOptions;
