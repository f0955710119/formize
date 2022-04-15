import { ChangeEvent } from "react";

export interface ChangeHandler {
  (event: ChangeEvent<HTMLInputElement>): void;
}
