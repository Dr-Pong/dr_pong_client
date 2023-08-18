import useTranslation from 'next-translate/useTranslation';

import { Tier } from 'types/userTypes';

import styles from 'styles/myPage/TierLp.module.scss';

type TierLpProps = {
  tier: Tier | null;
  lp: number | null;
  align: 'center' | 'start';
};

export default function TierLp({ tier, lp, align }: TierLpProps) {
  const { t } = useTranslation('tier');

  return (
    <div className={`${styles.tierLpContainer} ${styles[align]}`}>
      {tier && <div className={styles.tier}>{t(tier)}</div>}
      {lp && (
        <div className={styles.lp}>
          <span>{lp}</span>
          <span>LP</span>
        </div>
      )}
    </div>
  );
}
