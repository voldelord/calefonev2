import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import RnRangeSlider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';

const Slider = ({style, min, max, low, onChange}) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  return (
    <RnRangeSlider
      style={[styles.slider, style]}
      min={min}
      max={max}
      step={1}
      low={low}
      floatingLabel
      disableRange
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
      onValueChanged={onChange}
    />
  );
};

const styles = StyleSheet.create({
  slider: {flex: 1},
});

export default Slider;
