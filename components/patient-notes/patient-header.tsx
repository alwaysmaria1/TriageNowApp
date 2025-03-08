import { Patient } from '@/components/lib/types';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getStatusColor } from '../lib/utils';
import { ThemedText } from '../ThemedText';



export default function TriageHeader({ patient }: { patient: Patient }) {

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Use 24-hour format; set to true for AM/PM
    }).replace(",", ""); // Remove extra comma
};

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <ThemedText type="title">Patient {patient.barcodeID}</ThemedText>
      </View>

      {/* Triage Status + Last Updated */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: patient.triageStatus ? getStatusColor(patient.triageStatus) : 'gray' },
          ]}
        >
        <Text style={styles.triageStatusText}>{patient.triageStatus}</Text>
        </TouchableOpacity>
        <Text style={styles.lastUpdateText}>{formatDate(patient.lastUpdated)}</Text>
      </View>

      {/* Patient Status + Last Updated - need to create a different last updated field for patient status*/}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.patientStatusText}>{patient.patientStatus}</Text>
        </TouchableOpacity>
        <Text style={styles.lastUpdateText}>{formatDate(patient.lastUpdated)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  patientText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rightColumn: {
    alignItems: 'flex-start',
    maxWidth: '25%',
    flexShrink: 1, 
  },

  // Triage + Patient Status Buttons
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 4,
    maxWidth: '100%',  
    backgroundColor: '#8deaff',
    alignSelf: 'flex-start' // if you want it to size itself, or 'stretch' to fill
  },
  triageStatusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  patientStatusText: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Last Updated Text
  lastUpdateText: {
    fontSize: 15,
    color: '#666',
    paddingLeft: 10,
    paddingTop: 6
  },
});
