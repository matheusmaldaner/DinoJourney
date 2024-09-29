import React, { useState, useEffect } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from "expo-router";
import { Audio } from 'expo-av';
import { setName } from '@/storage/userData';
import { ACCOMPLISHMENTS_LIST_NAME, GOALS_LIST_NAME, INTERESTS_LIST_NAME, saveList, STRUGGLES_LIST_NAME } from '@/storage/listStorage';
import { fadeOut, fadeIn } from '../audioUtils';

const onboarding_audio = require('../../assets/audio/Onboarding.mp3');

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
    const router = useRouter();
    const nav = useNavigation();

    // Text templates for the conversation
    const initialText = "Hello there! My name is Gon, great to meet you. What is your name?";
    const personalizedTextTemplate = "Great to meet you, [NAME]! To help match you with the perfect companion, could you share a bit about your interests?";
    const interestResponseTemplate = "I love to see that you are passionate about [Interest 1] and [Interest 2]! What are some of your aspirations or goals you'd like to achieve?";
    const barrierQuestionTemplate = "My last question before meeting your companion... what barriers do you face when trying to reach your goal of [goal]?";
    const finalMessageText = "That’s all my questions! As promised, it’s time to meet yo—";

    useEffect(() => {
        // Typing animation for the initial message
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            setDisplayedText((prevText) => prevText + initialText[currentIndex]);
            currentIndex++;

            if (currentIndex === initialText.length) {
                clearInterval(typingInterval);
                setTypingComplete(true);
                setTimeout(() => {
                    setDisplayedText("");
                    setShowNameInput(true);
                }, 3000);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    // Load and play onboarding sound
    useEffect(() => {
        const loadAndPlayOnboarding = async () => {
            try {
                // Load Onboarding Audio
                const { sound: onboarding } = await Audio.Sound.createAsync(onboarding_audio);
                setOnboardingSound(onboarding);

                // Fade in onboarding music
                await fadeIn(onboarding, 1500);
            } catch (error) {
                console.error("Error loading or playing audio:", error);
            }
        };

        loadAndPlayOnboarding();

        // Cleanup: Stop the sound when the component unmounts
        return () => {
            if (onboardingSound) {
                onboardingSound.stopAsync();
            }
        };
    }, []);

    // Handle the transition to the next page after submitting the final message
    useEffect(() => {
        if (finalMessage) {
            const handleNavigation = async () => {
                if (onboardingSound) {
                    // Fade out the onboarding sound
                    await fadeOut(onboardingSound, 1500);
                }
                // Navigate to the next screen after fading out the sound
                const navigationTimeout = setTimeout(() => {
                    router.push('/dino-hatching');
                }, 2000); // Wait 2 seconds to allow transition

                return () => clearTimeout(navigationTimeout);
            };

            handleNavigation();
        }
    }, [finalMessage, onboardingSound]);

    // Handle the name submission
    const handleNameSubmit = () => {
        if (userName.trim()) {
            setName(userName.trim());
            const personalizedText = personalizedTextTemplate.replace("[NAME]", userName);

            setDisplayedText("");
            setShowNameInput(false);
            setTypingComplete(false);

            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                setDisplayedText((prevText) => prevText + personalizedText[currentIndex]);
                currentIndex++;

                if (currentIndex === personalizedText.length) {
                    clearInterval(typingInterval);
                    setTypingComplete(true);

                    setTimeout(() => {
                        setDisplayedText("");
                        setShowInterestInput(true);
                    }, 3000);
                }
            }, 50);
        }
    };

    // Handle the interests submission
    const handleInterestSubmit = () => {
        if (interests.trim() && interest2.trim()) {
            const interestResponse = interestResponseTemplate
                .replace("[Interest 1]", interests)
                .replace("[Interest 2]", interest2);
            saveList(INTERESTS_LIST_NAME, [interests, interest2]);

            setDisplayedText("");
            setShowInterestInput(false);
            setTypingComplete(false);

            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                setDisplayedText((prevText) => prevText + interestResponse[currentIndex]);
                currentIndex++;

                if (currentIndex === interestResponse.length) {
                    clearInterval(typingInterval);
                    setTypingComplete(true);

                    setTimeout(() => {
                        setDisplayedText("");
                        setShowGoalInput(true);
                    }, 3000);
                }
            }, 50);
        }
    };

    // Handle the goal submission
    const handleGoalSubmit = () => {
        if (goals.trim()) {
            const barrierQuestion = barrierQuestionTemplate.replace("[goal]", goals);
            saveList(GOALS_LIST_NAME, [goals]);

            setDisplayedText("");
            setShowGoalInput(false);
            setTypingComplete(false);

            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                setDisplayedText((prevText) => prevText + barrierQuestion[currentIndex]);
                currentIndex++;

                if (currentIndex === barrierQuestion.length) {
                    clearInterval(typingInterval);
                    setTypingComplete(true);

                    setTimeout(() => {
                        setDisplayedText("");
                        setShowBarriersInput(true);
                    }, 3000);
                }
            }, 50);
        }
    };

    // Handle the barriers submission
    const handleBarriersSubmit = () => {
        if (barriers.trim()) {
            setDisplayedText("");
            setShowBarriersInput(false);
            setTypingComplete(false);
            saveList(STRUGGLES_LIST_NAME, [barriers]);

            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                setDisplayedText((prevText) => prevText + finalMessageText[currentIndex]);
                currentIndex++;

                if (currentIndex === finalMessageText.length) {
                    clearInterval(typingInterval);
                    setTypingComplete(true);
                    setFinalMessage(true);
                }
            }, 50);
        }
    };

    return (
        <View style={styles.container}>
            {/* Navbar Section */}
            <View style={styles.navbar}>
                <ThemedText type="defaultSemiBold">APP NAME</ThemedText>
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

            {/* Additional Popups for Interests, Goals, and Barriers are similar to Name Input */}
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
