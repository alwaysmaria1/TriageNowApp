import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Patient, ColorScheme } from '@/components/ic_dash/types';
import  { priorityColors }  from '@/components/ic_dash/constants'

interface Props {
    zoneStaff: Record<string, string []>
}
const StaffList: React.FC<Props> = ({zoneStaff}) => {
    const [openZone, setOpenZone] = useState<string | null>(null);

// Toggle function to expand or collapse the zone list
   const toggleZone = (zone: string) => {
    setOpenZone(openZone === zone ? null : zone); // Toggle the clicked zone's state
    };

  return(
    <ThemedView>
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
              <View>
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
    );
};

const styles = StyleSheet.create({
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
 
  staffText: {
    fontSize: 16,
  },

});

export default StaffList;