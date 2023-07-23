import { useRecoilValue } from 'recoil';

import { useEffect, useState } from 'react';

import { bgmState } from 'recoils/sound';

type AudioPlayer = (isBgmOn?: boolean) => void;
const bgms: Map<string, AudioPlayer> = new Map();
const data: { [key: string]: string } = {
  bgm: '/sound/bgm.mp3',
  game: '/sound/bgm2.mp3',
};
export function useBgm(): {
  loaded: boolean;
  bgms: typeof bgms;
} {
  const [loaded, setLoaded] = useState(false);
  const bgmOn = useRecoilValue(bgmState);
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

          bgms.set(key, (isBgmOn?: boolean) => {
            bgms.forEach((value, key) => {
              if (key.endsWith('_stop')) {
                value();
              }
            });
            if (!isBgmOn) return;
            const trackSource = audioContext.createBufferSource();
            trackSource.buffer = audioBuffer;
            trackSource.connect(audioContext.destination);
            trackSource.loop = true;
            if (audioContext.state === 'suspended') {
              audioContext.resume();
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
