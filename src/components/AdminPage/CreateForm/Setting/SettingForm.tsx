import { FC } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import useSwitchCurrentStep from "../../../../hooks/useSwitchCurrentStep";

import styled from "styled-components";
import SectionNormal from "./SectionNormal";
import SectionBanner from "./SectionBanner";
import breakpointConfig from "../../../../configs/breakpointConfig";
import scrollBar from "../../../UI/scrollBar";
import sweetAlert from "../../../../utils/sweetAlert";

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 6rem);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 4rem auto 4rem auto;
  padding: 0 3.2rem 0 0;
  width: 70.8rem;
  height: calc(100% - 6rem);
  transform: translateX(1.5rem);

  overflow-y: scroll;
  ${scrollBar}

  @media ${breakpointConfig.tabletS} {
    padding: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media ${breakpointConfig.laptopS} {
    width: 90%;
    transform: translateX(0);
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;

  @media ${breakpointConfig.tabletS} {
    justify-content: center;
    flex-direction: column;
  }
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  padding: 1rem 3rem;
  width: 15rem;
  height: 4rem;
  background-color: #c8c8c8;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffc652;
  }

  @media ${breakpointConfig.tabletS} {
    width: 100%;
  }
`;

const BackToFormManagemenetButton = styled(ButtonWrapper)`
  @media ${breakpointConfig.tabletS} {
    order: 2;
  }
`;

const GoToQuestionDesignButton = styled(ButtonWrapper)`
  @media ${breakpointConfig.tabletS} {
    order: 1;
    margin-bottom: 1rem;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const SettingForm: FC = () => {
  const router = useRouter();
  const { title } = useAppSelector((state) => state.setting);
  const switchStepHandler = useSwitchCurrentStep();

  const backToAdminIndexPage = (): void => {
    sweetAlert.clickToConfirmAlert(
      {
        title: "FORMiZE小提醒",
        text: "現在回到首頁的話，\n會失去正在編輯的問卷資料，\n確定離開嗎?",
        cancelButtonText: "留在此頁",
        confirmButtonText: "確定離開",
      },
      () => {
        router.replace("/admin");
      }
    );
  };

  return (
    <Wrapper>
      <Form>
        <SectionNormal />
        <SectionBanner />
        <ButtonContainer>
          <BackToFormManagemenetButton
            type="button"
            onClick={() => backToAdminIndexPage()}
          >
            <ButtonText>回到管理頁面</ButtonText>
          </BackToFormManagemenetButton>
          <GoToQuestionDesignButton
            type="button"
            onClick={() => {
              if (title === "") {
                sweetAlert.errorReminderAlert("請一定要填寫問卷的標題！");
                return;
              }
              switchStepHandler(2);
            }}
          >
            <ButtonText>前往題目設計</ButtonText>
          </GoToQuestionDesignButton>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

export default SettingForm;
