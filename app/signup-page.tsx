import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { api } from '@/convex/_generated/api';
import { CreateUserDTO } from '@/components/lib/types'; //replaced with convex auth

export default function SignupPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //Action to push user to a specific login page
  const handleRoleSelection = async (role: string) => {
    setSelectedRole(role);
    setIsLoading(true);

    try {
      //navigate to new page without a back button -- issues tho with prev pages
      if (role === "Triage") {
        router.replace('/triage-login');
        //router.push('/triage-login');
      } else {
        router.replace('/ic-login');
        //router.push('/ic-login');
      };
    } catch (error) {
      console.error('Error creating user:', error);
      setIsLoading(false);
    }
  }


  //View below which allows users to choose a specific role - and see a respective signup page
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>TriageNow</ThemedText>
        <ThemedText style={styles.subtitle}>Select Your Role</ThemedText>
      </ThemedView>
      {/* IC PAGE */}
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Incident Commander' && styles.selectedButton,
            isLoading && selectedRole === 'Incident Commander' && styles.loadingButton
          ]}
          onPress={() => handleRoleSelection('Incident Commander')}
          disabled={isLoading}
        >
          <ThemedView style={styles.buttonContent}>
            <ThemedText style={styles.buttonText}>Incident Commander</ThemedText>
            <ThemedText style={styles.description}>
              Oversee the entire incident response and coordinate resources
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
        {/* Triage PAGE */}
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Triage Team' && styles.selectedButton,
            isLoading && selectedRole === 'Triage Team' && styles.loadingButton
          ]}
          onPress={() => handleRoleSelection('Triage')}
          disabled={isLoading}
        >
          <ThemedView style={styles.buttonContent}>
            <ThemedText style={styles.buttonText}>Triage Team</ThemedText>
            <ThemedText style={styles.description}>
              Assess patients and assign priority levels at the scene
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
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
    backgroundColor: "#f0f0f0",
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
    backgroundColor: "#e0f7fa",
    borderColor: '#00b8d4',
    borderWidth: 2,
  },
  loadingButton: {
    opacity: 0.7,
  },
  buttonContent: {
    backgroundColor: 'transparent',
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
  }
});