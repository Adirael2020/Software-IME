"use client";

import { SessionProvider } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";

import { useLoadUserQuery } from "../redux/services/userApi";

const RefreshUser = ({ children }) => {

  const { data, status } = useSession();
  const dispach = useDispatch();
  const { data: loadQuearry, error, isLoading } = useLoadUserQuery();

  useEffect(() => {
    const refresh = async () => {
      try {
        if (status !== 'loading') {
          if (!isLoading) {
            console.log(loadQuearry);
          };
        };
      } catch (error) {
        console.error(error);
      }
    };
    refresh();
  }, [])

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