import { useBgm } from 'hooks/useBgm';
import { useSoundEffect } from 'hooks/useSoundEffect';

export default function SoundManager() {
  const { bgms, loaded: bgmLoaded } = useBgm();
  const { effects, loaded: effectLoaded } = useSoundEffect();
  return <></>;
}
