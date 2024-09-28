import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
    const [isPressed, setIsPressed] = useState(false);
    const [inputText, setInputText] = useState('');
   

    return (    
        <View style={styles.container}>
            {/* Navbar Section */}
            <View style={styles.navbar}>
                <ThemedText type="defaultSemiBold">APP NAME</ThemedText>
            </View>

            {/* Image Section */}
            <View style={styles.imageSection}>
                <Image 
                    source={require('../../assets/images/dino-companion.png')}
                    style={styles.image}
                />
            </View>

            {/* Speech Bubble Section */}
            <View style={styles.speechBubble}>
                <View style={styles.speechBubbleContent}>
                    <Text style={styles.speechText}>
                        Welcome! Ready to grow your dino companion?
                    </Text>
                </View>
            </View>

            {/* Textbox Area */}
            <View style={styles.textBoxArea}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your goal"
                    value={inputText}
                    onChangeText={setInputText}
                />
            </View>

            {/* Button Section */}
            <View style={styles.buttonSection}>
                <TouchableOpacity
                    style={[styles.button, isPressed ? styles.buttonPressed : null]}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
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
        backgroundColor: '#E3DFCC',
    },
    navbar: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3DFCC',
        paddingTop: 20,
    },
    imageSection: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    speechBubble: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    speechBubbleContent: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        position: 'relative',
    },
    speechText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    textBoxArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '80%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonPressed: {
        backgroundColor: '#DDDDDD',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAAAAA',
    },
});
