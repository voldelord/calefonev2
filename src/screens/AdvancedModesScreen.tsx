import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../components/Card';

const AdvancedModesScreen = () => {
  return (
    <View style={styles.container}>
      <Card
        title="Pantalla Smart"
        paragraph="El límite puede ser mediante
        la fijación de un consumo en Kw/h
        o colocando el monto en ARS"
        iconName="history"
        icom
      />
      <Card
        title="Pantalla Smart"
        paragraph="La aplicación deberá asignarlos de
        manera eficiente en rrelación a las
        temperaturas exteriores con las que
        se cuenta e irr gestionando los
        encendidos y apagados"
        iconName="thermometer-empty"
      />
      <Card
        title="Funciones adicionales"
        paragraph="Modo Smart y Modo Programacion"
        iconName="info-circle"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
});

export default AdvancedModesScreen;
