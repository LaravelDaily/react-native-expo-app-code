import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { login, register } from '@/services/api';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { setSession, clearSession } from '@/services/auth';

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
    const router = useRouter();
    const [[isLoading, session], setSessionState] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (data) => {
                    login(data)
                        .then((response) => {
                            setSessionState(response);
                            setSession(response); // Save session securely
                            router.replace('/');
                        })
                        .catch((error) => {
                            Alert.alert('Error while signing in', error.message);
                        });
                },
                signUp: (data) => {
                    register(data)
                        .then((response) => {
                            setSessionState(response);
                            setSession(response); // Save session securely
                            router.replace('/');
                        })
                        .catch((error) => {
                            Alert.alert('Error while signing up', error.message);
                        });
                },
                signOut: () => {
                    clearSession(); // Clear session securely
                    setSessionState(null);
                    router.replace('/sign-in'); // Redirect to login page
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
