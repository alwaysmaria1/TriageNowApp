import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { User, ColorScheme } from '@/components/lib/types';
// import  { priorityColors }  from '@/components/ic_dash/constants'
import { useQueryUsers } from '../hooks/use-query-users';

interface Props {
    zoneStaff: Record<string, string []>
}
const StaffList: React.FC<Props> = ({zoneStaff}) => {
    const [openZone, setOpenZone] = useState<string | null>(null);
    const [selectedZone, setSelectedZone] = useState("All");


// Toggle function to expand or collapse the zone list
  const toggleZone = (zone: string) => {
  setOpenZone(openZone === zone ? null : zone); // Toggle the clicked zone's state
  };

  const allStaff = useQueryUsers();

  const zones = ["All", "Zone 1", "Zone 2", "Zone 3", "Zone 4"];

  const filteredStaff = selectedZone === "All" 
    ? allStaff.users 
    : allStaff.users.filter(user=> user.userZone === selectedZone);

  // allStaff.forEach((user: User) => {
  //   switch (user.userZone){
  //     case "1":
  //       //add to array in record Zone 1
  //     case "2":
        
  //   }
  // });

  // const staffByZone = [allStaff.filter((user: User[]) => user.userZone === "2")]

  return(
    // <ThemedView>
    //   {Object.entries(zoneStaff).map(([zone, staff]) => (
    //       <View key={zone} style={styles.zoneContainer}>
    //         <TouchableOpacity
    //           style={styles.zoneTitle}
    //           onPress={() => toggleZone(zone)} // Toggle visibility of the staff list
    //         >
    //           <Text style={styles.zoneText}>{zone}</Text>
    //         </TouchableOpacity>

    //         {/* Render staff list if this zone is open */}
    //         {openZone === zone && (
    //           <View>
    //             {staff.map((person, index) => (
    //               <Text key={index} style={styles.staffText}>
    //                 {person}
    //               </Text>
    //             ))}
    //           </View>
    //         )}
    //       </View>
    //     ))}
    // </ThemedView>    
    <ThemedView>
      <Text style= {styles.header}>Current Staff</Text>
      <ThemedView>
        {zones.map(zone => (
          <TouchableOpacity 
            key={zone.substring(zone.indexOf(" ") + 1)} 
            style={[styles.filterButton, selectedZone === zone.substring(zone.indexOf(" ") + 1) && styles.selectedButton]}
            onPress={() => setSelectedZone(zone.substring(zone.indexOf(" ") + 1))}
          >
            <Text style={styles.filterText}>{zone}</Text>
          </TouchableOpacity>
          ))}
      </ThemedView>
      {/* Staff List */}
      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text style={styles.staffText}>{item._id}</Text>}
      />
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
    marginBottom: 5 
  },
  container: { flex: 1, padding: 20, backgroundColor: "#f0f0f0" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  filterContainer: { flexDirection: "row", marginBottom: 10 },
  filterButton: { padding: 8, marginRight: 5, backgroundColor: "#ddd", borderRadius: 5 },
  selectedButton: { backgroundColor: "#333" },
  filterText: { fontSize: 16, color: "#000" },


});

export default StaffList;