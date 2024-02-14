import {StyleSheet, View, Alert, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import QRCodeScanner from 'react-native-qrcode-scanner';
import WifiManager from 'react-native-wifi-reborn';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';

const ModesConetionScreen = ({navigation, route}) => {
  const environmentId = route.params.environmentId;

  const [showScanner, setShowScanner] = useState(false);

  const handleWifiPress = () => {
    WifiManager.forceWifiUsage(true);
    WifiManager.setEnabled(true);
  };

  const handleQRCodePress = () => {
    setShowScanner(true);
  };

  const handleQRCodeScanned = e => {
    setShowScanner(false);
    Alert.alert('QR Code Scanned', e.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <SectionTitle text="Buscar dispositivo" />

        <View style={{flex: 1, justifyContent: 'center'}}>
          {!showScanner ? (
            <>
              <CustomButton
                label="Wi-Fi"
                onPress={handleWifiPress}
                buttonColor="#DA215D"
                textColor="white"
                width={'100%'}
                height={50}
                icon="plus-circle"
              />
              <CustomButton
                label="Código QR"
                onPress={handleQRCodePress}
                buttonColor="#DA215D"
                textColor="white"
                width={'100%'}
                height={50}
                icon="plus-circle"
              />
              <CustomButton
                label="Conexión Manual"
                onPress={() =>
                  navigation.navigate('KeyConfigScreen', {environmentId})
                }
                buttonColor="#DA215D"
                textColor="white"
                width={'100%'}
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
      </View>
    </SafeAreaView>
  );
};

export default ModesConetionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
