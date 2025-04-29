import { useCallback, useState } from 'react';

import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { Stack, router, useFocusEffect } from 'expo-router';

import { useSession } from '@/context/ctx';

import { fetchCategories, deleteCategory } from '@/services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface Category {
  id: string;
  name: string;
}

export default function Index() {
  const { signOut } = useSession();
  const [categories, setCategories] = useState([]);

  const fetchData = useCallback(() => {
    fetchCategories()
      .then((responseData) => {
        setCategories(responseData.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        signOut();
      });
  }, [signOut]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleEdit = (category: Category): void => {
    router.push(`/categories/${category.id}`);
  };

  const handleCreate = (): void => {
    router.push('/categories/create');
  };

  const handleDelete = (category: Category): void => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCategory(category.id)
            setCategories((prevCategories) =>
              prevCategories.filter((cat) => cat.id !== category.id)
            );
            Alert.alert('Success', 'Category deleted successfully');
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Categories List' }} />
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{item.name}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Icon name="delete" size={24} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Icon name="edit" size={24} color="#007BFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity style={styles.floatingButton} onPress={handleCreate}>
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,

    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  category: {
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#007BFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  actions: {
    flexDirection: 'row',
    gap: 16, // Add spacing between icons
  },
});