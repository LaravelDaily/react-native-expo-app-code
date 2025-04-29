import { useContext, createContext, type PropsWithChildren } from 'react';

import { Alert } from 'react-native';

import { login, register } from '@/services/api';
import { useStorageState } from '@/hooks/useStorageState';

const AuthContext = createContext<{
    signIn: (data: Object) => void;
    signUp: (data: Object) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: (data) => null,
    signUp: (data) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (data) => {
                    // Perform sign-in logic here
                    login(data)
                        .then((response) => {
                            setSession(response); // Save session securely
                        })
                        .catch((error) => {
                            Alert.alert('Error while signing in', error.message);
                        });
                },
                signUp: (data) => {
                    register(data)
                        .then((response) => {
                            setSession(response);
                        })
                        .catch((error) => {
                            Alert.alert('Error while signing up', error.message);
                        });
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
