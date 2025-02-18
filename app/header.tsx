import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TriageHeader() {
  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Left: Patient Number */}
        <Text style={styles.patientText}>Patient 10386</Text>

        {/* Right: IMMEDIATE button + Last update */}
        <View style={styles.rightColumn}>
          <TouchableOpacity style={styles.immediateButton}>
            <Text style={styles.immediateButtonText}>IMMEDIATE</Text>
          </TouchableOpacity>
          <Text style={styles.lastUpdateText}>Last update 16:26</Text>
        </View>
      </View>

      {/* Second Row: Status Button */}
      <TouchableOpacity style={styles.statusButton}>
        <Text style={styles.statusButtonText}>Status: TRIAGE COMPLETE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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
    alignItems: 'flex-end',
  },
  immediateButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 4,
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
