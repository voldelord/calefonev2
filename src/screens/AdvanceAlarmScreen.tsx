import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Dropdown from 'react-native-input-select';

const AdvanceAlarmScreen = () => {
  const [country, setCountry] = React.useState();
  const [date, setDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <Text>Hora de Inicio</Text>
      <DatePicker
        style={styles.datePicker}
        date={date}
        onDateChange={setDate}
      />
      <Text>Hora de Fin</Text>
      <DatePicker
        style={styles.datePicker}
        date={date}
        onDateChange={setDate}
      />
      <Dropdown
        label="Country"
        placeholder="Select an option..."
        options={[
          {label: 'Nigeria', value: 'NG'},
          {label: 'Åland Islands', value: 'AX'},
          {label: 'Algeria', value: 'DZ'},
          {label: 'American Samoa', value: 'AS'},
          {label: 'Andorra', value: 'AD'},
        ]}
        selectedValue={country}
        onValueChange={value => setCountry(value)}
        primaryColor={'green'}
      />
    </View>
  );
};

export default AdvanceAlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  datePicker: {
    marginBottom: 20,
    padding: 20,
  },
});
