import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const AdvanceAlarmScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('AlarmScreen');
  };
  const [country, setCountry] = useState('');
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

      <Text>Repetir:</Text>
      <Picker
        selectedValue={country}
        style={styles.select}
        onValueChange={value => setCountry(value)}>
        <Picker.Item label="Lunes a Viernes" value="LN" />
        <Picker.Item label="Solo Sabados" value="S" />
        <Picker.Item label="Solo Domingos" value="D" />
      </Picker>
      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Guardar Cambios"
          onPress={handleLoginPress}
          buttonColor="#DA215D"
          textColor="white"
          width={250}
          height={50}
        />
      </View>
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
  select: {
    height: 50,
    width: 200,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
