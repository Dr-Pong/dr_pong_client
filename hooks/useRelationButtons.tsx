import { useSetRecoilState } from 'recoil';

import Link from 'next/link';

import React from 'react';

import { dropdownUserState } from 'recoils/friends';

import { ButtonDesign } from 'types/buttonTypes';

import useModalProvider from 'hooks/useModalProvider';

import FriendDropdown from 'components/friends/FriendDropdown';
import BasicButton from 'components/global/buttons/BasicButton';
import ToastResultButton, {
  RequestProp,
} from 'components/global/buttons/ToastResultButton';

const useRelationButtons = (buttonDesign: ButtonDesign, target: string) => {
  const { useProfileModal, offModal } = useModalProvider();
  const setDropdownUser = useSetRecoilState(dropdownUserState);
  const { style, color } = buttonDesign;

  const openProfile = (label: React.ReactNode) => {
    return (
      <BasicButton
        style={'thin'}
        color={'white'}
        handleButtonClick={() => {
          useProfileModal(target);
          setDropdownUser('');
        }}
      >
        {label}
      </BasicButton>
    );
  };

  const inviteGame = (label: React.ReactNode) => {
    return (
      <BasicButton style={style} color={color} handleButtonClick={offModal}>
        <Link href={'/game'}>{label}</Link>
      </BasicButton>
    );
  };

  const blockUser = (label: React.ReactNode) => {
    const request: RequestProp = {
      api: `/users/blocks/${target}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} buttonProps={buttonProps} />;
  };

  const unblockUser = (label: React.ReactNode) => {
    const request: RequestProp = {
      api: `/users/blocks/${target}`,
      method: 'delete',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} buttonProps={buttonProps} />;
  };

  const addFriend = (label: React.ReactNode) => {
    const request: RequestProp = {
      api: `/users/friends/pendings/${target}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} buttonProps={buttonProps} />;
  };

  const deleteFriend = (label: React.ReactNode) => {
    const request: RequestProp = {
      api: `/users/friends/${target}`,
      method: 'delete',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} buttonProps={buttonProps} />;
  };

  const acceptFriendRequest = (label: React.ReactNode) => {
    const request: RequestProp = {
      api: `/users/friends/${target}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} buttonProps={buttonProps} />;
  };

  const rejectFriendRequest = (label: React.ReactNode) => {
    const request: RequestProp = {
      api: `/users/friends/pendings/${target}`,
      method: 'delete',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} buttonProps={buttonProps} />;
  };

  const directMessage = (label: React.ReactNode) => {
    return (
      <BasicButton style={style} color={color} handleButtonClick={offModal}>
        <Link href={'/chat'}>{label}</Link>
      </BasicButton>
    );
  };

  const dropdown = () => {
    return <FriendDropdown key={target + 'dropdown'} nickname={target} />;
  };

  const spectate = (label: React.ReactNode) => {
    return (
      <BasicButton style={'thin'} color={'white'} handleButtonClick={offModal}>
        <Link href={'/spectate'}>{label}</Link>
      </BasicButton>
    );
  };

  return {
    openProfile,
    inviteGame,
    blockUser,
    unblockUser,
    addFriend,
    deleteFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    directMessage,
    dropdown,
    spectate,
  };
};

export default useRelationButtons;
