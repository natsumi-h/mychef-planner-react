import React, { FC, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

type AuthContextProviderType = {
  children: React.ReactNode;
};

type AuthContextType = {
  googleSignin: () => void;
  googleSignout: () => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  googleSignin: () => {},
  googleSignout: () => {},
  setUser: () => {},
});

export const AuthContextProvider: FC<AuthContextProviderType> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const googleSignout = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignin, googleSignout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
