import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMutationUser } from '@/components/hooks/use-mutation-user';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CreateUserDTO } from '@/components/lib/types';
import { useStore } from '@/components/lib/store';

export default function IcLogin() {
  const router = useRouter();
  const { useCreateUser } = useMutationUser();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const { currentUser, setCurrentUser } = useStore();


  const handleIcCreation = async () => {


    if (!name.trim()) {
        Alert.alert('Error', 'Please enter your name.');
        return;
      }
  
    // setSelectedRole('Triage');
    // setIsLoading(true);
    let createdUser = null; 
      try {
        // TODO: fix dummyID
        // Create user
        const createUserDto: CreateUserDTO = {
          userID: "dummyID",
          name: name,
          role: 'Incident Commander', 
          userZone: 'Command',
        }

        // add user into table
        createdUser = await useCreateUser(createUserDto);

        
    
        router.push('/incident_command');

      } catch (error) {
        console.error('Error creating user:', error);
        setIsLoading(false);
      }
    
      //set current user to global state
      if (createdUser){
        setCurrentUser(createdUser);
      }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Triage Team</ThemedText>
        <ThemedText style={styles.subtitle}>Please enter your information.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>

        <Text style={styles.label}>Enter your name:</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
        />
        
        <Button title="Submit" onPress={handleIcCreation} />
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
    justifyContent: 'center',
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
});