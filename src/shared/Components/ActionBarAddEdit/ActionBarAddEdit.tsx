import { MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { listOfVoucher } from "redux/types/Finance/PrimaryData/bankreceiptvoucher";
import CustomButton from "../CustomButton";
import { useEffect } from "react";

interface Props {
  children?: JSX.Element;
  mode: "ADD" | "EDIT" | "";
  title: string;
  isEdit?: boolean;
  setIsEdit?: (value: boolean) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  rowData?: listOfVoucher[];
}

export default function ActionBarAddEdit({
  children,
  title,
  mode,
  isEdit,
  setIsEdit,
  onSubmit,
  isLoading,
  rowData,
}: Props) {
  let navigate = useNavigate();

  useEffect(() => {
    const listner = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        try {
          e.preventDefault();
          e.stopPropagation();
          document.getElementById("RevSubmit")?.click();
        } catch (error) {
          console.log(error);
        }
      }
    };
    window.addEventListener("keydown", listner);
    return () => {
      window.removeEventListener("keydown", listner);
    };
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: "0.1rem",
        background: "#fff",
        margin: "1rem 0",
      }}
    >
      <div className="d-flex justify-content-between align-items-center my-2">
        <div
          className="d-flex align-items-center"
          onClick={() => {
            navigate(-1);
          }}
          role={"button"}
        >
          <div className="me-2">
            <MDBIcon color="primary" icon="angle-left" />
          </div>
          <div
            style={{
              alignSelf: "center",
              color: "#3b71ca",
              fontWeight: "lighter",
            }}
          >
            <h6 className="fw-bolder ms-1 mb-0">{"All " + title}</h6>
          </div>
        </div>
        <div className="d-flex ms-2">
          {!isEdit && children}
          {mode === "EDIT" ? (
            isEdit ? (
              <>
                <div className="d-flex">
                  <CustomButton
                    size="sm"
                    type="hollow"
                    className="mx-2 mb-2"
                    onClick={() => {
                      setIsEdit && setIsEdit(false);
                    }}
                    title="Cancel"
                  ></CustomButton>
                  <CustomButton
                    id="RevSubmit"
                    size="sm"
                    type="solid"
                    className={"mb-2 d-flex align-items-center"}
                    disabled={isLoading || rowData?.length === 0}
                    onClick={onSubmit}
                    title={isLoading ? "Saving..." : "Save"}
                  >
                    {isLoading && (
                      <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                      />
                    )}
                  </CustomButton>
                </div>
              </>
            ) : (
              mode === "EDIT" && (
                <CustomButton
                  size="sm"
                  type="solid"
                  className=" ms-2 mb-2"
                  onClick={() => setIsEdit && setIsEdit(true)}
                  title="Edit"
                />
              )
            )
          ) : (
            mode === "ADD" && (
              <CustomButton
                id="RevSubmit"
                size="sm"
                type="solid"
                className={"ms-2 mb-2 px-2 d-flex align-items-center"}
                disabled={isLoading || rowData?.length === 0}
                onClick={onSubmit}
                title={isLoading ? "Saving..." : "Save"}
              >
                {isLoading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
              </CustomButton>
            )
          )}
        </div>
      </div>
      <hr className="my-0" />
    </div>
  );
}
