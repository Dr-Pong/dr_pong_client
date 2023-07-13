import React, { Dispatch, SetStateAction } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import styles from 'styles/global/Pagination.module.scss';

type PaginationProps = {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function PettiPagination({
  total,
  page,
  setPage,
}: PaginationProps) {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.pettiPagination}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        className={styles.pettiPagination}
        onClick={() => setPage(page + 1)}
        disabled={page === total}
      >
        <MdKeyboardArrowRight />
      </button>
    </nav>
  );
}
