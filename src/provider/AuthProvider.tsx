
import { api } from "@/lib/utils";
import type { User } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  type ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

type AuthContextProps = {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void | null;
  setUser: (user: User) => void | null
  logout: () => Promise<void>;
  loading: boolean
};

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)
  const queryClient = useQueryClient();
  const navigate = useNavigate()


  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch(`${api}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) return null
      const data = await res.json();

      return data.accessToken;
    } catch (err) {
      setUser(null);
      setToken(null);
      queryClient.clear()
      navigate("/login")
      return null;
    }
  }, []);


  const logout = async () => {
    setTimeout(async () => {
      try {
        await fetch(`${import.meta.env.VITE_API}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setUser(null);
        setToken(null);
        queryClient.clear();
      }
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      const newToken = await refreshAuth();
      setLoading(false)
      if (newToken) {
        setToken(newToken);
      }
    })();
  }, [refreshAuth, token]);
  const contextValue = useMemo<AuthContextProps>(
    () => ({
      user,
      token,
      setToken,
      setUser,
      logout,
      loading
    }),
    [user, token, setToken, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
