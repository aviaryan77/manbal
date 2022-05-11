import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import Card from './Card';
import { Avatar } from 'react-native-paper';

var { width, height } = Dimensions.get('window');

const ListItem = ({ item, onPressed }) => {
  return (
    <>
      <Pressable
        onPress={() => {
          onPressed(item.id);
        }}
        key={item.id}
        style={styles.container}
      >
        <Card style={styles.card}>
          <View style={styles.row}>
            <View>
              <Avatar.Image
                size={40}
                source={{
                  uri: `http://placeimg.com/120/120/person/${item.id}`,
                }}
              />
            </View>
            <View>
              <Text>{item.name}</Text>
            </View>
            <View>
              <Text>{item.score}</Text>
            </View>
          </View>
        </Card>
      </Pressable>
    </>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  card: {
    height: height * 0.1,
    flexDirection: 'column',
    width: width * 0.9,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 2,
    paddingHorizontal: 10,
  },
});
