import Toggle from 'react-native-toggle-element';
import {COLORS} from '../../constants/theme';

const CustomSwitch = ({value, onChange, name}) => {
  const handleChange = value => {
    onChange?.({target: {value, name}});
  };

  return (
    <Toggle
      value={value}
      onPress={handleChange}
      trackBar={{
        activeBackgroundColor: COLORS.primary,
        inActiveBackgroundColor: '#dddddd',
        borderWidth: 7,
        width: 80,
        height: 40,
        radius: 25,
      }}
      thumbButton={{
        inActiveBackgroundColor: COLORS.white,
        activeBackgroundColor: COLORS.white,
        width: 42,
        height: 42,
      }}
    />
  );
};

export default CustomSwitch;
