import {StyleSheet, View} from 'react-native';
import SectionTitle from './typography/SectionTitle';
import TitleOptions from './TitleOptions';

const TitleSection = ({
  title,
  onEditPress,
  editDisabled,
  onDeletePress,
  deleteDisabled,
  onQrPressed,
  qrDisabled,
  style,
}) => (
  <View style={[styles.titleSection, style]}>
    <SectionTitle style={styles.title} text={title} />

    <TitleOptions
      onEditPress={onEditPress}
      editDisabled={editDisabled}
      onDeletePress={onDeletePress}
      deleteDisabled={deleteDisabled}
      onQrPressed={onQrPressed}
      qrDisabled={qrDisabled}
    />
  </View>
);

const styles = StyleSheet.create({
  titleSection: {flexDirection: 'row', alignItems: 'center'},
  title: {flex: 1},
});

export default TitleSection;
