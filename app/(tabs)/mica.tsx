import { StyleSheet, Button, SafeAreaView, Image, Text } from 'react-native';
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
      <SafeAreaView style={styles.header}>
        <ThemedText style={styles.ptTitle}>Patient 10387</ThemedText>
        <SafeAreaView style={styles.priority}>
          {/* TODO: make this go to triage page */}
          <SafeAreaView style={styles.priorityBadge}>
            <Button color= "#fff" title="MINOR" onPress={() => router.back()} />
          </SafeAreaView>
          <Text style={styles.lastUpdate}>Last update 16:26</Text>
        </SafeAreaView>
      </SafeAreaView>
      

    {/* Care continuum Status */}
      <SafeAreaView style={styles.careStatusContainer}>
        <ThemedText style={styles.careStatusLabel} >Status: </ThemedText>
        <ThemedText style={styles.careStatusValue}> TRIAGE COMPLETE</ThemedText>
      </SafeAreaView>

    {/* Patient demographics section 
    TODO: add in demographics info 
    TODO: figure out how to input*/}
      <SafeAreaView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Patient Demographics</ThemedText>
        <SafeAreaView style={styles.addInfoButton}>
          <Button color= "#555" title="CLICK TO RECORD DEMOGRAPHICS" onPress={() => router.back()} />
        </SafeAreaView>
      </SafeAreaView>

    {/* patient care notes  
    TODO: list notes added
    TODO: allow edit/add notes */}
      <SafeAreaView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Patient Care Notes:</ThemedText>
        <SafeAreaView style={styles.addInfoButton}>
          <Button color= "#555" title="CLICK TO RECORD PATIENT CARE NOTES" onPress={() => router.back()} />
        </SafeAreaView>
      </SafeAreaView>
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },

  logo: {
    height: 50,
    width: 100,
    marginTop: 20,  
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ptTitle: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 34,
  },

  priority: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  priorityBadge: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  priorityText: {
    color: "#fff",
    fontWeight: "bold",
  },

  lastUpdate: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },

  careStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  careStatusLabel: {
    fontWeight: "bold",
    padding:6,
  },
  careStatusValue: {
    fontSize: 14,
  },

  section: {
    padding: 15,
    marginTop: 5,
    alignItems: 'flex-start',
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    minHeight: '20%',
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 2,
    padding: 4,
  },

  addInfoButton: {
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",  
    alignSelf: "stretch",
    },

});
