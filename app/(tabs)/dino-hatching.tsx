import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { fadeOut, fadeIn } from '../audioUtils';

const background_audio = require('../../assets/audio/Explore.mp3');

export default function DinoDaddy(): JSX.Element {
    const router = useRouter();
    const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        // Load and fade in audio when the component mounts
        const loadAndPlayBackground = async (): Promise<void> => {
            try {
                const { sound } = await Audio.Sound.createAsync(background_audio);
                setBackgroundSound(sound);
                await fadeIn(sound, 1500); // Fade in the background music over 1.5 seconds
            } catch (error) {
                console.error("Error loading or playing audio:", error);
            }
        };

        loadAndPlayBackground();

        // Set up the timer to navigate after 32 seconds and fade out the audio
        const timer = setTimeout(async () => {
            if (backgroundSound) {
                await fadeOut(backgroundSound, 1500); // Fade out audio over 1.5 seconds
            }
            router.push('/dino-companion');
        }, 32000);

        // Cleanup function: stop the sound and clear the timer when the component unmounts
        return () => {
            if (backgroundSound) {
                backgroundSound.stopAsync();
            }
            clearTimeout(timer);
        };
    }, [router]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/gifs/dino-hatch.gif')}
                style={styles.gif}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: 900,
        height: 900,
        resizeMode: 'contain'
    },
});
