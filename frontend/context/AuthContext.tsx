'use client';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

type AuthTokenData = {
    username: string;
    id: number;
};

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: AuthTokenData | null;
    login: (value: string) => void;
    logout: () => void;
    flashMessage: FlashMessageType;
    setflashMessage: (value: FlashMessageType) => void;
};

type AuthProviderType = {
    children: ReactNode;
};

enum FlashMessageStatus {
    Success = 'Success',
    Error = 'Error',
}

type FlashMessageType = {
    message: string;
    status: FlashMessageStatus;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<AuthProviderType> = ({ children }) => {
    const [user, setUser] = useState<AuthTokenData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [flashMessage, setflashMessage] = useState<FlashMessageType | null>(
        null
    );
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const user = decodeToken(token);
            setUser(user);
            setIsAuthenticated(true);
        }
    }, []);

    const decodeToken = (token: string) => {
        return jwtDecode(token) as AuthTokenData;
    };

    const login = (token: string) => {
        if (token) {
            localStorage.setItem('access_token', token);
            const user = decodeToken(token);
            setUser(user);
            setIsAuthenticated(true);
            setflashMessage({
                message: `You have been successfully logged in. Welcome ${user.username}`,
                status: FlashMessageStatus.Success,
            });
        }
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
        setIsAuthenticated(false);
        setflashMessage({
            message: 'You have been successfully logged out.',
            status: FlashMessageStatus.Success,
        });
        router.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                login,
                logout,
                flashMessage,
                setflashMessage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export { AuthProvider, useAuth };
export type { FlashMessageType };