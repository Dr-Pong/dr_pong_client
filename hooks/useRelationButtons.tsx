import { useSetRecoilState } from 'recoil';

import Link from 'next/link';

import React from 'react';

import { dropdownUserState } from 'recoils/friends';

import { ButtonDesign } from 'types/buttonTypes';

import useModalProvider from 'hooks/useModalProvider';

import FriendDropdown from 'components/friends/FriendDropdown';
import BasicButton from 'components/global/buttons/BasicButton';
import GameInvitationButton from 'components/global/buttons/GameInvitationButton';
import ToastResultButton, {
  RequestProps,
} from 'components/global/buttons/ToastResultButton';

const useRelationButtons = (buttonDesign: ButtonDesign, target: string) => {
  const { useProfileModal, closeModal } = useModalProvider();
  const setDropdownUser = useSetRecoilState(dropdownUserState);
  const { style, color } = buttonDesign;

  const openProfile = (label: React.ReactNode) => {
    return (
      <BasicButton
        style={'dropdown'}
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
      <BasicButton style={style} color={color} handleButtonClick={closeModal}>
        <Link href={'/game'}>{label}</Link>
      </BasicButton>
    );
  };

  const blockUser = (label: React.ReactNode) => {
    const request: RequestProps = {
      api: `/users/blocks/${target}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const unblockUser = (label: React.ReactNode) => {
    const request: RequestProps = {
      api: `/users/blocks/${target}`,
      method: 'delete',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const addFriend = (label: React.ReactNode) => {
    const request: RequestProps = {
      api: `/users/friends/pendings/${target}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const deleteFriend = (label: React.ReactNode) => {
    const request: RequestProps = {
      api: `/users/friends/${target}`,
      method: 'delete',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const acceptFriendRequest = (label: React.ReactNode) => {
    const request: RequestProps = {
      api: `/users/friends/${target}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const rejectFriendRequest = (label: React.ReactNode) => {
    const request: RequestProps = {
      api: `/users/friends/pendings/${target}`,
      method: 'delete',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const directMessage = (label: React.ReactNode) => {
    return (
      <BasicButton style={style} color={color} handleButtonClick={closeModal}>
        <Link href={`/chats/dm/${target}`}>{label}</Link>
      </BasicButton>
    );
  };

  const dropdown = () => {
    return <FriendDropdown key={target + 'dropdown'} nickname={target} />;
  };

  const spectate = (label: React.ReactNode) => {
    return (
      <BasicButton
        style={'dropdown'}
        color={'white'}
        handleButtonClick={closeModal}
      >
        <Link href={'/spectate'}>{label}</Link>
      </BasicButton>
    );
  };

  const channelRoleEvent = (
    label: React.ReactNode,
    roleApi: string,
    method: 'post' | 'delete' | 'patch'
  ) => {
    const request: RequestProps = {
      api: `${roleApi}/${target}`,
      method: method,
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const channelInvitation = (label: React.ReactNode, nickname: string) => {
    const request: RequestProps = {
      api: `/channels/${target}/invitation/${nickname}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const gameInvitation = (label: React.ReactNode, nickname: string) => {
    const api = `/games/invitation/${nickname}`;
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <GameInvitationButton api={api} button={buttonProps} />;
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
    channelRoleEvent,
    channelInvitation,
    gameInvitation,
  };
};

export default useRelationButtons;
