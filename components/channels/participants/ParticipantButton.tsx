import React from 'react';
import { BsFillVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs';
import { TbBan, TbCrown, TbCrownOff, TbShoe } from 'react-icons/tb';

import { ParticipantInteraction } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import MutationButton from 'components/global/buttons/MutationButton';

type ParticipantButtonProps = {
  roomId: string;
  target: string;
  type: ParticipantInteraction;
};

export default function ParticipantButton({
  roomId,
  target,
  type,
}: ParticipantButtonProps) {
  const { mutationDelete, mutationPost } = useCustomQuery();

  const buttonTypes = {
    mute: {
      mutationRequest: mutationPost(`/channels/${roomId}/mute/${target}`),
      value: <BsVolumeMuteFill />,
    },
    unmute: {
      mutationRequest: mutationDelete(`/channels/${roomId}/mute/${target}`),
      value: <BsFillVolumeUpFill />,
    },
    setAdmin: {
      mutationRequest: mutationPost(`/channels/${roomId}/admin/${target}`),
      value: <TbCrown />,
    },
    unsetAdmin: {
      mutationRequest: mutationDelete(`/channels/${roomId}/admin/${target}`),
      value: <TbCrownOff />,
    },
    kick: {
      mutationRequest: mutationDelete(`/channels/${roomId}/kick/${target}`),
      value: <TbShoe />,
    },
    ban: {
      mutationRequest: mutationPost(`/channels/${roomId}/ban/${target}`),
      value: <TbBan />,
    },
  };

  if (!Object.prototype.hasOwnProperty.call(buttonTypes, type)) return null;
  return (
    <MutationButton
      style='fit'
      color='transparent'
      mutationRequest={buttonTypes[type].mutationRequest}
    >
      {buttonTypes[type].value}
    </MutationButton>
  );
}
