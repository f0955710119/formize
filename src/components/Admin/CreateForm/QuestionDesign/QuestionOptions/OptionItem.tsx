import { FC } from "react";
import styled from "styled-components";
import AddCommentSharpIcon from "@mui/icons-material/AddCommentSharp";

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  width: 100%;
  border: 1px solid #c8c8c8;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 90%;
`;

const OptionText = styled.div`
  font-size: 1.6rem;
  margin-right: 1rem;
`;
const OptionTypeIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #c8c8c8;
`;

const OptionItem: FC = () => {
  return (
    <OptionWrapper>
      <Option>
        <OptionText>測試題型</OptionText>
        <OptionTypeIcon />
      </Option>
      <AddCommentSharpIcon
        sx={{ width: "10%", height: "2rem", fill: "#c8c8c8" }}
      />
    </OptionWrapper>
  );
};
export default OptionItem;
