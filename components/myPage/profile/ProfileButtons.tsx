import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { sideBarState } from 'recoils/sideBar';
import { userState } from 'recoils/user';

import { ButtonDesign } from 'types/buttonTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import RelationButton from 'components/friends/RelationButton';
import ErrorRefresher from 'components/global/ErrorRefresher';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/global/Button.module.scss';

type ProfileButtonsProps = {
  target: string;
};

const button: ButtonDesign = {
  style: 'flex',
  color: 'purple',
};

export default function ProfileButtons({ target }: ProfileButtonsProps) {
  const { t } = useTranslation('common');
  const { nickname } = useRecoilValue(userState);
  const setSideBar = useSetRecoilState(sideBarState);
  const router = useRouter();
  const { closeModal } = useModalProvider();
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    '',
    `/users/${nickname}/relations/${target}`,
    null,
    { cacheTime: 0 }
  );

  const myPageButton = () => {
    return (
      <BasicButton
        style='flex'
        color='purple'
        handleButtonClick={() => {
          closeModal();
          setSideBar(null);
          router.push('/myPage');
        }}
      >
        {t('move to my page')}
      </BasicButton>
    );
  };

  const directMessageButton = () => {
    return (
      <BasicButton
        style='flex'
        color='purple'
        handleButtonClick={() => {
          closeModal();
          setSideBar(null);
          router.push(`/chats/dm/${target}`);
        }}
      >
        {t('message')}
      </BasicButton>
    );
  };

  const blockUserButton = () => {
    return (
      <RelationButton button={button} type='block' target={target}>
        {t('block')}
      </RelationButton>
    );
  };

  const unblockUserButton = () => {
    return (
      <RelationButton button={button} type='unblock' target={target}>
        {t('unblock')}
      </RelationButton>
    );
  };

  const friendAddButton = () => {
    return (
      <RelationButton button={button} type='friendAdd' target={target}>
        {t('add friend')}
      </RelationButton>
    );
  };

  const friendDeleteButton = () => {
    return (
      <RelationButton button={button} type='friendDelete' target={target}>
        {t('delete friend')}
      </RelationButton>
    );
  };

  const buttons: { [key: string]: Function } = {
    myPage: myPageButton,
    directMessage: directMessageButton,
    blockUser: blockUserButton,
    unblockUser: unblockUserButton,
    friendAdd: friendAddButton,
    friendDelete: friendDeleteButton,
  };

  const relationStatuses: { [key: string]: string[] } = {
    none: ['friendAdd', 'blockUser'],
    friend: ['directMessage', 'friendDelete', 'blockUser'],
    blocked: ['unblockUser'],
    me: ['myPage'],
    unset: [],
  };

  if (isError) return <ErrorRefresher />;

  return isLoading ? (
    <></>
  ) : (
    <div className={styles.profileButtonsContainer}>
      {relationStatuses[data!.status].map((buttonName, i) => (
        <div key={`${target}${i}`}>{buttons[buttonName]()}</div>
      ))}
    </div>
  );
}
