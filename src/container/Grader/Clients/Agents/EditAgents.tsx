import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditAgentMutation,
  useLazyGetByIdAgentQuery,
} from "redux/features/Clients/Agents/agentsApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import Loader from "shared/Components/Loader/Loader";
import { ClientsResolver } from "validators/graderValidator/Clients/clientsResolver";
import AgentForm from "components/Clients/Clients/AgentForm";
import { ClientRequest } from "redux/types/Clients/Clients/client";

const defaultValues: ClientRequest = {
  clientName: "",
  code: "",
  phoneNo: "",
  address: "",
  email: "",
  color: "",
  payableAccountId: 0,
  businessCurrencyId: 0,
  active: false,
  isClient: false,
  isSupplier: false,
  isAgent: true,
};

export default function EditAgent() {
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
  const [editAgent, { isLoading: AddLoading }] = useEditAgentMutation();
  const [getByIdAgent, result] = useLazyGetByIdAgentQuery();

  useEffect(() => {
    const id = params.id;
    if (id) {
      getByIdAgent(id);
    }
  }, [params.id, getByIdAgent]);

  useEffect(() => {
    if (result.data) {
      reset({
        clientId: result?.data?.clientId ? result?.data?.clientId : 0,
        clientName: result?.data?.user? result?.data?.user?.fullName: "",
        code: result?.data?.code ?  result?.data?.code: "",
        address: result?.data?.user ? result?.data?.user?.address : "",
        phoneNo: result?.data?.user ? result?.data?.user?.phoneNo : "",
        email: result?.data?.user ?result?.data?.user?.email : "",
        color: result?.data?.color ? result?.data?.color : "",
        isAgent: true,
        payableAccountId:  result?.data?.payableAccount ? result?.data?.payableAccount?.accountId : 0,
        businessCurrencyId: result?.data?.businessCurrency?  result?.data?.businessCurrency?.businesscurrencyId  :0,
        active:  result?.data?.active ? result?.data?.active : false,
      });
    }
  }, [result, reset]);

  const onSubmit = async (values: ClientRequest) => {
    const result = await editAgent(values);
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
          title="Agents"
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
            <AgentForm
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
