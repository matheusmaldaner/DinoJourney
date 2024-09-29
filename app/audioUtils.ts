// utils/audioUtils.ts
import { Audio } from 'expo-av';

export const fadeOut = async (
  sound: Audio.Sound | null,
  duration: number = 1000
): Promise<void> => {
  if (sound) {
    const intervalTime = 50; // Time between volume decreases (in ms)
    const volumeStep = 1 / (duration / intervalTime); // How much to decrease each step

    for (let volume = 1; volume > 0; volume -= volumeStep) {
      await sound.setVolumeAsync(volume);
      await new Promise((resolve) => setTimeout(resolve, intervalTime));
    }
    await sound.stopAsync(); // Stop audio once faded out completely
  }
};

export const fadeIn = async (
  sound: Audio.Sound | null,
  duration: number = 1000
): Promise<void> => {
  if (sound) {
    await sound.setPositionAsync(0); // Start from the beginning
    await sound.setVolumeAsync(0); // Start with zero volume
    await sound.replayAsync(); // Start playing the audio

    const intervalTime = 50; // Time between volume increases (in ms)
    const volumeStep = 1 / (duration / intervalTime); // How much to increase each step

    for (let volume = 0; volume <= 1; volume += volumeStep) {
      await sound.setVolumeAsync(volume);
      await new Promise((resolve) => setTimeout(resolve, intervalTime));
    }
  }
};

export async function loadSoundForObject(soundObject: Audio.Sound, soundFile: any) {
    return soundObject.unloadAsync().finally(() => {
        return soundObject.loadAsync(soundFile);
    });
}