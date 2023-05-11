import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

import { loginState } from 'recoils/login';

import BasicButton from 'components/global/buttons/BasicButton';
import LocaleField from 'components/settings/LocaleField';
import TfaField from 'components/settings/TfaField';

import styles from 'styles/settings/Settings.module.scss';

export default function SettingsFrame() {
  const { t } = useTranslation('settings');
  const router = useRouter();

  const settingFields = [
    {
      topic: t('Language'),
      field: <LocaleField />,
    },
    {
      topic: t('2nd Authentication'),
      field: <TfaField />,
    },
  ];

  const handleLogout = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
    const setLogin = useSetRecoilState(loginState);

    removeCookie('Authorization');
    setLogin(false);
    router.push('/');
  };

  return (
    <div className={styles.settingListContainer}>
      <ul>
        {settingFields.map(({ topic, field }, i) => {
          return (
            <li key={i}>
              <div className={styles.listTopic}>{topic}</div>
              {field}
            </li>
          );
        })}
      </ul>
      <div className={styles.buttons}>
        <BasicButton
          style='basic'
          color='black'
          handleButtonClick={handleLogout}
        >
          {t('logout')}
        </BasicButton>
      </div>
    </div>
  );
}
