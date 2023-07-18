import { styled } from "styled-components";

const TableStyled = styled.div`
  .ant-table-content {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
  }
  .ant-table-thead .ant-table-cell {
    background-color: #4096ff;
    color: white;
  }
  .ant-table-cell-row-hover {
    cursor: pointer;
    background-color: #e6f4ff !important;
    color: #1677ff;
  }
`;
export default TableStyled;
