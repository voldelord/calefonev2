import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BLEDevice = ({device, noBorder, onPress}) => {
  return (
    <TouchableOpacity
      key={device.name}
      style={[styles.device, {borderBottomWidth: noBorder ? 0 : 1}]}
      onPress={onPress}>
      <Ionicons name="hardware-chip-outline" style={styles.deviceIcon} />
      <Text style={styles.deviceText}>{device.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  device: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: '#ddd',
  },
  deviceIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  deviceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BLEDevice;
