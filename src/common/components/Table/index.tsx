import * as React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';

import Card from '../Card';
import Dropdown from '../FormElements/Dropdown';
import Pagination from '../Pagination';

import './Table.style.scss';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';

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
  link?: string;
  fields: Field[];
  goToPage: (page: number) => () => void;
  itemsPerPage: number;
  name: string;
  setItemsPerPage: (value: any) => void;
  onDelete?: (object: UserType) => () => void;
}

export const Table = ({
  currentPage,
  data,
  fields,
  goToPage,
  itemsPerPage,
  link,
  name,
  pageInfo,
  setItemsPerPage,
  totalCount,
  onDelete,
}: Props): JSX.Element => (
  <Card className="table p-2 pt-3 pb-3 w-100">
    <h4 className="pl-2">{name}</h4>
    {totalCount ? (
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
                    {link && i < 2 ? <Link to={`${link}/${node.id}`}>{node[item.name]}</Link> : node[item.name]}
                  </td>
                ))}
                <td>
                  <div onClick={onDelete ? onDelete(node) : () => {}}>
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
              data={[5, 10, 25]}
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
      </>
    ) : (
      <div className="pl-2 pb-3">No data found.</div>
    )}
  </Card>
);

export default Table;
