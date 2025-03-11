import { useQueryPatients } from '@/components/hooks/use-query-patients';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from 'react-native';
import Patients from '@/components/home/patients';
import PatientStatusCount from '@/components/home/patientStatusCount';
import SearchBar from '@/components/home/searchbar';
import { useMemo } from 'react';
import { useStore } from '@/components/lib/store';

// Define an extended patient interface that includes triageMemberID
interface PatientWithTriageMember {
    triageMemberID?: string;
    [key: string]: any; // This allows any other properties
}

export default function HomeScreen() {
    // Get all patients
    const { patients: allPatients } = useQueryPatients();
    
    // Get the current user from your store
    const currentTriageMember = useStore(state => state.currentUser);
    
    // Get the current user's triageMemberID
    const triageMemberID = currentTriageMember?.userID;
    
    // Filter patients to only show those triaged by the current user
    const filteredPatients = useMemo(() => {
        if (!triageMemberID || !allPatients) return [];
        
        return allPatients.filter(patient => 
            (patient as unknown as PatientWithTriageMember).triageMemberID === triageMemberID
        );
    }, [allPatients, triageMemberID]);

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
                {triageMemberID && (
                    <ThemedText type="body">
                        {currentTriageMember?.name}'s Patients
                    </ThemedText>
                )}
            </ThemedView>
            <SearchBar patientList={filteredPatients}/>
            <PatientStatusCount patientList={filteredPatients}/>
            <Patients patientList={filteredPatients}/>
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
        flexDirection: 'column',
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