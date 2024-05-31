import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditSupplierMutation,
  useLazyGetByIdSupplierQuery,
} from "redux/features/Clients/Suppliers/suppliersApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import Loader from "shared/Components/Loader/Loader";
import SupplierForm from "components/Clients/Clients/SupplierForm";
import { ClientsResolver } from "validators/graderValidator/Clients/clientsResolver";
import { ClientRequest } from "redux/types/Clients/Clients/client";

const defaultValues: ClientRequest = {
  clientName: "",
  code: "",
  phoneNo: "",
  address: "",
  email: "",
  color: "",
  gitAccountId: 0,
  payableAccountId: 0,
  accountId: 0,
  isClient: false,
  isSupplier: true,
  isAgent: false,
  active: false,
  otherAccountId: 0,
  recordFinanceSeparately: false,
  businessCurrencyId: 0,
};

export default function EditSupplier() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ClientRequest, null>({
    defaultValues,
    resolver: ClientsResolver,
  });

  const params = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editSupplier, { isLoading: AddLoading }] = useEditSupplierMutation();
  const [getByIdClient, result] = useLazyGetByIdSupplierQuery();

  useEffect(() => {
    const id = params.id;
    if (id) {
      getByIdClient(id);
    }
  }, [params.id, getByIdClient]);

  useEffect(() => {
    if (result.data) {
      reset({
        clientId: result?.data?.clientId ? result?.data?.clientId : 0,
        active: result?.data?.active ? result?.data?.active : false,
        businessCurrencyId: result?.data?.businessCurrency
          ? result?.data?.businessCurrency?.businesscurrencyId
          : 0,
        code: result?.data?.code ? result?.data?.code : "",
        address: result?.data?.user?.address ?? "",
        phoneNo: result?.data?.user?.phoneNo ?? "",
        email: result?.data?.user?.email ?? "",
        color: result?.data?.color ? result?.data?.color : "",
        payableAccountId: result?.data?.payableAccount
          ? result?.data?.payableAccount?.accountId
          : 0,
        gitAccountId: result?.data?.gitAccount
          ? result?.data?.gitAccount?.accountId
          : 0,
        clientName: result?.data?.user ? result?.data?.user?.fullName : "",
        otherAccountId: result?.data?.otherAccount
          ? result?.data?.otherAccount?.accountId
          : 0,
        recordFinanceSeparately: result?.data?.recordFinanceSeparately
          ? result?.data?.recordFinanceSeparately
          : false,
      });
    }
  }, [result, reset]);

  const onSubmit = async (values: ClientRequest) => {
    const result = await editSupplier(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  return (
    <>
      <div className="mt-3">
        <ActionBarAddEdit
          title="Suppliers"
          mode={"EDIT"}
          isLoading={AddLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          {result.isLoading ? (
            <div style={{ marginTop: "25vh" }}>
              <Loader />{" "}
            </div>
          ) : (
            <SupplierForm
              mode={"EDIT"}
              isEdit={isEdit}
              control={control}
              errors={errors}
            />
          )}
        </div>
      </div>
    </>
  );
}
