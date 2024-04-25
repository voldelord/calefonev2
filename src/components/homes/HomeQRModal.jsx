import {Image, StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {COLORS} from '../../constants/theme';
import Header from '../layout/Header';
import RNQRGenerator from 'rn-qr-generator';
import {useQuery} from 'react-query';
import LoadingView from '../ui/LoadingView';

const HomeQRModal = ({isOpen, homeId, homeName, onBackPress}) => {
  const {
    data: qrData,
    isLoading: qrDataIsLoading,
    isError: qrDataIsError,
  } = useQuery(
    ['homeQr', homeId],
    () =>
      RNQRGenerator.generate({
        value: homeId,
        height: 170,
        width: 170,
      }),
    {onSuccess: data => console.log(data)},
  );

  return (
    <ReactNativeModal isVisible={isOpen} style={styles.modal}>
      <View style={styles.container}>
        <Header
          onBackPress={onBackPress}
          hideNotificationIcon
          title={homeName}
        />

        <View style={styles.content}>
          <Text style={styles.homeName}>{homeName}</Text>

          <View style={styles.qrContainer}>
            {qrDataIsLoading ? (
              <LoadingView />
            ) : qrDataIsError ? (
              <Text style={styles.error}>Error al generar el código QR.</Text>
            ) : (
              <Image source={{uri: qrData.uri}} style={styles.qrCode} />
            )}
          </View>

          <Text style={styles.info}>
            Si compartes este código de hogar con alguien, esa persona podrá
            escanearlo con la cámara de Temptech para añadirlo a su cuenta
          </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrContainer: {
    height: 200,
    width: 200,
    borderWidth: 15,
    borderColor: '#ddd',
    marginTop: 15,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    color: COLORS.black,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  homeName: {
    fontSize: 22,
    color: COLORS.black,
  },
  error: {
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  qrCode: {
    height: 170,
    width: 170,
  },
});

export default HomeQRModal;
