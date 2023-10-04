"use client";

import { SessionProvider } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";

import { useLoadUserMutation } from "../redux/services/authApi";
import { logUser } from "../redux/features/userSlice";

const RefreshUser = ({ children }) => {

  const { data, status } = useSession();
  const dispach = useDispatch();
  const [loadUser] = useLoadUserMutation();

  useEffect(() => {
    const refresh = async () => {
      try {
        if(status === 'authenticated'){
          const user = await loadUser(data);
          await dispach(logUser(user));
        }
      } catch (error) {
        console.error(error);
      }
    };
    refresh();
  }, [status])

  return (
    <div>
      {children}
    </div>
  )
}


export default function ProviderSession({ children }) {
  return (
    <SessionProvider>
      <RefreshUser>
        {children}
      </RefreshUser>
    </SessionProvider>
  )
} 