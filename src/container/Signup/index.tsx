import { MDBInput } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignupResolver } from "validators/userResolver";
import FormValidationError from "shared/Components/FormValidationError";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import styles from "container/Signup/styles.module.css";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "shared/Components/ButtonLoader/ButtonLoader";
import { useSignupMutation } from "redux/features/auth/authApiSlice";
import { FacebookIcon, GoogleIcon, LogoWhiteIcon } from "helper/icons";
import MDBPassword from "shared/Components/MDBPassword/MDBPassword";
import MDBPhoneInput from "shared/Components/MDBPhoneInput";
interface defaultValues {
  email: string;
  phone: string;
  password: string;
  confirmPwd: string;
}
const Signup = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<defaultValues>({ resolver: SignupResolver });
  const [terms, setTerms] = useState<boolean>(false);
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (values: defaultValues) => {
    await signup(values).unwrap();
    navigate("/login");
  };
  return (
    <>
      <div>
        <div className="row">
          <div className={styles["logo-container"]}>
            <div className={styles["img-container"]}>
              <LogoWhiteIcon />
              <div>
                <h5 style={{ fontSize: "40px" }} className="white fw700 pt-5">
                  Recycling Meets Intelligence
                </h5>
                <small
                  style={{ fontSize: "15px" }}
                  className="white col-9 mb-0"
                >
                  "Complete ERP and Marketing Solution for the <br /> Recycling
                  Industry".
                </small>
              </div>
              <HomeIcon className={styles["img_size"] + " mt-3"} />
            </div>
          </div>
          <div className={styles["login-container"]}>
            <div className="d-flex justify-content-center mx-5 align-items-center my-3">
              <div className="d-flex justify-content-between align-items-center px-5">
                <div className={styles["form"]}>
                  <h4 className="fw700 text-center black">
                    Setup your Account
                  </h4>
                  <p
                    className="fw400 mb-4 text-center"
                    style={{ color: "#909090" }}
                  >
                    Please fill in the details to Signup.
                  </p>
                  <form
                    className={styles["form_size"]}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="pb-2" />
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, value } }) => (
                        <MDBInput
                          className={`${errors.email && "is-invalid"}`}
                          label="Email"
                          size="lg"
                          type="email"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <FormValidationError errorMessage={errors.email?.message} />
                    <div className="my-2" />
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field: { onChange, value } }) => (
                        <MDBPhoneInput
                          value={value}
                          onChange={onChange}
                          valid={!errors.phone?.message}
                        />
                      )}
                    />
                    <FormValidationError errorMessage={errors.phone?.message} />
                    <div className="my-2" />

                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, value } }) => (
                        <MDBPassword
                          className={`${errors.password && "is-invalid"}`}
                          label="Password"
                          size="lg"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <FormValidationError
                      errorMessage={errors.password?.message}
                    />
                    <div className="my-2" />
                    <Controller
                      control={control}
                      name="confirmPwd"
                      render={({ field: { onChange, value } }) => (
                        <MDBPassword
                          className={`${errors.password && "is-invalid"}`}
                          label="Confirm Password"
                          size="lg"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <FormValidationError
                      errorMessage={errors.confirmPwd?.message}
                    />
                    <div className="my-2" />
                    <div className="d-flex">
                      <input
                        type={"checkbox"}
                        name="terms"
                        checked={terms}
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            setTerms(true);
                          } else {
                            setTerms(false);
                          }
                        }}
                      />
                      <small className="ms-2 my-2 gray">
                        By creating an account, I agree to our{" "}
                        <a
                          className="gray cursor"
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>Terms of use</u>
                        </a>{" "}
                        &{" "}
                        <a
                          className="gray cursor"
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>Privacy Policy</u>
                        </a>
                      </small>
                    </div>
                    <div className="my-2" />
                    <div className=" d-flex flex-column align-items-center">
                      <MDBBtn
                        size={"lg"}
                        className="col-12 my-2"
                        disabled={isLoading}
                      >
                        {isLoading ? <ButtonLoader /> : "Register"}
                      </MDBBtn>
                      <div>
                        <p className={styles["hr-lines"]}>Or Signup with</p>
                      </div>
                      <MDBBtn
                        size={"lg"}
                        outline
                        className=" col-12 my-1"
                        style={{
                          border: "1px solid #C7C7CC",
                          color: "#909090",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                        }}
                        disabled={true}
                      >
                        <GoogleIcon /> Signup with Google
                      </MDBBtn>
                      <MDBBtn
                        size={"lg"}
                        outline
                        className=" col-12 mt-1 mb-4"
                        style={{
                          border: "1px solid #C7C7CC",
                          color: "#909090",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          height: "45px",
                        }}
                        disabled={true}
                      >
                        <FacebookIcon /> Signup with Facebook
                      </MDBBtn>
                      <div className="pb-2" />
                      <p className="mb-0 ms-4" style={{ color: "#AEAEAE" }}>
                        Already have an account?{" "}
                        <span
                          className="cursor blueColor"
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </span>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
