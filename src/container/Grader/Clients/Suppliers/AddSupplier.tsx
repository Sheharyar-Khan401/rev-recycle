import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddSupplierMutation } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import SupplierForm from "components/Clients/Clients/SupplierForm";
import { ClientsResolver } from "validators/graderValidator/Clients/clientsResolver";
import { ClientRequest } from "redux/types/Clients/Clients/client";

const defaultValues: ClientRequest = {
  clientName: "",
  code: "",
  phoneNo: "",
  address: "",
  email: "",
  color: "#000000",
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
export default function AddSupplier() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientRequest, null>({
    defaultValues,
    resolver: ClientsResolver,
  });
  const [addSupplier, { isLoading: AddLoading }] = useAddSupplierMutation();

  const onSubmit = async (values: ClientRequest) => {
    const result = await addSupplier(values);
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
          mode={"ADD"}
          isLoading={AddLoading}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          <SupplierForm mode={"ADD"} isEdit control={control} errors={errors} />
        </div>
      </div>
    </>
  );
}
