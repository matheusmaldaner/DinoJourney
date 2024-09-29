import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, TextInput, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from "@/components/ThemedText";
import { Audio } from 'expo-av';
import { fadeOut, fadeIn } from '../audioUtils';

const tasking_audio = require('../../assets/audio/Music/Tasking.mp3');

export default function DinoCompanion(): JSX.Element {
    const [isPressed, setIsPressed] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const displayedText = "Welcome! Ready to grow your dino companion?"; // Text for chatbot

    const [taskingSound, setTaskingSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        // Detect keyboard visibility
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Handle onboarding sound playback with fade in and cleanup with fade out
    useEffect(() => {
        const loadAndPlayTasking = async () => {
            try {
                // Load Tasking Audio
                const { sound: tasking } = await Audio.Sound.createAsync(tasking_audio);
                setTaskingSound(tasking);

                // Fade in Tasking music
                await fadeIn(tasking, 1500);
            } catch (error) {
                console.error("Error loading or playing audio:", error);
            }
        };

        loadAndPlayTasking();

        // Cleanup: Fade out and unload the sound when the component unmounts
        return () => {
            const stopAndUnloadTasking = async () => {
                if (taskingSound) {
                    await fadeOut(taskingSound, 1500); // Fade out before stopping
                    await taskingSound.stopAsync();
                    await taskingSound.unloadAsync(); // Free resources
                }
            };
            stopAndUnloadTasking();
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* Navbar Section */}
            <View style={styles.navbar}>
                <ThemedText type="defaultSemiBold">DinoJourney</ThemedText>
            </View>

            {/* Quote Bubble Section */}
            <View style={styles.quoteBubbleSection}>
                <Image 
                    source={require('../../assets/images/talk-bubble-downward.png')}
                    style={styles.quoteBubbleImage}
                />
                {/* Text inside the quote bubble */}
                {!isKeyboardVisible && (
                    <View style={styles.textOverlay}>
                        <Text style={styles.bubbleText}>{displayedText}</Text>
                    </View>
                )}
            </View>

            {/* Image Section */}
            <View style={styles.imageSection}>
                {/* Left Section with Dino Companion Image*/}
                <TouchableOpacity 
                    style={styles.leftPartition}
                    onPress={() => {
                        console.log('Dino Companion Patted');
                        // Add other actions you want to trigger when the dinosaur is selected
                    }}
                >
                    <Image
                        source={require('../../assets/images/dino-companion.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>

                {/* Right Section with Dino Companion Activities */}
                <View style={styles.rightPartition}>
                    {/* Vertical Buttons */}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Button 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Button 2</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* Input Box and Button Section */}
            <View style={styles.inputRow}>
                {/* Text Input */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your goal"
                    value={inputText}
                    onChangeText={setInputText}
                />

                {/* Button Section with Dino Submit Image */}
                <TouchableOpacity
                    style={[styles.button, isPressed ? styles.buttonPressed : null]}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                >
                    <Image
                        source={require('../../assets/images/dino-submit.png')}
                        style={styles.buttonImage}
                    />
                </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <LinearGradient
                colors={['#E3DFCC', '#7D7B70']}
                style={styles.footer}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E3DFCC',
    },
    navbar: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#E3DFCC',
    },
    quoteBubbleSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: 10,
    },
    quoteBubbleImage: {
        width: '90%',
        height: '100%',
        resizeMode: 'contain',
    },
    textOverlay: {
        position: 'absolute',
        top: '35%',
        left: '15%',
        right: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbleText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    imageSection: {
        flex: 5,
        flexDirection: 'row', // Arrange child views side by side horizontally
        justifyContent: 'space-between', // Space out partitions evenly
        alignItems: 'center',
        width: '100%',
    },
    leftPartition: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3DFCC', // Example color for visualization
    },
    rightPartition: {
        flex: 1,
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'flex-start', // Align content to the left
        backgroundColor: '#E3DFCC', // Same background color as left partition
    },
    partitionText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    image: {
        marginLeft: 120,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '70%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10, // Space between buttons
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAAAAA',
    },
});
