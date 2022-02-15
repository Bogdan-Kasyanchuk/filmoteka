import PropTypes from 'prop-types';
import { Pagination } from 'react-pagination-bar';
import 'react-pagination-bar/dist/index.css';
import styles from './CustomPagination.module.css';

const CustomPagination = ({ page, totalResults, onPageСhange }) => {
  return (
    <Pagination
      initialPage={page}
      itemsPerPage={20}
      totalItems={totalResults}
      pageNeighbours={1}
      startLabel={'<<'}
      endLabel={'>>'}
      nextLabel={'>'}
      prevLabel={'<'}
      withGoToInput={true}
      withProgressBar={true}
      onPageСhange={onPageСhange}
      customClassNames={{
        rpbRootClassName: styles['custom-root'],
        rpbItemClassName: styles['custom-item'],
        rpbItemClassNameDisable: styles['custom-item--disable'],
        rpbItemClassNameActive: styles['custom-item--active'],
        rpbGoItemClassName: styles['custom-go-item'],
        rpbProgressClassName: styles['custom-progress-bar'],
      }}
    />
  );
};

CustomPagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  onPageСhange: PropTypes.func.isRequired,
};

export default CustomPagination;
