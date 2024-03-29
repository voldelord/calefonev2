import Toggle from 'react-native-toggle-element';
import {COLORS} from '../../constants/theme';

const SIZES = {
  sm: {
    trackBar: {
      borderWidth: 7,
      width: 62,
      height: 30,
      radius: 30,
    },
    thumbButton: {
      width: 38,
      height: 38,
    },
  },
  md: {
    trackBar: {
      borderWidth: 7,
      width: 80,
      height: 40,
      radius: 25,
    },
    thumbButton: {
      width: 42,
      height: 42,
    },
  },
};

const CustomSwitch = ({value, onChange, name, size = 'md', containerStyle}) => {
  const sizeData = SIZES[size];

  const handleChange = value => {
    onChange?.({target: {value, name}});
  };

  return (
    <Toggle
      containerStyle={containerStyle}
      value={value}
      onPress={handleChange}
      trackBar={{
        activeBackgroundColor: COLORS.primary,
        inActiveBackgroundColor: '#dddddd',
        ...sizeData.trackBar,
      }}
      thumbButton={{
        inActiveBackgroundColor: COLORS.white,
        activeBackgroundColor: COLORS.white,
        ...sizeData.thumbButton,
      }}
    />
  );
};

export default CustomSwitch;
