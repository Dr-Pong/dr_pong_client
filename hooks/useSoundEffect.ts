import { useEffect, useState } from 'react';

type AudioPlayer = (isSoundOn?: boolean) => void;
const audios: Map<string, AudioPlayer> = new Map();
export function useSoundEffect(data: Record<string, string>): {
  loaded: boolean;
  audios: typeof audios;
} {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const promises: Promise<void>[] = [];

    const AudioContext = window.AudioContext;
    const audioContext = new AudioContext();

    audios.set('ping', (isSoundOn: boolean) => {
      if (!isSoundOn) return;
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 420;
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    });

    Object.keys(data).forEach((key) => {
      if (audios.has(key)) {
        return;
      }
      const sourceUrl = data[key];

      const promise = fetch(sourceUrl)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const sourceNodes: AudioBufferSourceNode[] = [];

          audios.set(key, (isSoundOn: boolean) => {
            if (!isSoundOn) return;
            const trackSource = audioContext.createBufferSource();
            trackSource.buffer = audioBuffer;
            trackSource.connect(audioContext.destination);
            if (audioContext.state === 'suspended') {
              audioContext.resume();
            }
            sourceNodes.push(trackSource);
            trackSource.start();
          });
        });

      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      setLoaded(true);
    });
  }, []);

  return {
    loaded,
    audios,
  };
}
