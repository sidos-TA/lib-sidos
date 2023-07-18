import { Col, Row, Skeleton, Space, Table } from "antd";
import { Fragment } from "react";
import SkeletonStyled from "../../styled/SkeletonStyle";

const TableLoading = () => {
  const randomNum = (max = 4, min = 3) => Math.floor(Math.random() * max) + min;
  const columns = Array.from({ length: randomNum() }, (_, index) => {
    return {
      key: index + 1,
      title: `Column ${index + 1}`,
      dataIndex: `Column ${index + 1}`,
      render: () => (
        <SkeletonStyled>
          <Skeleton.Input active style={{ width: "100%" }} />
        </SkeletonStyled>
      ),
    };
  });

  const data = Array.from({ length: randomNum() }, (_, index) => {
    return {
      key: index + 1,
      [`Column ${index + 1}`]: "",
    };
  });

  return (
    <Space direction="vertical">
      {columns?.length ? (
        <Row gutter={8} wrap>
          {columns?.map((_, idx) => {
            return (
              <Col span={24 / columns?.length} key={idx}>
                <SkeletonStyled>
                  <Skeleton.Input style={{ width: "100%" }} />
                </SkeletonStyled>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Fragment />
      )}
      <Table tableLayout="fixed" columns={columns} dataSource={data} />
    </Space>
  );
};

export default TableLoading;
