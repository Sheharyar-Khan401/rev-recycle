import { MDBIcon, MDBPopover, MDBPopoverBody } from "mdb-react-ui-kit";
import { MoreIcon } from "helper/icons";
import styles from "shared/Components/ActionButton/styles.module.css";
import React, { ReactNode, useState } from "react";
import ActionDialog from "../ActionDialog/ActionDialog";
interface Props {
  onNavigate?: () => void;
  onDeleteClick?: () => void;
  moreActions?: { title: string; onClick: () => void; icon: ReactNode }[];
}
export default function RoutingActionButton({
  onNavigate,
  onDeleteClick,
  moreActions,
}: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <MDBPopover
        btnClassName={styles["container"]}
        dismiss
        btnChildren={<MoreIcon />}
        placement="bottom"
      >
        <MDBPopoverBody className=" p-1 m-0">
          {onNavigate && (
            <button
              className={styles["btn"]}
              onClick={onNavigate}
              onFocus={onNavigate}
            >
              <MDBIcon far icon="eye" className="me-2" />
              View
            </button>
          )}
          {onDeleteClick && onNavigate && <hr className="my-1" />}
          {onDeleteClick && (
            <button
              className={styles["btn-delete"]}
              onClick={() => setIsDeleteDialogOpen(true)}
              onFocus={() => setIsDeleteDialogOpen(true)}
            >
              <MDBIcon far icon="trash-alt" className="me-2" />
              Delete
            </button>
          )}
          {moreActions?.map((action) => {
            return (
              <React.Fragment key={action.title}>
                <hr className="my-1" />
                <button
                  className={styles["btn"]}
                  onClick={action.onClick}
                  onFocus={action.onClick}
                >
                  {action.icon}
                  {action.title}
                </button>
              </React.Fragment>
            );
          })}
        </MDBPopoverBody>
      </MDBPopover>

      <ActionDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onOk={() => {
          if (onDeleteClick) {
            onDeleteClick();
            setTimeout(() => {
              setIsDeleteDialogOpen(false);
            }, 100);
          }
        }}
        title="Delete Alert"
        message={"Are you sure you want to delete this record?"}
      />
    </>
  );
}
