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
    <Dialog open={hasOpenModal} onClose={closeHandler} fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {undoButtonText && (
          <button type="button" onClick={closeHandler}>
            {undoButtonText}
          </button>
        )}
        <button
          type="button"
          onClick={submitHandler ? submitHandler : closeHandler}
        >
          {submuitButtonText}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
