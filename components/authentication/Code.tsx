import { IoMdRefresh } from 'react-icons/io';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/authentication/Code.module.scss';

export default function Code() {
  const getQRCode = () => {
    // POST
  };

  return (
    <div className={styles.CodeContainer}>
      <div className={styles.codeWrap}>
        <img
          className={styles.codeImage}
          src={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png'
          } // 임시 이미지
          alt='QRCode'
        />
        <div className={styles.codeNumbers}>{1234567}</div>
      </div>
      <BasicButton style='square' color='black' handleButtonClick={getQRCode}>
        <IoMdRefresh />
      </BasicButton>
    </div>
  );
}
