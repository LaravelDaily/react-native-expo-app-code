import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { createCategory } from '@/services/api';

export default function EditCategory() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSave = async () => {
        setLoading(true);
        setValidationErrors({});
        try {
            await createCategory({ name });
            Alert.alert('Success', 'Category created successfully');
            router.dismissTo('/')
        } catch (error) {
            if (error.validationErrors) {
                setValidationErrors(error.validationErrors);
            } else {
                Alert.alert('Error', 'Failed to create category');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Create Category' }} />
            <View style={styles.container}>
                <Text style={styles.label}>Category Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Category Name"
                />
                {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name[0]}</Text>}
                <View style={styles.button}>
                    <Button title={loading ? 'Saving...' : 'Save'} onPress={handleSave} disabled={loading} color={'#fff'} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
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
        padding: 6,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});