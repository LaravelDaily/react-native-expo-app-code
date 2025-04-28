import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/context/ctx';

export default function SignIn() {
  const { signUp } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignIn = () => {
    // Call your signIn function with email and password
    signUp({ name, email, password, passwordConfirmation });
    // Navigate after signing in
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Password Confirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button title="Create an Account" onPress={handleSignIn} color={styles.button.color} />
      </View>
      <View style={styles.backToLogin}>
        <Button title="Back to Login" onPress={() => router.push('/sign-in')} color={styles.backToLogin.color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  backToLogin: {
    marginTop: 12,
    width: '100%',
    color: '#333333',
    fontWeight: 'bold',
  }
});
