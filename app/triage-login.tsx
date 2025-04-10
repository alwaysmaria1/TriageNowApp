import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMutationUser } from '@/components/hooks/use-mutation-user';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CreateUserDTO } from '@/components/lib/types';
import { useStore } from '@/components/lib/store';

export default function TriageLogin() {
  const router = useRouter();
  const { useCreateUser } = useMutationUser();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [zone, setZone] = useState('1');
  const { currentUser, setCurrentUser } = useStore();

  //Action to create new Triage Member User
  const handleTriageMemberCreation = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }
    // setSelectedRole('Triage');
    // setIsLoading(true);
    let createdUser = null;
    try {
      const createUserDto: CreateUserDTO = {
        userID: (Math.floor(Math.random() * 9000) + 1000).toString(),
        name: name,
        role: 'Triage',
        userZone: zone,
      }

      // add user into table
      createdUser = await useCreateUser(createUserDto);
      console.log("createdUser when adding to table is", createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
      setIsLoading(false);
    }
    //set current user to global state
    if (createdUser) {
      setCurrentUser(createdUser);
    }
    console.log("createdUser when setting to global state", createdUser);
    router.push('/triage-home');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Triage Team</ThemedText>
        <ThemedText style={styles.subtitle}>Please enter your information.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>

        <Text style={styles.label}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Select your zone:</Text>
        <Picker
          selectedValue={zone}
          onValueChange={(itemValue: string) => setZone(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Zone 1" value="1" />
          <Picker.Item label="Zone 2" value="2" />
          <Picker.Item label="Zone 3" value="3" />
          <Picker.Item label="Zone 4" value="4" />
        </Picker>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <Button title="Submit" onPress={handleTriageMemberCreation} />
      </ThemedView>

      {isLoading && (
        <ThemedText style={styles.loadingText}>
          Setting up your dashboard...
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 24,
  },
  inputContainer: {
    flex: 1, // Pushes the submit button to the bottom
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  roleButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00b8d4',
    borderWidth: 2,
  },
  loadingButton: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    marginTop: 10,
    color: 'blue',
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 10,
  },
  submitContainer: {
    alignSelf: 'stretch', // Makes button stretch full width
    marginBottom: 20,
  },
});