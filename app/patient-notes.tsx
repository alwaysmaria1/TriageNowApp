import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TriageHeader from '../components/patient-notes/patient-header';
import { usePatientByBarcode } from '@/components/hooks/use-query-patient';
import { useLocalSearchParams } from 'expo-router';
import { z } from 'zod';
import { patientFormSchema } from '@/components/patient-notes/patient-form-config';
import PatientDetails from '@/components/patient-notes/patient-details';

export default function TriageNowScreen () {
  const { barcodeID } = useLocalSearchParams<{ barcodeID: string }>();
  const { patient: fetchedPatient } = usePatientByBarcode(barcodeID);
  const [patient, setPatient] = useState(fetchedPatient);

  useEffect(() => {
    setPatient(fetchedPatient);
  }, [fetchedPatient]);

  //TODO: CLEAN UP FORM CODE
  const handleSubmit = async (values: z.infer<typeof patientFormSchema>) => {
    console.log("PagePage: handleSubmit called with values:", values);
    try {
      console.log(values);
      console.log("PagePage: File created successfully");
    } catch (error) {
      console.error("PagePage: Error creating file:", error);
    }
  };

  const handleCancel = () => {
    // do nothing!
  };

  if (!patient) {
    return <Text>Loading patient data...</Text>;
  }

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>

      <TriageHeader patient={patient}></TriageHeader>
      {/* <PatientForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Patient Notes Update"
      /> */}
      <PatientDetails onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Patient Notes Update"
        patient={patient} />
      </View>
    </ScrollView>
      
    
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 5,
    paddingBottom: 250
  },
  container: {
    padding: 16,
    marginBottom: 20
  },

  // Section Name + Chevron Icon
  sectionContainer: {
    backgroundColor: '#D3D3D3',
    padding: 16,
    marginBottom: 20
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    color: 'black'
  },
  chevron: {
    marginTop: 4,
    marginLeft: 4
  },

  // Form Questions
  form: {
    backgroundColor: '#D3D3D3',
    padding: 0,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black'
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  inputPatientNotes: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    minHeight: 200,
  },

  // Camera Icon + Images
  imagesContainer: {
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#fafafa',
  },
  imagePlaceholderText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

