import { MDBSpinner } from "mdb-react-ui-kit";
import styles from "shared/Components/SubmitBar/styles.module.css";
import CustomButton from "../CustomButton";

interface Props {
  mode: string;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  setIsDisabled?: (value: boolean) => void;
}

export default function SubmitBar({
  mode,
  isEdit,
  setIsEdit,
  onSubmit,
  isLoading,
  setIsDisabled,
}: Props) {
  return (
    <div className={styles["container"]}>
      <div>
        <div className="d-flex justify-content-end align-items-center my-2">
          <div className="ms-2">
            {mode === "EDIT" ? (
              isEdit ? (
                <>
                  <div className="d-flex">
                    <CustomButton
                      size="sm"
                      type="hollow"
                      className={"mx-2"}
                      onClick={() => {
                        setIsEdit(false);
                        setIsDisabled && setIsDisabled(false);
                      }}
                      title="Cancel"
                    />
                    <CustomButton
                      size="sm"
                      type="solid"
                      disabled={isLoading}
                      onClick={onSubmit}
                      title={isLoading ? "Saving..." : "Save"}
                    />
                    {isLoading && (
                      <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                      />
                    )}
                  </div>
                </>
              ) : (
                <CustomButton
                  size="sm"
                  type="solid"
                  onClick={() => {
                    setIsEdit(true);
                    setIsDisabled && setIsDisabled(true);
                  }}
                  title="Edit"
                />
              )
            ) : (
              mode === "ADD" && (
                <CustomButton
                  size="sm"
                  type="solid"
                  disabled={isLoading}
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
      </div>

      <hr className={styles["hr"]} />
    </div>
  );
}
