import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import TriageHeader from '../components/patient-notes/patient-header';
import { usePatientByBarcode } from '@/components/hooks/use-query-patient';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ChevronDown, ChevronUp } from 'lucide-react-native';


export default function TriageNowScreen () {
  const { barcodeID } = useLocalSearchParams<{ barcodeID: string }>();
  const { patient } = usePatientByBarcode(barcodeID);
  const [isDemographicsExpanded, setIsDemographicsExpanded] = useState(false);
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(false);
  const [isPatientNotesExpanded, setIsPatientNotesExpanded] = useState(false);

  if (!patient) {
    return <Text>Loading patient data...</Text>;
  }

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>

      <TriageHeader patient={patient}></TriageHeader>

      {/* Demographic Header */}
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.header} onPress={() => setIsDemographicsExpanded(!isDemographicsExpanded)}>
          <View style={styles.topRow}>
            <ThemedText style={styles.title}>Demographics</ThemedText>
              {isDemographicsExpanded ? <ChevronUp size={24} style={styles.chevron}/> : <ChevronDown size={24} style={styles.chevron}/>}
          </View>
        </Pressable>

        {/* Demographic Questions */}
        {isDemographicsExpanded && (
          <ThemedView style={styles.form}>
            <ThemedText style={styles.label}>Name:</ThemedText>
            <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>DOB:</ThemedText>
            <TextInput style={styles.input} placeholder="MM/DD/YYYY" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>Age:</ThemedText>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter age" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>Sex:</ThemedText>
            <TextInput style={styles.input} placeholder="Enter sex" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>Weight:</ThemedText>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter weight" placeholderTextColor="#a5a5a5"/>
          </ThemedView>
        )}
      </ThemedView>

      {/* Contact Info Header */}
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.header} onPress={() => setIsContactInfoExpanded(!isContactInfoExpanded)}>
          <View style={styles.topRow}>
            <ThemedText style={styles.title}>Contact Information</ThemedText>
                {isContactInfoExpanded ? <ChevronUp size={24} style={styles.chevron}/> : <ChevronDown size={24} style={styles.chevron}/>}
          </View>
        </Pressable>

        {/* Contact Info Questions */}
        {isContactInfoExpanded && (
          <ThemedView style={styles.form}>
            <ThemedText style={styles.label}>Address:</ThemedText>
            <TextInput style={styles.input} placeholder="Enter address" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>City:</ThemedText>
            <TextInput style={styles.input} placeholder="Enter city" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>Street:</ThemedText>
            <TextInput style={styles.input} placeholder="Enter street" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>Zip:</ThemedText>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter zipcode" placeholderTextColor="#a5a5a5"/>

            <ThemedText style={styles.label}>Phone:</ThemedText>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter phone" placeholderTextColor="#a5a5a5"/>
          </ThemedView>
        )}
      </ThemedView>

      {/* Patient Notes Header */}
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.header} onPress={() => setIsPatientNotesExpanded(!isPatientNotesExpanded)}>
          <View style={styles.topRow}>
            <ThemedText style={styles.title}>Patient Notes</ThemedText>
                {isPatientNotesExpanded ? <ChevronUp size={24} style={styles.chevron}/> : <ChevronDown size={24} style={styles.chevron}/>}
          </View>
        </Pressable>

        {/* Patient Notes Question*/}
        {isPatientNotesExpanded && (
          <ThemedView style={styles.form}>
            <TextInput style={styles.inputPatientNotes} multiline={true} placeholder="Enter notes" placeholderTextColor="#a5a5a5"/>
          </ThemedView>
        )}
      </ThemedView>
      
      {/* Images Section */}
      <View style={styles.imagesContainer}>
        <TouchableOpacity style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Camera Icon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Image Placeholder</Text>
        </TouchableOpacity>
      </View>
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

