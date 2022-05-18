import { FC, ReactNode } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../../configs/breakpointConfig";

interface TableWrapperProps {
  isTextContent: boolean;
}

const TableWrapper = styled.div<TableWrapperProps>`
  display: inline-block;
  margin-right: 3rem;
  max-width: 64rem;
  width: 100%;
  border: 3px solid #ccc;
  border-radius: 7px;

  background-color: rgba(255, 255, 255, 0.7);

  @media ${breakpointConfig.desktopM} {
    max-width: 50rem;
  }

  @media ${breakpointConfig.laptopL} {
    max-width: 46rem;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  @media ${breakpointConfig.tabletS} {
    max-width: 42rem;
  }

  @media ${breakpointConfig.mobileL} {
    max-width: 36rem;
  }
`;

const TableTitle = styled.div`
  background-color: #ccc;
  padding: 2rem 1rem;
  font-size: 1.8rem;
  color: #333;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

interface TableProps {
  title: string;
  children: ReactNode;
  isTextContent: boolean;
}

const Table: FC<TableProps> = ({ title, children, isTextContent }) => {
  console.log(document.body.clientWidth);
  return (
    <TableWrapper isTextContent={isTextContent}>
      <TableTitle>{title}</TableTitle>
      {children}
    </TableWrapper>
  );
};

export default Table;
