import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBRow,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { CrossIcon } from "helper/icons";
import CustomButton from "../CustomButton";
interface Props {
  isImportModalOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  handleFileChange: (file: File) => void;
  isLoading?: boolean;
  errorMsg?: string[];
}
export default function ImportDialog({
  isImportModalOpen,
  onClose,
  onSubmit,
  title,
  handleFileChange,
  isLoading,
  errorMsg,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <MDBModal
      tabIndex="-1"
      open={isImportModalOpen}
      setOpen={(show: boolean) => {
        if (!show && isImportModalOpen) onClose();
      }}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalBody style={{ padding: "0rem" }}>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center px-4 pt-3">
                <h6 className="fw-bold mb-0">{title}</h6>
                <div onClick={onClose} role={"button"}>
                  <CrossIcon />
                </div>
              </div>
              <hr />
              <div className="mt-3 px-4">
                <div className="note note-warning my-3 small">
                  {"Please use Rev Recycle provided excel format"}
                </div>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleChange}
                />

                {errorMsg && errorMsg?.length > 0 && (
                  <div className="overflow-auto" style={{ maxHeight: "10rem" }}>
                    {errorMsg.map((res, index) => {
                      return (
                        <div key={index} className="text-danger small mt-2">
                          {res}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <hr />
              <div className="d-flex justify-content-between col-12 px-4">
                <CustomButton
                  size="sm"
                  type="hollow"
                  onClick={onClose}
                  title="Close"
                  className="py-2 w-50 text-capitalize"
                />
                <CustomButton
                  size="sm"
                  type="solid"
                  // className="btn py-2 ms-3 text-capitalize w-50 mx-auto bg-primary text-white"
                  onClick={onSubmit}
                >
                  {isLoading ? (
                    <>
                      <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </CustomButton>
              </div>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
