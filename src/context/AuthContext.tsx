import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'student' | 'staff' | null;

interface UserData {
    id: string;
    name: string;
    email: string;
    // Add other mock fields as needed
}

interface AuthContextType {
    userRole: UserRole;
    isAuthenticated: boolean;
    login: (role: UserRole, email: string) => void;
    logout: () => void;
    user: UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [user, setUser] = useState<UserData | null>(null);

    const login = (role: UserRole, email: string) => {
        setUserRole(role);
        setUser({
            id: '123',
            name: role === 'student' ? 'Student Name' : 'Staff Name',
            email: email,
        });
    };

    const logout = () => {
        setUserRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ userRole, isAuthenticated: !!userRole, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
