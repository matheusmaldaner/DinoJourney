import React, { useEffect, useState } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { Audio } from 'expo-av';


const idle_audio = require('../../assets/audio/Idle.mp3');

export default function HomeScreen() {
    const [isPressed, setIsPressed] = useState(false);
    const [idleSound, setIdleSound] = useState<Audio.Sound | null>(null);
    const [playing, setPlaying] = useState(false);
    const router = useRouter();

    const handleNavigation = () => {
        if (idleSound) {
            idleSound.pauseAsync();
        }
        router.push('/dino-daddy');
    };

    useEffect(() => {
        const loadAndPlayOnboarding = async () => {
            try {

                // Load Idle Audio
                const { sound: idle } = await Audio.Sound.createAsync(idle_audio);
                setIdleSound(idle);

                // Stop Idle music if playing
                await idle.pauseAsync();

                // Play Idle music
                await idle.playAsync();
                setPlaying(true);
            } catch (error) {
                console.log("Error loading or playing audio:", error);
            }
        };

        loadAndPlayOnboarding();

        // Cleanup: Stop both sounds when the component unmounts
        return () => {
            if (idleSound) {
                idleSound.stopAsync();
            }
            if (idleSound) {
                idleSound.stopAsync();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* Navbar Section */}
            <View style={styles.navbar}>
                <ThemedText type="defaultSemiBold">APP NAME</ThemedText>
            </View>

            {/* Image Section */}
            <View style={styles.imageSection}>
                <Image
                    source={require('../../assets/gifs/dino-heart.gif')}
                    style={styles.image}
                />
            </View>

            {/* Text Section */}
            <View style={styles.textSection}>
                <ThemedText type="defaultSemiBold" style={styles.largerText}>
                    Crack the Shell - Hack to Excel!{"\n"}{"\n"}
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.smallerText}>
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
                colors={['#E3DFCC', '#65665C']}
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
        flex: 6,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    textSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    smallerText: {
        textAlign: 'center',
        fontFamily: 'InriaSerif',
        fontSize: 16,
        marginBottom: 30
    },
    largerText: {
        textAlign: 'center',
        fontFamily: 'InriaSerifBold',
        fontSize: 24
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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAAAAA',
    },
});