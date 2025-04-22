import { useQueryPatients } from '@/components/hooks/use-query-patients';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from 'react-native';
import Patients from '@/components/home/patients';
import PatientStatusCount from '@/components/home/patientStatusCount';
import SearchBar from '@/components/home/searchbar';
import { useStore } from '@/components/lib/store';
import { current } from 'immer';

export default function HomeScreen() {

    const  allPatients  = useQueryPatients();

    const { currentUser, setCurrentUser } = useStore();
    // console.log("current user in triage-home", currentUser);
    const  patients  = allPatients.patients.filter(patient => patient.triageMemberID === currentUser?._id)

    const zone = currentUser?.userZone;

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
                <ThemedText type="title">Zone {zone} Triage</ThemedText>
            </ThemedView>
            <SearchBar patientList={patients}/>
            <PatientStatusCount patientList={patients}/>
            <Patients patientList={patients}/>
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