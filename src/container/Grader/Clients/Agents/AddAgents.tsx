import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddAgentMutation } from "redux/features/Clients/Agents/agentsApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
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
export default function AddAgent() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientRequest, null>({
    defaultValues,
    resolver: ClientsResolver,
  });
  const [addAgent, { isLoading: AddLoading }] = useAddAgentMutation();

  const onSubmit = async (values: ClientRequest) => {
    const result = await addAgent(values);
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
          title="Agent"
          mode={"ADD"}
          isLoading={AddLoading}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          <AgentForm mode={"ADD"} isEdit control={control} errors={errors} />
        </div>
      </div>
    </>
  );
}
