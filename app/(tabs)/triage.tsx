import { StyleSheet, Button, View, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

export default function TabThreeScreen() {

    const [showFirstBreathingQuestion, setShowFirstBreathingQuestion] = useState(false);
    const [showSecondBreathingQuestion, setShowSecondBreathingQuestion] = useState(false);
    const [showRespiratoryRateQuestion, setShowRespiratoryRateQuestion] = useState(false);
    const [showPerfusionQuestion, setShowPerfusionQuestion] = useState(false);
    const [showMentalStatusQuestion, setShowMentalStatusQuestion] = useState(false);
    const [activeTriage, setActiveTriage] = useState(false);

    const [image, setImage] = useState('');

    const openCamera = async () => {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        // Alert.alert('Permission Denied', 'You need to enable camera permissions in settings.');
        return;
      }
  
      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri); // Store the captured image URI
      }
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={<></>}>

        {/* Initial triage screen */}
        {!activeTriage && (
            <View>
                <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">Zone 3 Triage</ThemedText>
                </ThemedView>
                <View style={styles.buttonRow}>
                    <Button title="0 Immediate" color="red" onPress={() => console.log('Immediate pressed')} />
                    <Button title="0 Delayed" color="yellow" onPress={() => console.log('Delayed pressed')} />
                </View>
                <View style={styles.buttonRow}>
                    <Button title="0 Minor" color="green" onPress={() => console.log('Minor pressed')} />
                    <Button title="0 Expectant" color="white" onPress={() => console.log('Expectant pressed')} />
                </View>
                <Button 
                    title="Click to begin triage" 
                    onPress={() => {
                        setActiveTriage(true)
                        openCamera
                    }} />
            </View>
        )}

        {/* Triage has begun; questions appear */}
        {activeTriage && (
            <View>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Triage Patient 1036</ThemedText>
        </ThemedView>

        <View style={styles.buttonRow}>
            <Button title="Immediate" color="red" onPress={() => console.log('Immediate pressed')} />
            <Button title="Delayed" color="yellow" onPress={() => console.log('Delayed pressed')} />
            <Button title="Minor" color="green" onPress={() => console.log('Minor pressed')} />
            <Button title="Expectant" color="white" onPress={() => console.log('Expectant pressed')} />
        </View>

        <ThemedText type="subtitle">Able to walk?</ThemedText>
        <View style={styles.buttonRow}>
            <Button title="Yes" onPress={() => console.log('Yes pressed')} />
            <Button
                title="No"
                onPress={() => {
                    console.log('Able to walk? No pressed');
                    setShowFirstBreathingQuestion(true);
                }}
            />
        </View>

        {showFirstBreathingQuestion && (
            <>
            <ThemedText type="subtitle">Spontaneous breathing?</ThemedText>
            <View style={styles.buttonRow}>
                <Button 
                    title="Yes" 
                    onPress={() => {
                        console.log('Spontaneous breathing? Yes pressed')
                        setShowRespiratoryRateQuestion(true);
                    }} />
                <Button
                    title="No"
                    onPress={() => {
                        console.log('Spontaneous breathing? No pressed')
                        setShowSecondBreathingQuestion(true);
                    }} />
            </View>
            </>
        )}

        {showSecondBreathingQuestion && (
        <>
            <ThemedText type="subtitle">POSITION THE PATIENT'S AIRWAY</ThemedText>
            <ThemedText type="subtitle">Spontaneous breathing?</ThemedText>
            <View style={styles.buttonRow}>
                <Button
                    title="Yes"
                    onPress={() => {
                        console.log('Spontaneous breathing? Yes pressed')
                        setShowRespiratoryRateQuestion(true);
                    }} />
                <Button title="No" onPress={() => console.log('Spontaneous breathing? No pressed')} />
            </View>
            </>
        )}

       {showRespiratoryRateQuestion && (
            <>
            <ThemedText type="subtitle">Respiratory Rate</ThemedText>
            <View style={styles.buttonRow}>
                <Button
                    title=">30"
                    onPress={() => {
                        console.log('Respiratory rate? >30 pressed')
                    }} />
                <Button 
                    title="<30" 
                    onPress={() => {
                        console.log('Respiratory rate? <30 pressed')
                        setShowPerfusionQuestion(true);
                    }} />
            </View>
        </>
        )}

        {showPerfusionQuestion && (
            <>
            <ThemedText type="subtitle">Perfusion</ThemedText>
            <View style={styles.buttonRow}>
                <Button
                    title="Radial Pulse Present"
                    onPress={() => {
                        console.log('Perfusion? Present pressed')
                        setShowMentalStatusQuestion(true);
                    }} />
                <Button title="Radial Pulse Absent" onPress={() => console.log('Perfusion? Absent pressed')} />
            </View>
            </>
        )}

        {showMentalStatusQuestion && (
            <>
            <ThemedText type="subtitle">Mental Status</ThemedText>
            <View style={styles.buttonRow}>
                <Button
                    title="Obeys commands"
                    onPress={() => {
                        console.log('Mental Status? Obeys pressed')
                    }} />
                <Button title="Doesn't obey commands" onPress={() => console.log('Mental Status? Doesnt obey pressed')} />
            </View>
            </>
        )}
        </View>
        )}

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    alignItems: 'center',
    // marginTop: 5,
  },
});