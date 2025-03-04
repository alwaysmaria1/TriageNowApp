import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Patient, ColorScheme } from '@/components/ic_dash/types';
import  { priorityColors }  from '@/components/ic_dash/constants'



interface Props {
    patients: Patient[];
  }
      

const PatientTable: React.FC<Props> = ({ patients }) => {
      const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
      const [sortField, setSortField] = useState<keyof Patient | null>(null);
      const [sortedPatients, setSortedPatients] = useState<Patient []>(patients);

      useEffect(() => {
        setSortedPatients(patients); // Ensure table updates if `patients` prop changes
      }, [patients]);
    

     // Sort function
      const sortPatients = (field: keyof Patient) => {
        let newDirection: 'asc' | 'desc' = 'asc';
        if (sortField === field && sortDirection === 'asc') {
          newDirection = 'desc';
        }
    
        setSortDirection(newDirection);
        setSortField(field);
    
        const sorted = [...patients].sort((a, b) => {
          // Handle numeric sorting for patient ID and zone
          if (field === 'id' || field === 'zone') {
            return newDirection === 'asc' 
              ? parseInt(a[field].toString()) - parseInt(b[field].toString())
              : parseInt(b[field].toString()) - parseInt(a[field].toString());
          }
          
          // String sorting for other fields
          return newDirection === 'asc'
            ? a[field].toString().localeCompare(b[field].toString())
            : b[field].toString().localeCompare(a[field].toString());
        });
    
        setSortedPatients(sorted);
      };

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
    const  renderRow = (pt: Patient) => {
        return (
        <View style={styles.tableRow}>
          <View style={styles.cell}>
            <Text>{pt.id}</Text>
          </View>
          <View style={styles.cell}>
            <View style={[
              styles.priorityBadge, 
              { backgroundColor: priorityColors[pt.priority]?.badgebg || '#ccc' }
            ]}>
              <Text style={styles.priorityBadgeText}>{pt.priority}</Text>
            </View>
          </View>
          <View style={styles.cell}>
            <Text>{pt.status}</Text>
          </View>
          <View style={styles.cell}>
            <Text>     {pt.zone}</Text>
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
    };
    return (
        <>
            {renderHeader()}
            <FlatList
                data={patients}
                renderItem={({ item }: { item: Patient }) => renderRow(item)} 
                keyExtractor={item => item.id}
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

export default PatientTable;