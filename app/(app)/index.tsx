import { useEffect, useState } from 'react';

import { Text, View, FlatList, StyleSheet } from 'react-native';

import { Stack } from 'expo-router';

import { useSession } from '@/context/ctx';

import { fetchCategories } from '@/services/api';

export default function Index() {
  const { signOut } = useSession();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((responseData) => {
        setCategories(responseData.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        signOut();
      });
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Categories List' }} />
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text style={styles.category}>{item.name}</Text>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    padding: 8,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});