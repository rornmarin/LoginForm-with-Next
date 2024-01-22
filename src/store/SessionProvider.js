"use client";
import { SessionContext } from "./SessionContext";
import { useState } from "react";

export const SessionProvider = ({ children, ...props }) => {
  const [item, setItem] = useState(props.session || {});

  return (
    <SessionContext.Provider value={{ session: item, setSession: setItem }}>
      {children}
    </SessionContext.Provider>
  );
};