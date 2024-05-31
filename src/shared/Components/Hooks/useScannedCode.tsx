import { useEffect } from "react";
type DependencyList = ReadonlyArray<unknown>;
type EffectCallback = (code: number) => void;
export function useScannedCode(
  onCodeReceived: EffectCallback,
  deps?: DependencyList
) {
  useEffect(() => {
    let code = "";
    const listner = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        try {
          e.preventDefault();
          e.stopPropagation();
          onCodeReceived(parseInt(code));
          code = "";
        } catch (error) {}
        code = "";
      } else {
        code += e.key;
      }
    };
    document.addEventListener("keypress", listner);
    return () => {
      document.removeEventListener("keypress", listner);
    };
  }, [deps]);

  return null;
}
