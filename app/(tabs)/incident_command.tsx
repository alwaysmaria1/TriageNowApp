import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Patient, ColorScheme } from '@/components/ic_dash/types';
import  PatientTable  from '@/components/ic_dash/pt_table';
import  { priorityColors, initialPatients }  from '@/components/ic_dash/constants'



export default function IncidentCommandDashboard() {
  const [patients, setPatients] =  useState<Patient[]>(initialPatients);
  const [openZone, setOpenZone] = useState<string | null>(null);

  // Calculate patient counts by priority
  const priorityCounts = patients.reduce<Record<string, number>>((counts, patient) => {
    const priority = patient.priority;
    counts[priority] = (counts[priority] || 0) + 1;
    return counts;
  }, {});


  const zoneStaff: Record<string, string []>= {
    'Zone 1': ['person1'],
    'Zone 2': ['person2','person3','person4'],
    'Zone 3': ['person5','person6'],
    'Zone 4': ['person7', 'person8', 'person9', 'person10'],
  };


  // Render priority status card
  const renderPriorityCard = (title: string, count = 0, colorScheme: ColorScheme) => (
    <View style={[styles.priorityCard, { backgroundColor: colorScheme.bg }]}>
      <Text style={[styles.priorityCount, { color: colorScheme.value }]}>{count || 0}</Text>
      <Text style={[styles.priorityLabel, { color: colorScheme.text }]}>{title}</Text>
    </View>
  );

   // Toggle function to expand or collapse the zone list
   const toggleZone = (zone: string) => {
    setOpenZone(openZone === zone ? null : zone); // Toggle the clicked zone's state
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>TriageNow</ThemedText>
        <ThemedText style={styles.subtitle}>Incident Command Dashboard</ThemedText>
      </ThemedView>

      <ScrollView horizontal style={styles.priorityCardsContainer}>
        {renderPriorityCard('IMMEDIATE', priorityCounts['IMMEDIATE'], priorityColors.IMMEDIATE)}
        {renderPriorityCard('DELAYED', priorityCounts['DELAYED'], priorityColors.DELAYED)}
        {renderPriorityCard('MINOR', priorityCounts['MINOR'], priorityColors.MINOR)}
        {renderPriorityCard('EXPECTANT', priorityCounts['EXPECTANT'], priorityColors.EXPECTANT)}
      </ScrollView>

      <ThemedView style={styles.mainBody}>

        {/* patient table in left column */}
        <ThemedView style={styles.tableContainer}>
          <PatientTable patients={initialPatients} />       
        </ThemedView>

        {/* staff list by zone in right column */}
        <ThemedView style={styles.staffList}>
          {Object.entries(zoneStaff).map(([zone, staff]) => (
          <View key={zone} style={styles.zoneContainer}>
            <TouchableOpacity
              style={styles.zoneTitle}
              onPress={() => toggleZone(zone)} // Toggle visibility of the staff list
            >
              <Text style={styles.zoneText}>{zone}</Text>
            </TouchableOpacity>

            {/* Render staff list if this zone is open */}
            {openZone === zone && (
              <View style={styles.staffList}>
                {staff.map((person, index) => (
                  <Text key={index} style={styles.staffText}>
                    {person}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  priorityCardsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
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
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },

  stafflist: {
    backgroundColor: 'e8e8e8',
    flex: 1,
  },
  zoneContainer: {
    marginBottom: 20,
  },
  zoneTitle: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginBottom: 5,
  },
  zoneText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  staffList: {
    marginLeft: 20,
    paddingTop: 5,
  },
  staffText: {
    fontSize: 16,
  },
});