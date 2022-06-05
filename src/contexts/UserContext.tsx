import { createContext, ReactNode, useState } from "react";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValues {
  loading: boolean;
  setLoading: (e: boolean) => void;
  route: number;
  setRoute: (e: number) => void;
  stop: boolean;
  setStop: (e: boolean) => void;
}

const initialValue = {
  loading: false,
  setLoading: (e: boolean) => {},
  route: -1,
  setRoute: (e: number) => {},
  stop: false,
  setStop: (e: boolean) => {},
};

export const UserContext = createContext<UserContextValues>(initialValue);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [loading, setLoading] = useState(initialValue.loading);
  const [route, setRoute] = useState(initialValue.route);
  const [stop, setStop] = useState(false);

  return (
    <UserContext.Provider
      value={{ route, setRoute, loading, setLoading, stop, setStop }}
    >
      {children}
    </UserContext.Provider>
  );
};
