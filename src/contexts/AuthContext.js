import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useContextAuth() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const value = Cookies.get("token");
    if (value) {
      setToken(value);
    } else {
      setToken(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
