import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TriageHeader from '../header';

const TriageNowScreen = () => {
  return (
    <ParallaxScrollView
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={<></>}
    >
    <View style={styles.container}>
      <TriageHeader></TriageHeader>
      
      {/* Demographics Section */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>CLICK TO RECORD DEMOGRAPHICS</Text>
      </TouchableOpacity>
      
      {/* Patient Care Notes Section */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>CLICK TO RECORD PATIENT CARE NOTES</Text>
      </TouchableOpacity>
      
      {/* Images Section */}
      <View style={styles.imagesContainer}>
        <TouchableOpacity style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Camera Icon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Placeholder</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  patientTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 4,
  },
  statusHighlight: {
    fontWeight: 'bold',
  },
  immediateText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastUpdateText: {
    fontSize: 12,
    color: '#888',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f7f7f7',
  },
  cardTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#fafafa',
  },
  imagePlaceholderText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default TriageNowScreen;
