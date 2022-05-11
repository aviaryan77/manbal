import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

var { width: w, height: h } = Dimensions.get('window');
const TopScorer = ({ topper }) => {
  return (
    <View style={styles.topScorer}>
      <Text style={styles.text}>Top Scorer</Text>
      <View style={styles.name}>
        <Text style={styles.nameText}>
          Name: <Text style={styles.name}>{topper?.name}</Text>{' '}
        </Text>
      </View>
      <View style={styles.name}>
        <Text style={styles.nameText}>
          Score: <Text style={styles.name}>{topper?.score}</Text>
        </Text>
      </View>
    </View>
  );
};

export default TopScorer;

const styles = StyleSheet.create({
  topScorer: {
    position: 'absolute',
    bottom: 20,
    right: w / 4,
    backgroundColor: 'orange',
    height: h / 10,
    width: w / 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nameText: {
    fontWeight: '500',
  },
});
