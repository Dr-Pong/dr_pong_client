import { Dispatch, SetStateAction } from 'react';

import styles from 'styles/channels/Pagination.module.scss';

export default function Pagination({
  total,
  page,
  setPage
}: {
  total: number | undefined,
  page: number,
  setPage: Dispatch<SetStateAction<number>>
}
) {
  return (
    <>
      <nav className={styles.nav}>
        <button className={styles.pagination} onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(total)
          .fill(null)
          .map((_, i) => (
            <button className={styles.pagination} key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? "page" : undefined}>
              {i + 1}
            </button>
          ))}
        <button className={styles.pagination} onClick={() => setPage(page + 1)} disabled={page === total}>
          &gt;
        </button>
      </nav>
    </>
  );
}
