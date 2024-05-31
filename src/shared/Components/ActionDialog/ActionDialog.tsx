import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBRow,
} from "mdb-react-ui-kit";
import { CrossIcon } from "helper/icons";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  message: string;
  title: string;
}
export default function ActionDialog({
  isOpen,
  onClose,
  onOk,
  message,
  title
}: Props) {
  return (
    <MDBModal
      tabIndex="-1"
      open={isOpen}
      setOpen={(show: boolean) => {
        if (!show && isOpen) onClose();
      }}
      appendToBody
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalBody className="p-0">
            <MDBRow className="mb-3">
              <div className="d-flex justify-content-between align-items-center col-11 mx-auto mt-3">
                <h6 className=" fw-bold mb-0">{title}</h6>
                <div onClick={onClose} role={"button"}>
                  {" "}
                  <CrossIcon />{" "}
                </div>
              </div>
              <div className=" ms-4 mt-3">
                <div className="fs-6 ">{message}</div>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn py-2 mt-4 text-capitalize col-5 mx-auto"
                    onClick={onClose}
                    style={{
                      border: "1px solid #4F4F4F",
                      borderRadius: "8px",
                      boxShadow: "none",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn py-2 mt-4 text-capitalize col-5 mx-auto"
                    onClick={onOk}
                    style={{
                      backgroundColor: "#D45E53",
                      color: "white",
                      boxShadow: "none",
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </MDBRow>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
