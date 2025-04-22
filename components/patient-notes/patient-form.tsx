// PatientForm.tsx
import React from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  patientFormSchema,
  patientFormFields,
  patientDefaultValues,
  PatientFormSchemaType,
} from "./patient-form-config";

interface PatientFormProps {
  onSubmit: (values: PatientFormSchemaType) => void;
  onCancel: () => void;
  initialValues?: PatientFormSchemaType;
  submitLabel?: string;
}

const PatientForm: React.FC<PatientFormProps> = ({
  onSubmit,
  onCancel,
  initialValues = patientDefaultValues,
  submitLabel = "Submit",
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormSchemaType>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = (values: PatientFormSchemaType) => {
    onSubmit(values);
    reset(patientDefaultValues);
  };

  const handleCancel = () => {
    onCancel();
    reset(patientDefaultValues);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {patientFormFields.map((field) => (
        <View key={field.name} style={styles.formItem}>
          <Text style={styles.label}>{field.label}</Text>
          <Controller
            control={control}
            name={field.name}
            render={({ field: { onChange, onBlur, value } }) => {
              if (field.type === "textarea") {
                return (
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder={field.placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value as string}
                    multiline
                    numberOfLines={5}
                  />
                );
              } else if (field.type === "select") {
                return (
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={value as string}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Triage In-Progress" value="Triage In-Progress" />
                      <Picker.Item label="Triage Complete" value="Triage Complete" />
                      <Picker.Item label="Treatment In-Progress" value="Treatment In-Progress" />
                      <Picker.Item label="Treatment Complete" value="Treatment Complete" />
                      <Picker.Item label="Transport In-Progress" value="Transport In-Progress" />
                      <Picker.Item label="Transport Complete" value="Transport Complete" />
                    </Picker>
                  </View>
                );
              } else {
                return (
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value as string}
                  />
                );
              }
            }}
          />
          {errors[field.name] && (
            <Text style={styles.errorText}>{(errors[field.name]?.message as string) || "Error"}</Text>
          )}
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title={submitLabel} onPress={handleSubmit(handleFormSubmit)} />
        <Button title="Cancel" onPress={handleCancel} color="gray" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});

export default PatientForm;
