import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SwitchSelector from 'react-native-switch-selector';

const AllNotificationsScreens = () => {
  const [alert, setAlert] = useState('Mensajes');

  const handleChange = value => {
    setAlert(value === 'M' ? 'Mensajes' : 'Alarmas');
  };

  return (
    <View style={styles.container}>
      <SwitchSelector
        initial={0}
        onPress={handleChange}
        textColor="#DA215D"
        selectedColor="white"
        buttonColor="#DA215D"
        borderColor="#DA215D"
        hasPadding
        options={[
          {
            label: 'Mensajes',
            value: 'M',
          },
          {
            label: 'Alarmas',
            value: 'A',
          },
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="alert-switch-selector"
        style={styles.switchSelector}
      />
      <Text style={styles.heading}>{`Selected Alert: ${alert}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  switchSelector: {
    width: 300,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default AllNotificationsScreens;
