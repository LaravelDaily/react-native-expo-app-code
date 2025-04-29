import { Text, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: 'Transactions' }} />
      <View style={styles.container}>
        <Text>WIP... Transactions List</Text>
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
  actions: {
    flexDirection: 'row',
    gap: 16, // Add spacing between icons
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
});