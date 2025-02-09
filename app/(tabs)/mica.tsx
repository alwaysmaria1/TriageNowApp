import { StyleSheet, Button } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PatientScreen() {
  // Retrieve the patient ID from the route parameters.
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Patient Details</ThemedText>
      <ThemedText>ID:</ThemedText>
      <ThemedText>Name: </ThemedText>
      <ThemedText>Triage Color: </ThemedText>

      {/* A button to navigate back to the previous screen */}
      <Button title="Go Back" onPress={() => router.back()} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
