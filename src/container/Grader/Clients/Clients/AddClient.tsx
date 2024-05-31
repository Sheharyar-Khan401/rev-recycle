import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClientForm from "components/Clients/Clients/ClientForm";
import { useAddClientMutation } from "redux/features/Clients/Clients/clientsApiSlice";
import { ClientRequest } from "redux/types/Clients/Clients/client";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { ClientsResolver } from "validators/graderValidator/Clients/clientsResolver";

const defaultValues: ClientRequest = {
  clientName: "",
  code: "",
  phoneNo: "",
  address: "",
  email: "",
  color: "#000000",
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
export default function AddClient() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientRequest, null>({
    defaultValues,
    resolver: ClientsResolver,
  });
  const [addClient, { isLoading: AddLoading }] = useAddClientMutation();

  const onSubmit = async (values: ClientRequest) => {
    const result = await addClient(values);
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
          title="Clients"
          mode={"ADD"}
          isLoading={AddLoading}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          <ClientForm mode={"ADD"} isEdit control={control} errors={errors} />
        </div>
      </div>
    </>
  );
}
