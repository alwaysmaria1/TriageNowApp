import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Patient, ColorScheme } from '@/components/lib/types';
import  { triageStatusColors }  from '@/components/ic_dash/constants'
import { useQueryPatients } from '../hooks/use-query-patients';



interface Props {
  // patients: Patient[];
}
      

export default function PatientTable() {
  // TODO: fix sort 
      const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
      const [sortField, setSortField] = useState<"_id" | "patientStatus" | "triageStatus" | "zone">("_id");
      const [sortedPatients, setSortedPatients] = useState<Patient []>();

      // useEffect(() => {
      //   setSortedPatients(patients); // Ensure table updates if `patients` prop changes
      // }, [patients]);

      const { patients } = useQueryPatients(sortField, sortDirection);

      // useEffect(() => {
      //   //call api for new sorted list
      //   //set sorted patients witj result
      //   const { patients } = useQueryPatients(sortField, sortDirection);
      //   setSortedPatients( patients );
      // }, [sortField, sortDirection]);

    //  // Sort function
    //  // TODO: fix sort
      const sortPatients = (field: "_id" | "patientStatus" | "triageStatus" | "zone") => {
        let newDirection: 'asc' | 'desc' = 'asc';
        if (sortField === field && sortDirection === 'asc') {
          newDirection = 'desc';
        }
        setSortDirection(newDirection);
        setSortField(field);
      }
    //     setSortDirection(newDirection);
    //     setSortField(field);
    
    //     const sorted = [...patients].sort((a, b) => {
    //       // Handle numeric sorting for patient ID and zone
    //       if (field === '_id' || field === 'zone') {
    //         return newDirection === 'asc' 
    //           ? parseInt(a[field].toString()) - parseInt(b[field].toString())
    //           : parseInt(b[field].toString()) - parseInt(a[field].toString());
    //       }
          
    //       // String sorting for other fields
    //       return newDirection === 'asc'
    //         ? a[field].toString().localeCompare(b[field].toString())
    //         : b[field].toString().localeCompare(a[field].toString());
    //     });
    
    //     setSortedPatients(sorted);
    //   };

     // Render table header
   const renderHeader = () => (
    <View style={styles.tableHeader}>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('_id')}>
        <ThemedText style={styles.headerText}>Patient</ThemedText>
        {sortField === '_id' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('triageStatus')}>
        <ThemedText style={styles.headerText}>Priority</ThemedText>
        {sortField === 'triageStatus' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('patientStatus')}>
        <ThemedText style={styles.headerText}>Status</ThemedText>
        {sortField === 'patientStatus' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('zone')}>
        <ThemedText style={styles.headerText}>Zone</ThemedText>
        {sortField === 'zone' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity>
      
      {/* <TouchableOpacity style={styles.headerCell} onPress={() => sortPatients('zoneLeader')}>
        <ThemedText style={styles.headerText}>Zone Leader</ThemedText>
        {sortField === 'zoneLeader' && (
          <Text>{sortDirection === 'asc' ? '↓' : '↑'}</Text>
        )}
      </TouchableOpacity> */}
      
      <View style={styles.actionsCell}>
        <ThemedText style={styles.headerText}></ThemedText>
      </View>
    </View>
  );

    // Render table row
    const  renderRow = (pt: Patient) => {
        return (
        <View style={styles.tableRow}>
          <View style={styles.cell}>
            <Text>{pt._id}</Text>
          </View>
          <View style={styles.cell}>
            <View style={[
              styles.priorityBadge, 
              { backgroundColor: triageStatusColors[pt.triageStatus]?.badgebg || '#ccc' }
            ]}>
              <Text style={styles.priorityBadgeText}>{pt.triageStatus}</Text>
            </View>
          </View>
          <View style={styles.cell}>
            <Text>{pt.patientStatus}</Text>
          </View>
          <View style={styles.cell}>
            <Text>     {pt.zone}</Text>
          </View>
          <View style={styles.actionsCell}>
            <TouchableOpacity style={styles.actionButton}>
              <Text>•••</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    return (
        <>
            {renderHeader()}
            <FlatList
                data={sortedPatients}
                renderItem={({ item }: { item: Patient }) => renderRow(item)} 
                keyExtractor={item => item._id}
                scrollEnabled={true}
            />
        </>
    );
};
 
 const styles = StyleSheet.create({
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
    actionButton: {
        padding: 4,
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
    
  });