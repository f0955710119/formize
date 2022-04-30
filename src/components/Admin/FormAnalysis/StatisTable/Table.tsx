import { FC, ReactNode } from "react";
import styled from "styled-components";

interface TableWrapperProps {
  isTextContent: boolean;
}

const TableWrapper = styled.div<TableWrapperProps>`
  display: inline-block;
  margin-right: 3rem;
  max-width: 60rem;
  width: 100%;
  border: 3px solid rgba(180, 188, 183, 0.298);
  height: ${(props: TableWrapperProps) =>
    props.isTextContent ? "32rem" : "auto"};
  border-radius: 7px;
  /* background-color: rgba(180, 188, 183, 0.298); */
  background-color: rgba(255, 255, 255, 0.7);
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
