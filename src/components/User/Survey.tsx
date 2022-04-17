import { FC } from "react";
import styled from "styled-components";
import styleConfig from "../../configs/styleConfig";
import type { UserSurvey } from "../../types/userSurvey";
import helper from "../../utils/helper";

type SurveyProps = UserSurvey;

interface MainProps {
  font: string;
}

const Main = styled.main<MainProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  font-family: ${(props: MainProps) =>
    helper.generateResponsedUserSurveyFontFamily(props.font)};

  background-image: url("/images/stacked-waves-haikei.svg");
`;

const SurveyContainer = styled.div`
  width: 96rem;
  height: 80%;
  padding: 4rem;
  background-color: #f90;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Survey: FC<SurveyProps> = ({
  responseDocId,
  questions,
  settings,
  styles,
}: SurveyProps) => {
  const indexArr = helper.generateQuestionIndexArr(questions);
  return (
    <Main font={styles.font}>
      <SurveyContainer>
        {questions.map((question, i) => {
          return (
            <div>
              <div>
                {helper.generateUserSurveyQuestionTitle(
                  indexArr[i],
                  question.title
                )}
              </div>
              <div>{question.note}</div>
            </div>
          );
        })}
      </SurveyContainer>
    </Main>
  );
};

export default Survey;

/*

1. 用 switch 來決定要產生的對應題型 (title / note 是固定)
2. 產生後要為各種題型加上它的限制，使他真的能變成它的題型限制
3. 先把各種資料拿掉就好，demo 完再實際發送
*/
