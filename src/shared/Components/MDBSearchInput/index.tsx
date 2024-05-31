import { SearchIcon } from "helper/icons";
import styles from "shared/Components/MDBSearchInput/styles.module.css";
import { useEffect, useState } from "react";
interface Props {
  onSearch: (value: string) => void;
}
export default function MDBSearchInput({ onSearch }: Props) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, onSearch]);
  return (
    <div className={styles["search"]}>
      <div className="form-control">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
