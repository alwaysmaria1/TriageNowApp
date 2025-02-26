
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Patient } from "../lib/types";
import { ThemedView } from "../ThemedView";

export default function Patients({ patientList }: { patientList: Patient[] }) {

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
            <ThemedView style={styles.patientList}>
                <ThemedText type="defaultSemiBold" style={styles.listHeader}>
                    Patients ({patientList.length})
                </ThemedText>
                {patientList.map((patient) => (
                <ThemedView key={patient.barcodeID} style={styles.patientCard}>
                    <ThemedText type="defaultSemiBold" style={styles.patientId}>
                        Patient {patient.barcodeID}
                    </ThemedText>
                    <ThemedView 
                    style={[
                        styles.statusIndicator, 
                        { backgroundColor: getStatusColor(patient.triageStatus) }
                    ]} 
                    />
                    <ThemedText>{patient.patientStatus}</ThemedText>
                </ThemedView>
                ))}
            </ThemedView>
        </>
    );
};

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
    statusIndicator: {
        width: 60,
        height: 20,
        borderRadius: 4,
        marginHorizontal: 12,
    },
    patientId: {
        flex: 1,
    },
});