import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/theme';
import Header from '../layout/Header';

const WifiListModal = ({isOpen, wifiNetworks, onWifiPress, onBackPress}) => {
  return (
    <ReactNativeModal isVisible={isOpen} style={styles.modal}>
      <View style={styles.container}>
        <Header
          onBackPress={onBackPress}
          hideNotificationIcon
          title="Redes WIFI"
        />

        <View style={styles.content}>
          <Text style={styles.wifiListTitle}>Seleccione una red WIFI</Text>

          <ScrollView>
            {wifiNetworks.map((wifi, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.wifi,
                  {borderBottomWidth: i === wifiNetworks.length - 1 ? 0 : 1},
                ]}
                onPress={() => {
                  onWifiPress(wifi);
                }}>
                <Ionicons name="wifi" style={styles.wifiIcon} />
                <Text style={styles.wifiText}>{wifi.ssid}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {margin: 0},
  container: {backgroundColor: COLORS.white, flex: 1},
  content: {
    paddingHorizontal: 20,
  },
  title: {marginVertical: 5},
  wifi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#ddd',
  },
  wifiIcon: {
    fontSize: 35,
    marginRight: 15,
  },
  wifiText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WifiListModal;
