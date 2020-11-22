import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { WorkoutTimer } from './workout-timer';
import { WorkoutCreate } from './workout-create';
import { Home } from './home';
import { Overlay } from 'react-native-elements';
import { StartButton } from '../components/start-button';
import { View, StyleSheet } from 'react-native';
import { HOME, WORKOUT_CREATE, WORKOUT_TIMER, WORKOUT_EDIT } from '../assets/constants';
import { WorkoutEdit } from './workout-edit';

interface IGlobalState {
  navigation: { name: string }
}

export default function AppView() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: HOME });
  }, []);
  const page: string = useSelector((state: IGlobalState) => state?.navigation?.name);
 useSelector(state => console.log('>>> ', state));
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
      {page === HOME && !isVisible && <Home menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: HOME });
      }} />}
      {page === WORKOUT_TIMER && !isVisible && <WorkoutTimer menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: WORKOUT_TIMER })
      }} />}
      {page === WORKOUT_CREATE && !isVisible && <WorkoutCreate menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: WORKOUT_CREATE })
      }} />}
      {page === WORKOUT_EDIT && !isVisible && <WorkoutEdit menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: WORKOUT_EDIT })
      }} />}
      {isVisible && <View style={styles.container}>
        <Overlay isVisible={isVisible} fullScreen={true} onBackdropPress={() => {
          setIsVisible(false);
        }}>
          <View style={styles.container}>
            <StartButton label={HOME} start={0} callback={() => {
              setIsVisible(false);
              dispatch({ type: HOME });
            }} />
            <StartButton label={'WORKOUT'} start={0} callback={() => {
              dispatch({ type: WORKOUT_TIMER })
              setIsVisible(false);
            }} />
            <StartButton label={'CREATE WORKOUT'} start={0} callback={() => {
              dispatch({ type: WORKOUT_CREATE })
              setIsVisible(false);
            }} />
            <StartButton label={'EDIT WORKOUT'} start={0} callback={() => {
              dispatch({ type: WORKOUT_EDIT })
              setIsVisible(false);
            }} />
          </View>
        </Overlay>
      </View>}
    </>
  );
}