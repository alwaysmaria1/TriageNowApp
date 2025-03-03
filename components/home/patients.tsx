
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { Patient } from "../lib/types";
import { ThemedView } from "../ThemedView";
import { useRouter } from "expo-router";
import { getStatusColor } from "../lib/utils";

export default function Patients({ patientList }: { patientList: Patient[] }) {
    const router = useRouter();

    return (
        <ThemedView style={styles.patientList}>
          <ThemedText type="defaultSemiBold" style={styles.listHeader}>
            Patients ({patientList.length})
          </ThemedText>
          {patientList.map((patient) => (
            <TouchableOpacity
              key={patient.barcodeID}
              onPress={() =>
                router.push(`/patient-notes?barcodeID=${patient.barcodeID}`)
              }
            >
              <ThemedView style={styles.patientCard}>
                <ThemedText type="defaultSemiBold" style={styles.patientId}>
                  Patient {patient.barcodeID}
                </ThemedText>
                <ThemedView
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: getStatusColor(patient.triageStatus) },
                  ]}
                />
                <ThemedText>{patient.patientStatus}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>
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