import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import ListItem from './Components/ListItem';
import TopScorer from './Components/TopScorer';
import Modal from './Components/Modal';
import { persons } from './DATA';

const App = () => {
  const [topper, setTopper] = useState(null);
  const [personsData, setPersonsData] = useState([...persons]);

  const [visible, setVisible] = React.useState(false);
  const [modalItem, setModalItem] = React.useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onDataChange = (values) => {
    let tempArr = personsData.filter((item) => item.id !== values.id);
    tempArr.push({
      id: values.id,
      name: values.name,
      score: +values.score,
    });
    setPersonsData(tempArr);
  };

  useEffect(() => {
    setTopper(personsData.sort((a, b) => b.score - a.score)[0]);
  }, [onDataChange]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, marginTop: 20, color: 'orange' }}>
          Welcome to Manbal App
        </Text>
      </View>
      <FlatList
        data={personsData}
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            item={item}
            onPressed={(key) => {
              showModal();
              setModalItem(personsData.filter((item) => item.id === key)[0]);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Pressable
        onPress={() => {
          showModal();
          setModalItem(personsData.filter((item) => item.id === topper.id)[0]);
        }}
        style={styles.topScorer}
      >
        <TopScorer topper={topper} />
      </Pressable>

      <Modal
        visible={visible}
        hideModal={hideModal}
        item={modalItem}
        showModal={showModal}
        changeButtonHandler={onDataChange}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 24 },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  // topScorer: { position: 'absolute', bottom: 20 },
});
