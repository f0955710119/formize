import { FC } from "react";

import { Forms } from "../../../../../../types/form";
import helper from "../../../../../../utils/helper";
import FormCard from "./FormCard";
import FormItem from "./FormItem";

interface FormsProps {
  form: Forms;
  isList: boolean;
}
const FormsInGroup: FC<FormsProps> = ({ form, isList }) => {
  const dateCreated = helper.convertFirebaseTimeToDate((form as Forms).createdTime);
  const dateResponsed =
    form.latestResponsedTime !== null
      ? helper.convertFirebaseTimeToDate(form.latestResponsedTime)
      : null;

  const FormForListItem = isList ? FormItem : FormCard;

  return (
    <FormForListItem
      formId={form.id}
      title={form.title}
      responsedTimes={form.responsedTimes}
      dateCreated={dateCreated}
      dateResponsed={dateResponsed}
      key={form.id}
    />
  );
};

export default FormsInGroup;
