import Keycloak from "keycloak-js";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  roles?: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  initialized: boolean;
  login: () => void;
  logout: () => void;
  register: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const keycloak = new Keycloak({
  url: "http://localhost:8081",
  realm: "LibraryKeycloak",
  clientId: "public-client",
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
          pkceMethod: "S256",
        });

        setIsAuthenticated(authenticated);
        setInitialized(true);

        if (authenticated && keycloak.token) {
          setToken(keycloak.token);
          localStorage.setItem("token", keycloak.token);

          const tokenPayload = JSON.parse(atob(keycloak.token.split(".")[1]));
          setUser({
            id: tokenPayload.sub,
            username: tokenPayload.preferred_username || tokenPayload.sub,
            email: tokenPayload.email,
            name: tokenPayload.name,
            roles: tokenPayload.realm_access?.roles || [],
          });

          keycloak.onTokenExpired = () => {
            keycloak
              .updateToken(70)
              .then((refreshed) => {
                if (refreshed && keycloak.token) {
                  setToken(keycloak.token);
                  localStorage.setItem("token", keycloak.token);
                }
              })
              .catch(() => {
                console.error("Failed to refresh token");
                logout();
              });
          };
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to initalize keycloak", error);
        setInitialized(true);
      }
    };
    initKeycloak();
  }, []);

  const login = () => {
    keycloak.login();
  };

  const register = () => {
    keycloak.register();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    keycloak.logout();
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    token,
    user,
    initialized,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
