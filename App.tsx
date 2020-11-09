import React, { useState } from 'react';
import { WorkoutTimer } from './pages/workoutTimer';
import { WorkoutCreate } from './pages/workoutCreate';
import { Home } from './pages/home';
import { Header, BottomSheet, Text, Overlay, Icon } from 'react-native-elements';
import { StartButton } from './components/start-button';
import { View, StyleSheet } from 'react-native';


export default function App() {
  const [page, setPage] = useState<string>('HOME');
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
      {page === 'HOME' && !isVisible && <Home menuCallback={() => {
        setIsVisible(true)
      }} />}
      {page === 'WORKOUT' && !isVisible && <WorkoutTimer menuCallback={() => setIsVisible(true)} />}
      {page === 'CREATE_WORKOUT' && !isVisible && <WorkoutCreate menuCallback={() => setIsVisible(true)} />}
      {isVisible && <View style={styles.container}>
        <Overlay isVisible={isVisible} fullScreen={true} onBackdropPress={() => {
          setIsVisible(false);
        }}>
          <View style={styles.container}>
            <StartButton label={'HOME'} start={0} callback={() => {
              setPage('HOME');
              setIsVisible(false);
            }} />
            <StartButton label={'WORKOUT'} start={0} callback={() => {
              setPage('WORKOUT');
              setIsVisible(false);
            }} />
            <StartButton label={'CREATE WORKOUT'} start={0} callback={() => {
              setPage('CREATE_WORKOUT');
              setIsVisible(false);
            }} />
          </View>
        </Overlay>

      </View>}
    </>
  );
}