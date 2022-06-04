import { createContext, ReactNode, useState } from "react";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValues {
  loading: boolean;
  setLoading: (e: boolean) => void;
  route: number;
  setRoute: (e: number) => void;
}

const initialValue = {
  loading: false,
  setLoading: (e: boolean) => {},
  route: -1,
  setRoute: (e: number) => {},
};

export const UserContext = createContext<UserContextValues>(initialValue);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [loading, setLoading] = useState(initialValue.loading);
  const [route, setRoute] = useState(initialValue.route);

  return (
    <UserContext.Provider value={{ route, setRoute, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
