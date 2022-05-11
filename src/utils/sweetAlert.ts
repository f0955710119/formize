import Swal from "sweetalert2";
import { ErrorAlert } from "../types/sweetAlert";

export default {
  errorAlert(alertObj: ErrorAlert) {
    Swal.fire({
      icon: "info",
      title: alertObj.title,
      showConfirmButton: false,
    });
  },
  closeAlert() {
    Swal.close();
  },
};
