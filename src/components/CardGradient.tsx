import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CardGradient = ({title, parraph}) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998']}
      style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.paragraph}>{parraph}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: 'white',
  },
});

export default CardGradient;
