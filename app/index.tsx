import { useAuthActions } from "@convex-dev/auth/react";
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function SignInPage() {
    const router = useRouter();
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const reset = () => {
        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
    }

    // Function to validate email and password before submitting
    const validateForm = () => {
        let valid = true;
        setEmailError("");
        setPasswordError("");

        if (!email.includes('@')) {
            setEmailError("Please enter a valid email.");
            valid = false;
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            valid = false;
        }

        return valid;
    };

    async function handleSignIn() {
        if (validateForm()) {
            try {
                await signIn("password", { email, password, flow: 'signIn' });
                router.replace('/triage-home');
                console.log("user logged in")
            } catch (error) {
                setEmailError("That account doesn't exist. Please try again")
            }
            //reset();
        }
    };
    const switchToSignup = () => {
        //push to the signup page
        reset();
        router.push('/signup-page');
        //router.replace('/signup-page');
    };

    return (
        <ThemedView style={styles.container}>
            {/* App Title Section */}
            <ThemedView style={styles.appHeader}>
                <MaterialCommunityIcons name="hospital-box" size={40} color="#00b8d4" />
                <ThemedText style={styles.appTitle}>TriageNow</ThemedText>
            </ThemedView>

            {/* Screen Header */}
            <ThemedView style={styles.header}>
                <ThemedText style={styles.title}>
                    {"Sign In"}
                </ThemedText>
            </ThemedView>

            {/* Email Input */}
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError("");
                }}
                value={email}
                inputMode="email"
                autoCapitalize="none"
            />
            {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText> : null}

            {/* Password Input */}
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError("");
                }}
                value={password}
                secureTextEntry
            />
            {passwordError ? <ThemedText style={styles.errorText}>{passwordError}</ThemedText> : null}

            {/* Main Action Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <ThemedText style={styles.buttonText}>
                    {"Sign In"}
                </ThemedText>
            </TouchableOpacity>

            {/* Toggle between Sign In and Sign Up */}
            <TouchableOpacity
                style={styles.toggleButton}
            >
                <ThemedText style={styles.toggleButtonText} onPress={switchToSignup}>
                    Sign Up Instead
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        justifyContent: "center",
    },
    appHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 25,
    },
    appTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#00b8d4",
    },
    header: {
        alignItems: "center",
        marginBottom: 36,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 8,
        lineHeight: 40,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 8,
    },
    errorText: {
        color: "red",
        marginBottom: 8,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#f0f0f0",
        borderRadius: 12,
        padding: 24,
        marginTop: 16,
        marginBottom: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    toggleButton: {
        alignItems: "center",
    },
    toggleButtonText: {
        fontSize: 16,
        opacity: 0.8,
        textDecorationLine: "underline",
    },
});

