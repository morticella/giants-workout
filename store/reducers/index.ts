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



//   import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// import { authReducer, otherReducer } from './reducers'

// const rootPersistConfig = {
//   key: 'root',
//   storage: storage,
//   blacklist: ['auth']
// }

// const authPersistConfig = {
//   key: 'auth',
//   storage: storage,
//   blacklist: ['somethingTemporary']
// }

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   other: otherReducer,
// })

// export default persistReducer(rootPersistConfig, rootReducer)