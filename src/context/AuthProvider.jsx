import { useState } from 'react';
import { AuthContext } from './useAuth'; // This matches the filename above

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === 'test@test.com' && password === '123456') {
      setUser({ email });
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};