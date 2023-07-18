import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useBgm } from 'hooks/useBgm';
import { useSoundEffect } from 'hooks/useSoundEffect';

export default function PageConfig() {
  const { bgms, loaded: bgmLoaded } = useBgm();
  const { effects, loaded: effectLoaded } = useSoundEffect();
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);
  const router = useRouter();
  useEffect(() => {
    if (!cookie.NEXT_LOCALE) {
      const locale = navigator.language.split('-')[0];
      setCookie('NEXT_LOCALE', locale === 'ko' ? 'ko' : 'en', {
        path: '/',
      });
      const { pathname, query } = router;
      router.replace({ pathname, query }, pathname, {
        locale: locale === 'ko' ? 'ko' : 'en',
      });
    }
  });
  return <></>;
}
