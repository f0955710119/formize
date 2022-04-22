import { FC, Dispatch, useState } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import Modal from "../../UI/Modal";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import questionConfig from "../../../../../utils/questionConfig";
import helper from "../../../../../utils/helper";

const questionDefaultList = [
  questionConfig.ONE_LINE_TEXT_DEFAULT,
  questionConfig.MULTIPLE_LINE_TEXT_DEFAULT,
  questionConfig.INTRODUCTION_DEFAULT,
  questionConfig.ONE_CHOICE_DEFAULT,
  questionConfig.MULTIPLE_CHOICE_DEFAULT,
  questionConfig.MARTIX_DEFAULT,
  questionConfig.NUMBER_DEFAULT,
  questionConfig.SLIDER_DEFAULT,
  questionConfig.SORT_DEFAULT,
  questionConfig.DATE_DEFAULT,
];

interface NewPageModalProps {
  hasOpenModal: boolean;
  setModal: Dispatch<boolean>;
}

const NewPageModal: FC<NewPageModalProps> = ({
  hasOpenModal,
  setModal,
}: NewPageModalProps) => {
  const { questions } = useAppSelector((state) => state.question);
  const [toggleNewPageQuestion, setToggleNewPageQuestion] =
    useState<string>("left");
  const [selectedNewQuestion, setSelectedNewQuestion] = useState<string>("0");
  const [selectedCreatedQuestion, setSelectedCreatedQuestion] =
    useState<string>(questions[0].id);
  const indexArr = helper.generateQuestionIndexArr(questions);
  return (
    <Modal
      title="新增問卷分頁"
      submuitButtonText="新增"
      undoButtonText="取消"
      hasOpenModal={hasOpenModal}
      setModal={setModal}
      //   submitHandler={}
    >
      {questions.length > 1 && (
        <ToggleButtonGroup
          sx={{ marginBottom: "1rem", fontSize: "2rem" }}
          value={toggleNewPageQuestion}
          exclusive
          onChange={(event, value) => {
            setToggleNewPageQuestion(value);
          }}
        >
          <ToggleButton value="left">新增題型</ToggleButton>
          <ToggleButton value="right">移動題目</ToggleButton>
        </ToggleButtonGroup>
      )}

      {toggleNewPageQuestion === "left" ? (
        <FormControl fullWidth>
          <Select
            value={selectedNewQuestion}
            onChange={(event) => {
              setSelectedNewQuestion(event.target.value);
            }}
          >
            {questionDefaultList.map((question, i) => (
              <MenuItem value={question.type} key={i}>
                {helper.generateResponsedQuestionTypeName(question.type)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <Select
            value={selectedCreatedQuestion}
            onChange={(event: SelectChangeEvent) => {
              setSelectedCreatedQuestion(event.target.value);
            }}
          >
            {questions.map((question, i) => (
              <MenuItem value={question.id} key={i}>
                {`${indexArr[i]} ${
                  question.title
                } (${helper.generateResponsedQuestionTypeName(question.type)})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Modal>
  );
};

export default NewPageModal;
