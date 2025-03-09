import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Patient, ColorScheme } from '@/components/lib/types';
import  PatientTable  from '@/components/ic_dash/pt_table';
import  PriorityCards  from '@/components/ic_dash/priority_cards';
import  StaffList  from '@/components/ic_dash/staff_list';
import { useQueryPatients } from '@/components/hooks/use-query-patients';


import  {zoneStaff }  from '@/components/ic_dash/constants'



export default function IncidentCommandDashboard() {

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>TriageNow</ThemedText>

      <ThemedView style={styles.topHalf}>
        {/* <ThemedView style={styles.header}> */}
          <ThemedText style={styles.subtitle}>Incident Command Dashboard</ThemedText>
        {/* </ThemedView> */}

      <ThemedView style={styles.priorityCardsContainer}>
        <PriorityCards></PriorityCards>
      </ThemedView>
      </ThemedView>
      <ThemedView style={styles.mainBody}>

        {/* patient table in left column */}
        <ThemedView style={styles.tableContainer}>
          {/* <PatientTable patients={initialPatients} />        */}
          <PatientTable />       
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
  
  mainBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 30,
    // TODO: stop content from moving when zone menus open
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