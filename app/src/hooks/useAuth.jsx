
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('p2p_currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const register = ({ name, email, password, lifestyle }) => {
    const users = JSON.parse(localStorage.getItem('p2p_users') || '[]');

    if (users.some((u) => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      lifestyle,
      avatarInitial: name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('p2p_users', JSON.stringify(users));

    const userSession = { ...newUser };
    delete userSession.password;

    localStorage.setItem('p2p_currentUser', JSON.stringify(userSession));
    setUser(userSession);
    setIsAuthenticated(true);

    return userSession;
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('p2p_users') || '[]');
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userSession = { ...foundUser };
    delete userSession.password;

    localStorage.setItem('p2p_currentUser', JSON.stringify(userSession));
    setUser(userSession);
    setIsAuthenticated(true);

    return userSession;
  };

  const logout = () => {
    localStorage.removeItem('p2p_currentUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateLifestyle = (newLifestyle) => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('p2p_users') || '[]');
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex].lifestyle = newLifestyle;
      localStorage.setItem('p2p_users', JSON.stringify(users));
    }

    const updatedUser = { ...user, lifestyle: newLifestyle };
    localStorage.setItem('p2p_currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      register,
      login,
      logout,
      updateLifestyle
    }}>
      {children}
    </AuthContext.Provider>);

}

export function useAuth() {
  return useContext(AuthContext);
}