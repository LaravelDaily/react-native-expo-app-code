import { Text, View, FlatList, StyleSheet } from 'react-native';

import { Stack } from 'expo-router';

import { useSession } from '@/context/ctx';

export default function Index() {
  const { signOut } = useSession();

  const categories = [
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Health' },
    { id: '3', name: 'Finance' },
    { id: '4', name: 'Education' },
  ];

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