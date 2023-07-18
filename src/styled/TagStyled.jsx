import { styled } from "styled-components";

const TagStyled = styled.div`
  .ant-tag {
    font-size: ${({ fontSize }) => fontSize || "18px"};
    padding: ${({ padding }) => padding || "8px 24px"};
  }
`;
export default TagStyled;
