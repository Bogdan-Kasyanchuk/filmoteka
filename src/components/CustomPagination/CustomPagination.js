import { Pagination } from 'react-pagination-bar';
import 'react-pagination-bar/dist/index.css';
import styles from './CustomPagination.module.css';

const CustomPagination = ({ page, totalResults, onPageСhange }) => {
  return (
    <div className={styles.pagination}>
      <Pagination
        initialPage={Number(page)}
        itemsPerPage={20}
        totalItems={totalResults}
        pageNeighbours={2}
        startLabel={'<<'}
        endLabel={'>>'}
        nextLabel={'>'}
        prevLabel={'<'}
        withGoToInput={true}
        withProgressBar={true}
        onPageСhange={onPageСhange}
      />
    </div>
  );
};

export default CustomPagination;
