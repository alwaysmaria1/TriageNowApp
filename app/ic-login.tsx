import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuthActions } from "@convex-dev/auth/react";

export default function IcLogin() {
  const router = useRouter();
  const { signIn } = useAuthActions();

  // State variables for the sign-up form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userZone, setUserZone] = useState('');
  const [userID, setUserID] = useState('');

  // Handler to validate and process sign up
  const handleIcCreation = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !userZone.trim() ||
      !userID.trim()
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      await signIn("password", {
        email,
        name,
        password,
        userZone,
        userID,
        role: "Incident Commander",
        flow: 'signUp'
      });
      console.log("User signed up successfully");
      router.replace('/incident_command');
    } catch (error) {
      console.error("Unable to sign up IC user", error);
      Alert.alert('Error', 'Unable to sign up. Please try again later.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Use a ScrollView so on smaller screens the form is scrollable.
          KeyboardAvoidingView ensures fields move out of the way when keyboard appears. */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>Incident Commander</ThemedText>
            <ThemedText style={styles.subtitle}>
              Please enter your information to sign up.
            </ThemedText>
          </ThemedView>

          {/* Form Container */}
          <ThemedView style={styles.formContainer}>
            {/* Name Field */}
            <Text style={styles.label}>Name</Text>
            <Text style={styles.helpText}>
              Enter your full name as it should appear in your profile.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />

            {/* Email Field */}
            <Text style={styles.label}>Email</Text>
            <Text style={styles.helpText}>
              Enter your email address for account verification.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Field */}
            <Text style={styles.label}>Password</Text>
            <Text style={styles.helpText}>
              Create a secure password (minimum 6 characters).
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            {/* User Zone Field */}
            <Text style={styles.label}>User Zone</Text>
            <Text style={styles.helpText}>
              Specify your user zone or team identifier.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="User Zone"
              value={userZone}
              onChangeText={setUserZone}
            />

            {/* User ID Field */}
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.helpText}>
              Enter your user identification number or code.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="User ID"
              value={userID}
              onChangeText={setUserID}
            />

            {/* Custom Pressable Button for a smoother look and feel */}
            <Pressable style={styles.signUpButton} onPress={handleIcCreation}>
              <Text style={styles.signUpButtonText}>SIGN UP</Text>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background to give a softer feel
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,

    // Subtle shadow on iOS; elevation on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 14,
    color: '#333',
  },
  helpText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
