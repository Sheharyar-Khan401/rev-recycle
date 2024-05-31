import { MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import styles from "shared/Components/MDBPassword/styles.module.css";
interface Props {
  className: string;
  label: string;
  size: string;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
}
export default function MDBPassword({
  className,
  label,
  size,
  value,
  onChange,
  disabled = false,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="position-relative">
      <MDBInput
        className={className + " relative"}
        label={label}
        size={size}
        value={value}
        onChange={onChange}
        type={`${showPassword ? "text" : "password"}`}
        disabled={disabled}
      />
      <div
        role={"button"}
        className={styles["password-field"]}
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        <div className={`${showPassword && "d-none"}`}>
          <i className={`fas fa-eye-slash`} style={{ color: "#A3A3A3" }}></i>
        </div>
        <div className={`${!showPassword && "d-none"}`}>
          <i className={`fas fa-eye`} style={{ color: "#A3A3A3" }}></i>
        </div>
      </div>
    </div>
  );
}
