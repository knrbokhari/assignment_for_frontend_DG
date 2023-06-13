import { Provider } from 'react-redux'
import store from './store'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// store to persit
const persistedStore = persistStore(store);

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading.."} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider