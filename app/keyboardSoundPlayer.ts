import { Audio } from 'expo-av';

// Import typing sounds
const typingSounds = [
  require('../assets/audio/App_Sounds/1real.wav'),
  require('../assets/audio/App_Sounds/2real.wav'),
  require('../assets/audio/App_Sounds/3real.wav'),
  require('../assets/audio/App_Sounds/4real.wav'),
  require('../assets/audio/App_Sounds/5real.wav'),
  require('../assets/audio/App_Sounds/6real.wav'),
  require('../assets/audio/App_Sounds/7real.wav'),
  require('../assets/audio/App_Sounds/8real.wav'),
  require('../assets/audio/App_Sounds/9real.wav'),
  require('../assets/audio/App_Sounds/10real.wav'),
  require('../assets/audio/App_Sounds/11real.wav'),
  require('../assets/audio/App_Sounds/12real.wav'),
];

const backspaceSound = require('../assets/audio/App_Sounds/backspace.wav');
const enterSound = require('../assets/audio/App_Sounds/enter.wav');
const spaceSound = require('../assets/audio/App_Sounds/space.wav');

let typingSoundRef: Audio.Sound | null = null;

// Load and play the typing sound based on the key type
export const playTypingSound = async (keyType: string) => {
  try {
    let selectedSound;

    if (keyType === "backspace") {
      selectedSound = backspaceSound;
    } else if (keyType === "enter") {
      selectedSound = enterSound;
    } else if (keyType === "space") {
      selectedSound = spaceSound;
    } else {
      // For other keys, randomly select a typing sound
      const soundIndex = Math.floor(Math.random() * typingSounds.length);
      selectedSound = typingSounds[soundIndex];
    }

    // Unload previous sound if any
    if (typingSoundRef) {
      await typingSoundRef.unloadAsync();
    }

    // Load and play the selected sound
    const { sound } = await Audio.Sound.createAsync(selectedSound);
    typingSoundRef = sound;
    await typingSoundRef.playAsync();
  } catch (error) {
    console.error("Error playing typing sound:", error);
  }
};

// Cleanup function to unload typing sound when the component unmounts
export const unloadTypingSound = async () => {
  if (typingSoundRef) {
    try {
      await typingSoundRef.unloadAsync();
      typingSoundRef = null;
    } catch (error) {
      console.error("Error unloading typing sound:", error);
    }
  }
};
