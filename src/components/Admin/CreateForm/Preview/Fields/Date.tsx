import { FC, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { DateRange, Calendar } from "react-date-range";
import { addDays } from "date-fns";
import type { Range } from "react-date-range";
import { zhTW } from "react-date-range/dist/locale";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useGetQuestion from "../../../../../hooks/useQuestion";
import helper from "../../../../../utils/helper";

const CustomTextField = styled(TextField)`
  color: ${(props) => props.theme.note};
  & div,
  & fieldset,
  & input {
    border: none;
  }

  border: 2px solid transparent;
  & .Mui-focused {
    transition: border 0.3s;
    border: 2px solid ${(props) => props.theme.title};
  }
`;

const CustomedCalendar = styled(Calendar)`
  align-self: center;
`;

const CustomedRangeCalendar = styled(DateRange)`
  align-self: center;
`;

const CustomedDateTextInput = styled(TextField)`
  align-self: center;
  width: 54%;
  margin-bottom: 2rem;
  & input {
    font-size: 1.4rem;
  }
`;

interface DateProps {
  id: string;
}

const Date: FC<DateProps> = ({ id }: DateProps) => {
  const question = useGetQuestion(id);

  const currentDate = helper.generateNewDate();
  const initRangeState: Range = {
    startDate: currentDate,
    endDate: addDays(currentDate, 7),
    key: "selection",
  };

  const hasRangeValidation = question?.validations.hasRange ? true : false;

  const [timeRange, setTimeRange] = useState<Range[]>([initRangeState]);

  const isMultipleDate = question ? question.validations.multipleDate : false;

  const startDate = question
    ? helper.generateNewDate(question.validations.startDate as string)
    : currentDate;
  const endDate = question
    ? helper.generateNewDate(question.validations.endDate as string)
    : new (Date as any)((Date as any).now() + 60 * 60 * 24 * 1000);

  const startInterval = helper.generateDateInterval(currentDate, startDate);
  const endInterval = helper.generateDateInterval(endDate, currentDate);

  return isMultipleDate ? (
    <>
      <CustomedDateTextInput
        type="text"
        variant="standard"
        placeholder={`開始日期，如: ${helper.generateDate()}`}
      />
      <CustomedDateTextInput
        type="text"
        variant="standard"
        placeholder={`結束日期，如: ${helper.generateDate(false)}`}
      />
      <CustomedRangeCalendar
        locale={zhTW}
        date={currentDate}
        editableDateInputs={true}
        onChange={(item) => setTimeRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={timeRange}
        minDate={
          hasRangeValidation ? addDays(currentDate, startInterval) : undefined
        }
        maxDate={
          hasRangeValidation ? addDays(currentDate, -endInterval) : undefined
        }
      />
    </>
  ) : (
    <>
      <CustomedDateTextInput
        type="text"
        variant="standard"
        placeholder={`如: ${helper.generateDate()}`}
      />
      <CustomedCalendar
        locale={zhTW}
        minDate={
          hasRangeValidation ? addDays(currentDate, startInterval) : undefined
        }
        maxDate={
          hasRangeValidation ? addDays(currentDate, -endInterval) : undefined
        }
      />
    </>
  );
};

export default Date;
