import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TitleOptionButton from './TitleOptionButton';

const TitleOptions = ({
  onEditPress,
  editDisabled,
  onDeletePress,
  deleteDisabled,
}) => (
  <>
    <TitleOptionButton
      style={{marginLeft: 'auto'}}
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
  </>
);

export default TitleOptions;
