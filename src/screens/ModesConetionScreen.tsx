import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const ModesConetionScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('KeyConfigScreen');
  };
  return (
    <View style={styles.container}>
      <CustomButton
        label="Wi-Fi"
        onPress={handleLoginPress}
        buttonColor="#DA215D"
        textColor="white"
        width={300}
        height={50}
        icon="plus-circle"
      />
      <CustomButton
        label="Codigo QR"
        onPress={handleLoginPress}
        buttonColor="#DA215D"
        textColor="white"
        width={300}
        height={50}
        icon="plus-circle"
      />
      <CustomButton
        label="Conexion Manual"
        onPress={handleLoginPress}
        buttonColor="#DA215D"
        textColor="white"
        width={300}
        height={50}
        icon="plus-circle"
      />
    </View>
  );
};

export default ModesConetionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
