import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {COLORS} from '../constants/theme';
import {showErrorToast, showSuccessToast} from '../helpers/toast';
import {useMutation} from 'react-query';
import {addHomeInhabitant} from '../API/homes';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import extractErrorMessage from '../helpers/extractErrorMessage';
import {useAuth} from '../context/AuthContext';

const TOAST_TITLE = 'Escaneo de código QR';

const HomeQrScanner = ({navigation}) => {
  const {user} = useAuth();

  const startLoading = useLoadingOverlayStore(state => state.startLoading);
  const stopLoading = useLoadingOverlayStore(state => state.stopLoading);

  const [isCameraActive, setIsCameraActive] = useState(true);

  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const {mutate: addHomeInhabitantMutation} = useMutation(
    data => addHomeInhabitant(data),
    {
      onMutate: startLoading,
      onSettled: () => {
        stopLoading();
        setIsCameraActive(false);
      },
      onSuccess: () => {
        showSuccessToast({
          title: TOAST_TITLE,
          description: 'El hogar ha sido agregado a su cuenta!',
        });
        navigation.goBack();
      },
      onError: error =>
        showErrorToast({
          title: TOAST_TITLE,
          description: extractErrorMessage(error),
        }),
    },
  );

  useFocusEffect(
    useCallback(() => {
      requestPermission();
    }, []),
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (!isCameraActive) {
        return;
      }

      const [code] = codes;

      if (!code) {
        showErrorToast({
          title: TOAST_TITLE,
          description: 'No se encontró ningún código',
        });
      } else {
        addHomeInhabitantMutation({homeId: code.value, inhabitantId: user.id});
      }

      setIsCameraActive(false);
    },
  });

  const handleReloadCamera = useCallback(() => {
    setIsCameraActive(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <SectionTitle text={'Nuevo Hogar'} style={{marginBottom: 10}} />

        {!hasPermission ? (
          <Text>Permiso denegado para usar la camara</Text>
        ) : (
          <View style={styles.cameraContainer}>
            {isCameraActive ? (
              <Camera
                device={device}
                codeScanner={codeScanner}
                isActive={isCameraActive}
                style={styles.camera}
              />
            ) : (
              <View style={styles.camera}>
                <Pressable
                  style={styles.reloadCameraIconContainer}
                  onPress={handleReloadCamera}>
                  <AntDesign name="reload1" style={styles.reloadCameraIcon} />
                </Pressable>
              </View>
            )}

            <Text style={styles.info}>Escanea un código QR de un hogar</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  cameraContainer: {
    alignItems: 'center',
  },
  camera: {
    width: 250,
    height: 250,
    marginTop: 50,
    marginBottom: 15,
  },
  reloadCameraIconContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadCameraIcon: {
    color: '#888',
    fontSize: 42,
  },
  info: {
    color: COLORS.black,
  },
});

export default HomeQrScanner;
