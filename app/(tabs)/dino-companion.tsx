import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, TextInput, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
    const [isPressed, setIsPressed] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const displayedText = "Welcome! Ready to grow your dino companion?"; // Text for chatbot

    useEffect(() => {
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
                {!isKeyboardVisible && (
                    <View style={styles.textOverlay}>
                        <Text style={styles.bubbleText}>{displayedText}</Text>
                    </View>
                )}
            </View>

            {/* Image Section */}
            <View style={styles.imageSection}>
                <Image
                    source={require('../../assets/images/dino-companion.png')}
                    style={styles.image}
                />
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
                        source={require('../../assets/images/dino-submit.png')}  // Use your dino-submit image
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        justifyContent: 'center',
        alignItems: 'center',
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
