import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

type AuthTokenData = {
    username: string;
    id: number;
};

const useAuthToken = (): {
    hasAuthToken: boolean;
    authTokenData: AuthTokenData | null;
} => {
    const [hasAuthToken, setHasAuthToken] = useState<boolean>(false);
    const [authTokenData, setAuthTokenData] = useState<AuthTokenData | null>(
        null
    );

    useEffect(() => {
        const authToken = localStorage.getItem('access_token');

        if (authToken) {
            const decodedToken = jwtDecode(authToken) as AuthTokenData;
            setAuthTokenData(decodedToken);
            setHasAuthToken(true);
        } else {
            setAuthTokenData(null);
            setHasAuthToken(false);
        }
    }, [hasAuthToken]);

    return { hasAuthToken, authTokenData };
};

export default useAuthToken;
