import { createStore } from 'redux';

import reducer from './reducers/index';

import { persistStore, persistReducer  } from 'redux-persist';
import { AsyncStorage } from 'react-native';
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: ['navigation'],
// }
// export const pReducers = persistReducer(persistConfig , reducer);
export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);
