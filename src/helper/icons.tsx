import { ReactComponent as Converted } from "assets/icons/converted.svg";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import { ReactComponent as Upload } from "assets/icons/upload.svg";
import { ReactComponent as Active } from "assets/icons/active.svg";
import { ReactComponent as Inactive } from "assets/icons/inactive.svg";
import { ReactComponent as Edit } from "assets/icons/edit.svg";
import { ReactComponent as BlueTick } from "assets/icons/bluetick.svg";
import { ReactComponent as Cross } from "assets/icons/cross.svg";
import { ReactComponent as Delete } from "assets/icons/delete.svg";
import { ReactComponent as Filter } from "assets/icons/filter.svg";
import { ReactComponent as Add } from "assets/icons/add.svg";
import { ReactComponent as AmountIco } from "assets/icons/amountIcon.svg";
import { ReactComponent as ArrowD } from "assets/icons/arrowdown.svg";
import { ReactComponent as LeftArr } from "assets/icons/arrow-left.svg";
import { ReactComponent as RightArr } from "assets/icons/arrow-right.svg";
import { ReactComponent as Lbs } from "assets/icons/avgRateIcon.svg";
import { ReactComponent as Box } from "assets/icons/boxesIcon.svg";
import { ReactComponent as Export } from "assets/icons/export.svg";
import { ReactComponent as Fb } from "assets/icons/facebook.svg";
import { ReactComponent as Google } from "assets/icons/google.svg";
import { ReactComponent as Fail } from "assets/icons/failure.svg";
import { ReactComponent as Kg } from "assets/icons/kgIcon.svg";
import { ReactComponent as More } from "assets/icons/more.svg";
import { ReactComponent as Print } from "assets/icons/print.svg";
import { ReactComponent as Success } from "assets/icons/success.svg";
import { ReactComponent as Search } from "assets/icons/search.svg";
import { ReactComponent as Logo } from "assets/icons/logo-blue.svg";
import { ReactComponent as LogoWhite } from "assets/icons/logo-white.svg";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import { ReactComponent as Home } from "assets/icons/home.svg";
import { ReactComponent as Calendar } from "assets/icons/calendar.svg";
import { ReactComponent as Scale } from "assets/icons/scale.svg";
import { ReactComponent as Currency } from "assets/icons/currency.svg";

import { SVGProps } from "react";
interface Props {
  stroke?: string;
}
export function ConvertedIcon() {
  return <Converted />;
}
export function MoreIcon() {
  return <More />;
}
export function SearchIcon() {
  return <Search />;
}
export function SuccessIcon() {
  return <Success width={60} />;
}
export function PrintIcon({ stroke }: Props) {
  return <Print stroke={stroke} />;
}
export function KgIcon() {
  return <Kg />;
}
export function FailIcon() {
  return <Fail width={60} />;
}
export function FacebookIcon() {
  return <Fb className="me-1 ps-2" />;
}
export function GoogleIcon() {
  return <Google className="me-1" />;
}
export function LbsIcon() {
  return <Lbs />;
}
export function ExportIcon({ stroke }: Props) {
  return <Export stroke={stroke} />;
}
export function BoxIcon() {
  return <Box />;
}
export function LeftArrowIcon() {
  return <LeftArr />;
}
export function RightArrowIcon() {
  return <RightArr />;
}
export function ArrowDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return <ArrowD {...props} />;
}
export function AmountIcon() {
  return <AmountIco />;
}
export function AddIcon() {
  return <Add width={20} />;
}
export function FilterIcon() {
  return <Filter />;
}
export function CrossIcon() {
  return <Cross className="ms-2" />;
}
export function DeleteIcon() {
  return <Delete className="me-2" />;
}

export function BlueTickIcon() {
  return <BlueTick width={20} className="me-2" />;
}

export function EditIcon() {
  return <Edit className="ms-2" />;
}

export function ActiveIcon() {
  return <Active />;
}
export function InactiveIcon() {
  return <Inactive />;
}
export function PlusIcon() {
  return <Plus className=" cursor" />;
}

export function UploadIcon() {
  return <Upload width={20} className="me-2" />;
}
export function LogoIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return <Logo {...props} />;
}
export function LogoWhiteIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return <LogoWhite {...props} />;
}

export function LogoutIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return <Logout {...props} />;
}
export function HomeIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return <Home {...props} />;
}
export function CalendarIcon() {
  return <Calendar width={20} />;
}
export function ScaleIcon() {
  return <Scale width={20} />;
}
export function CurrencyIcon() {
  return <Currency width={20} />;
}
