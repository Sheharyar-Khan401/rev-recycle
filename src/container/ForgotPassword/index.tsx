import * as yup from "yup";
import { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
} from "redux/features/auth/authApiSlice";
import FormValidationError from "shared/Components/FormValidationError";
import ButtonLoader from "shared/Components/ButtonLoader/ButtonLoader";
import MDBPassword from "shared/Components/MDBPassword/MDBPassword";
import { LeftArrowIcon } from "helper/icons";
import styles from "container/ForgotPassword/styles.module.css";
import Topbar from "shared/Components/Topbar/Topbar";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const [step, setStep] = useState(1);
  const [
    forgetPassword,
    { isLoading: forgetPasswordLoading, isSuccess: forgetPasswordSuccess },
  ] = useForgetPasswordMutation();
  const [
    resetPassword,
    { isLoading: resetPasswordLoading, isSuccess: resetPasswordSuccess },
  ] = useResetPasswordMutation();

  useEffect(() => {
    if (forgetPasswordSuccess) {
      setStep(2);
    }
  }, [forgetPasswordSuccess]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      setStep(4);
    }
  }, [resetPasswordSuccess]);

  const submitForgetPassword = () => {
    let emailSchema = yup.object().shape({
      email: yup.string().email().required("Email is required"),
    });
    emailSchema
      .validate({
        email,
      })
      .then(() => {
        forgetPassword({ email });
      })
      .catch((err: { name: string; errors: string[] }) => {
        setEmailError(err.errors[0]);
      });
  };
  const submitResetPassword = () => {
    let passwordSchema = yup.object().shape({
      password: yup.string().required("Please enter password"),
      password2: yup
        .string()
        .required("Please enter password again")
        .test({
          name: "max",
          exclusive: false,
          params: {},
          message: "Passwords must be same",
          test: function (value) {
            return value === this.parent.password;
          },
        }),
    });
    passwordSchema
      .validate(
        {
          password,
          password2,
        },
        { abortEarly: false }
      )
      .then((data) => {
        resetPassword({ newPassword: password, code });
      })
      .catch((err: yup.ValidationError) => {
        err.inner.forEach((err) => {
          if (err.path === "password") setPasswordError(err.message);
          if (err.path === "password2") setPassword2Error(err.message);
        });
      });
  };
  const submitCode = () => {
    let codeSchema = yup.object().shape({
      code: yup.string().required("Please enter the code"),
    });
    codeSchema
      .validate({
        code,
      })
      .then(() => {
        setStep(3);
      })
      .catch((err: { name: string; errors: string[] }) => {
        setCodeError(err.errors[0]);
      });
  };
  function BackToLogin() {
    return (
      <p
        role="button"
        className="d-flex align-items-center"
        onClick={() => navigate("/login")}
      >
        <LeftArrowIcon /> &nbsp;Back to login
      </p>
    );
  }
  return (
    <>
      <Topbar />
      {step === 1 ? (
        <div className="d-flex justify-content-center mt-5 align-items-center">
          <div className="d-flex justify-content-between align-items-center px-5 mt-5">
            <div className={styles["form"]}>
              <h3 className="black fw700 mt-5 text-center">Forgot Password?</h3>
              <p className="fw400 mb-4 text-center text-muted">
                No worries, we’ll send you reset instructions.
              </p>
              <div className={styles["form_size"]}>
                <div className="pb-2" />

                <MDBInput
                  className={`${emailError && "is-invalid"}`}
                  size={"lg"}
                  label="Email Address"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  value={email}
                />
                <FormValidationError errorMessage={emailError} />
                <div className="my-2" />
                <div className="d-flex flex-column align-items-center mt-4">
                  <MDBBtn
                    size={"lg"}
                    className=" blue col-12 my-2"
                    disabled={forgetPasswordLoading}
                    onClick={submitForgetPassword}
                  >
                    {forgetPasswordLoading ? <ButtonLoader /> : "Next"}
                  </MDBBtn>
                  <div className="pb-2" />
                  <BackToLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <div className="d-flex justify-content-center mt-5 align-items-center">
          <div className="d-flex justify-content-between align-items-center px-5 mt-5">
            <div className={styles["form"]}>
              <h3 className="black fw700 mt-5 text-center">Check your email</h3>
              <p className="fw400 mb-4 text-center text-muted">
                We've sent a code to <br /> {email}
              </p>
              <div className={styles["form_size"]}>
                <div className="pb-2" />
                <MDBInput
                  className={`${codeError && "is-invalid"}`}
                  size={"lg"}
                  label="Enter Code"
                  type="number"
                  onChange={(e) => {
                    setCode(e.target.value);
                    setCodeError("");
                  }}
                  value={code}
                />
                <FormValidationError errorMessage={codeError} />
                <p className="d-flex justify-content-center mb-0 mt-4 text-muted">
                  Didn't recieve the email?
                  <span
                    role={!forgetPasswordLoading ? "button" : ""}
                    className="cursor blueColor ms-1"
                    onClick={() => {
                      submitForgetPassword();
                    }}
                  >
                    {forgetPasswordLoading ? "Sending..." : "Click to resend"}
                  </span>
                </p>
                <div className="my-2" />
                <div className="d-flex flex-column align-items-center mt-4">
                  <MDBBtn
                    size={"lg"}
                    className=" blue col-12 my-2"
                    onClick={submitCode}
                  >
                    Next
                  </MDBBtn>
                  <div className="pb-2" />
                  <BackToLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className="d-flex justify-content-center mt-5 align-items-center">
          <div className="d-flex justify-content-between align-items-center px-5 mt-5">
            <div className={styles["form"]}>
              <h3 className="black fw700 mt-5 text-center">Set new password</h3>
              <p className="fw400 mb-4 text-center text-muted">
                Your new password must be different to <br /> previously used
                passwords
              </p>
              <div className={styles["form_size"]}>
                <div className="pb-2" />

                <MDBPassword
                  className={`${passwordError && "is-invalid"}`}
                  label="Password"
                  size="lg"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  value={password}
                />
                <FormValidationError errorMessage={passwordError} />
                <div className="my-2" />

                <MDBPassword
                  className={`${password2Error && "is-invalid"}`}
                  label="Confirm Password"
                  size="lg"
                  onChange={(e) => {
                    setPassword2(e.target.value);
                    setPassword2Error("");
                  }}
                  value={password2}
                />
                <FormValidationError errorMessage={password2Error} />
                <div className="my-2" />
                <div className="d-flex flex-column align-items-center mt-4">
                  <MDBBtn
                    size={"lg"}
                    className=" blue col-12 my-2"
                    disabled={resetPasswordLoading}
                    onClick={submitResetPassword}
                  >
                    {resetPasswordLoading ? <ButtonLoader /> : "Reset Password"}
                  </MDBBtn>
                  <div className="pb-2" />
                  <BackToLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5 align-items-center">
          <div className="d-flex justify-content-between align-items-center px-5 mt-5">
            <div className={styles["form"]}>
              <h3 className="black fw700 mt-5 text-center">Password reset</h3>
              <p className="fw400 mb-4 text-center text-muted">
                Your password has been successfully reset.
                <br />
                Click continue to login.
              </p>
              <form className={styles["form_size"]}>
                <div className="my-2" />
                <div className="d-flex flex-column align-items-center mt-4">
                  <MDBBtn
                    size={"lg"}
                    className=" blue col-12 my-2"
                    onClick={() => navigate("/login")}
                  >
                    Continue
                  </MDBBtn>
                  <div className="pb-2" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
