import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

import { workouts } from './workouts';
import { navigation } from './navigation';

const workouttConfig = {
  key: 'workout',
  storage: AsyncStorage,
}
export default combineReducers({
    workouts: persistReducer(workouttConfig, workouts),
    navigation
  });