import { StyleSheet, Button, SafeAreaView, Image } from 'react-native';
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
      {/* A button to navigate back to the previous screen */}
      <Button title="Go Back" onPress={() => router.back()} />
    {/* TODO: insert actual logo */}
      <SafeAreaView>
        <Image 
          source={require('@/assets/images/TriageNowLogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </SafeAreaView>

    {/* Patient ID
    TODO: replace ID number placeholder */}
      <SafeAreaView style={styles.ptID}>
        <ThemedText type="title">Patient 10387</ThemedText>
      </SafeAreaView>

    {/* Care continuum Status */}
      <SafeAreaView style={styles.careStatus}>
        <ThemedText>Triage Status</ThemedText>
      </SafeAreaView>

    {/* Patient demographics section 
    TODO: add in demographics info 
    TODO: figure out how to input*/}
      <SafeAreaView style={styles.patientDemographics}>
      <ThemedText>Patient Demographics</ThemedText>
        <ThemedText>ID:</ThemedText>
        <ThemedText>Name: </ThemedText>
        <ThemedText>Triage Color: </ThemedText>

        
      </SafeAreaView>

    {/* patient care notes  
    TODO: list notes added
    TODO: allow edit/add notes */}
      <SafeAreaView style={styles.patientCareNotes}>
        <ThemedText>Patient Care Notes:</ThemedText>

      </SafeAreaView>
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },

  logo: {
    height: 50,
    width: 100,
    marginTop: 20,  
  },

  ptID: {
    padding: 16,
    marginTop: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'left',
  },

  priority: {
    padding: 16,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },


  careStatus: {
    padding: 16,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },

  patientDemographics: {
    flex: 1,
    padding: 16,
    margin: 3,
    alignItems: 'flex-start',
    backgroundColor: '#ededed',
    borderRadius: 3,
    borderWidth: 1, 
    borderColor: 'grey',
  },

  patientCareNotes: {
    flex: 1,
    padding: 16,
    margin: 3,
    alignItems: 'flex-start',
    backgroundColor: '#ededed',
    borderRadius: 3,
    borderWidth: 1, 
    borderColor: 'grey',
  },
});
