import { useCallback, useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router, Stack, useFocusEffect } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchTransactions, deleteTransaction } from '@/services/api';
import { useSession } from '@/context/ctx';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  description: string;
  category_name: string;
  transaction_date: string;
}

export default function Index() {
  const { signOut } = useSession();
  const [transactions, setTransactions] = useState([]);

  const fetchData = useCallback(() => {
    fetchTransactions()
      .then((responseData) => {
        setTransactions(responseData.data);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
        signOut();
      });
  }, [signOut]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleEdit = (transaction: Transaction): void => {
    router.push(`/transactions/${transaction.id}`);
  };

  const handleDelete = (transaction: Transaction): void => {
    Alert.alert(
      'Delete transaction',
      `Are you sure you want to delete the transaction?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTransaction(transaction.id);
            setTransactions((prevTransactions) =>
              prevTransactions.filter((cat) => cat.id !== transaction.id)
            );
            Alert.alert('Success', 'ransaction deleted successfully');
          },
        },
      ]
    );
  };

  const handleCreate = (): void => {
    router.push('/transactions/create');
  };


  return (
    <>
      <Stack.Screen options={{ title: 'Transactions' }} />
      <View style={styles.container}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionContainer}>
              <View style={styles.transactionDetails}>
                <Text style={styles.amount}>${item.amount}</Text>
                <Text style={styles.category}>{item.category_name}</Text>
              </View>
              <View style={styles.transactionMeta}>
                <Text style={styles.date}>{new Date(item.transaction_date).toLocaleDateString('en-GB')}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Icon name="edit" size={24} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Icon name="delete" size={24} color="#555" />
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
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionDetails: {
    flex: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#555',
  },
  transactionMeta: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  description: {
    fontSize: 12,
    color: '#999',
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
