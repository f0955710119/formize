import { FC, Dispatch, SetStateAction, useState } from "react";
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
import { useAppSelector } from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & .rdrCalendarWrapper {
    border-radius: 7px;
    overflow: hidden;
    font-family: inherit;

    & * {
      font-family: inherit;
    }
  }

  & .rdrDayToday .rdrDayNumber span:after {
    background: ${(props) => props.theme.title};
  }

  & button {
    color: ${(props) => props.theme.title} !important;
    & .rdrSelected,
    & .rdrStartEdge,
    & .rdrEndEdge,
    & .rdrInRange {
      background-color: ${(props) => props.theme.title} !important;
    }
  }

  & .rdrDateDisplayItemActive {
    border: transparent;
  }

  & .rdrMonthAndYearWrapper {
    padding-top: 0;
  }

  & .rdrMonthAndYearWrapper,
  & .rdrDateDisplayWrapper,
  & .rdrMonthsVertical {
    background-color: ${(props) => `${props.theme.option}33`};
  }
`;

const CustomedCalendar = styled(Calendar)`
  align-self: center;
`;

const CustomedRangeCalendar = styled(DateRange)`
  align-self: center;
`;

interface DateProps {
  questionId: string;

  isMultipleDate?: boolean;
  hasRange?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  maxSelectedDateQuantity?: number | null;
}

const Date: FC<DateProps> = ({
  questionId,
  isMultipleDate,
  hasRange,
  startDate,
  endDate,
  maxSelectedDateQuantity,
}: DateProps) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const showInvalidHandler = useCheckAnswerValid(questionId);
  const questionIdIndexForMultipleDate = useGetQuestionIdIndex(
    `${questionId}_start`
  );
  const questionIdIndexForSignleDate = useGetQuestionIdIndex(`${questionId}_0`);

  const inputForMultipleDateStart = answers[questionIdIndexForMultipleDate]
    ? answers[questionIdIndexForMultipleDate].input
    : null;
  const inputForMultipleDateEnd = answers[questionIdIndexForMultipleDate + 1]
    ? answers[questionIdIndexForMultipleDate + 1].input
    : null;
  const inputForSingleDate = answers[questionIdIndexForSignleDate]
    ? answers[questionIdIndexForSignleDate].input
    : null;

  const currentDate = helper.generateNewDate();
  const startDateObject =
    startDate !== null ? helper.generateNewDate(startDate) : currentDate;
  const endDateObject =
    endDate !== null
      ? helper.generateNewDate(endDate)
      : addDays(startDateObject, 1);

  const initRangeState: Range = {
    startDate:
      inputForMultipleDateStart !== null
        ? helper.generateNewDate(inputForMultipleDateStart)
        : currentDate,
    endDate:
      inputForMultipleDateEnd !== null
        ? helper.generateNewDate(inputForMultipleDateEnd)
        : currentDate,
    key: "selection",
  };

  const [timeRange, setTimeRange] = useState<Range[]>([initRangeState]);
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    inputForSingleDate !== null
      ? helper.generateNewDate(inputForSingleDate)
      : currentDate
  );

  const hasRangeValidation = hasRange ? true : false;
  const startInterval = helper.generateDateInterval(
    currentDate,
    startDateObject
  );

  const endInterval = helper.generateDateInterval(endDateObject, currentDate);
  return isMultipleDate ? (
    <CalendarWrapper>
      <CustomedRangeCalendar
        locale={zhTW}
        date={helper.generateNewDate()}
        onChange={(item) => {
          setTimeRange([item.selection]);
          if (item.selection.startDate) {
            const startDate = helper.generateDateFormatString(
              item.selection.startDate
            );

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

            dispatch(
              userActions.updateFormAnswer({
                questionIdIndex: questionIdIndexForMultipleDate + 1,
                input: endDate,
              })
            );
          }

          const incomingStartDate = item.selection.startDate;
          const incomingEndDate = item.selection.endDate;
          if (incomingStartDate && incomingEndDate && maxSelectedDateQuantity) {
            const maxRangeNumber =
              1000 * 60 * 60 * 24 * (maxSelectedDateQuantity - 1);
            const isInvalidSelectedDateRange =
              incomingEndDate.getTime() - incomingStartDate.getTime() >
              maxRangeNumber;

            if (isInvalidSelectedDateRange) {
              showInvalidHandler(
                `不能選擇超過${maxSelectedDateQuantity}天的範圍`
              );
              return;
            }
            showInvalidHandler("");
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
      <CustomedCalendar
        onChange={(date: Date) => {
          const incomingDate = helper.generateDateFormatString(date);
          setSelectedDate(date);
          showInvalidHandler("");
          dispatch(
            userActions.updateFormAnswer({
              questionIdIndex: questionIdIndexForSignleDate,
              input: incomingDate,
            })
          );
        }}
        date={selectedDate}
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
