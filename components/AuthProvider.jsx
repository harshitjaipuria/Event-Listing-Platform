"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AuthModals } from "@/components/AuthModals";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function AuthProvider({ children }) {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const openSignIn = useCallback(() => {
    setSignUpOpen(false);
    setSignInOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    setSignInOpen(false);
    setSignUpOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setSignInOpen(false);
    setSignUpOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      openSignIn,
      openSignUp,
      closeAuth,
    }),
    [openSignIn, openSignUp, closeAuth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModals
        signInOpen={signInOpen}
        signUpOpen={signUpOpen}
        onOpenSignIn={setSignInOpen}
        onOpenSignUp={setSignUpOpen}
        closeAuth={closeAuth}
      />
    </AuthContext.Provider>
  );
}
