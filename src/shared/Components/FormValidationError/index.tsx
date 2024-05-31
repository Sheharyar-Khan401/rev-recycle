import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
  errorMessage: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
}
export default function FormValidationError({ errorMessage }: Props) {
  return (
    <>
      {errorMessage ? (
        <div
          style={{
            fontSize: "smaller",
            color: "red",
          }}
        >
          {errorMessage?.toString()}
        </div>
      ) : null}
    </>
  );
}
