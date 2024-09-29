import React from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function DinoPostHatch() {
    const router = useRouter();

    const handleNavigation = () => {
        router.push('/gemini');
    };

    return (
        <View style={styles.container}>
            {/* Full-screen image */}
            <Image
                source={require('../../assets/images/dino-sparkles.png')}
                style={styles.fullScreenImage}
                resizeMode="contain"
            />

            <View style={styles.footer}>
                {/* Text underneath the image */}
                <Text style={styles.largerText}>It’s the hatching of a new friendship! This is Shelly. {"\n"}</Text>
                <Text style={styles.smallerText}>
                    Shelly will be with you through your ups and downs. Let Shelly help you become the best version of yourself!
                </Text>
            </View>

            {/* Button */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Get Started"
                    onPress={handleNavigation}  // Call the navigation function here
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3DFCC',
    },
    fullScreenImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6,
    },
    largerText: {
        fontSize: 20,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'InriaSerif-Bold',
    },
    smallerText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'InriaSerif',
    },
    buttonContainer: {
        marginTop: 10,
        width: '80%',
    },
    footer: {
        padding: 10,
    }
});
