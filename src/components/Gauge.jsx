import React, { useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path, G, Circle, Text as SvgText } from 'react-native-svg';

const Gauge = ({ value, minValue, maxValue, width, height }) => {
  const [gaugeValue, setGaugeValue] = useState(value);

  // Calculate the center of the gauge
  const centerX = width / 2;
  const centerY = height / 2;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const x = gestureState.moveX - centerX;
        const y = gestureState.moveY - centerY;
        const angle = Math.atan2(y, x) + Math.PI / 2; // Adjusted for gauge orientation
        if (angle >= 0 && angle <= Math.PI * 1.5) {
          const angleRatio = angle / (Math.PI * 1.5);
          const valueRange = maxValue - minValue;
          const value = angleRatio * valueRange + minValue;
          setGaugeValue(Math.round(value));
        }
      },
    })
  ).current;

  const createArcPath = (startAngle, endAngle, radius) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const calculateNeedleRotation = (value, minValue, maxValue) => {
    const angleRange = 270; // Gauge covers 270 degrees
    const valuePercentage = (value - minValue) / (maxValue - minValue);
    return valuePercentage * angleRange - 135; // Offset by start angle of gauge
  };

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  return (
    <View style={styles.container}>
      <Svg height={height} width={width} {...panResponder.panHandlers}>
        <G rotation="-135" origin={`${centerX}, ${centerY}`}>
          <Path
            d={createArcPath(0, 270, width / 2 - 20)} // Adjusted radius for stroke width
            fill="none"
            stroke="#E6E6E6"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <G
            rotation={calculateNeedleRotation(gaugeValue, minValue, maxValue)}
            origin={`${centerX}, ${centerY}`}
          >
            <Path d={`M${centerX-10},${centerY} L${centerX+10},${centerY} L${centerX},${centerY-50} Z`} fill="#000" />
            <Circle cx={centerX} cy={centerY} r={10} fill="#000" />
          </G>
        </G>
        <SvgText x={centerX} y={centerY + 40} textAnchor="middle" fontWeight="bold" fontSize="20">
          {`${gaugeValue} W`}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Gauge;
