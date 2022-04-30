import { FC, ReactNode } from "react";
import styled from "styled-components";

interface TableWrapperProps {
  isTextContent: boolean;
}

const TableWrapper = styled.div<TableWrapperProps>`
  max-width: 64rem;
  width: 100%;
  height: ${(props: TableWrapperProps) =>
    props.isTextContent ? "32rem" : "auto"};
  border-radius: 5px;
  background-color: rgba(180, 188, 183, 0.298);

  /* overflow: scroll; */
`;

const TableTitle = styled.div`
  background-color: #dadbdb;
  padding: 2rem 1rem;
  font-size: 1.8rem;
  color: #555;
  font-weight: bold;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

interface TableProps {
  title: string;
  children: ReactNode;
  isTextContent: boolean;
}

const Table: FC<TableProps> = ({ title, children, isTextContent }) => {
  return (
    <TableWrapper isTextContent={isTextContent}>
      <TableTitle>{title}</TableTitle>
      {children}
    </TableWrapper>
  );
};

export default Table;
