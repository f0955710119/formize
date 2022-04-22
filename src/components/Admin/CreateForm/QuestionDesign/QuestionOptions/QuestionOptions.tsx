import { FC } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import styled from "styled-components";
import Layout from "../../UI/Layout";

import questionConfig from "../../../../../configs/questionConfig";
import { Question } from "../../../../../types/question";

import OptionItem from "./OptionItem";
import { Heading } from "../../UI/SectionHeading";
import ChoiceLimitation from "./OptionLimitation/ChoiceLimitation";
import NumberLimitation from "./OptionLimitation/NumberLimitation";
import DateLimitation from "./OptionLimitation/DateLimitation";

import TextLimitation from "./OptionLimitation/TextLimitation";
import TextFormatSharpIcon from "@mui/icons-material/TextFormatSharp";
import TextIncreaseSharpIcon from "@mui/icons-material/TextIncreaseSharp";
import FormatQuoteSharpIcon from "@mui/icons-material/FormatQuoteSharp";
import AdjustSharpIcon from "@mui/icons-material/AdjustSharp";
import FormatListNumberedSharpIcon from "@mui/icons-material/FormatListNumberedSharp";
import LooksOneSharpIcon from "@mui/icons-material/LooksOneSharp";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import LayersSharpIcon from "@mui/icons-material/LayersSharp";
import QueryBuilderSharpIcon from "@mui/icons-material/QueryBuilderSharp";

const OptionsLayout = styled(Layout)`
  width: 18%;
`;

const OptionHeading = styled(Heading)`
  margin-bottom: 2rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: 35vh;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f90;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;

const questionList: OptionItem[] = [
  {
    title: "單行文字",
    questionType: questionConfig.ONE_LINE_TEXT,
    iconComponent: <TextFormatSharpIcon />,
  },
  {
    title: "多行文字",
    questionType: questionConfig.MULTIPLE_LINE_TEXT,
    iconComponent: <TextIncreaseSharpIcon />,
  },
  {
    title: "引言",
    questionType: questionConfig.INTRODUCTION,
    iconComponent: <FormatQuoteSharpIcon />,
  },
  {
    title: "單選",
    questionType: questionConfig.ONE_CHOICE,
    iconComponent: <AdjustSharpIcon />,
  },
  {
    title: "多選",
    questionType: questionConfig.MULTIPLE_CHOICE,
    iconComponent: <FormatListNumberedSharpIcon />,
  },
  {
    title: "矩陣",
    questionType: questionConfig.MARTIX,
    iconComponent: <FormatQuoteSharpIcon />,
  },
  {
    title: "數值",
    questionType: questionConfig.NUMBER,
    iconComponent: <LooksOneSharpIcon />,
  },
  {
    title: "滑桿",
    questionType: questionConfig.SLIDER,
    iconComponent: <TuneSharpIcon />,
  },
  {
    title: "排序",
    questionType: questionConfig.SORT,
    iconComponent: <LayersSharpIcon />,
  },
  {
    title: "日期",
    questionType: questionConfig.DATE,
    iconComponent: <QueryBuilderSharpIcon />,
  },
];

const generateLimitation = (question: Question) => {
  switch (question.type) {
    case "0": {
      return <TextLimitation id={question.id} />;
    }

    case "1": {
      return <TextLimitation id={question.id} />;
    }

    case "2": {
      return <TextLimitation id={question.id} />;
    }

    case "3": {
      return <ChoiceLimitation id={question.id} />;
    }
    case "4": {
      return <ChoiceLimitation id={question.id} />;
    }
    case "5": {
      return <ChoiceLimitation id={question.id} />;
    }
    case "6": {
      return (
        <NumberLimitation id={question.id} validations={question.validations} />
      );
    }
    case "7": {
      return (
        <NumberLimitation id={question.id} validations={question.validations} />
      );
    }
    case "8": {
      return <ChoiceLimitation id={question.id} />;
    }
    case "9": {
      return <DateLimitation id={question.id} />;
    }
    default: {
      return <></>;
    }
  }
};
interface OptionItem {
  title: string;
  questionType: string;
  iconComponent: JSX.Element;
}

const QuestionOptions: FC = () => {
  const editingQuestion = useAppSelector(
    (state) => state.question.editingQuestion
  );

  return (
    <OptionsLayout>
      <OptionHeading>題型</OptionHeading>
      <OptionList>
        {questionList.map((item) => (
          <OptionItem
            title={item.title}
            page={1}
            questionType={item.questionType}
            key={item.title}
          >
            {item.iconComponent}
          </OptionItem>
        ))}
      </OptionList>
      <OptionHeading>限制</OptionHeading>
      {editingQuestion && generateLimitation(editingQuestion)}
    </OptionsLayout>
  );
};

export default QuestionOptions;
