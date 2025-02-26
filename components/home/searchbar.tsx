import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Patient } from '../lib/types';
import { useMemo } from 'react';

export default function SearchBar({ patientList }: { patientList: Patient[] }) {

    const [searchQuery, setSearchQuery] = useState('');
    const clearSearch = () => {
        setSearchQuery('');
    };

    // Filter patients based on search query
    const filteredPatients = useMemo(() => {
        return patientList.filter(patient => 
            patient.barcodeID.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [patientList, searchQuery]);

    return (
        <>
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
            <TouchableOpacity onPress={clearSearch}>
                <IconSymbol
                    name="xmark.circle.fill"
                    size={20}
                    color="#808080"
                />
            </TouchableOpacity>
            )}
        </ThemedView>
      </>
    );
}

const styles = StyleSheet.create({
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
});