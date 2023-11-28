import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native'; // Importa useNavigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}

function CustomModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Obtiene la instancia de navegación

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleContinue = () => {
    toggleModal(); // Oculta el modal
    navigation.navigate('SearchDevicesScreen'); // Navega a la otra página
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyle} onPress={toggleModal}>
        <Text style={styles.buttonText}>Añadir Dispositivos</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.parraphmodal}>
            La aplicación Calefones solicita los siguientes permisos de acceso
          </Text>
          <Text style={styles.subparraphmodal}>
            La Seguridad de la privacidad de la información personal está
            garantizada si se conceden los siguientes permisos
          </Text>
          <View style={styles.buttomtextmodal}>
            <Text style={styles.textmodal}>
              Buscar y añadir dispositivos y ubicar las redes
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonStyleModal}
            onPress={handleContinue} // Utiliza la función handleContinue
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#DA215D', // Cambia el color de fondo
    paddingVertical: 12,
    marginHorizontal: 20,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 40,
  },
  buttonStyleModal: {
    backgroundColor: '#DA215D', // Cambia el color de fondo
    paddingVertical: 12,
    marginHorizontal: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 40,
  },
  subparraphmodal: {
    color: 'black',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonText: {
    color: 'white', // Cambia el color del texto
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  parraphmodal: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  buttomtextmodal: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textmodal: {
    color: 'black',
  },
});

export default CustomModal;
