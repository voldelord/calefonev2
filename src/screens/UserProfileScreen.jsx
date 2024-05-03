import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';
import editProfileIcon from '../assets/edit-profile-icon.png';
import notifiactionsIcon from '../assets/notifications-icon.png';
import logoutIcon from '../assets/logout-icon.png';
import crownWhiteIcon from '../assets/crown-white-icon.png';
import {useAuth} from '../context/AuthContext';
import Header from '../components/layout/Header';
import {COLORS} from '../constants/theme';
import {showConfirmationAlert} from '../helpers/alerts';
import {startMonitoring} from '../helpers/locationTracking';
import {showErrorToast} from '../helpers/toast';
import {getMainHome} from '../API/homes';

const opciones = [
  {
    id: 1,
    nombre: 'Editar perfil',
    icono: editProfileIcon,
    destino: 'EditProfileScreen',
  },
  {
    id: 2,
    nombre: 'Notificaciones',
    icono: notifiactionsIcon,
    destino: 'NotificationsScreen',
  },
];

const MenuItem = ({title, icon, iconComponent, onPress}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {iconComponent ? (
        iconComponent
      ) : (
        <Image source={icon} style={styles.menuItemIcon} resizeMode="contain" />
      )}
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const UserProfileScreen = ({navigation}) => {
  const {logout, user} = useAuth();

  const onStartTrackingPress = () => {
    showConfirmationAlert({
      title: 'Monitoreo de ubicación.',
      message: '¿Deseas que se le notifique cuando salga del hogar?',
      okButtonPress: async () => {
        const mainHome = await getMainHome(user.id);

        if (!mainHome) {
          return showErrorToast({
            title: 'Monitoreo de ubicación.',
            description: 'Establezca una casa como su hogar principal',
          });
        }

        await startMonitoring({
          lat: mainHome.latitude,
          long: mainHome.longitude,
        });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.profile}>
          <Image
            source={logo}
            style={styles.profileImage}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.profileName,
              {fontStyle: user.profile ? 'normal' : 'italic'},
            ]}>
            {user.profile?.fullName ?? 'No profile'}
          </Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>

        <TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6B6BDB', '#8858BC', '#964FAB', COLORS.primary]}
            style={styles.upgradePlanBtn}>
            <Image source={crownWhiteIcon} style={styles.upgradePlanBtnCrown} />
            <View style={styles.upgradePlanBtnTitleContainer}>
              <Text style={styles.upgradePlanBtnTitle}>Plan Avanzado</Text>
              <Text style={styles.upgradePlanBtnSubTitle}>
                Desbloquear caracteristica
              </Text>
            </View>
            <Text style={styles.upgradePlanBtnTag}>Actualizar ahora</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.menu}>
          {opciones.map(option => (
            <MenuItem
              key={option.id}
              title={option.nombre}
              icon={option.icono}
              onPress={() => navigation.navigate(option.destino)}
            />
          ))}
          {/* <MenuItem
            title={'Monitorear salida del hogar'}
            iconComponent={
              <View style={styles.menuItemIcon}>
                <Ionicons name="location" size={21} color="#bbb" />
              </View>
            }
            onPress={onStartTrackingPress}
          /> */}

          <MenuItem
            title={'Cerrar sesión'}
            icon={logoutIcon}
            onPress={logout}
          />
        </View>
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
    paddingHorizontal: 25,
  },
  profile: {alignItems: 'center', marginBottom: 20},
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
    // borderRadius: 75,
  },
  profileName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  profileEmail: {},
  upgradePlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  upgradePlanBtnCrown: {
    height: 27,
    width: 35,
  },
  upgradePlanBtnTitleContainer: {
    marginLeft: 15,
  },
  upgradePlanBtnTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  upgradePlanBtnSubTitle: {
    color: COLORS.white,
    fontSize: 10,
    opacity: 0.7,
  },
  upgradePlanBtnTag: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 3,
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 'auto',
    overflow: 'hidden',
  },
  menu: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  menuItemIcon: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  menuItemText: {
    color: COLORS.black,
  },
});

export default UserProfileScreen;
