// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // A reusable component for collapsible sections
// const CollapsibleSection = ({ title, children }) => {
//   const [expanded, setExpanded] = useState(false);
//   return (
//     <View style={styles.sectionContainer}>
//       <TouchableOpacity
//         onPress={() => setExpanded(!expanded)}
//         style={styles.sectionHeader}
//       >
//         <Text style={styles.sectionTitle}>{title}</Text>
//       </TouchableOpacity>
//       {expanded && <View style={styles.sectionContent}>{children}</View>}
//     </View>
//   );
// };

// // Main component that displays patient details
// const PatientDetails = ({ patient }) => {
//   return (
//     <View style={styles.container}>
//       {/* Demographics Section */}
//       <CollapsibleSection title="Demographics">
//         <Text style={styles.itemText}>Name: {patient.name || 'N/A'}</Text>
//         <Text style={styles.itemText}>Barcode ID: {patient.barcodeID}</Text>
//         <Text style={styles.itemText}>Address: {patient.address || 'N/A'}</Text>
//         <Text style={styles.itemText}>
//           Date of Birth: {patient.dateOfBirth || 'N/A'}
//         </Text>
//         <Text style={styles.itemText}>
//           Phone Number: {patient.phoneNumber || 'N/A'}
//         </Text>
//         <Text style={styles.itemText}>Sex: {patient.sex || 'N/A'}</Text>
//         <Text style={styles.itemText}>Zone: {patient.zone}</Text>
//       </CollapsibleSection>

//       {/* Patient Notes Section */}
//       <CollapsibleSection title="Patient Notes">
//         <Text style={styles.itemText}>
//           Allergies: {patient.allergies || 'N/A'}
//         </Text>
//         <Text style={styles.itemText}>
//           Care Notes: {patient.patientCareNotes || 'N/A'}
//         </Text>
//         <Text style={styles.itemText}>
//           Patient Status: {patient.patientStatus}
//         </Text>
//         <Text style={styles.itemText}>
//           Triage Status: {patient.triageStatus}
//         </Text>
//         <Text style={styles.itemText}>
//           Last Updated: {patient.lastUpdated}
//         </Text>
//       </CollapsibleSection>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   sectionContainer: {
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   sectionHeader: {
//     backgroundColor: '#f5f5f5',
//     padding: 12,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   sectionContent: {
//     padding: 12,
//   },
//   itemText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
// });

// export default PatientDetails;
