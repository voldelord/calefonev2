import {StyleSheet, View} from 'react-native';
import SectionTitle from './typography/SectionTitle';
import TitleOptions from './TitleOptions';

const TitleSection = ({
  title,
  onEditPress,
  editDisabled,
  onDeletePress,
  deleteDisabled,
}) => (
  <View style={styles.titleSection}>
    <SectionTitle text={title} />

    <TitleOptions
      onEditPress={onEditPress}
      editDisabled={editDisabled}
      onDeletePress={onDeletePress}
      deleteDisabled={deleteDisabled}
    />
  </View>
);

const styles = StyleSheet.create({
  titleSection: {flexDirection: 'row', alignItems: 'center'},
});

export default TitleSection;
