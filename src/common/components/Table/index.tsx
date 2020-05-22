import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Card, Dropdown, Filter, Pagination } from '..';
import { FormInputType } from '../../types';

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
  data: any[];
  error?: string;
  filters?: { string: FormInputType }[];
  totalCount: number;
  pageInfo: PageInfoType;
  link?: (id: number) => string;
  loading: boolean;
  fields: Field[];
  goToPage: (page: number) => () => void;
  itemsPerPage: number;
  name: string;
  setItemsPerPage: (value: any) => void;
  onFilterChange?: any;
  onDelete?: (id: number) => () => void;
}

export const Table = ({
  currentPage,
  data,
  error,
  fields,
  filters,
  goToPage,
  itemsPerPage,
  link,
  loading,
  name,
  pageInfo,
  setItemsPerPage,
  totalCount,
  onFilterChange,
  onDelete,
}: Props): JSX.Element => {
  const [opened, setOpened] = useState(false);

  const onFilterClick = () => {
    setOpened(!opened);
  };

  const setItems = (value: { value: number }) => {
    setItemsPerPage(value.value);
  };

  return (
    <Card className="table p-2 pt-3 pb-3 w-100">
      <div className="container-fluid p-0">
        <div className="row justify-content-between m-0 mr-4">
          <h4 className="pl-2">{name}</h4>
          <BsFilter size="26" onClick={onFilterClick} />
        </div>
      </div>
      {opened && filters && Object.keys(filters) && <Filter filters={filters} onFilterChange={onFilterChange} />}
      {!!totalCount && (
        <>
          <table className="w-100">
            <thead>
              <tr>
                {fields.map(item => (
                  <th key={item.label}>{item.label}</th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((node: any) => (
                <tr key={node.id}>
                  {fields.map((item: any, i: number) => (
                    <td key={`${item.id}${i}}`}>
                      {link && i < 2 ? <Link to={link(node.id)}>{node[item.name]}</Link> : node[item.name]}
                    </td>
                  ))}
                  <td>
                    <div onClick={onDelete ? onDelete(node.id) : () => {}}>
                      <AiTwotoneDelete className="" color="#ff002eBB" size={20} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex flex-row justify-content-between align-items-center pt-3 pl-3 pr-3">
            <div className="d-flex flex-row align-items-center table__items-per-page">
              Items per page
              <Dropdown
                className="dropdown--items-per-page ml-2 mt-3"
                data={[{ value: 5 }, { value: 10 }, { value: 15 }]}
                keys={[{ display: 'value' }]}
                idKey="value"
                onSelect={setItems}
                placeholderClassName="d-flex align-items-center justify-content-center"
                value={{ value: itemsPerPage }}
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
        </>
      )}
      {!loading && !totalCount && <div className="pl-2 pb-3">{error || 'No data found.'}</div>}
    </Card>
  );
};

export default Table;
