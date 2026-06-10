"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/auth/LoginModal";
import {
  AuthUser,
  getAuthUser,
  loginUser,
} from "@/lib/auth";

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] =
    useState<AuthUser | null>(null);
  const [loginModalOpen, setLoginModalOpen] =
    useState(false);

  useEffect(() => {
    getAuthUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const login = async (
    email: string,
    password: string
  ) => {
    const loggedUser =
      await loginUser(email, password);

    setUser(loggedUser);
    setLoginModalOpen(false);

    if (loggedUser.role === "ADMIN") {
      router.push("/admin");
      router.refresh();
      return;
    }

    // Future CLIENT role destination:
    // /my-project will show project status, files, meetings, comments and deliverables.
    router.push("/my-project");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
      }}
    >
      {children}
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={login}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
