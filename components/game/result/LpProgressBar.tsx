import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import LadderPoint from 'components/records/LadderPoint';

import styles from 'styles/game/result/LpProgressBar.module.scss';

export default function LpProgressBar({
  lpData,
}: {
  lpData: { lp: number; lpChange: number };
}) {
  const { t } = useTranslation('game');
  const getTierName = (lp: number): string[] => {
    if (lp >= DOCTOR_CUT) return ['Doctor', 'Professor'];
    if (lp >= MASTER_CUT) return ['Master', 'Doctor'];
    if (lp >= BACHELOR_CUT) return ['Bachelor', 'Master'];
    if (lp >= STUDENT_CUT) return ['Student', 'Bachelor'];
    return ['Egg', 'Student'];
  };

  const getRankSection = (lp: number): number[] => {
    if (lp >= DOCTOR_CUT) return [DOCTOR_CUT, 10000];
    if (lp >= MASTER_CUT) return [MASTER_CUT, DOCTOR_CUT];
    if (lp >= BACHELOR_CUT) return [BACHELOR_CUT, MASTER_CUT];
    if (lp >= STUDENT_CUT) return [STUDENT_CUT, BACHELOR_CUT];
    return [0, STUDENT_CUT];
  };

  const { lp, lpChange } = lpData;
  const startLp = lp - lpChange;
  const [start, end] = getRankSection(startLp);
  const [startTier, endTier] = getTierName(startLp);
  const position = ((lp - start) / (end - start)) * 100;
  const scaleMarks = () => {
    const marks = [];
    for (let i = 0; i <= 20; i++) {
      marks.push(
        <div
          className={styles.scaleMark}
          style={{ left: `${i * 5}%` }}
          key={i}
        ></div>
      );
    }
    return marks.map((mark) => mark);
  };

  return (
    <div className={styles.lpProgressBarContainer}>
      <div className={styles.lpProgressBarTitle}>
        <div className={styles.title}>{t('LP')}</div>
        <div className={styles.lpChange}>
          <LadderPoint lp={lp} lpChange={lpChange} />
        </div>
      </div>
      <div className={styles.lpProgressBar}>
        <div className={styles.lpProgressBarScaleMarks}>{scaleMarks()}</div>
        <div className={styles.lpProgressBarScale}>
          <div className={styles.startPoint}>{t(startTier)}</div>
          <div className={styles.endPoint}>{t(endTier)}</div>
        </div>
        <div
          className={styles.arrow}
          style={{
            left: `calc(${position > 100 ? 100 : position}% - 0.5rem)`,
          }}
        ></div>
      </div>
    </div>
  );
}

const DOCTOR_CUT = 3000;
const MASTER_CUT = 2500;
const BACHELOR_CUT = 2000;
const STUDENT_CUT = 1500;
