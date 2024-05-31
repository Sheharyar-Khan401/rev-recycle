import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { Client } from "redux/types/Clients/Clients/client";
import styles from "components/Sales/OrderTemplateForm/styles.module.css";
import {
  OrderTemplateItemsData,
  OrderTemplateRequest,
} from "redux/types/Sales/ordertemplate";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { Brand } from "redux/types/Settings/Productions/brand";
import { useGetAllBrandsQuery } from "redux/features/Settings/Productions/brandApiSlice";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { useEffect } from "react";

interface Props {
  rowData?: OrderTemplateItemsData[];
  isEdit: boolean;
  control: Control<OrderTemplateRequest>;
  columns?: column<"saleOrderTemplateItemId", OrderTemplateItemsData>[];
  errors: Partial<FieldErrorsImpl<OrderTemplateRequest>>;
  mode: string;
  setRowData: React.Dispatch<React.SetStateAction<OrderTemplateItemsData[]>>;
  watch?: UseFormWatch<OrderTemplateRequest>;
  setValue?: UseFormSetValue<OrderTemplateRequest>;
}
export default function OrderTemplateForm({
  mode,
  isEdit,
  columns,
  rowData,
  control,
  errors,
  setRowData,
  watch,
  setValue,
}: Props) {
  const { data: brandDataResponse = [] } = useGetAllBrandsQuery(null);
  const brandData = (id: number) => {
    return brandDataResponse.map((status: Brand) => {
      return {
        text: status?.name,
        value: status?.brandId,
        defaultSelected: status?.brandId === id,
      };
    });
  };

  const { data: clientDataResponse = [] } = useGetAllClientsQuery(null);
  const ClientData = (id: number) => {
    return clientDataResponse.map((status: Client) => {
      return {
        text: status.user?.fullName,
        value: status?.clientId,
        defaultSelected: status?.clientId === id,
      };
    });
  };

  useEffect(() => {
    if (
      watch?.("brandId") === 0 &&
      brandDataResponse &&
      brandDataResponse?.length > 0
    ) {
      setValue?.("brandId", brandDataResponse[0]?.brandId);
    }
    if (
      watch?.("clientId") === 0 &&
      clientDataResponse &&
      clientDataResponse?.length > 0
    ) {
      setValue?.("clientId", clientDataResponse[0]?.clientId);
    }
  }, [watch, setValue, brandDataResponse, clientDataResponse]);
  return (
    <div>
      <div className="my-3">
        {mode === "ADD" ? (
          <div>
            <div className="col-lg-4 col-md-6 col-11 my-3">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    className={`${errors.name && "is-invalid"}`}
                    label="Name*"
                    type="text"
                    disabled={!isEdit}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.name?.message} />
            </div>

            <div className="col-lg-4 col-md-6 col-11 my-3">
              <Controller
                control={control}
                name="brandId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    inputClassName={`${errors.brandId && "is-invalid"}`}
                    data={brandData(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    search
                    disabled={!isEdit}
                    label="Brand*"
                    preventFirstSelection
                  />
                )}
              />
              <FormValidationError errorMessage={errors.brandId?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-11 my-3">
              <Controller
                control={control}
                name="clientId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    inputClassName={`${errors.clientId && "is-invalid"}`}
                    data={ClientData(value)}
                    onValueChange={(data: SelectData | SelectData[]) => {
                      if (!Array.isArray(data)) {
                        onChange(data.value);
                      }
                    }}
                    search
                    disabled={!isEdit}
                    label="Client*"
                    preventFirstSelection
                  />
                )}
              />
              <FormValidationError errorMessage={errors.clientId?.message} />
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              <div className={styles["colsize"] + " my-2"}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.name && "is-invalid"}`}
                      label="Name*"
                      type="text"
                      disabled={!isEdit}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.name?.message} />
              </div>
              <div className={styles["colsize"] + " my-2"}>
                <Controller
                  control={control}
                  name="brandId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      inputClassName={`${errors.brandId && "is-invalid"}`}
                      data={brandData(value)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      preventFirstSelection
                      disabled={!isEdit}
                      label="Brand*"
                      value={value}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.brandId?.message} />
              </div>
              <div className={styles["colsize"] + " my-2"}>
                <Controller
                  control={control}
                  name="clientId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      inputClassName={`${errors.clientId && "is-invalid"}`}
                      data={ClientData(value)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      preventFirstSelection
                      disabled={!isEdit}
                      label="Client*"
                      value={value}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.clientId?.message} />
              </div>
            </div>
          </div>
        )}
      </div>
      {mode === "EDIT" && (
        <>
            <EditableDataTable
              identifier="saleOrderTemplateItemId"
              addText="Add Item"
              columns={columns ? columns : []}
              showSerialNumbers
              rows={rowData ? rowData : []}
              setRows={setRowData}
              isLoading={false}
              defaultEditable={isEdit}
            />
        </>
      )}
    </div>
  );
}
