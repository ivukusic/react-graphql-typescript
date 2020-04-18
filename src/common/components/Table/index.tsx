import * as React from 'react';

import Pagination from '../Pagination';
import Dropdown from '../FormElements/Dropdown';

import './Table.style.scss';

type Field = {
  name: string;
  label: string;
};

type PageInfoType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

interface Props {
  currentPage: number;
  data: Array<any>;
  totalCount: number;
  pageInfo: PageInfoType;
  fields: Field[];
  goToPage: (page: number) => () => void;
  itemsPerPage: number;
  name: string;
  setItemsPerPage: (value: number) => void;
}

export const Table = ({
  currentPage,
  data,
  fields,
  goToPage,
  itemsPerPage,
  name,
  pageInfo,
  setItemsPerPage,
  totalCount,
}: Props): JSX.Element => (
  <div className="table card p-2 pt-3 pb-3 w-100">
    <h4 className="pl-2">{name}</h4>
    <table className="w-100">
      <thead>
        <tr>
          {fields.map(item => (
            <th>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((node: any) => (
          <tr key={node.id}>
            {fields.map(item => (
              <th>{node[item.name]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="d-flex flex-row justify-content-between pt-3 pl-3 pr-3">
      <div className="d-flex flex-row align-items-center table__items-per-page">
        Items per page
        <Dropdown
          className="dropdown--items-per-page ml-2"
          onSelect={setItemsPerPage}
          placeholderClassName="d-flex align-items-center justify-content-center"
          value={itemsPerPage}
        />
      </div>
      <Pagination
        current={currentPage}
        pageInfo={pageInfo}
        itemsPerPage={itemsPerPage}
        goToPage={goToPage}
        totalCount={totalCount}
      />
    </div>
  </div>
);

export default Table;