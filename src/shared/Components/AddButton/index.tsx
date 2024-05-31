import styles from "./styles.module.css";
import { PlusIcon } from "helper/icons";

export default function AddButton({
  size = "md",
  title,
  onClick,
  disabled = false,
}: {
  size?: "lg" | "sm" | "md";
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  type: "solid" | "hollow";
}) {
  return (
    <div>
      <button
        title={title}
        className={`${styles[`button`]} ${styles[size]}`}
        onClick={onClick}
        disabled={disabled}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
