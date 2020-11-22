import {combineReducers} from 'redux';

import { workouts } from './workouts';
import { navigation } from './navigation';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
const workouttConfig = {
  key: 'workout',
  storage: AsyncStorage,
}
export default combineReducers({
    workouts: persistReducer(workouttConfig, workouts),
    navigation
  });