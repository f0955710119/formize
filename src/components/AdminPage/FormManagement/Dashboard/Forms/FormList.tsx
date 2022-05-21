import { FC, useContext } from "react";

import useResizeWindow from "../../../../../hooks/useResizeWindow";
import { adminContext } from "../../../../../store/context/adminContext";
import FormListWithGroupTag from "./FormListContent/FormListWithGroupTag";

const FormList: FC = () => {
  const { editingGroupId, groups, forms } = useContext(adminContext);
  const isForDesktop = useResizeWindow(768);
  const isShowAllForm = editingGroupId === "0";
  const showSingleGroup = () => {
    const hasResponsedGroup = groups.find((group) => group.id === editingGroupId);
    if (!hasResponsedGroup) return groups[0];
    return hasResponsedGroup;
  };

  const groupListArray = isShowAllForm ? groups : [showSingleGroup()];
  const hasNoGroup = groupListArray[0] === undefined;

  return hasNoGroup ? (
    <></>
  ) : (
    <>
      {groupListArray.map((group) => (
        <FormListWithGroupTag
          key={group.id}
          group={group}
          forms={forms}
          isForDesktop={isForDesktop}
        />
      ))}
    </>
  );
};

export default FormList;
