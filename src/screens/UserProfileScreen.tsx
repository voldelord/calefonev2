import * as React from 'react';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';

export default function App() {
  return (
    <View>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={100}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        padding={10}
        arcSweepAngle={360}
        // This is the property you are looking for:
        renderCap={({center}) => (
          <Circle cx={center.x} cy={center.y} r="10" fill="blue" />
        )}
      />
    </View>
  );
}
