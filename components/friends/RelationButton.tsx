import React, { ReactNode } from 'react';

import { ButtonDesign } from 'types/buttonTypes';
import { UserInteraction } from 'types/friendTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import MutationButton from 'components/global/buttons/MutationButton';

type RelationButtonProps = {
  button: ButtonDesign;
  type: UserInteraction;
  target: string;
  children: ReactNode;
};

export default function RelationButton({
  button,
  type,
  target,
  children,
}: RelationButtonProps) {
  const { style, color } = button;
  const { mutationDelete, mutationPost } = useCustomQuery();
  const { closeModal } = useModalProvider();

  const buttonTypes = {
    friendDelete: {
      mutationRequest: mutationDelete(`/users/friends/${target}`),
      queryKeys: ['allfriends'],
    },
    friendAccept: {
      mutationRequest: mutationPost(`/users/friends/${target}`),
      queryKeys: ['pendings', 'notificationDot'],
    },
    friendAdd: {
      mutationRequest: mutationPost(`/users/friends/pendings/${target}`),
      queryKeys: ['allfriends'],
    },
    friendReject: {
      mutationRequest: mutationDelete(`/users/friends/pendings/${target}`),
      queryKeys: ['pendings', 'notificationDot'],
    },
    block: {
      mutationRequest: mutationPost(`/users/blocks/${target}`),
      queryKeys: ['allfriends'],
    },
    unblock: {
      mutationRequest: mutationDelete(`/users/blocks/${target}`),
      queryKeys: ['blocks'],
    },
  };

  return (
    <MutationButton
      style={style}
      color={color}
      mutationRequest={buttonTypes[type].mutationRequest}
      queryKeys={buttonTypes[type].queryKeys}
      handleOnSuccess={() => {
        closeModal();
      }}
    >
      {children}
    </MutationButton>
  );
}
