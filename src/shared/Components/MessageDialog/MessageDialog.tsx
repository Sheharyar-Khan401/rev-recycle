import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { store } from "redux/store";
import {
  setErrorMessage,
  setSuccessMessage,
} from "redux/features/common/commonSlice";
import { FailIcon, SuccessIcon } from "helper/icons";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  type: "success" | "failure";
  message: string;
}
export default function MessageDialog({ open, setOpen, message, type }: Props) {
  useEffect(() => {
    setTimeout(() => {
      store.dispatch(setSuccessMessage(""));
      store.dispatch(setErrorMessage(""));
    }, 2000);
  }, [message]);
  return (
    <>
      <MDBModal open={open} staticBackdrop setOpen={setOpen} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody>
              <div style={{ height: "8rem", margin: "4rem" }}>
                <div className="d-flex justify-content-center">
                  {type === "failure" ? (
                    <FailIcon />
                  ) : (
                    type === "success" && <SuccessIcon />
                  )}
                </div>
                <div className="text-center mt-3">{message}</div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
