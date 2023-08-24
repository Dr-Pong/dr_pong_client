import useTranslation from 'next-translate/useTranslation';

import React, { Dispatch, SetStateAction } from 'react';

import { Tier } from 'types/userTypes';

import LadderPoint from 'components/records/LadderPoint';

import styles from 'styles/game/result/LpProgressBar.module.scss';

type LpProgressBarProps = {
  lpData: { lp: number; lpChange: number };
  setShowFireworks: Dispatch<SetStateAction<boolean>>;
};

export default function LpProgressBar({
  lpData,
  setShowFireworks,
}: LpProgressBarProps) {
  const { t: tGame } = useTranslation('game');
  const { t: tTier } = useTranslation('tier');

  const getTierName = (lp: number): Tier[] => {
    if (lp >= DOCTOR_CUT) return ['doctor', ''];
    if (lp >= MASTER_CUT) return ['master', 'doctor'];
    if (lp >= BACHELOR_CUT) return ['bachelor', 'master'];
    if (lp >= STUDENT_CUT) return ['student', 'bachelor'];
    return ['egg', 'student'];
  };

  const getRankSection = (lp: number): number[] => {
    if (lp >= DOCTOR_CUT) return [DOCTOR_CUT, 10000];
    if (lp >= MASTER_CUT) return [MASTER_CUT, DOCTOR_CUT];
    if (lp >= BACHELOR_CUT) return [BACHELOR_CUT, MASTER_CUT];
    if (lp >= STUDENT_CUT) return [STUDENT_CUT, BACHELOR_CUT];
    return [0, STUDENT_CUT];
  };

  const { lp, lpChange } = lpData;
  const [start, end] = getRankSection(lp);
  const [startTier, endTier] = getTierName(lp);
  const position = ((lp - start) / (end - start)) * 100;

  if (lp - lpChange < start && lp >= start) {
    setShowFireworks(true);
  }

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
        <div className={styles.title}>{tGame('LP')}</div>
        <div className={styles.lpChange}>
          <LadderPoint lp={lp} lpChange={lpChange} />
        </div>
      </div>
      <div className={styles.lpProgressBar}>
        <div className={styles.lpProgressBarScaleMarks}>{scaleMarks()}</div>
        <div className={styles.lpProgressBarScale}>
          <div className={styles.startPoint}>{tTier(startTier)}</div>
          <div className={styles.endPoint}>{tTier(endTier)}</div>
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

const DOCTOR_CUT = 1500;
const MASTER_CUT = 1200;
const BACHELOR_CUT = 1000;
const STUDENT_CUT = 800;
