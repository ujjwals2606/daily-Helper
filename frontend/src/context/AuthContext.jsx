import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const storageKey = 'dailyhelper.auth';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setToken(parsed.token);
      setUser(parsed.user);
    }
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      // Minimal decode: payload is base64 in middle part
      try {
        const payload = JSON.parse(atob(t.split('.')[1]));
        const u = { id: payload.id, role: payload.role, email: payload.email, name: payload.name };
        localStorage.setItem(storageKey, JSON.stringify({ token: t, user: u }));
        setToken(t);
        setUser(u);
        params.delete('token');
        const newUrl = `${window.location.pathname}?${params.toString()}`.replace(/\?$/, '');
        window.history.replaceState({}, '', newUrl);
      } catch {}
    }
  }, []);

  const value = useMemo(() => ({ token, setToken, user, setUser, logout: () => { localStorage.removeItem(storageKey); setToken(null); setUser(null); } }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);


