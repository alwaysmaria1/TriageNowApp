import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Patient, ColorScheme } from '@/components/lib/types';
import  PatientTable  from '@/components/ic_dash/pt_table';
import  StaffList  from '@/components/ic_dash/staff_list';

import  { triageStatusColors, initialPatients, zoneStaff }  from '@/components/ic_dash/constants'



export default function IncidentCommandDashboard() {
  const [patients, setPatients] =  useState<Patient[]>(initialPatients);

  // Calculate patient counts by priority
  const priorityCounts = patients.reduce<Record<string, number>>((counts, patient) => {
    const priority = patient.triageStatus;
    counts[priority] = (counts[priority] || 0) + 1;
    return counts;
  }, {});


  // Render priority status card
  const renderPriorityCard = (title: string, count = 0, colorScheme: ColorScheme) => (
    <View style={[styles.priorityCard, { backgroundColor: colorScheme.bg }]}>
      <Text style={[styles.priorityCount, { color: colorScheme.value }]}>{count || 0}</Text>
      <Text style={[styles.priorityLabel, { color: colorScheme.text }]}>{title}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>TriageNow</ThemedText>

      <ThemedView style={styles.topHalf}>
        {/* <ThemedView style={styles.header}> */}
          <ThemedText style={styles.subtitle}>Incident Command Dashboard</ThemedText>
        {/* </ThemedView> */}

      <ThemedView style={styles.priorityCardsContainer}>
        <ScrollView horizontal >
          {renderPriorityCard('IMMEDIATE', priorityCounts['IMMEDIATE'], triageStatusColors.IMMEDIATE)}
          {renderPriorityCard('DELAYED', priorityCounts['DELAYED'], triageStatusColors.DELAYED)}
          {renderPriorityCard('MINOR', priorityCounts['MINOR'], triageStatusColors.MINOR)}
          {renderPriorityCard('EXPECTANT', priorityCounts['EXPECTANT'], triageStatusColors.EXPECTANT)}
        </ScrollView>
      </ThemedView>
      </ThemedView>
      <ThemedView style={styles.mainBody}>

        {/* patient table in left column */}
        <ThemedView style={styles.tableContainer}>
          <PatientTable patients={initialPatients} />       
        </ThemedView>

        {/* staff list by zone in right column */}
        <ThemedView style={styles.staffList}>
          <StaffList zoneStaff={zoneStaff} />       

        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
  
  },
  topHalf: {
    flexDirection: 'row',
    flex: 0.4,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 10,
    paddingLeft: 2,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30
    ,
  },
  priorityCardsContainer: {
    // marginBottom: 24,
    // flexShrink: 0,
    // flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns cards to the right
    alignItems: 'center', // Ensures proper vertical alignment
  },
  priorityCard: {
    width: 120,
    height: 80,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityCount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  priorityLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  mainBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 30,
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    
  },
  staffList: {
    backgroundColor: 'e8e8e8',
    flex: 0.5,
    marginLeft: 20,
    paddingTop: 5,
  },

});