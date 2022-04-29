import { FC, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

import { DateRange, Calendar } from "react-date-range";
import { addDays } from "date-fns";
import type { Range } from "react-date-range";
import { zhTW } from "react-date-range/dist/locale";
import helper from "../../../utils/helper";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { userActions } from "../../../store/slice/userSlice";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";

const CalendarWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CustomedCalendar = styled(Calendar)`
  align-self: center;
`;

const CustomedRangeCalendar = styled(DateRange)`
  align-self: center;
`;

const CustomedDateTextInput = styled(TextField)`
  align-self: center;
  width: 40%;
  & div {
    margin-bottom: 3rem;
    font-size: 1.6rem;
  }
`;

interface DateProps {
  questionId: string;
  isMultipleDate?: boolean;
  hasRange?: boolean;
  startDate?: string;
  endDate?: string;
}

const Date: FC<DateProps> = ({
  questionId,
  isMultipleDate,
  hasRange,
  startDate,
  endDate,
}: DateProps) => {
  const dispatch = useAppDispatch();
  const questionIdIndexForMultipleDate = useGetQuestionIdIndex(
    `${questionId}_start`
  );
  const questionIdIndexForSignleDate = useGetQuestionIdIndex(`${questionId}_0`);

  const currentDate = helper.generateNewDate();
  const startDateObject = helper.generateNewDate(startDate);
  const endDateObject = helper.generateNewDate(endDate);
  const initRangeState: Range = {
    startDate: currentDate,
    endDate: currentDate,
    key: "selection",
  };

  const [timeRange, setTimeRange] = useState<Range[]>([initRangeState]);
  const [selectedTime, setSelectedTime] = useState<Date>();
  const [selectedOneDateText, setSelectedOneDateText] = useState<string>();
  const [startDateText, setStartDateText] = useState<string>();
  const [endDateText, setEndDateText] = useState<string>();

  const hasRangeValidation = hasRange ? true : false;
  const startInterval = helper.generateDateInterval(
    currentDate,
    startDateObject
  );
  const endInterval = helper.generateDateInterval(endDateObject, currentDate);
  return isMultipleDate ? (
    <CalendarWrapper>
      <CustomedDateTextInput
        type="text"
        variant="standard"
        value={startDateText}
        placeholder={`開始日期，如: ${helper.generateDate()}`}
      />
      <CustomedDateTextInput
        type="text"
        variant="standard"
        value={endDateText}
        placeholder={`結束日期，如: ${helper.generateDate(false)}`}
      />
      <CustomedRangeCalendar
        locale={zhTW}
        date={helper.generateNewDate()}
        editableDateInputs={true}
        onChange={(item) => {
          // BUG: 等待新創問卷加上限制的日期，就能帶入這個數值(範圍-1)，
          // const incomingStartDate = item.selection.startDate;
          // const incomingEndDate = item.selection.endDate;
          // if (incomingStartDate && incomingEndDate) {
          //   console.log(
          //     incomingEndDate.getTime() - incomingStartDate.getTime()
          //   );
          //   const maxRangeNumber = 1000 * 60 * 60 * 24 * 2(範圍-1);
          //   console.log(maxRangeNumber);
          //   const isInvalidSelectedDateRange =
          //     incomingEndDate.getTime() - incomingStartDate.getTime() >
          //     maxRangeNumber;

          //   if (isInvalidSelectedDateRange) {
          //     alert("不能選擇超過3天的範圍");
          //     return;
          //   }
          // }

          setTimeRange([item.selection]);
          if (item.selection.startDate) {
            const startDate = helper.generateDateFormatString(
              item.selection.startDate
            );
            setStartDateText(startDate);
            dispatch(
              userActions.updateFormAnswer({
                questionIdIndex: questionIdIndexForMultipleDate,
                input: startDate,
              })
            );
          }
          if (item.selection.endDate) {
            const endDate = helper.generateDateFormatString(
              item.selection.endDate
            );
            setEndDateText(endDate);
            dispatch(
              userActions.updateFormAnswer({
                questionIdIndex: questionIdIndexForMultipleDate + 1,
                input: endDate,
              })
            );
          }
        }}
        moveRangeOnFirstSelection={false}
        ranges={timeRange}
        minDate={
          hasRangeValidation ? addDays(currentDate, startInterval) : undefined
        }
        maxDate={
          hasRangeValidation ? addDays(currentDate, -endInterval) : undefined
        }
      />
    </CalendarWrapper>
  ) : (
    <CalendarWrapper>
      <CustomedDateTextInput
        type="text"
        variant="standard"
        placeholder={`如: ${helper.generateDate()}`}
        value={selectedOneDateText}
      />
      <CustomedCalendar
        onChange={(date: Date) => {
          const incomingDate = helper.generateDateFormatString(date);
          setSelectedOneDateText(incomingDate);
          setSelectedTime(date);

          dispatch(
            userActions.updateFormAnswer({
              questionIdIndex: questionIdIndexForSignleDate,
              input: incomingDate,
            })
          );
        }}
        date={selectedTime}
        locale={zhTW}
        minDate={
          hasRangeValidation ? addDays(currentDate, startInterval) : undefined
        }
        maxDate={
          hasRangeValidation ? addDays(currentDate, -endInterval) : undefined
        }
      />
    </CalendarWrapper>
  );
};

export default Date;
