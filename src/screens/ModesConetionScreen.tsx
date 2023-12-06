import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import QRCodeScanner from 'react-native-qrcode-scanner';
import WifiManager from 'react-native-wifi-reborn';

interface Props extends NativeStackScreenProps<any, any> {}

const ModesConetionScreen = ({navigation}: Props) => {
  const [showScanner, setShowScanner] = useState(false);

  const handleWifiPress = () => {
    WifiManager.forceWifiUsage(true);
    WifiManager.setEnabled(true);
  };

  const handleQRCodePress = () => {
    setShowScanner(true);
  };

  const handleQRCodeScanned = (e: any) => {
    setShowScanner(false);
    Alert.alert('QR Code Scanned', e.data);
  };

  return (
    <View style={styles.container}>
      {!showScanner ? (
        <>
          <CustomButton
            label="Wi-Fi"
            onPress={handleWifiPress}
            buttonColor="#DA215D"
            textColor="white"
            width={300}
            height={50}
            icon="plus-circle"
          />
          <CustomButton
            label="Código QR"
            onPress={handleQRCodePress}
            buttonColor="#DA215D"
            textColor="white"
            width={300}
            height={50}
            icon="plus-circle"
          />
          <CustomButton
            label="Conexión Manual"
            onPress={() => navigation.navigate('ManualConfigScreen')}
            buttonColor="#DA215D"
            textColor="white"
            width={300}
            height={50}
            icon="plus-circle"
          />
        </>
      ) : (
        <QRCodeScanner
          onRead={handleQRCodeScanned}
          showMarker={true}
          markerStyle={styles.markerStyle}
          cameraStyle={styles.cameraStyle}
        />
      )}
    </View>
  );
};

export default ModesConetionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerStyle: {
    borderColor: '#DA215D',
    borderRadius: 10,
    borderWidth: 2,
  },
  cameraStyle: {
    height: 400,
    width: 300,
  },
});
