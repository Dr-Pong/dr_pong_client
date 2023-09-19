import { useSetRecoilState } from 'recoil';

import { useEffect, useState } from 'react';

import { soundEffectState } from 'recoils/sound';

type AudioPlayer = (isSoundOn?: boolean) => void;
const effects: Map<string, AudioPlayer> = new Map();
const data: { [key: string]: string } = {
  cork: '/sound/cork.mp3',
  pong: '/sound/pong.mp3',
  bar_touch: '/sound/touch.mp3',
  wall_touch: '/sound/touch.mp3',
  spin: '/sound/spin.mp3',
};
export function useSoundEffect(): {
  loaded: boolean;
  effects: typeof effects;
} {
  const [loaded, setLoaded] = useState(false);
  const setSoundEffectOn = useSetRecoilState(soundEffectState);

  useEffect(() => {
    setSoundEffectOn(localStorage.getItem('soundEffectOn') === 'true');
    const promises: Promise<void>[] = [];

    let AudioContext;
    if (window.AudioContext) {
      AudioContext = window.AudioContext;
    } else {
      return;
    }

    const audioContext = new AudioContext();

    effects.set('ping', (isSoundOn?: boolean) => {
      if (!isSoundOn) return;
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 420;
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    });

    Object.keys(data).forEach((key) => {
      if (effects.has(key)) {
        return;
      }
      const sourceUrl = data[key];

      const promise = fetch(sourceUrl)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const sourceNodes: AudioBufferSourceNode[] = [];

          effects.set(key, (isSoundOn?: boolean) => {
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
    effects,
  };
}
