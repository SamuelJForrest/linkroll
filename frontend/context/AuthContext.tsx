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
    setUser: () => void;
    login: (value: string) => void;
    logout: () => void;
    flashMessage: FlashMessageType | null;
    setflashMessage: (value: FlashMessageType | null) => void;
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    toggleMenu: () => void;
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
    const [showMenu, setShowMenu] = useState<boolean>(false);
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
        setShowMenu(false);
        router.push('/');
    };

    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                login,
                logout,
                flashMessage,
                setflashMessage,
                showMenu,
                setShowMenu,
                toggleMenu,
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

export { AuthProvider, useAuth, FlashMessageStatus };
export type { FlashMessageType, AuthTokenData };
