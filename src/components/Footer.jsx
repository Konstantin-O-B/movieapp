import React from 'react';
import { Pagination } from 'antd';

function Footer({ value, popularPage, searchPage, onChangePagination, resultFilms, totalPage }) {
  if (resultFilms.length === 0) {
    return <div />;
  }
  return (
    <div>
      <Pagination
        className="pagination"
        current={value ? searchPage : popularPage}
        onChange={onChangePagination}
        total={totalPage}
        pageSize="20"
      />
    </div>
  );
}

export default Footer;
