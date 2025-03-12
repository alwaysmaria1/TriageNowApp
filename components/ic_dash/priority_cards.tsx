import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Patient, ColorScheme } from '@/components/lib/types';
import  PatientTable  from '@/components/ic_dash/pt_table';
import  StaffList  from '@/components/ic_dash/staff_list';
import { useQueryPatients } from '@/components/hooks/use-query-patients';
import { triageStatusColors } from './constants';

export default function PriorityCards() {
    const { patients } = useQueryPatients();
    
    // Calculate patient counts by priority
    const priorityCounts = patients.reduce<Record<string, number>>((counts, patient) => {
        const priority = patient.triageStatus;
        if (priority) {
        counts[priority] = (counts[priority] || 0) + 1;
        }
        return counts;
    }, {});


    // Render priority status card
    const renderPriorityCard = (title: string, count = 0, colorScheme: ColorScheme) => (
        <View style={[styles.priorityCard, { backgroundColor: colorScheme.bg }]}>
        <Text style={[styles.priorityCount, { color: colorScheme.value }]}>{count || 0}</Text>
        <Text style={[styles.priorityLabel, { color: colorScheme.text }]}>{title}</Text>
        </View>
    );

    return (
        <ScrollView horizontal >
                  {renderPriorityCard('IMMEDIATE', priorityCounts['Immediate'], triageStatusColors.Immediate)}
                  {renderPriorityCard('DELAYED', priorityCounts['Delayed'], triageStatusColors.Delayed)}
                  {renderPriorityCard('MINOR', priorityCounts['Minor'], triageStatusColors.Minor)}
                  {renderPriorityCard('EXPECTANT', priorityCounts['Expectant'], triageStatusColors.Expectant)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
})