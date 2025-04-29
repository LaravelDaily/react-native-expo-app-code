import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { fetchCategoryById, updateCategory } from '@/services/api';

export default function EditCategory() {
    const { id } = useLocalSearchParams(); // Get the category ID from the route
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategoryById(id)
            .then((response) => setName(response.data.name))
            .catch((error) => Alert.alert('Error', 'Failed to fetch category details'));
    }, [id]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateCategory(id, { name });
            Alert.alert('Success', 'Category updated successfully');
            router.dismissTo('/')
        } catch (error) {
            Alert.alert('Error', 'Failed to update category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Edit Category' }} />
            <View style={styles.container}>
                <Text style={styles.label}>Category Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Category Name"
                />
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