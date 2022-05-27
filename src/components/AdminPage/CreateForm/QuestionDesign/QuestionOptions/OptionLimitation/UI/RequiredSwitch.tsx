import { FC } from "react";

import styled from "@emotion/styled";
import { Switch } from "@mui/material";

import useAppDispatch from "../../../../../../../hooks/useAppDispatch";
import useGetQuestion from "../../../../../../../hooks/useGetQuestion";
import questionActionType from "../../../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../../../store/slice/questionSlice";
import { Question } from "../../../../../../../types/question";
import Field from "./Field";
import Label from "./Label";

const RequiredLabel = styled(Label)`
  width: auto;
`;

interface RequiredSwitchProps {
  id: string;
}

const RequiredSwitch: FC<RequiredSwitchProps> = ({ id }: RequiredSwitchProps) => {
  const dispatch = useAppDispatch();
  const question = useGetQuestion(id) as Question;

  const toggleRequireButton = (value: boolean) => {
    if (!question) return;
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id: question.id,
        actionType: questionActionType.VALIDATIONS,
        validations: {
          ...question.validations,
          required: value,
        },
      })
    );
  };

  return (
    <Field>
      <RequiredLabel>必填</RequiredLabel>
      {question && (
        <Switch
          checked={question.validations.required}
          onChange={(event) => {
            toggleRequireButton(event.target.checked);
          }}
        />
      )}
    </Field>
  );
};

export default RequiredSwitch;
