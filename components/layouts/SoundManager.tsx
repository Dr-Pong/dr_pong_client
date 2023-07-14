import { useBgm } from 'hooks/useBgm';
import { useSoundEffect } from 'hooks/useSoundEffect';

export default function SoundManager() {
  const { bgms, loaded: bgmLoaded } = useBgm({
    bgm: '/sound/bgm.mp3',
    bgm2: '/sound/bgm2.mp3',
  });
  const { effects, loaded: effectLoaded } = useSoundEffect({
    cork: '/sound/cork.mp3',
    pong: '/sound/pong.mp3',
    hit: '/sound/hit.mp3',
  });
  return <></>;
}
