import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import './Pagination.style.scss';

interface Props {
  current: number;
  goToPage: (page: number) => () => void;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  itemsPerPage: number;
  totalCount: number;
}

export const Pagination = ({ current, goToPage, itemsPerPage, pageInfo, totalCount }: Props) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  return (
    <div className="pagination">
      <div
        className={`pagination__arrow pagination__arrow--first${current === 1 ? ' disabled' : ''}`}
        onClick={goToPage(1)}
      >
        <IoIosArrowBack size={24} color="#727272" />
        <IoIosArrowBack size={24} color="#727272" />
      </div>
      <div
        className={`pagination__arrow pagination__arrow--prev${current === 1 ? ' disabled' : ''}`}
        onClick={goToPage(current - 1)}
      >
        <IoIosArrowBack size={24} color="#727272" />
      </div>
      <div className="pagination__pages">
        {current} of {totalPages}
      </div>
      <div
        className={`pagination__arrow pagination__arrow--next${!pageInfo.hasNextPage ? ' disabled' : ''}`}
        onClick={goToPage(current + 1)}
      >
        <IoIosArrowForward size={24} color="#727272" />
      </div>
      <div
        className={`pagination__arrow pagination__arrow--last${!pageInfo.hasNextPage ? ' disabled' : ''}`}
        onClick={goToPage(totalPages)}
      >
        <IoIosArrowForward size={24} color="#727272" />
        <IoIosArrowForward size={24} color="#727272" />
      </div>
    </div>
  );
};

export default Pagination;
