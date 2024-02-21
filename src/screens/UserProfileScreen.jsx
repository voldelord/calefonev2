import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import perfil from '../assets/profile.png';
import editProfileIcon from '../assets/edit-profile-icon.png';
import notifiactionsIcon from '../assets/notifications-icon.png';
import securityIcon from '../assets/security-icon.png';
import logoutIcon from '../assets/logout-icon.png';
import crownWhiteIcon from '../assets/crown-white-icon.png';
import {useAuth} from '../context/AuthContext';
import Header from '../components/layout/Header';
import {COLORS} from '../constants/theme';

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
  {id: 3, nombre: 'Seguridad', icono: securityIcon, destino: 'SecurityScreen'},
];

const MenuItem = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Image source={icon} style={styles.menuItemIcon} resizeMode="contain" />
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const UserProfileScreen = ({navigation}) => {
  const {logout} = useAuth();

  const smartPress = () => {
    navigation.navigate('AdvancedPlanScreen');
  };

  const navigateToScreen = destino => {
    navigation.navigate(destino);
  };
  const onPress = () => {
    navigation.navigate('AllNotificationsScreens');
  };

  return (
    <View style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.profile}>
          <Image
            source={perfil}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.profileName}>Franco Duek</Text>
          <Text style={styles.profileEmail}>francoduek@gmail.com</Text>
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
            />
          ))}
          <MenuItem
            title={'Cerrar sesión'}
            icon={logoutIcon}
            onPress={logout}
          />
        </View>
      </View>
    </View>
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
    width: 200,
    height: 200,
    borderRadius: 75,
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
    color: '#aaa',
    height: 20,
    width: 20,
    marginRight: 15,
  },
  menuItemText: {
    color: COLORS.black,
  },
});

export default UserProfileScreen;
