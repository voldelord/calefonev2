import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomSwitch from 'react-native-custom-switch-new';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';
import bellIcon from '../assets/notifications-icon.png';
import automaticUpdateIcon from '../assets/automatic-update.png';
import vibrationIcon from '../assets/vibration.png';
import soundIcon from '../assets/sound.png';

const NotificationOption = ({style, icon, label, checked, onChange}) => {
  return (
    <View style={[styles.optionContainer, style]}>
      <Image source={icon} style={styles.optionIcon} />
      <Text style={styles.optionText}>{label}</Text>

      <View style={styles.optionCheck}>
        <CustomSwitch
          buttonPadding={5}
          buttonWidth={15}
          switchWidth={50}
          switchBackgroundColor={'#DDD'}
          onSwitchBackgroundColor={COLORS.primary}
        />
      </View>
    </View>
  );
};

const NotificationsScreen = ({navigation}) => {
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);
  const [isSwitchOn3, setIsSwitchOn3] = useState(false);
  const [isSwitchOn4, setIsSwitchOn4] = useState(false);

  const toggleSwitch1 = () => {
    setIsSwitchOn1(!isSwitchOn1);
  };

  const toggleSwitch2 = () => {
    setIsSwitchOn2(!isSwitchOn2);
  };

  const toggleSwitch3 = () => {
    setIsSwitchOn3(!isSwitchOn3);
  };

  const toggleSwitch4 = () => {
    setIsSwitchOn4(!isSwitchOn4);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={[styles.content, styles.contentPadding]}>
        <SectionTitle text="Notificaciones" />

        <NotificationOption
          style={{marginTop: 30}}
          icon={bellIcon}
          label={'Notificación general'}
        />

        <NotificationOption
          style={{marginTop: 30}}
          icon={soundIcon}
          label={'Sonido'}
        />

        <NotificationOption
          style={{marginTop: 30}}
          icon={vibrationIcon}
          label={'Vibración'}
        />

        <NotificationOption
          style={{marginTop: 30}}
          icon={automaticUpdateIcon}
          label={'Actualización automática'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentPadding: {
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.black,
  },
  optionCheck: {
    marginLeft: 'auto',
  },
});

export default NotificationsScreen;
