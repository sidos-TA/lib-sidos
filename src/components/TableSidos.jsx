import { Table } from "antd";
import React from "react";

const TableSidos = () => {
  const columns = [
    {
      title: "Name (all screens)",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 500,
      }}
    />
  );
};

export default TableSidos;
