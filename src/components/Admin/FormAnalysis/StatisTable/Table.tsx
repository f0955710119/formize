import { FC, ReactNode } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  max-width: 54rem;
  width: 100%;
  /* height: 32rem; */
  border-radius: 5px;
  background-color: rgba(180, 188, 183, 0.298);
  /* overflow: scroll; */
`;

const TableTitle = styled.div`
  background-color: rgba(180, 188, 183);
  padding: 2rem 1rem;
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
`;

interface TableProps {
  title: string;
  children: ReactNode;
}

const Table: FC<TableProps> = ({ title, children }) => {
  return (
    <TableWrapper>
      <TableTitle>{title}</TableTitle>
      {children}
    </TableWrapper>
  );
};

export default Table;
