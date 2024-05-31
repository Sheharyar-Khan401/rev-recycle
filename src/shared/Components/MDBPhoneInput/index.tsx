import PhoneInput from "react-phone-input-2";
import styles from "shared/Components/MDBPhoneInput/styles.module.css";
interface Props {
  value: string | undefined;
  onChange: (...event: []) => void;
  valid?: boolean;
}
export default function MDBPhoneInput({
  value,
  onChange,
  valid = true,
}: Props) {
  return (
    <PhoneInput
      disableSearchIcon
      searchPlaceholder="Search"
      searchClass={styles["search-field"]}
      country={"us"}
      inputClass={styles["input-field" + (!valid ? "-invalid" : "")]}
      specialLabel={""}
      enableAreaCodes={true}
      enableSearch
      value={value}
      onChange={onChange}
    />
  );
}
