import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const alarmas = [
  {
    id: 1,
    horaInicio: '08:00',
    horaFin: '09:00',
    diasSemana: 'Lunes y Martes',
    activo: true,
  },
  {
    id: 2,
    horaInicio: '09:00',
    horaFin: '10:00',
    diasSemana: ' Miercoles Jueves y  Viernes',
    activo: true,
  },
  {
    id: 3,
    horaInicio: '10:00',
    horaFin: '11:00',
    diasSemana: 'Sábados y Domingos',
    activo: false,
  },
];
interface Props extends NativeStackScreenProps<any, any> {}
const AlarmasScreen = ({navigation}: Props) => {
  const [alarmasData, setAlarmasData] = useState(alarmas);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleSwitch = id => {
    setAlarmasData(prevAlarmas =>
      prevAlarmas.map(alarma =>
        alarma.id === id ? {...alarma, activo: !alarma.activo} : alarma,
      ),
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text
          style={
            styles.horaText
          }>{`${item.horaInicio} - ${item.horaFin}`}</Text>
        <Text style={styles.diasText}>{item.diasSemana}</Text>
      </View>
      <Switch
        value={item.activo}
        onValueChange={() => toggleSwitch(item.id)}
        style={styles.switch}
      />
    </View>
  );

  const agregarAlarma = () => {
    const nuevaAlarma = {
      id: alarmasData.length + 1,
      horaInicio: '00:00',
      horaFin: '00:30',
      diasSemana: 'Nuevos días',
      activo: false,
    };
    setAlarmasData([...alarmasData, nuevaAlarma]);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = date => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      // Hacer algo con la fecha seleccionada si es necesario
    }
  };
  const handleLoginPress = () => {
    navigation.navigate('HomeMenuScreen');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alarmasData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {showDatePicker && (
        <DatePicker
          date={selectedDate}
          onDateChange={onDateChange}
          mode="time"
          style={styles.datePicker}
          textColor="#000" // Color del texto
          minuteInterval={15} // Intervalo de minutos
        />
      )}
      <TouchableOpacity onPress={agregarAlarma} style={styles.addButton}>
        <Icon name="plus" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={showDatePickerHandler}
        style={styles.datePickerButton}>
        <Text>Mostrar Selector de Fecha</Text>
      </TouchableOpacity>
      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Enviar Correo de Verificacion"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
  },
  horaText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  diasText: {
    fontSize: 14,
  },
  switch: {
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 3,
  },
  datePickerButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 3,
  },
  datePicker: {
    backgroundColor: '#fff',
    elevation: 3,
  },
  buttoncontainer: {
    alignItems: 'center',
  },
});

export default AlarmasScreen;
