import { useCallback, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter, useLocalSearchParams, Stack, useFocusEffect } from 'expo-router';
import { fetchCategories, fetchTransactionById, updateTransaction } from '@/services/api';
import DatePicker from 'react-native-date-picker';

export default function CreateCategory() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the transaction ID from the route
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchTransactionById(id)
      .then((response) => {
        setAmount(response.data.amount.toString());
        setDescription(response.data.description);
        setTransactionDate(new Date(response.data.transaction_date));
        setSelectedCategory(response.data.category_id);
      })
      .catch((error) => Alert.alert('Error', 'Failed to fetch category details'));
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    setValidationErrors({});
    try {
      await updateTransaction(id, { amount, category_id: selectedCategory, description, transaction_date: transactionDate });
      Alert.alert('Success', 'Transaction updated successfully');
      router.dismissTo('/transactions');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      } else {
        Alert.alert('Error', 'Failed to update transaction');
      }
    } finally {
      setLoading(false);
    }
  };

  // Retrieve categories on focus
  useFocusEffect(
    useCallback(() => {
      const getCategories = async () => {
        try {
          const response = await fetchCategories();
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      getCategories();
    }, [])
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Edit Transaction', headerBackTitle: 'Back' }} />
      <View style={styles.container}>
        <Text style={styles.label}>Amount*</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.amountPrefix}>$</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount"
            keyboardType="numeric"
          />
        </View>
        {validationErrors.amount && <Text style={styles.errorText}>{validationErrors.amount[0]}</Text>}
        <Text style={styles.label}>Category*</Text>
        <Dropdown
          data={categories.map((category) => ({ label: category.name, value: category.id }))}
          labelField="label"
          valueField="value"
          placeholder="Select a category"
          value={selectedCategory}
          onChange={(item) => setSelectedCategory(item.value)}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />
        {validationErrors.category_id && <Text style={styles.errorText}>{validationErrors.category_id[0]}</Text>}
        <Text style={styles.label}>Description*</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter a description"
          multiline
        />
        {validationErrors.description && <Text style={styles.errorText}>{validationErrors.description[0]}</Text>}
        <Text style={styles.label}>Transaction Date</Text>
        <View style={styles.datePickerButton}>
          <Button
            title={transactionDate.toLocaleDateString()}
            onPress={() => setOpen(true)} />
        </View>
        <DatePicker
          modal
          open={open}
          date={transactionDate}
          onConfirm={(date) => {
            setOpen(false);
            setTransactionDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
          style={styles.datePicker}
        />
        <View style={styles.button}>
          <Button title={loading ? 'Updating...' : 'Update'} onPress={handleSave} disabled={loading} color={'#fff'} />
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
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  amountPrefix: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  dropdown: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    color: '#aaa',
  },
  selectedTextStyle: {
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 6,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: 'top', // Ensures text starts at the top for multiline
  },
  datePicker: {
    marginBottom: 16,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: '#000',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});