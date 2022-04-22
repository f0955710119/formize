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

interface Modal {
  children: ReactNode;
  submuitButtonText: string;
  setModal: Dispatch<boolean>;
  hasOpenModal: boolean;
  title?: string;
  undoButtonText?: string;
  submitHandler?: () => void;
}

const Modal: FC<Modal> = ({
  children,
  submuitButtonText,
  setModal,
  hasOpenModal,
  title,
  undoButtonText,
  submitHandler,
}: Modal) => {
  const closeHandler = () => setModal(false);
  return (
    <div>
      <Dialog open={hasOpenModal} onClose={closeHandler} fullWidth>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {undoButtonText && (
            <button onClick={submitHandler ? submitHandler : closeHandler}>
              {undoButtonText}
            </button>
          )}
          <button onClick={closeHandler}>{submuitButtonText}</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
