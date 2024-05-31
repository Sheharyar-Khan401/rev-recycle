import { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/hooks";
import { useLoginMutation } from "redux/features/auth/authApiSlice";
import { setCredentials } from "redux/features/auth/authSlice";
import { LoginResolver } from "validators/userResolver";
import FormValidationError from "shared/Components/FormValidationError";
import ButtonLoader from "shared/Components/ButtonLoader/ButtonLoader";
import MDBPassword from "shared/Components/MDBPassword/MDBPassword";
import { FacebookIcon, GoogleIcon, HomeIcon, LogoWhiteIcon } from "helper/icons";
import styles from "container/Signup/styles.module.css";
interface defaultValues {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const credentials = useAppSelector((state) => state.auth.credentials);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<defaultValues>({
    resolver: LoginResolver,
    defaultValues: { email: "", password: "" },
  });

  const [remember, setRemember] = useState<boolean>(false);
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: defaultValues) => {
    await login(values).unwrap();
    if (remember) {
      dispatch(setCredentials(values));
    } else {
      dispatch(setCredentials(null));
    }
  };

  useEffect(() => {
    if (credentials) {
      reset(credentials);
      setRemember(true);
    }
  }, [credentials, reset]);

  return (
    <>
      <div>
        <div className="row">
          <div className={styles["logo-container"]}>
            <div className={styles["img-container"]}>
              <LogoWhiteIcon/>
              <div>
                <h5 style={{ fontSize: "40px" }} className="white fw700 pt-5">
                  Recycling Meets Intelligence
                </h5>
                <small
                  style={{ fontSize: "15px" }}
                  className="white col-9 mb-0"
                >
                  "Complete ERP and Marketing Solution for the <br />{" "}
                  Recycling Industry".
                </small>
              </div>
              <HomeIcon className={styles["img_size"] + " mt-3"} />
            </div>
          </div>
          <div className={styles["login-container"]}>
            <div className="d-flex justify-content-center mx-5 my-4 align-items-center">
              <div className="d-flex justify-content-between align-items-center px-5">
                <div className={styles["form"]}>
                  <h3 className="black fw700 mt-5 text-center">Hello Again!</h3>
                  <p className="fw400 mb-4 text-center" style={{color: '#909090'}}>Please fill in the details to login.</p>
                  <form
                    className={styles["form_size"]}
                  >
                    <div className="pb-2" />
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, value } }) => (
                        <MDBInput
                          className={`${errors.email && "is-invalid"}`}
                          size={"lg"}
                          label="Email Address"
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
                      name="password"
                      render={({ field: { onChange, value } }) => (
                        <MDBPassword
                          className={`${errors.password && "is-invalid"}`}
                          label="Password"
                          size={"lg"}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <FormValidationError
                      errorMessage={errors.password?.message}
                    />

                    <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                      <div className="d-flex align-items-center">
                        <input
                          type={"checkbox"}
                          name="remember"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <small className="ms-2 gray">Remember me</small>
                      </div>
                      <small className=" blueColor"
                      style={{cursor: 'pointer'}}
                      onClick={() => navigate("/forgot")}
                      >Forgot password?</small>
                    </div>
                    <div className="d-flex flex-column align-items-center mt-4">
                      <MDBBtn
                        size={"lg"}
                        // type="submit"
                        className="col-12 my-2"
                        disabled={isLoading}
                        onClick={handleSubmit(onSubmit)}
                      >
                        {isLoading ? <ButtonLoader /> : "Login"}
                      </MDBBtn>
                      <p className={styles["hr-lines"]}>Or Login with</p>
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
                        type="button"
                        disabled
                      >
                        <GoogleIcon /> Login with Google
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
                        type="button"
                        disabled
                      >
                        <FacebookIcon /> Login with Facebook
                      </MDBBtn>
                      <div className="pb-2" />
                      <p className="mb-0 ms-4" style={{color: '#AEAEAE'}}>
                        Don’t have an account?{" "}
                        <span
                          className="cursor blueColor"
                          onClick={() => navigate("/signup")}
                        >
                          Signup
                        </span>{" "}
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
}
