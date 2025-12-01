import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import type { AuthUser } from "../types";

type AuthContextValue = {
  user: AuthUser | null;
  initializing: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Firebase tells us who is signed in after it finishes the first auth check.
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser ? toAuthUser(firebaseUser) : null);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      initializing,
      signUp: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
      },
      signIn: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      signOutUser: async () => {
        await signOut(auth);
      },
      resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
      },
    };
  }, [user, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}