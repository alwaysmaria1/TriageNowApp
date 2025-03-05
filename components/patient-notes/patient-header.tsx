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
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Left: Patient Number */}
        <Text type="subtitle" style={styles.patientText}>Patient {patient.barcodeID}</Text>

        {/* Right: Triage status button + Last update */}
        <View style={styles.rightColumn}>
        <TouchableOpacity
            style={[
              styles.immediateButton,
              { backgroundColor: getStatusColor(patient.triageStatus) },
            ]}
          >
            <Text style={styles.immediateButtonText}>{patient.triageStatus}</Text>
          </TouchableOpacity>
          <Text style={styles.lastUpdateText}>Last update: {formatDate(patient.lastUpdated)}</Text>
        </View>
      </View>

      {/* Second Row: Overall Status Button */}
      <TouchableOpacity style={styles.statusButton}>
        <Text style={styles.statusButtonText}>Status: {patient.patientStatus}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  immediateButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 4,
    alignSelf: 'flex-start',  // Prevents stretching too far
    maxWidth: '100%',  
  },
  immediateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lastUpdateText: {
    fontSize: 12,
    color: '#666',
  },
  statusButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    alignSelf: 'flex-start', // if you want it to size itself, or 'stretch' to fill
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
