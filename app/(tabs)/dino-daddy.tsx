import React, { useState, useEffect } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DinoDaddy() {
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

    {/* Text templates for the conversation */}
    const initialText = "Hello there! My name is Gon, great to meet you. What is your name?";
    const personalizedTextTemplate = "Great to meet you, [NAME]! To help match you with the perfect companion, could you share a bit about your interests?";
    const interestResponseTemplate = "I love to see that you are passionate about [Interest 1] and [Interest 2]! What are some of your aspirations or goals you'd like to achieve?";
    const barrierQuestionTemplate = "My last question before meeting your companion... what barriers do you face when trying to reach your goal of [goal]?";
    const finalMessageText = "That’s all my questions! As promised, it’s time to meet yo—";

    useEffect(() => {
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

    const handleNameSubmit = () => {
        if (userName.trim()) {
            // Replace [NAME] with the actual user's name
            const personalizedText = personalizedTextTemplate.replace("[NAME]", userName);

            // Reset the displayed text for the personalized message
            setDisplayedText("");
            setShowNameInput(false);
            setTypingComplete(false); // Reset typing flag

            // Start typing the personalized message
            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                setDisplayedText((prevText) => prevText + personalizedText[currentIndex]);
                currentIndex++;

                if (currentIndex === personalizedText.length) {
                    clearInterval(typingInterval);
                    setTypingComplete(true);

                    // Wait same amount of time and show interest input
                    setTimeout(() => {
                        setDisplayedText("");
                        setShowInterestInput(true);
                    }, 3000);
                }
            }, 50);
        }
    };

    const handleInterestSubmit = () => {
        if (interests.trim() && interest2.trim()) {
            // Replace [Interest 1] and [Interest 2] with the actual user's interests
            const interestResponse = interestResponseTemplate
                .replace("[Interest 1]", interests)
                .replace("[Interest 2]", interest2);

            // Reset the displayed text for the new personalized message
            setDisplayedText("");
            setShowInterestInput(false);
            setTypingComplete(false); 

            // Start typing the personalized message about interests
            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                setDisplayedText((prevText) => prevText + interestResponse[currentIndex]);
                currentIndex++;

                if (currentIndex === interestResponse.length) {
                    clearInterval(typingInterval);
                    setTypingComplete(true);

                    // Wait same amount of time and show goal input
                    setTimeout(() => {
                        setDisplayedText("");
                        setShowGoalInput(true);
                    }, 3000);
                }
            }, 50);
        }
    };

    const handleGoalSubmit = () => {
        if (goals.trim()) {
            const barrierQuestion = barrierQuestionTemplate.replace("[goal]", goals);

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

                    // Wait same amount of time and show barriers input
                    setTimeout(() => {
                        setDisplayedText("");
                        setShowBarriersInput(true);
                    }, 3000);
                }
            }, 50);
        }
    };

    const handleBarriersSubmit = () => {
        if (barriers.trim()) {
            setDisplayedText("");
            setShowBarriersInput(false);
            setTypingComplete(false);

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
                {/* Text inside the quote bubble */}
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

            {/* Final Message */}
            {finalMessage && (
                <View style={styles.finalMessageContainer}>
                    <Text style={styles.finalMessageText}>
                        That’s all my questions! As promised, it’s time to meet yo—
                    </Text>
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

    /* Dark Overlay */
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark transparent background
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
    finalMessageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    finalMessageText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
});
