import { StyleSheet, View, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { ThemedButton as Button } from '@/components/ThemedButton';

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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<></>}
    >
      {/* INITIAL TRIAGE SCREEN */}
      {!activeTriage && (
          <View style={styles.fullWidthButton}>
            <Button
              onPress={() => {
                setActiveTriage(true);
                openCamera();
              }}
              title="Click to begin triage"
              variant="grey"
            />
          </View>
      )}

      {/* TRIAGE HAS BEGUN */}
      {activeTriage && (
        <View style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Triage Patient 1036</ThemedText>
          </ThemedView>
          {/* Triage Override Label */}
      <ThemedText type="subtitle" style={styles.overrideLabel}>
        Triage Override
      </ThemedText>

      {/* First row: Immediate, Delayed */}
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <Button
            title="Immediate"
            variant="immediate"
            onPress={() => console.log('Immediate pressed')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Delayed"
            variant="delayed"
            onPress={() => console.log('Delayed pressed')}
          />
        </View>
      </View>

      {/* Row 2: Minor & Expectant */}
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <Button
            title="Minor"
            variant="minor"
            onPress={() => console.log('Minor pressed')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Expectant"
            variant="expectant"
            onPress={() => console.log('Expectant pressed')}
          />
        </View>
      </View>



          <ThemedText type="subtitle" style={styles.questionText}>
            Able to walk?
          </ThemedText>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => console.log('Yes pressed')}
                title="Yes"
                variant="grey"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  console.log('Able to walk? No pressed');
                  setShowFirstBreathingQuestion(true);
                }}
                title="No"
                variant="grey"
              />
            </View>
          </View>

          {showFirstBreathingQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Spontaneous breathing?
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log('Spontaneous breathing? Yes pressed');
                      setShowRespiratoryRateQuestion(true);
                    }}
                    title="Yes"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log('Spontaneous breathing? No pressed');
                      setShowSecondBreathingQuestion(true);
                    }}
                    title="No"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showSecondBreathingQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                POSITION THE PATIENT'S AIRWAY
              </ThemedText>
              <ThemedText type="subtitle" style={styles.questionText}>
                Spontaneous breathing?
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log('Spontaneous breathing? Yes pressed');
                      setShowRespiratoryRateQuestion(true);
                    }}
                    title="Yes"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => console.log('Spontaneous breathing? No pressed')}
                    title="No"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showRespiratoryRateQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Respiratory Rate
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log('Respiratory rate? >30 pressed');
                    }}
                    title=">30"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log('Respiratory rate? <30 pressed');
                      setShowPerfusionQuestion(true);
                    }}
                    title="<30"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showPerfusionQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Perfusion
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log('Perfusion? Present pressed');
                      setShowMentalStatusQuestion(true);
                    }}
                    title="Radial Pulse Present"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => console.log('Perfusion? Absent pressed')}
                    title="Radial Pulse Absent"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showMentalStatusQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Mental Status
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => console.log('Obeys commands pressed')}
                    title="Obeys commands"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => console.log("Doesn't obey commands pressed")}
                    title="Doesn't obey commands"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  questionText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  fullWidthButton: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overrideLabel: {
    marginBottom: 16,
  },
  overrideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});