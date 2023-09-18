"use client"

import  store  from "./store.ts";
import { Provider } from "react-redux";


export function Providers({ children }) {
  return(
    <Provider store={store}>
        {children}
    </Provider>
  );
};
