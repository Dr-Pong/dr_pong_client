import { useSetRecoilState } from 'recoil';

import Link from 'next/link';

import React, { ReactNode } from 'react';

import { dropdownUserState } from 'recoils/friends';
import { sideBarState } from 'recoils/sideBar';

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
  const setSideBar = useSetRecoilState(sideBarState);
  const { style, color } = buttonDesign;

  const openProfile = (label: ReactNode) => {
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

  const inviteGame = (label: ReactNode) => {
    return (
      <BasicButton style={style} color={color} handleButtonClick={closeModal}>
        <Link href={'/game'}>{label}</Link>
      </BasicButton>
    );
  };

  const blockUser = (label: ReactNode) => {
    const request: RequestProps = {
      api: `/users/blocks/${target}`,
      method: 'post',
      options: {},
      key: 'allfriends',
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const unblockUser = (label: ReactNode) => {
    const request: RequestProps = {
      api: `/users/blocks/${target}`,
      method: 'delete',
      options: {},
      key: 'blocks',
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const addFriend = (label: ReactNode) => {
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

  const deleteFriend = (label: ReactNode) => {
    const request: RequestProps = {
      api: `/users/friends/${target}`,
      method: 'delete',
      options: {},
      key: 'allfriends',
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const acceptFriendRequest = (label: ReactNode) => {
    const request: RequestProps = {
      api: `/users/friends/${target}`,
      method: 'post',
      options: {},
      key: 'pendings',
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const rejectFriendRequest = (label: ReactNode) => {
    const request: RequestProps = {
      api: `/users/friends/pendings/${target}`,
      method: 'delete',
      options: {},
      key: 'pendings',
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const directMessage = (label: ReactNode) => {
    const handleButtonClick = () => {
      closeModal();
      setSideBar(null);
    }

    return (
      <BasicButton style={style} color={color} handleButtonClick={handleButtonClick}>
        <Link href={`/chats/dm/${target}`}>{label}</Link>
      </BasicButton>
    );
  };

  const dropdown = () => {
    return <FriendDropdown key={target + 'dropdown'} nickname={target} />;
  };

  const spectate = (label: ReactNode) => {
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
    label: ReactNode,
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

  const channelInvitation = (label: ReactNode, roomId: string) => {
    const request: RequestProps = {
      api: `/channels/${roomId}/invitation/${target}`,
      method: 'post',
      options: {},
    };
    const buttonProps = {
      ...buttonDesign,
      children: label,
    };
    return <ToastResultButton request={request} button={buttonProps} />;
  };

  const gameInvitation = (label: ReactNode) => {
    const api = `/games/invitation/${target}`;
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
