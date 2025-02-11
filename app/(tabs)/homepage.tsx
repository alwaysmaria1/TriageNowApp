import { StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TriageHomeScreen() {
  const patients = [
    { id: '10387', status: 'immediate', complete: true },
    { id: '10388', status: 'delayed', complete: true },
    { id: '10389', status: 'expectant', complete: true },
    { id: '10390', status: 'minor', complete: true },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'immediate': return '#FF6B6B';  // Red
      case 'delayed': return '#FFD93D';    // Yellow
      case 'minor': return '#6BCB77';      // Green
      case 'expectant': return '#4A4A4A';  // Black
      default: return '#FFFFFF';
    }
  };

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

      <ThemedView style={styles.legendContainer}>
        {[
          { status: 'immediate', label: 'Immediate', count: 2 },
          { status: 'delayed', label: 'Delayed', count: 1 },
          { status: 'minor', label: 'Minor', count: 1 },
          { status: 'expectant', label: 'Expectant', count: 1 },
        ].map((category) => (
          <Collapsible 
            key={category.status} 
            title={category.label}
            style={[styles.categoryBox, { backgroundColor: getStatusColor(category.status) }]}
          >
            <ThemedText style={styles.categoryCount}>{category.count}</ThemedText>
          </Collapsible>
        ))}
      </ThemedView>

      <ThemedView style={styles.patientList}>
        {patients.map((patient) => (
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

      <ThemedView style={styles.navbar}>
        <IconSymbol name="house.fill" size={24} />
        <IconSymbol name="message.fill" size={24} />
        <IconSymbol name="qrcode.viewfinder" size={24} />
        <IconSymbol name="person.crop.circle" size={24} />
      </ThemedView>
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
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBox: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryCount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  patientList: {
    flex: 1,
    padding: 16,
    gap: 8,
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
    height: 8,
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