
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Patient } from "../lib/types";
import { ThemedView } from "../ThemedView";
import { useMemo } from "react";

export default function PatientStatusCount({ patientList }: { patientList: Patient[] }) {

  // Calculate counts for each category
    const categoryCounts = useMemo(() => ({
        immediate: patientList.filter(p => p.triageStatus === 'Immediate').length,
        delayed: patientList.filter(p => p.triageStatus === 'Delayed').length,
        minor: patientList.filter(p => p.triageStatus === 'Minor').length,
        expectant: patientList.filter(p => p.triageStatus === 'Expectant').length,
    }), [patientList]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Immediate': return '#FF6B6B';  // Red
            case 'Delayed': return '#FFD93D';    // Yellow
            case 'Minor': return '#6BCB77';      // Green
            case 'Expectant': return '#4A4A4A';  // Black
            default: return '#FFFFFF';
        }
    };

    return (
        <>
            <ThemedView style={styles.categoriesContainer}>
                {[
                    { status: 'Immediate', label: 'Immediate', count: categoryCounts.immediate },
                    { status: 'Delayed', label: 'Delayed', count: categoryCounts.delayed },
                    { status: 'Minor', label: 'Minor', count: categoryCounts.minor },
                    { status: 'Expectant', label: 'Expectant', count: categoryCounts.expectant },
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
        </>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 23,
        fontWeight: 'bold',
    },
    categoryLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 4,
    },
});
