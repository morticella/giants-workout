import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { WorkoutTimer } from './workout-timer';
import { WorkoutCreate } from './workout-create';
import { Home } from './home';
import { Overlay } from 'react-native-elements';
import { StartButton } from '../components/start-button';
import { View, StyleSheet } from 'react-native';
import { PAGE_HOME, PAGE_CREATE_WORKOUT, PAGE_TIMER_WORKOUT, PAGE_EDIT_WORKOUT } from '../assets/constants';
import { WorkoutEdit } from './workout-edit';

interface IGlobalState {
  navigation: { name: string }
}

export default function AppView() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_HOME });
  }, []);
  const page: string = useSelector((state: IGlobalState) => state?.navigation?.name);

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
      {page === PAGE_HOME && !isVisible && <Home menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: PAGE_HOME });
      }} />}
      {page === PAGE_TIMER_WORKOUT && !isVisible && <WorkoutTimer menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: PAGE_TIMER_WORKOUT })
      }} />}
      {page === PAGE_CREATE_WORKOUT && !isVisible && <WorkoutCreate menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: PAGE_CREATE_WORKOUT })
      }} />}
      {page === PAGE_EDIT_WORKOUT && !isVisible && <WorkoutEdit menuCallback={() => {
        setIsVisible(true);
        dispatch({ type: PAGE_EDIT_WORKOUT })
      }} />}
      {isVisible && <View style={styles.container}>
        <Overlay isVisible={isVisible} fullScreen={true} onBackdropPress={() => {
          setIsVisible(false);
        }}>
          <View style={styles.container}>
            <StartButton label={PAGE_HOME} start={0} callback={() => {
              setIsVisible(false);
              dispatch({ type: PAGE_HOME });
            }} />
            <StartButton label={'WORKOUT'} start={0} callback={() => {
              dispatch({ type: PAGE_TIMER_WORKOUT })
              setIsVisible(false);
            }} />
            <StartButton label={'CREATE WORKOUT'} start={0} callback={() => {
              dispatch({ type: PAGE_CREATE_WORKOUT })
              setIsVisible(false);
            }} />
            <StartButton label={'EDIT WORKOUT'} start={0} callback={() => {
              dispatch({ type: PAGE_EDIT_WORKOUT })
              setIsVisible(false);
            }} />
          </View>
        </Overlay>
      </View>}
    </>
  );
}