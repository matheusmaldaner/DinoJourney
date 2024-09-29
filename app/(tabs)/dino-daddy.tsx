import React, { useState, useEffect } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from "expo-router";
import { Audio } from 'expo-av';
import { setName } from '@/storage/userData';
import { ACCOMPLISHMENTS_LIST_NAME, GOALS_LIST_NAME, INTERESTS_LIST_NAME, saveList, STRUGGLES_LIST_NAME } from '@/storage/listStorage';
import { fadeOut, fadeIn } from '../audioUtils';

const onboarding_audio = require('../../assets/audio/Music/Onboarding.mp3');
const button_click_audio = require('../../assets/audio/App_Sounds/press.mp3'); // Import the button click sound effect

export default function DinoDaddy(): JSX.Element {
    const [displayedText, setDisplayedText] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [showInterestInput, setShowInterestInput] = useState(false);
    const [showGoalInput, setShowGoalInput] = useState(false);
    const [showBarriersInput, setShowBarriersInput] = useState(false);
    const [userName, setUserName] = useState("");
    const [interests, setInterests] = useState("");
    const [interest2, setInterest2] = useState("");
    const [goals, setGoals] = useState("");
    const [barriers, setBarriers] = useState("");
    const [finalMessage, setFinalMessage] = useState(false);

    const [onboardingSound, setOnboardingSound] = useState<Audio.Sound | null>(null);
    const [buttonClickSound, setButtonClickSound] = useState<Audio.Sound | null>(null);
    const router = useRouter();
    const nav = useNavigation();

    // Text templates for the conversation
    const initialText = "Hello there! My name is Gon, great to meet you. What is your name?";
    const personalizedTextTemplate = "Great to meet you, [NAME]! To help match you with the perfect companion, could you share a bit about your interests?";
    const interestResponseTemplate = "I love to see that you are passionate about [Interest 1] and [Interest 2]! What are some of your aspirations or goals you'd like to achieve?";
    const barrierQuestionTemplate = "My last question before meeting your companion... what barriers do you face when trying to reach your goal of [goal]?";
    const finalMessageText = "That’s all my questions! As promised, it’s time to meet yo—";

    // Function to handle the typing effect for displaying text one character at a time
    const typeText = (text: string, callback: () => void) => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            setDisplayedText((prevText) => prevText + text[currentIndex]);
            currentIndex++;

            if (currentIndex === text.length) {
                clearInterval(typingInterval);
                callback();
            }
        }, 50);
    };

    useEffect(() => {
        // Load and play onboarding sound
        const loadAndPlayOnboarding = async () => {
            try {
                const { sound: onboarding } = await Audio.Sound.createAsync(onboarding_audio);
                setOnboardingSound(onboarding);
                await fadeIn(onboarding, 100);
                
                // Load Button Click Sound
                const { sound: buttonClick } = await Audio.Sound.createAsync(button_click_audio);
                setButtonClickSound(buttonClick);
            } catch (error) {
                console.error("Error loading or playing audio:", error);
            }
        };

        loadAndPlayOnboarding();

        // Typing animation for the initial message
        typeText(initialText, () => {
            setTypingComplete(true);
            setTimeout(() => {
                setDisplayedText("");
                setShowNameInput(true);
            }, 2000);
        });

        // Cleanup: Stop the sound when the component unmounts
        return () => {
            const stopAndUnload = async () => {
                if (onboardingSound) {
                    await onboardingSound.stopAsync();
                    await onboardingSound.unloadAsync();
                }
                if (buttonClickSound) {
                    await buttonClickSound.unloadAsync();
                }
            };
            stopAndUnload();
        };
    }, []);

    // Handle the name submission
    const handleNameSubmit = async () => {
        if (userName.trim()) {
            if (buttonClickSound) {
                await buttonClickSound.replayAsync(); // Play button click sound
            }
            setName(userName.trim());
            const personalizedText = personalizedTextTemplate.replace("[NAME]", userName);

            setDisplayedText("");
            setShowNameInput(false);
            setTypingComplete(false);

            typeText(personalizedText, () => {
                setTypingComplete(true);
                setTimeout(() => {
                    setDisplayedText("");
                    setShowInterestInput(true);
                }, 2000);
            });
        }
    };

    // Handle the interests submission
    const handleInterestSubmit = async () => {
        if (interests.trim() && interest2.trim()) {
            if (buttonClickSound) {
                await buttonClickSound.replayAsync(); // Play button click sound
            }
            const interestResponse = interestResponseTemplate
                .replace("[Interest 1]", interests)
                .replace("[Interest 2]", interest2);
            saveList(INTERESTS_LIST_NAME, [interests, interest2]);

            setDisplayedText("");
            setShowInterestInput(false);
            setTypingComplete(false);

            typeText(interestResponse, () => {
                setTypingComplete(true);
                setTimeout(() => {
                    setDisplayedText("");
                    setShowGoalInput(true);
                }, 2000);
            });
        }
    };

    // Handle the goal submission
    const handleGoalSubmit = async () => {
        if (goals.trim()) {
            if (buttonClickSound) {
                await buttonClickSound.replayAsync(); // Play button click sound
            }
            const barrierQuestion = barrierQuestionTemplate.replace("[goal]", goals);
            saveList(GOALS_LIST_NAME, [goals]);

            setDisplayedText("");
            setShowGoalInput(false);
            setTypingComplete(false);

            typeText(barrierQuestion, () => {
                setTypingComplete(true);
                setTimeout(() => {
                    setDisplayedText("");
                    setShowBarriersInput(true);
                }, 2000);
            });
        }
    };

    // Handle the barriers submission
    const handleBarriersSubmit = async () => {
        if (barriers.trim()) {
            if (buttonClickSound) {
                await buttonClickSound.replayAsync(); // Play button click sound
            }
            setDisplayedText("");
            setShowBarriersInput(false);
            setTypingComplete(false);
            saveList(STRUGGLES_LIST_NAME, [barriers]);

            typeText(finalMessageText, () => {
                setTypingComplete(true);
                setFinalMessage(true);
            });
        }
    };

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
                <View style={styles.textOverlay}>
                    <Text style={styles.bubbleText}>{displayedText}</Text>
                </View>
            </View>

            {/* Dinosaur Image Section */}
            <View style={styles.dinoImageSection}>
                <Image
                    source={require('../../assets/images/dino-daddy.png')}
                    style={styles.dinoImage}
                />
            </View>

            {/* Footer Section */}
            <LinearGradient
                colors={['#E3DFCC', '#7D7B70']}
                style={styles.footer}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />

            {/* Popup for Name Input */}
            {showNameInput && (
                <View style={styles.overlay}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.overlayText}>Enter Your Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your name"
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleNameSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Popup for Interests Input */}
            {showInterestInput && (
                <View style={styles.overlay}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.overlayText}>Describe Your Interests</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your first interest"
                            value={interests}
                            onChangeText={(text) => setInterests(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Type your second interest"
                            value={interest2}
                            onChangeText={(text) => setInterest2(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleInterestSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Popup for Goals Input */}
            {showGoalInput && (
                <View style={styles.overlay}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.overlayText}>What are your goals?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your goals or aspirations"
                            value={goals}
                            onChangeText={(text) => setGoals(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleGoalSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Popup for Barriers Input */}
            {showBarriersInput && (
                <View style={styles.overlay}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.overlayText}>What barriers do you face in achieving your goal?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Describe your barriers"
                            value={barriers}
                            onChangeText={(text) => setBarriers(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleBarriersSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3DFCC',
    },
    navbar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3DFCC',
    },
    quoteBubbleSection: {
        marginTop: 20,
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    quoteBubbleImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textOverlay: {
        position: 'absolute',
        top: '21%',
        left: '20%',
        right: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbleText: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },
    dinoImageSection: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dinoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    footer: {
        flex: 1.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    overlayText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#000',
    },
    input: {
        height: 40,
        borderColor: '#7D7B70',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
