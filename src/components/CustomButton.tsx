import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  buttonColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  buttonColor = '#4CAF50',
  textColor = 'white',
  width = 200,
  height = 50,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: buttonColor, width, height}]}
      onPress={onPress}>
      <Text style={{color: textColor}}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 10,
  },
});

export default CustomButton;
