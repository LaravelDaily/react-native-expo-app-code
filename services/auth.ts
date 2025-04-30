import * as SecureStore from 'expo-secure-store';

export async function getSession() {
  try {
    const session = await SecureStore.getItemAsync('session');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
}

export async function setSession(session: object) {
  try {
    await SecureStore.setItemAsync('session', JSON.stringify(session));
  } catch (error) {
    console.error('Error saving session:', error);
  }
}

export async function clearSession() {
  try {
    await SecureStore.deleteItemAsync('session');
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}