import { useRecoilValue } from 'recoil';

import React, { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';
import { useMutation, useQueries } from 'react-query';

import { editableState, tabState } from 'recoils/myPage';

import { PatchDetail, Title, UserDetail } from 'types/myPageTypes';

import instance from 'utils/axios';

import Dropdown from 'components/myPage/Dropdown';

import styles from 'styles/myPage/ProfileCard.module.scss';

function ProfileCard({ userName }: { userName: string }) {
  const { t } = useTranslation(['page']);
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(tabState);
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [title, setTitle] = useState<Title>({ id: 0, title: '' });
  useEffect(() => {
    if (!editable && tab === 'profile') {
      mutate({ imgUrl, title: title.id, message: statusMessage });
    }
  }, [editable]);
  const fetchProfile = async (): Promise<UserDetail> => {
    const res = await instance.get(`/users/${userName}/detail`);
    setImgUrl(res.data.imgUrl);
    setTitle({ id: 0, title: res.data.title });
    setStatusMessage(res.data.statusMessage);
    return res.data;
  };
  const fetchTitles = async (): Promise<Title[]> => {
    const res = await instance.get(`/users/${userName}/titles`);
    return res.data;
  };

  const queries = useQueries([
    {
      queryKey: 'userDetail',
      queryFn: fetchProfile,
    },
    {
      queryKey: 'userTitles',
      queryFn: fetchTitles,
    },
  ]);

  const patchDetail = async (detail: PatchDetail): Promise<PatchDetail> => {
    const { data } = await instance.patch<PatchDetail>(
      `/users/${userName}/detail`,
      detail
    );
    console.log(detail);
    return data;
  };

  const { mutate } = useMutation(patchDetail);

  const [userDetail, userTitles] = queries.map((query) => query.data);

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  const statusMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(event.target.value);
  };
  const handleDropdownClick = () => {
    setDropdownVisibility(!dropdownVisibility);
  };
  const handleDeleteClick = () => {
    //정말 삭제하시겠습니까?
    setImgUrl('');
  };
  const handleUploadClick = () => {};
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const { nickname, level } = userDetail as UserDetail;
  const titles = userTitles as Title[];
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileTag}>
        <div className={styles.profileImgFrame}>
          <img className={styles.profileImg} src={imgUrl} alt='profileImg' />
          {editable && (
            <div className={styles.imgOverlay}>
              <div className={styles.deleteButton} onClick={handleDeleteClick}>
                <IoIosClose />
              </div>
              <div className={styles.uploadButton} onClick={handleUploadClick}>
                {t('upload file')}
              </div>
            </div>
          )}
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Title')}</span>
            {title.title}
            {editable && (
              <div onClick={handleDropdownClick}>
                <IoIosArrowDown />
              </div>
            )}
            <Dropdown visibility={editable && dropdownVisibility}>
              <ul>
                {titles.map(({ id, title }) => (
                  <li
                    key={id}
                    onClick={() => {
                      setTitle({ id, title });
                      setDropdownVisibility(false);
                    }}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </Dropdown>
          </div>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Level')}</span>
            {level.toString()}
          </div>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Name')}</span>
            {nickname}
          </div>
        </div>
      </div>
      <div className={styles.statusMessage}>
        {editable ? (
          <input
            className={styles.content}
            type='text'
            value={statusMessage}
            onChange={statusMessageHandler}
          />
        ) : (
          <div className={styles.content}>{statusMessage}</div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(ProfileCard);
