import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        {children}
        </PersistGate>
    </ReduxProvider>
  );
};

export default Providers;