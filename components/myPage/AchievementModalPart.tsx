import useTranslation from 'next-translate/useTranslation';

import { Achievement } from 'types/userTypes';

import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import UpperModalTitle from 'components/modals/upperModalParts/UpperModalTitle';

import styles from 'styles/myPage/SelectableItem.module.scss';

export default function AchievementModalPart({
  achievement,
}: {
  achievement: Achievement;
}) {
  const { name, imgUrl, content } = achievement;
  const { t } = useTranslation('achievement');
  return (
    <div>
      <UpperModalTitle title={t(name)} />
      <ModalPhrase>
        {
          <div>
            <img className={styles.itemImage} src={imgUrl} alt={name} />
            <div>{t(content)}</div>
          </div>
        }
      </ModalPhrase>
    </div>
  );
}
