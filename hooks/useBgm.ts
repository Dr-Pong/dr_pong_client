import { useEffect, useState } from 'react';

type AudioPlayer = () => void;
const bgms: Map<string, AudioPlayer> = new Map();
export function useBgm(data: Record<string, string>): {
  loaded: boolean;
  bgms: typeof bgms;
} {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const promises: Promise<void>[] = [];

    const AudioContext = window.AudioContext;
    const audioContext = new AudioContext();

    Object.keys(data).forEach((key) => {
      if (bgms.has(key)) {
        return;
      }
      const sourceUrl = data[key];

      const promise = fetch(sourceUrl)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const sourceNodes: AudioBufferSourceNode[] = [];

          bgms.set(key, () => {
            const trackSource = audioContext.createBufferSource();
            trackSource.buffer = audioBuffer;
            trackSource.connect(audioContext.destination);
            trackSource.loop = true;
            if (audioContext.state === 'suspended') {
              audioContext.resume();
              return;
            }
            sourceNodes.push(trackSource);
            trackSource.start();
          });

          bgms.set(key + '_stop', () => {
            sourceNodes.forEach((node) => node.stop());
            sourceNodes.length = 0;
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
    bgms,
  };
}
