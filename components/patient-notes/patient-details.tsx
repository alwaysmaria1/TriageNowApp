import React, { useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { PatientFormSchemaType, patientFormSchema } from './patient-form-config';
import { useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useNavigation, usePreventRemove } from '@react-navigation/native';

interface PatientFormProps {
  patientBarcode: string;
  onCancel: () => void;
  patient: PatientFormSchemaType;
  submitLabel?: string;
}

// Collapsible Section Component
const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
};


const PatientDetails: React.FC<PatientFormProps> = ({
  patientBarcode,
  onCancel,
  patient,
  submitLabel = 'Submit',
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PatientFormSchemaType>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: patient,
  });

  const navigation = useNavigation();

  const updatePatient = useMutation(api.patients.update);

  useEffect(() => {
    reset(patient); // Ensure form updates when patient changes
  }, [patient, reset]);

  const handleFormSubmit = (values: PatientFormSchemaType) => {

    updatePatient({
      barcodeID: patientBarcode,
      ...values
    })

    reset(patient);
  };

  const handleCancel = () => {
    onCancel();
    reset(patient);
  };

  // Prevent the user from leaving the page with unsaved changes
  usePreventRemove(isDirty, () => {
    if (isDirty) {
      Alert.alert(
        "You have unsaved changes",
        "Are you sure you want to leave without saving your changes?",
        [
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  });

  // Field definitions for the Demographics section
  const demographicsFields = [
    { name: 'name', label: 'Name', placeholder: 'Missing info', type: 'text' },
    { name: 'address', label: 'Address', placeholder: 'Missing info', type: 'text' },
    { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'Missing info', type: 'text' },
    { name: 'phoneNumber', label: 'Phone Number', placeholder: 'Missing info', type: 'text' },
    { name: 'sex', label: 'Sex', placeholder: 'Missing info', type: 'text' },
    { name: 'allergies', label: 'Allergies', placeholder: 'Missing info', type: 'text' },
  ];

  // Field definitions for the Patient Care Notes section
  const patientNotesFields = [
    { name: 'patientCareNotes', label: 'Care Notes', placeholder: 'Missing info', type: 'textarea' },

  ];

  // Render a single field using react-hook-form Controller
  const renderField = (field: any) => (
    <View key={field.name} style={styles.formItem}>
      <Text style={styles.label}>{field.label}</Text>
      <Controller
        control={control}
        name={field.name as keyof PatientFormSchemaType}
        render={({ field: { onChange, onBlur, value } }) => {
          const displayValue = value ?? '';
          if (field.type === 'textarea') {
            return (
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder={field.placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={displayValue}
                multiline
                numberOfLines={5}
              />
            );
          } else if (field.type === 'select') {
            return (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={displayValue}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={styles.picker}
                >
                  {field.options.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                  ))}
                </Picker>
              </View>
            );
          } else {
            return (
              <TextInput
                style={[styles.input, field.editable === false && styles.disabledInput]}
                placeholder={field.placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={displayValue}
                editable={field.editable !== false}
              />
            );
          }
        }}
      />
      {errors[field.name] && (
        <Text style={styles.errorText}>
          {(errors[field.name]?.message as string) || 'Error'}
        </Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <CollapsibleSection title="Demographics">
          {demographicsFields.map(renderField)}
        </CollapsibleSection>
        <CollapsibleSection title="Patient Care Notes">
          {patientNotesFields.map(renderField)}
        </CollapsibleSection>
        <View style={styles.buttonContainer}>
          <Button
            title={isDirty ? 'Submit Changes' : 'No Changes'}
            onPress={handleSubmit(handleFormSubmit)}
            disabled={false}
          />
          <Button title="Cancel" onPress={handleCancel} color="gray" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 16,
  },
  formItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default PatientDetails;


