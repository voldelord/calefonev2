import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationsScreen = () => {
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);
  const [isSwitchOn3, setIsSwitchOn3] = useState(false);
  const [isSwitchOn4, setIsSwitchOn4] = useState(false);

  const toggleSwitch1 = () => {
    setIsSwitchOn1(!isSwitchOn1);
  };

  const toggleSwitch2 = () => {
    setIsSwitchOn2(!isSwitchOn2);
  };

  const toggleSwitch3 = () => {
    setIsSwitchOn3(!isSwitchOn3);
  };

  const toggleSwitch4 = () => {
    setIsSwitchOn4(!isSwitchOn4);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Icon name="bell" size={20} color="black" />
        <Text style={styles.text}>Notificaciones Generales</Text>
        <Switch
          trackColor={{false: '#767577', true: '#DA215D'}}
          thumbColor={isSwitchOn1 ? '#FFFFFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch1}
          value={isSwitchOn1}
        />
      </View>

      <View style={styles.rowContainer}>
        <Icon name="volume-up" size={20} color="black" />
        <Text style={styles.text}>Sonido</Text>
        <Switch
          trackColor={{false: '#767577', true: '#DA215D'}}
          thumbColor={isSwitchOn2 ? '#FFFFFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch2}
          value={isSwitchOn2}
        />
      </View>

      <View style={styles.rowContainer}>
        <Icon name="vibration" size={20} color="black" />
        <Text style={styles.text}>Vibracion</Text>
        <Switch
          trackColor={{false: '#767577', true: '#DA215D'}}
          thumbColor={isSwitchOn3 ? '#FFFFFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch3}
          value={isSwitchOn3}
        />
      </View>

      <View style={styles.rowContainer}>
        <Icon name="refresh" size={20} color="black" />
        <Text style={styles.text}>Actualizacion de la APP</Text>
        <Switch
          trackColor={{false: '#767577', true: '#DA215D'}}
          thumbColor={isSwitchOn4 ? '#FFFFFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch4}
          value={isSwitchOn4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default NotificationsScreen;
