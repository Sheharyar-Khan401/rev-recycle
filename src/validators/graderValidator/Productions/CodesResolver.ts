import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const CodesResolver = yupResolver(
  Yup.object().shape({
    codeDate: Yup.string()
      .required("Date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Inavlid Date Format"
      ),
    // pieces: Yup.number().required("").min(1, "Pieces are required").moreThan(0).integer(),
    tickets: Yup.number().required("").moreThan(0,"Ticket Must be greater than 0").integer().typeError("Ticket Must be Number"),
    unitWeight: Yup.number().required("").min(1, "Unit Weight is required").moreThan(0),
    labelTypeId: Yup.number().required("").min(1, "Label Type is required"),
    departmentId: Yup.number().required("").min(1, "Department is required"),
    gradeId: Yup.number().required("").min(1, "Grade is required"),
    itemId: Yup.number().required("").min(1, "Item is required"),
    floorId: Yup.number().required("").min(1, "Floor is required"),
    wunitId: Yup.number().required("").min(1, "W-Unit is required"),
  })
);
