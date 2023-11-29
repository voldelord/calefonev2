import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de instalar esta librería

const CustomCard = ({title, props}) => (
  <TouchableOpacity style={styles.appButtonContainer}>
    <Icon name={props} size={25} color="#900" />
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default CustomCard;

const styles = StyleSheet.create({
  appButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
    borderRadius: 10,
    padding: 10,
  },
  appButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});
