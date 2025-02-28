import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedButton as Button } from '@/components/ThemedButton';

type Option = {
    title: string;
    value: string | null;
    onPress?: () => void;
};
  
type QuestionProps = {
    questionText: string;
    options: Option[];
    stateKey: string | boolean | null;
    setState: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Question({
    questionText,
    options,
    stateKey,
    setState,
  }: QuestionProps) {
    return (
        <>
            <ThemedText type="subtitle" style={styles.questionText}>
                {questionText}
            </ThemedText>
            <View style={styles.buttonRow}>
            {options.map(({ title, value, onPress }) => (
                <View style={styles.buttonContainer} key={title}>
                <Button
                    onPress={() => {
                    console.log(`${questionText}: ${title}`);
                    setState(value);
                    if (onPress) onPress();
                    }}
                    title={title}
                    variant={stateKey === value ? 'default' : 'grey'}
                />
                </View>
            ))}
            </View>
        </>
    );
  }
  
  const styles = StyleSheet.create({
    questionText: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flex: 1,
        margin: 10,
    },
  });