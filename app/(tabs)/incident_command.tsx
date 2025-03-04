import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// create patient type
interface Patient {
  id: string;
  priority: string;
  status: string;
  zone: string;
  zoneLeader: string;
  [key: string]: string; // Allow dynamic access for sorting 
}

interface ColorScheme {
  bg: string;
  text: string;
  value: string;
}

// Mock data for demonstration
const initialPatients: Patient[] = [
  { id: '10386', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '3', zoneLeader: 'Kamila Wong' },
  { id: '10387', priority: 'DELAYED', status: 'Triage Complete', zone: '3', zoneLeader: 'Kamila Wong' },
  { id: '10388', priority: 'DELAYED', status: 'Triage Complete', zone: '1', zoneLeader: 'Maria Herne' },
  { id: '10389', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '2', zoneLeader: 'Meghana Karthic' },
  { id: '10390', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '1', zoneLeader: 'Maria Herne' },
  { id: '10391', priority: 'EXPECTANT', status: 'Triage Complete', zone: '2', zoneLeader: 'Kamila Wong' },
];

export default function IncidentCommandDashboard() {
  const [patients, setPatients] =  useState<Patient[]>(initialPatients);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof Patient | null>(null);
  const [openZone, setOpenZone] = useState<string | null>(null);

  // Calculate patient counts by priority
  const priorityCounts = patients.reduce<Record<string, number>>((counts, patient) => {
    const priority = patient.priority;
    counts[priority] = (counts[priority] || 0) + 1;
    return counts;
  }, {});

  // Define priority colors
  const priorityColors: Record<string, ColorScheme>= {
    IMMEDIATE: { bg: '#F8D7DA', text: '#DC3545', value: '#DC3545' },
    DELAYED: { bg: '#FFF3CD', text: '#634b02', value: '#FFDC00' },
    MINOR: { bg: '#D4EDDA', text: '#28A745', value: '#28A745' },
    EXPECTANT: { bg: '#E2E3E5', text: '#1B1E21', value: '#6C757D' },
  };

  const zoneStaff: Record<string, string []>= {
    'Zone 1': ['person1'],
    'Zone 2': ['person2','person3','person4'],
    'Zone 3': ['person5','person6'],
    'Zone 4': ['person7', 'person8', 'person9', 'person10'],
  };

  // Sort function
  const sortPatients = (field: keyof Patient) => {
    let newDirection: 'asc' | 'desc' = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      newDirection = 'desc';
    }

    setSortDirection(newDirection);
    setSortField(field);

    const sortedPatients = [...patients].sort((a, b) => {
      // Handle numeric sorting for patient ID and zone
      if (field === 'id' || field === 'zone') {
        return newDirection === 'asc' 
          ? parseInt(a[field]) - parseInt(b[field])
          : parseInt(b[field]) - parseInt(a[field]);
      }
      
      // String sorting for other fields
      return newDirection === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });

    setPatients(sortedPatients);
  };

  // Render priority status card
  const renderPriorityCard = (title: string, count = 0, colorScheme: ColorScheme) => (
    <View style={[styles.priorityCard, { backgroundColor: colorScheme.bg }]}>
      <Text style={[styles.priorityCount, { color: colorScheme.value }]}>{count || 0}</Text>
      <Text style={[styles.priorityLabel, { color: colorScheme.text }]}>{title}</Text>
    </View>
  );

  // Render table header
  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('id')}>
        <ThemedText style={styles.headerText}>Patient</ThemedText>
        {sortField === 'id' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('priority')}>
        <ThemedText style={styles.headerText}>Priority</ThemedText>
        {sortField === 'priority' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('status')}>
        <ThemedText style={styles.headerText}>Status</ThemedText>
        {sortField === 'status' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('zone')}>
        <ThemedText style={styles.headerText}>Zone</ThemedText>
        {sortField === 'zone' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('zoneLeader')}>
        <ThemedText style={styles.headerText}>Zone Leader</ThemedText>
        {sortField === 'zoneLeader' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.actionsCell}>
        <ThemedText style={styles.headerText}></ThemedText>
      </View>
    </View>
  );

  // Render table row
  const renderRow = (pt: Patient) => (
    <View style={styles.tableRow}>
      <View style={styles.cell}>
        <Text>{pt.id}</Text>
      </View>
      <View style={styles.cell}>
        <View style={[
          styles.priorityBadge, 
          { backgroundColor: priorityColors[pt.priority]?.value || '#ccc' }
        ]}>
          <Text style={styles.priorityBadgeText}>{pt.priority}</Text>
        </View>
      </View>
      <View style={styles.cell}>
        <Text>{pt.status}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{pt.zone}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{pt.zoneLeader}</Text>
      </View>
      <View style={styles.actionsCell}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>•••</Text>
        </TouchableOpacity>
      </View>
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
        <ThemedView style={styles.tableContainer}>
          {renderHeader()}
          <FlatList
            data={patients}
            renderItem={({ item }: { item: Patient }) => renderRow(item)} 
            keyExtractor={item => item.id}
            scrollEnabled={true}
          />
        </ThemedView>
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  actionsCell: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  priorityBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionButton: {
    padding: 4,
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