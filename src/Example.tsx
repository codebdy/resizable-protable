import React, { memo } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import { useTransColumns } from './ResizeableTitle/useTransColumns';
import { ResizableColumn, ResizableTitle } from './ResizeableTitle';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ResizableColumn<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    resizable: true,
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: ((value: string, record: any) => record.name.indexOf(value) === 0) as any,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    resizable: true,
    //defaultSortOrder: 'descend',
    //sorter: (a: { age: number; }, b: { age: number; }) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: ((value: string, record: any) => record.address.indexOf(value) === 0) as any,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Example = memo(() => {
  const newColumns = useTransColumns(columns)
  return (<Table
    components={{
      header: {
        cell: ResizableTitle,
      },
    }}
    columns={newColumns}
    dataSource={data}
    onChange={onChange}
  />)
});

