import { Dispatch, SetStateAction } from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

import styles from 'styles/global/Pagination.module.scss';

type PaginationProps = {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function Pagination({ total, page, setPage }: PaginationProps) {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.pagination}
        onClick={() => setPage(1)}
        disabled={page === 1}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        className={styles.pagination}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <MdKeyboardArrowLeft />
      </button>
      {Array.from({ length: total }, (_, i) => (
        <button
          className={styles.pagination}
          key={i + 1}
          onClick={() => setPage(i + 1)}
          aria-current={page === i + 1 ? 'page' : undefined}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={styles.pagination}
        onClick={() => setPage(page + 1)}
        disabled={page === total}
      >
        <MdKeyboardArrowRight />
      </button>
      <button
        className={styles.pagination}
        onClick={() => setPage(total ? total : page)}
        disabled={page === total}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </nav>
  );
}
