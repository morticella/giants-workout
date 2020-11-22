import { createStore } from 'redux';

import reducer from './reducers/index';

import { persistStore, persistReducer  } from 'redux-persist';
import { AsyncStorage } from 'react-native';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'],
}
export const pReducers = persistReducer(persistConfig , reducer);
export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
console.log('store ', store.getState());
export const persistor = persistStore(store);

// import { createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// import rootReducer from './reducers'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }