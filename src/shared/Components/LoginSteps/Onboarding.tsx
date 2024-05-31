import { Controller, useForm } from "react-hook-form";
import { BusinessSetupResolver } from "validators/userResolver";
import FormValidationError from "shared/Components/FormValidationError/index";
import styles from "shared/Components/LoginSteps/LoginSteps.module.css";
import { MDBBtn, MDBInput, MDBSelect } from "mdb-react-ui-kit";
import {
  useGetBusinessTypesQuery,
  useAddBusinessTypesMutation,
} from "redux/features/common/businessApiSlice";
import { LogoIcon } from "helper/icons";
interface defaultValues {
  businessType: string;
  companyName: string;
  size: number;
}
export default function OnBoarding() {
  const { data: businessTypesList } = useGetBusinessTypesQuery(null);
  const [addBusiness, { isLoading: addBusinessLoading }] =
    useAddBusinessTypesMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<defaultValues>({ resolver: BusinessSetupResolver });
  const onSubmit = (values: defaultValues) => {
    addBusiness({
      businesstype: [+values.businessType],
      companyName: values.companyName,
      size: values.size,
    });
  };
  const businessList = (id: number) => {
    return (
      businessTypesList ? businessTypesList?.map((businessType) => {
        return {
          text: businessType?.name ? businessType?.name :"",
          value: businessType?.businessTypeId ?  businessType?.businessTypeId :0,
          defaultSelected: id === businessType?.businessTypeId,
        };
      }) : []
    );
  };

  return (
    <>
      <div>
        <div className="col-11 mx-auto my-5">
          <LogoIcon />
        </div>
        <div className="col-5 mx-auto">
          <form
            className={styles["shadow"] + " mt-3 p-3"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4 className="black fw-bold text-center pt-5">
              Setup Your Business
            </h4>
            <div className="col-8 mx-auto mt-5">
              <h6 style={{ color: "#333333", fontWeight: "bold" }}>
                Buisness Details
              </h6>
              <div className="mt-4">
                <Controller
                  control={control}
                  name="businessType"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Business Type"
                      size="lg"
                      inputClassName={errors.businessType && "is-invalid"}
                      data={businessList(+value)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.businessType?.message}
                />
              </div>
              <div className="my-4">
                <Controller
                  control={control}
                  name="companyName"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.companyName && "is-invalid"}`}
                      type={"text"}
                      size="lg"
                      label={"Company Name"}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.companyName?.message}
                />
              </div>
              <div className="my-4">
                <Controller
                  control={control}
                  name="size"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      size="lg"
                      className={`${errors.size && "is-invalid"}`}
                      type={"number"}
                      label={"Company Size"}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.size?.message} />
                <small className="gray ms-2 my-2">
                  <i>Enter an estimated numeric value </i>
                </small>
                <div className="mt-4">
                  <MDBBtn
                    type={"submit"}
                    size={"lg"}
                    className=" col-12 my-2"
                    disabled={addBusinessLoading}
                  >
                    Continue
                  </MDBBtn>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
