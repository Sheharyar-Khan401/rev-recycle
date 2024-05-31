import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const RoleResolver = yupResolver(
  Yup.object().shape({
    roleName: Yup.string().required("Role Name is required")
  })
);