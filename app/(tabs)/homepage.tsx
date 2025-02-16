import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextInput } from 'react-native';

export default function TriageHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients] = useState([
    { id: '10387', status: 'immediate', complete: true },
    { id: '10388', status: 'delayed', complete: true },
    { id: '10389', status: 'expectant', complete: true },
    { id: '10390', status: 'minor', complete: true },
    { id: '10391', status: 'immediate', complete: true },
    { id: '10392', status: 'minor', complete: true },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'immediate': return '#FF6B6B';  // Red
      case 'delayed': return '#FFD93D';    // Yellow
      case 'minor': return '#6BCB77';      // Green
      case 'expectant': return '#4A4A4A';  // Black
      default: return '#FFFFFF';
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Calculate counts for each category
  const categoryCounts = useMemo(() => ({
    immediate: patients.filter(p => p.status === 'immediate').length,
    delayed: patients.filter(p => p.status === 'delayed').length,
    minor: patients.filter(p => p.status === 'minor').length,
    expectant: patients.filter(p => p.status === 'expectant').length,
  }), [patients]);

  // Filter patients based on search query
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => 
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F5F5F5', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="cross.case.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Zone 3 Triage</ThemedText>
      </ThemedView>

      {/* Search Bar */}
      <ThemedView style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#808080" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Patient ID..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#808080"
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <IconSymbol
                name="xmark.circle.fill"
                size={20}
                color="#808080"
            />
        </TouchableOpacity>
        )}
      </ThemedView>

      {/* Category Status Boxes */}
      <ThemedView style={styles.categoriesContainer}>
        {[
          { status: 'immediate', label: 'Immediate', count: categoryCounts.immediate },
          { status: 'delayed', label: 'Delayed', count: categoryCounts.delayed },
          { status: 'minor', label: 'Minor', count: categoryCounts.minor },
          { status: 'expectant', label: 'Expectant', count: categoryCounts.expectant },
        ].map((category) => (
          <ThemedView
            key={category.status}
            style={[styles.categoryBox, { backgroundColor: getStatusColor(category.status) }]}
          >
            <ThemedText style={styles.categoryCount}>{category.count}</ThemedText>
            <ThemedText style={styles.categoryLabel}>{category.label}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Patient List */}
      <ThemedView style={styles.patientList}>
        <ThemedText type="defaultSemiBold" style={styles.listHeader}>
          Patients ({filteredPatients.length})
        </ThemedText>
        {filteredPatients.map((patient) => (
          <ThemedView key={patient.id} style={styles.patientCard}>
            <ThemedText type="defaultSemiBold" style={styles.patientId}>
              Patient {patient.id}
            </ThemedText>
            <ThemedView 
              style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor(patient.status) }
              ]} 
            />
            <ThemedText>Triage Complete</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      { // Dont think theres gonna be a need for this nav bar?
      /* <ThemedView style={styles.navbar}>
        <IconSymbol name="house.fill" size={24} />
        <IconSymbol name="message.fill" size={24} />
        <IconSymbol name="qrcode.viewfinder" size={24} />
        <IconSymbol name="person.crop.circle" size={24} />
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  categoryBox: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryCount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
  patientList: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  listHeader: {
    marginBottom: 8,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
  },
  patientId: {
    flex: 1,
  },
  statusIndicator: {
    width: 60,
    height: 20,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
});





// import { StyleSheet } from 'react-native';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { Collapsible } from '@/components/Collapsible';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function TriageHomeScreen() {
//   const patients = [
//     { id: '10387', status: 'immediate', complete: true },
//     { id: '10388', status: 'delayed', complete: true },
//     { id: '10389', status: 'expectant', complete: true },
//     { id: '10390', status: 'minor', complete: true },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'immediate': return '#FF6B6B';  // Red
//       case 'delayed': return '#FFD93D';    // Yellow
//       case 'minor': return '#6BCB77';      // Green
//       case 'expectant': return '#4A4A4A';  // Black
//       default: return '#FFFFFF';
//     }
//   };

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#F5F5F5', dark: '#353636' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="cross.case.fill"
//           style={styles.headerImage}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Zone 3 Triage</ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.legendContainer}>
//         {[
//           { status: 'immediate', label: 'Immediate', count: 2 },
//           { status: 'delayed', label: 'Delayed', count: 1 },
//           { status: 'minor', label: 'Minor', count: 1 },
//           { status: 'expectant', label: 'Expectant', count: 1 },
//         ].map((category) => (
//           <Collapsible 
//             key={category.status} 
//             title={category.label}
//             style={[styles.categoryBox, { backgroundColor: getStatusColor(category.status) }]}
//           >
//             <ThemedText style={styles.categoryCount}>{category.count}</ThemedText>
//           </Collapsible>
//         ))}
//       </ThemedView>

//       <ThemedView style={styles.patientList}>
//         {patients.map((patient) => (
//           <ThemedView key={patient.id} style={styles.patientCard}>
//             <ThemedText type="defaultSemiBold" style={styles.patientId}>
//               Patient {patient.id}
//             </ThemedText>
//             <ThemedView 
//               style={[
//                 styles.statusIndicator, 
//                 { backgroundColor: getStatusColor(patient.status) }
//               ]} 
//             />
//             <ThemedText>Triage Complete</ThemedText>
//           </ThemedView>
//         ))}
//       </ThemedView>

//       <ThemedView style={styles.navbar}>
//         <IconSymbol name="house.fill" size={24} />
//         <IconSymbol name="message.fill" size={24} />
//         <IconSymbol name="qrcode.viewfinder" size={24} />
//         <IconSymbol name="person.crop.circle" size={24} />
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 16,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   categoryBox: {
//     width: '48%',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   categoryCount: {
//     color: '#FFFFFF',
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   patientList: {
//     flex: 1,
//     padding: 16,
//     gap: 8,
//   },
//   patientCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 16,
//     borderRadius: 8,
//   },
//   patientId: {
//     flex: 1,
//   },
//   statusIndicator: {
//     width: 60,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 12,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//   },
// });