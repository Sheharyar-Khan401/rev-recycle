import { ReactNode } from "react";
import styles from "./styles.module.css";

export default function CustomButton({
  size = "md",
  id,
  className,
  title,
  onClick,
  disabled = false,
  children,
  type,
  titleClass,
}: {
  id?: string;
  size?: "lg" | "sm" | "md";
  className?: string;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  type: "solid" | "hollow";
  titleClass?: string;
}) {
  return (
    <div>
      <button
        id={id}
        className={`${styles[`button-${type}`]} ${styles[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
        {title && (
          <span className={styles["button-content"] + " " + titleClass ?? ""}>
            {title}
          </span>
        )}
      </button>
    </div>
  );
}
