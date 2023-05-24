import { useRecoilState, useSetRecoilState } from "recoil";



import React, { useState } from 'react';



import { ButtonProps } from 'types/buttonTypes';



import useCustomQuery, { MutationType } from 'hooks/useCustomQuery';



import BasicButton from 'components/global/buttons/BasicButton';



import { openAlertState } from '../../../recoils/alert';
import Alert from '../../alerts/Alert';


export type RequestProps = {
  api: string;
  method: 'post' | 'delete' | 'patch';
  options?: object;
  body?: object;
};

export default function ToastResultButton({
  request,
  button,
}: {
  request: RequestProps;
  button: ButtonProps;
}) {
  const { api, method, options, body } = request;
  const { style, color, children } = button;
  const { mutationPost, mutationPatch, mutationDelete } = useCustomQuery();
  const [openAlert, setOpenAlert] = useRecoilState(openAlertState);
  const [alert, setAlert] = useState<React.ReactNode>(null);
  const call: { [key: string]: MutationType } = {
    post: mutationPost,
    patch: mutationPatch,
    delete: mutationDelete,
  };

  const { mutate } = call[method](api, options);

  const onSuccess = () => {
    setAlert(<Alert isError={false} />);
    setOpenAlert(true);
  };

  const onError = () => {
    setAlert(<Alert isError={true} />);
    setOpenAlert(true);
  };

  const handleButtonClick = async () => {
    mutate(body, {
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  return (
    <>
      <BasicButton
        style={style}
        color={color}
        handleButtonClick={handleButtonClick}
      >
        {children}
      </BasicButton>
      {openAlert && alert}
    </>
  );
}