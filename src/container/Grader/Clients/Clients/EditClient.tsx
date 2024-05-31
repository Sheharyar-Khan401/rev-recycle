import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ClientForm from "components/Clients/Clients/ClientForm";
import {
  useEditClientMutation,
  useLazyGetByIdClientQuery,
} from "redux/features/Clients/Clients/clientsApiSlice";
import { ClientRequest } from "redux/types/Clients/Clients/client";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import Loader from "shared/Components/Loader/Loader";
import { ClientsResolver } from "validators/graderValidator/Clients/clientsResolver";

const defaultValues: ClientRequest = {
  clientName: "",
  code: "",
  phoneNo: "",
  address: "",
  email: "",
  color: "",
  salesAccountId: 0,
  payableAccountId: 0,
  accountId: 0,
  isClient: true,
  isSupplier: false,
  isAgent: false,
  businessCurrencyId: 0,
  active: false,
  bankAccountId: 0,
};

export default function EditClient() {
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
  const [editClient, { isLoading: AddLoading }] = useEditClientMutation();
  const [getByIdClient, result] = useLazyGetByIdClientQuery();

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
        bankAccountId: result?.data?.bankAccount ? result?.data?.bankAccount?.bankAccountId : 0,
        businessCurrencyId: result?.data?.businessCurrency ? result?.data?.businessCurrency?.businesscurrencyId : 0,
        code: result?.data?.code ? result?.data?.code : "",
        address: result?.data?.user ? result?.data?.user?.address :  "",
        phoneNo: result?.data?.user ? result?.data?.user?.phoneNo : "",
        email: result?.data?.user ? result?.data?.user?.email : "",
        color: result?.data?.color ? result?.data?.color : "",
        payableAccountId:  result?.data?.payableAccount ? result?.data?.payableAccount?.accountId  : 0,
        salesAccountId: result?.data?.salesAccount ? result?.data?.salesAccount?.accountId   : 0,
        clientName: result?.data?.user ? result?.data?.user?.fullName : "",
      });
    }
  }, [result, reset]);

  const onSubmit = async (values: ClientRequest) => {
    const result = await editClient(values);
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
          title="Client"
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
            <ClientForm
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
