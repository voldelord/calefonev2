import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  buttonColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
  icon?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  buttonColor = '#4CAF50',
  textColor = 'white',
  width = 200,
  height = 50,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: buttonColor, width, height}]}
      onPress={onPress}>
      <Text style={{color: textColor}}>{label}</Text>
      {icon && (
        <View style={styles.iconContainer}>
          <Icon name={icon} size={20} color={textColor} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 10,
  },
  iconContainer: {
    marginLeft: 20,
  },
});

export default CustomButton;
