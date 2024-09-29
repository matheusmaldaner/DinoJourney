import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import Sound from 'react-native-sound';

const App = () => {
  const [sound1, setSound1] = useState<Sound | null>(null);
  const [sound2, setSound2] = useState<Sound | null>(null);
  const [isPlayingSound1, setIsPlayingSound1] = useState(false);
  const [isPlayingSound2, setIsPlayingSound2] = useState(false);

  useEffect(() => {
    // Load the first sound
    const newSound1 = new Sound('../../assets/audio/Onboarding.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound 1', error);
        return;
      }
    });
    setSound1(newSound1);

    // Load the second sound
    const newSound2 = new Sound('../../assets/audio/Tasking.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound 2', error);
        return;
      }
    });
    setSound2(newSound2);

    // Clean up sounds when the component unmounts
    return () => {
      if (newSound1) newSound1.release();
      if (newSound2) newSound2.release();
    };
  }, []);

  const playSound1 = () => {
    if (sound1 && !isPlayingSound1) {
      sound1.play(() => setIsPlayingSound1(false));
      setIsPlayingSound1(true);
    }
  };

  const stopSound1 = () => {
    if (sound1) {
      sound1.stop(() => setIsPlayingSound1(false));
    }
  };

  const playSound2 = () => {
    if (sound2 && !isPlayingSound2) {
      sound2.play(() => setIsPlayingSound2(false));
      setIsPlayingSound2(true);
    }
  };

  const stopSound2 = () => {
    if (sound2) {
      sound2.stop(() => setIsPlayingSound2(false));
    }
  };

  return (
    <View>
      <Text>{isPlayingSound1 ? 'Playing Sound 1' : 'Sound 1 Stopped'}</Text>
      <Button title="Play Sound 1" onPress={playSound1} />
      <Button title="Stop Sound 1" onPress={stopSound1} />

      <Text>{isPlayingSound2 ? 'Playing Sound 2' : 'Sound 2 Stopped'}</Text>
      <Button title="Play Sound 2" onPress={playSound2} />
      <Button title="Stop Sound 2" onPress={stopSound2} />
    </View>
  );
};

export default App;
