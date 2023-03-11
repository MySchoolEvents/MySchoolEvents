import React from "react";
import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  onIdTokenChanged,
} from "firebase/auth";
import { auth, db } from "@/firebase/config";
import app from "@/firebase/config";
import { User as FirebaseUser } from "firebase/auth";
import nookies from 'nookies';

interface AuthContextInterface {
  googleSignIn: () => void;
  logOut: () => void;
  user: FirebaseUser | null;
}

const AuthContext = createContext<AuthContextInterface>(null!);

type AuthProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);



  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!result.user) {
      throw new Error("No user found");
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if(!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/'})
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/'})
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);


  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
