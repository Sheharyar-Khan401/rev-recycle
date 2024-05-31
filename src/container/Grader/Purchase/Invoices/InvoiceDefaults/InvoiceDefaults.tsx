import { useEffect, useState } from "react";
import InvoicesSideNav from "components/Purchase/InvoicesSideNav";
import SubmitBar from "shared/Components/SubmitBar";
import { useForm, Controller } from "react-hook-form";
import { InvoiceDefaultsData } from "redux/types/Invoices/InvoiceDefaultsData";
import { invoiceDefaultsResolver } from "validators/graderValidator/Purchase/InvoiceDefaultsResolver";
import { MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import FormValidationError from "shared/Components/FormValidationError";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { Location } from "redux/types/Settings/Purchase/location";
import { useGetPortsQuery } from "redux/features/Settings/purchase/portApiSlice";
import { Port } from "redux/types/Settings/Purchase/port";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
import { useGetRateOnQuery } from "redux/features/purchase/Order/RateOnApiSlice";
import { RateOn } from "redux/types/common/rateOn";
import { useGetShipViaQuery } from "redux/features/common/shipviaApiSlice";
import { ShipVia } from "redux/types/common/shipvia";
import {
  useAddDefaultInvoiceMutation,
  useGetDefaultInvoiceQuery,
} from "redux/features/purchase/Invoices/InvoicesApiSlice";
import Loader from "shared/Components/Loader/Loader";
const defaultValues: InvoiceDefaultsData = {
  invoiceDefaultId: 0,
  originLocationId: 0,
  destinationLocationId: 0,
  loadingPortId: 0,
  dischargePortId: 0,
  shipViaId: 0,
  stockRoomId: 0,
  rateOnId: 0,
  orderStatusId: 0,
  crossTradeInvoice: false,
};
export default function InvoiceDefaults() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InvoiceDefaultsData, null>({
    defaultValues,
    resolver: invoiceDefaultsResolver,
  });
  const [addInvoice, { isLoading: AddLoading }] =
    useAddDefaultInvoiceMutation();
  const { data: getInvoiceData, isLoading } = useGetDefaultInvoiceQuery(null);
  const { data: stockroomData } = useGetStockRoomsQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: portsData } = useGetPortsQuery(null);
  const { data: orderStatusData } = useGetOrderStatusQuery(null);
  const { data: rateOnData } = useGetRateOnQuery(null);
  const { data: shipviaData } = useGetShipViaQuery(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const StockroomDataList = (id: number) => {
    return stockroomData
      ? stockroomData?.map((item: StockroomsData) => {
          return {
            text: item.name ? item.name : "",
            value: item?.stockRoomId ? item?.stockRoomId : 0,
            defaultSelected: item?.stockRoomId === id,
          };
        })
      : [];
  };
  const LocationsDataList = (id: number) => {
    return locationsData
      ? locationsData?.map((item: Location) => {
          return {
            text: item.name ? item.name : "",
            value: item?.locationId ? item?.locationId : 0,
            defaultSelected: item?.locationId === id,
          };
        })
      : [];
  };
  const PortsDataList = (id: number) => {
    return portsData
      ? portsData?.map((item: Port) => {
          return {
            text: item.name ? item.name : "",
            value: item?.portId ? item?.portId : 0,
            defaultSelected: item?.portId === id,
          };
        })
      : [];
  };
  const orderStatusDataList = (id: number) => {
    return orderStatusData
      ? orderStatusData?.map((item: OrderStatus) => {
          return {
            text: item.name ? item.name : "",
            value: item?.orderStatusId ? item?.orderStatusId : 0,
            defaultSelected: item?.orderStatusId === id,
          };
        })
      : [];
  };
  const rateonDataList = (id: number | string) => {
    return rateOnData
      ? rateOnData?.map((item: RateOn) => {
          return {
            text: item.name ? item.name : "",
            value: item?.rateOnId ? item?.rateOnId : 0,
            defaultSelected: item?.rateOnId === id,
          };
        })
      : [];
  };
  const shipviaDataList = (id: number | string) => {
    return shipviaData
      ? shipviaData?.map((item: ShipVia) => {
          return {
            text: item.name ? item.name : "",
            value: item?.shipViaId ? item?.shipViaId : 0,
            defaultSelected: item?.shipViaId === id,
          };
        })
      : [];
  };
  const onSubmit = async (values: InvoiceDefaultsData) => {
    addInvoice(values);
  };
  useEffect(() => {
    if (getInvoiceData) {
      reset({
        crossTradeInvoice: getInvoiceData?.crossTradeInvoice
          ? getInvoiceData?.crossTradeInvoice
          : false,
        destinationLocationId: getInvoiceData?.destination
          ? getInvoiceData?.destination?.locationId
          : 0,
        dischargePortId: getInvoiceData?.dischargePort
          ? getInvoiceData?.dischargePort?.portId
          : 0,
        invoiceDefaultId: getInvoiceData?.invoiceDefaultId
          ? getInvoiceData?.invoiceDefaultId
          : 0,
        loadingPortId: getInvoiceData?.loadingPort
          ? getInvoiceData?.loadingPort?.portId
          : 0,
        orderStatusId: getInvoiceData?.orderStatus
          ? getInvoiceData?.orderStatus?.orderStatusId
          : 0,
        originLocationId: getInvoiceData?.origin
          ? getInvoiceData?.origin?.locationId
          : 0,
        rateOnId: getInvoiceData?.rateOn ? getInvoiceData?.rateOn?.rateOnId : 0,
        shipViaId: getInvoiceData?.shipVia
          ? getInvoiceData?.shipVia?.shipViaId
          : 0,
        stockRoomId: getInvoiceData?.stockRoom
          ? getInvoiceData?.stockRoom?.stockRoomId
          : 0,
      });
    }
  }, [getInvoiceData, reset]);
  return (
    <>
      <div className="d-lg-flex">
        <InvoicesSideNav type={1} />
        <div className="table-container">
          <div className="mt-3">
            <SubmitBar
              mode={"EDIT"}
              isLoading={AddLoading}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              onSubmit={handleSubmit(onSubmit)}
            />
          </div>
          {isLoading ? (
            <div style={{ margin: "5rem" }}>
              <Loader />
            </div>
          ) : (
            <div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="originLocationId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Origin*"
                      data={LocationsDataList(value)}
                      inputClassName={errors?.originLocationId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.originLocationId?.message}
                />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="destinationLocationId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Destination*"
                      data={LocationsDataList(value)}
                      inputClassName={
                        errors?.destinationLocationId && "is-invalid"
                      }
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.destinationLocationId?.message}
                />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="loadingPortId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Loading Port*"
                      data={PortsDataList(value)}
                      inputClassName={errors?.loadingPortId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.loadingPortId?.message}
                />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="dischargePortId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Port Discharge*"
                      data={PortsDataList(value)}
                      inputClassName={errors?.dischargePortId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.dischargePortId?.message}
                />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="orderStatusId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Status*"
                      data={orderStatusDataList(value)}
                      inputClassName={errors?.orderStatusId && "is-invalid"}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.orderStatusId?.message}
                />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="shipViaId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Ship Via*"
                      data={shipviaDataList(value)}
                      inputClassName={errors?.shipViaId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.shipViaId?.message} />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="stockRoomId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Stockroom*"
                      data={StockroomDataList(value)}
                      inputClassName={errors?.stockRoomId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.stockRoomId?.message}
                />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <Controller
                  control={control}
                  name="rateOnId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Rate On*"
                      data={rateonDataList(value ? value : 0)}
                      inputClassName={errors?.rateOnId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.rateOnId?.message} />
              </div>
              <div className="col-md-6 col-xl-5 col-11 mx-2 my-3">
                <span className="me-5 fw500">Cross Trade Invoice</span>
                <Controller
                  control={control}
                  name="crossTradeInvoice"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <MDBRadio
                        label="Yes"
                        inline
                        onChange={() => onChange(true)}
                        disabled={!isEdit}
                        checked={value === true}
                      />
                      <MDBRadio
                        label="No"
                        inline
                        onChange={() => onChange(false)}
                        checked={value === false}
                        disabled={!isEdit}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
