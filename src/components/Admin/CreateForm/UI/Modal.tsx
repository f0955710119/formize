import { Dispatch, FC, ReactNode } from "react";
import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ModalWrapper = styled.div`
  width: 80vw;
`;

const CustomedDialog = styled(Dialog)`
  & .css-1yo45bz-MuiTypography-root-MuiDialogTitle-root {
    padding: 1rem;
  }
  & .MuiDialogTitle-root + .css-ypiqx9-MuiDialogContent-root {
    padding: 1rem;
  }
  & .css-tlc64q-MuiPaper-root-MuiDialog-paper {
    padding: 2rem;
  }
`;

const Button = styled.button`
  padding: 0.4rem 1rem;
  width: 10rem;
  height: 3rem;
  background-color: #aaa;
  color: #333;
  border-radius: 3px;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

interface Modal {
  children: ReactNode;
  submuitButtonText: string;
  setModal: Dispatch<boolean>;
  hasOpenModal: boolean;
  title?: string;
  undoButtonText?: string;
  submitHandler?: () => void;
  cancelHandler?: () => void;
}

const Modal: FC<Modal> = ({
  children,
  submuitButtonText,
  setModal,
  hasOpenModal,
  title,
  undoButtonText,
  submitHandler,
  cancelHandler,
}: Modal) => {
  const closeHandler = () => setModal(false);

  return (
    <CustomedDialog open={hasOpenModal} onClose={closeHandler} fullWidth>
      {title && <DialogTitle sx={{ fontSize: "2rem" }}>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {undoButtonText && (
          <Button
            type="button"
            onClick={cancelHandler ? cancelHandler : closeHandler}
          >
            {undoButtonText}
          </Button>
        )}
        <Button
          type="button"
          onClick={submitHandler ? submitHandler : closeHandler}
        >
          {submuitButtonText}
        </Button>
      </DialogActions>
    </CustomedDialog>
  );
};

export default Modal;
