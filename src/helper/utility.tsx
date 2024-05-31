import { format, parse } from "date-fns";
import { store } from "redux/store";
import jwtDecode from "jwt-decode";
import ErrorSound from "assets/sounds/error.mp3";
import SuccessSound from "assets/sounds/success.mp3";
interface Token {
  branchId: number;
  sub: string;
  permissions: string[];
  businessId: number;
  branchIds: number[];
  exp: number;
  userId: number;
  iat: number;
  email: string;
  businessIds: number[];
}
export function getDateFromMillis(millis: number) {
  if (!millis || typeof millis != "number") return "-";
  return format(parse(millis.toString(), "T", new Date()), "yyyy-MM-dd");
}
export function getTimeFromMillis(millis: number) {
  if (!millis || typeof millis != "number") return "-";
  return format(parse(millis.toString(), "T", new Date()), "hh:mm a");
}
export function getTodayDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  numPagesToShow: number
) {
  let middle: number[] = [];
  let start: number[] = [];
  let end: number[] = [];

  if (currentPage > totalPages || currentPage < 1 || totalPages < 1)
    return { start, middle, end };
  for (
    let i = currentPage - numPagesToShow;
    i < currentPage + numPagesToShow + 1;
    i++
  ) {
    if (i > 0 && i <= totalPages) middle.push(i);
  }
  for (let i = 1; i < numPagesToShow; i++) {
    if (!middle.find((p) => p === i)) start.push(i);
  }
  for (let i = totalPages - numPagesToShow + 2; i < totalPages + 1; i++) {
    if (!middle.find((p) => p === i)) end.push(i);
  }
  return { start, middle, end };
}
export const hasSettingsPermissions = () => {
  return (
    hasPermission("set_um_101") ||
    hasPermission("set_um_102") ||
    hasPermission("set_um_103") ||
    hasPermission("set_um_100") ||
    hasPermission("set_rm_101") ||
    hasPermission("set_rm_102") ||
    hasPermission("set_rm_103") ||
    hasPermission("set_rm_100") ||
    hasPermission("set_fs_101") ||
    hasPermission("set_fs_102") ||
    hasPermission("set_fs_103") ||
    hasPermission("set_fs_100") ||
    hasPermission("set_ps_101") ||
    hasPermission("set_ps_102") ||
    hasPermission("set_ps_103") ||
    hasPermission("set_ps_100") ||
    hasPermission("set_pro_101") ||
    hasPermission("set_pro_102") ||
    hasPermission("set_pro_103") ||
    hasPermission("set_pro_100") ||
    hasPermission("set_as_101") ||
    hasPermission("set_as_102") ||
    hasPermission("set_as_103") ||
    hasPermission("set_as_100")
  );
};
export const hasClientsPermissions = () => {
  return (
    hasPermission("cli_cl_100") ||
    hasPermission("cli_cl_101") ||
    hasPermission("cli_cl_102") ||
    hasPermission("cli_cl_103") ||
    hasPermission("cli_ag_100") ||
    hasPermission("cli_ag_101") ||
    hasPermission("cli_ag_102") ||
    hasPermission("cli_ag_103")
  );
};

export const hasFinancePermissions = () => {
  return (
    hasPermission("fin_pd_100") ||
    hasPermission("fin_pd_101") ||
    hasPermission("fin_pd_102") ||
    hasPermission("fin_pd_103") ||
    hasPermission("fin_v_100") ||
    hasPermission("fin_v_101") ||
    hasPermission("fin_v_102") ||
    hasPermission("fin_v_103")
  );
};
export const hasSalePermissions = () => {
  return (
    hasPermission("sal_so_100") ||
    hasPermission("sal_so_101") ||
    hasPermission("sal_so_102") ||
    hasPermission("sal_so_103") ||
    hasPermission("sal_si_100") ||
    hasPermission("sal_si_101") ||
    hasPermission("sal_si_102") ||
    hasPermission("sal_si_103") ||
    hasPermission("sal_gp_100") ||
    hasPermission("sal_gp_101") ||
    hasPermission("sal_gp_102") ||
    hasPermission("sal_gp_103") ||
    hasPermission("sal_clr_100") ||
    hasPermission("sal_clr_101") ||
    hasPermission("sal_clr_102") ||
    hasPermission("sal_clr_103") ||
    hasPermission("sal_ot_100") ||
    hasPermission("sal_ot_101") ||
    hasPermission("sal_ot_102") ||
    hasPermission("sal_ot_103") ||
    hasPermission("sal_set_100") ||
    hasPermission("sal_set_101") ||
    hasPermission("sal_set_102") ||
    hasPermission("sal_set_103")
  );
};
export const hasPurchasePermissions = () => {
  return (
    hasPermission("pur_po_100") ||
    hasPermission("pur_po_101") ||
    hasPermission("pur_po_102") ||
    hasPermission("pur_po_103") ||
    hasPermission("pur_pi_100") ||
    hasPermission("pur_pi_101") ||
    hasPermission("pur_pi_102") ||
    hasPermission("pur_pi_103") ||
    hasPermission("pur_gp_100") ||
    hasPermission("pur_gp_101") ||
    hasPermission("pur_gp_102") ||
    hasPermission("pur_gp_103")
  );
};

export const hasProductionsPermissions = () => {
  return (
    hasPermission("pro_co_100") ||
    hasPermission("pro_co_101") ||
    hasPermission("pro_co_102") ||
    hasPermission("pro_co_103") ||
    hasPermission("pro_dp_100") ||
    hasPermission("pro_dp_101") ||
    hasPermission("pro_dp_102") ||
    hasPermission("pro_dp_103") ||
    hasPermission("pro_tsou_100") ||
    hasPermission("pro_tsou_101") ||
    hasPermission("pro_tsou_102") ||
    hasPermission("pro_tsou_103") ||
    hasPermission("pro_issu_100") ||
    hasPermission("pro_issu_101") ||
    hasPermission("pro_issu_102") ||
    hasPermission("pro_issu_103") ||
    hasPermission("pro_set_100") ||
    hasPermission("pro_set_101") ||
    hasPermission("pro_set_102") ||
    hasPermission("pro_set_103")
  );
};
export const hasPermission = (permission: string) => {
  try {
    const decodedToken = jwtDecode(store.getState().auth.token) as Token;

    return decodedToken.permissions.includes(permission);
  } catch (error) {
    return false;
  }
};
export const roundValue = (num: number, decimals = 2) => {
  let scaling = 10 ** decimals;
  return Math.round((num + Number.EPSILON) * scaling) / scaling;
};
export const convertWghtToLbs = (num: number) => {
  return roundValue(num * 2.20462);
};
export const convertWghtToKgs = (num: number) => {
  return roundValue(num / 2.20462);
};
export function calculateWeights(unitWeight: number, weightUnitId: number) {
  if (weightUnitId === 1) {
    return [unitWeight, convertWghtToLbs(unitWeight)];
  }
  if (weightUnitId === 2) {
    return [convertWghtToKgs(unitWeight), unitWeight];
  }
  return [0, 0];
}
export function playSound(type: "SUCCESS" | "ERROR") {
  const audio = new Audio(type == "SUCCESS" ? SuccessSound : ErrorSound);
  audio.play();
}
export function getYearsList() {
  const currentYear: number = new Date().getFullYear();
  const startYear: number = 2000;

  const yearsList: number[] = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );
  return yearsList;
}
