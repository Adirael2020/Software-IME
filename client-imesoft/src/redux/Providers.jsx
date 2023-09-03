"use client"

import  store  from "./store.ts";
import { Provider } from "react-redux";

import RefreshToken from "@/components/RefreshToken.jsx";


export function Providers({ children }) {
  return(
    <Provider store={store}>
      <RefreshToken>
        {children}
      </RefreshToken>
    </Provider>
  );
};
