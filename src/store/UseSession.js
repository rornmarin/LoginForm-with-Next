import { SessionContext } from "./SessionContext";
import { useContext } from "react";
export const UseSession = () => {
  return useContext(SessionContext);
};
