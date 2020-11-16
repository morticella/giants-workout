import React, { useState } from 'react';
import { WorkoutTimer } from './pages/workout-timer';
import { WorkoutCreate } from './pages/workout-create';
import { Home } from './pages/home';
import { Overlay } from 'react-native-elements';
import { StartButton } from './components/start-button';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { HOME, WORKOUT_CREATE, WORKOUT_TIMER } from './assets/constants';
let list: { key: string }[] = [];


export default function App() {
  const [page, setPage] = useState<string>(HOME);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const workouts = async () => {
    list = [];
    // AsyncStorage.clear();
    await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                console.log('APP --> ', store[i][0], store[i][1]);
                list.push({ key: store[i][0] });
                setPage(HOME);
              setIsVisible(false);
            });
        });
    });
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: '400',
    }
  });
  return (
    <>
      {page === HOME && !isVisible && <Home menuCallback={() => setIsVisible(true)} />}
      {page === WORKOUT_TIMER && !isVisible && <WorkoutTimer menuCallback={() => setIsVisible(true)} />}
      {page === WORKOUT_CREATE && !isVisible && <WorkoutCreate menuCallback={() => setIsVisible(true)} />}
      {isVisible && <View style={styles.container}>
        <Overlay isVisible={isVisible} fullScreen={true} onBackdropPress={() => {
          setIsVisible(false);
        }}>
          <View style={styles.container}>
            <StartButton label={'HOME'} start={0} callback={() => {
              workouts();
              console.log('list ', list);
              
            }} />
            <StartButton label={'WORKOUT'} start={0} callback={() => {
              setPage(WORKOUT_TIMER);
              setIsVisible(false);
            }} />
            <StartButton label={'CREATE WORKOUT'} start={0} callback={() => {
              setPage(WORKOUT_CREATE);
              setIsVisible(false);
            }} />
          </View>
        </Overlay>

      </View>}
    </>
  );
}