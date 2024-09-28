import React, { useState } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";


export default function HomeScreen() {
    const [isPressed, setIsPressed] = useState(false);
    const router = useRouter(); 

    const handleNavigation = () => {
        router.push('/dino-daddy'); 
    };

    return (    
        <View style={styles.container}>
            {/* Navbar Section */}
            <View style={styles.navbar}>
                <ThemedText type="defaultSemiBold">APP NAME</ThemedText>
            </View>

            {/* Image Section */}
            <View style={styles.imageSection}>
                <Image 
                    source={require('../../assets/images/dino-og.png')}
                    style={styles.image}
                />
            </View>

            {/* Text Section */}
            <View style={styles.textSection}>
                <ThemedText type="defaultSemiBold" style={styles.centeredText}>
                    Crack the Shell - Hack to Excel!{"\n"}{"\n"}
                    Grow your dinosaurs companion and reach your personal goals
                </ThemedText>
            </View>

            <View style={styles.buttonSection}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        isPressed ? styles.buttonPressed : null
                    ]}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    onPress={handleNavigation} 
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
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3DFCC',
    },
    imageSection: {
        flex: 5.5, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%', 
        height: '80%',
        resizeMode: 'contain',
    },
    textSection: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
    buttonSection: {
        flex: 1.2,
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
        flex: 1.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAAAAA', 
    },
});
