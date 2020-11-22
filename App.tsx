import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index';
import AppView from './pages/view';
import { PersistGate } from 'redux-persist/integration/react';


export default function App() {
  return (
    <Provider store={store}  >
      <PersistGate loading={null} persistor={persistor}>
        <AppView />
      </PersistGate>
    </Provider>
  );
}