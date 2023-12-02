import {StyleSheet, Text, View, Image, Dimensions, Switch} from 'react-native';
import React, {useState} from 'react';
import range from '../assets/range.png';
import CustomButton from './CustomButton';

const {width, height} = Dimensions.get('window');

const ModeComponent = ({value, title, parraph, toggle}) => {
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const toggleSwitch1 = () => {
    setIsSwitchOn1(!isSwitchOn1);
  };
  const handleLoginPress = () => {
    console.log('RangeScreen');
  };
  return (
    <View style={[styles.container, {width, height}]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={range} />
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.parraph}>{parraph}</Text>
      <Text style={styles.toggle}>{toggle}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#DA215D'}}
        thumbColor={isSwitchOn1 ? '#FFFFFF' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch1}
        value={isSwitchOn1}
        style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
      />
      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Cambiar de modo"
          onPress={handleLoginPress}
          buttonColor="#ECECEC"
          textColor="black"
          width={300}
          height={50}
          icon="thermometer-quarter"
        />
        <CustomButton
          label="Desbloquear programar horario"
          onPress={handleLoginPress}
          buttonColor="#ECECEC"
          textColor="black"
          width={300}
          height={50}
          icon="thermometer-quarter"
        />
      </View>
    </View>
  );
};

export default ModeComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
  },
  value: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    top: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  parraph: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  toggle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  buttoncontainer: {
    marginTop: 50,
  },
});
