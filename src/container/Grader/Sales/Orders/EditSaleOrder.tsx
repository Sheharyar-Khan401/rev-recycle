import { useNavigate, useParams } from "react-router-dom";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SaleOrderForm from "components/Sales/SaleOrderForm/SaleOrderForm";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { saleOrderBasicResolver } from "validators/graderValidator/Sales/orderResolver";
import {
  SaleOrderRequest,
  SaleOrdersTableData,
} from "redux/types/Orders/saleOrders";
import {
  useEditSaleOrderMutation,
  useLazyConvertSaleOrderToGatePassQuery,
  useLazyGetByIdSaleOrderQuery,
} from "redux/features/sales/Orders/saleOrdersApiSlice";
import Loader from "shared/Components/Loader/Loader";
import {
  getDateFromMillis,
} from "helper/utility";
import CustomButton from "shared/Components/CustomButton";
import EditSaleOrderItems from "./EditSaleOrderItems";
const basicDefaultValues: SaleOrderRequest = {
  saleOrderId: 0,
  orderDate: "",
  description: "",
  eta: "",
  maxShipmentWeight: 0,
  maxweightUnitId: 0,
  weightDifference: 0,
  reference: "",
  showinDP: false,
  proPriority: 0,
  ps: 0,
  running: false,
  finalized: false,
  arrivalTo: "",
  arrivalFrom: "",
  quantity: 0,
  orderStatusId: 0,
  invoiceTypeId: 0,
  production: true,
  stockroomId: 0,
  brandId: 0,
  saleOrderTemplateId: 0,
  clientId: 0,
  businessCurrencyId: 0,
};
export default function EditSaleOrder() {
  const {
    handleSubmit: handleBasicSubmit,
    control: basicControl,
    setValue: setBasicValue,
    formState: { errors: basicErrors },
  } = useForm<SaleOrderRequest, null>({
    defaultValues: basicDefaultValues,
    resolver: saleOrderBasicResolver,
  });
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [verticalActive, setVerticalActive] = useState("tab1");
  const [editOrder, { isLoading: AddLoading }] = useEditSaleOrderMutation();
  const [apiData, setApiData] = useState<SaleOrdersTableData>();
  const [getOrderById, result] = useLazyGetByIdSaleOrderQuery();
  const [
    convertToGatePass,
    { isLoading: convertToGatePassLoading, data: convertedGatePass },
  ] = useLazyConvertSaleOrderToGatePassQuery();

  useEffect(() => {
    const id = params.id;
    if (id) {
      getOrderById(id);
    }
  }, [params.id, getOrderById]);

  useEffect(() => {
    if (result?.data) {
      const data = result?.data;
      setApiData(data);
      setBasicValue("saleOrderId", data?.saleOrderId ? data?.saleOrderId : 0);
      setBasicValue(
        "orderDate",
        data?.orderDate ? getDateFromMillis(data?.orderDate) : ""
      );
      setBasicValue("reference", data?.reference ? data?.reference : "");
      setBasicValue(
        "orderStatusId",
        data?.orderStatus ? data?.orderStatus?.orderStatusId : 0
      );
      setBasicValue(
        "clientId",
        data?.customer?.clientId ? data?.customer?.clientId : 0
      );
      setBasicValue(
        "invoiceTypeId",
        data?.invoiceType ? data?.invoiceType?.invoiceTypeId : 0
      );

      setBasicValue(
        "businessCurrencyId",
        data?.currency?.businesscurrencyId
          ? data?.currency?.businesscurrencyId
          : 0
      );

      setBasicValue(
        "production",
        data?.production ? data.production : false
      );
      setBasicValue(
        "stockroomId",
        data?.stockroom ? data?.stockroom?.stockRoomId : 0
      );
      setBasicValue("brandId", data?.brand ? data?.brand?.brandId : 0);
      setBasicValue("proPriority", data?.proPriority ? data?.proPriority : 0);
      setBasicValue("eta", data?.eta ? getDateFromMillis(data?.eta) : "");
      setBasicValue(
        "maxShipmentWeight",
        data?.maxShipmentWeight ? data?.maxShipmentWeight : 0
      );
      setBasicValue("finalized", data?.finalized ? data?.finalized : false);
      setBasicValue("showinDP", data?.showinDP ? data?.showinDP : false);
      setBasicValue("running", data?.running ? data?.running : false);
      setBasicValue("description", data?.description ? data?.description : "");
      setBasicValue(
        "saleOrderTemplateId",
        data?.saleOrderTemplate
          ? data?.saleOrderTemplate?.saleOrderTemplateId
          : 0
      );
      setBasicValue(
        "weightDifference",
        data?.weightDifference ? data?.weightDifference : 0
      );
      setBasicValue(
        "maxweightUnitId",
        data?.maxweightUnit ? data?.maxweightUnit?.weightUnitId : 0
      );
    }
  }, [result?.data, setBasicValue]);

  const onSubmit = async (values: SaleOrderRequest) => {
    const result = await editOrder(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };
  const handleConvertToGatePass = () => {
    const id = params.id;
    if (id) {
      convertToGatePass(+id);
    }
  };
  useEffect(() => {
    if (convertedGatePass?.gatePassId) {
      navigate("/grader/sales/gatepasses/edit/" + convertedGatePass.gatePassId);
    }
  }, [convertedGatePass, navigate]);

  return (
    <>
      <div className="">
        <MDBTabs>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab1")}
              active={verticalActive === "tab1"}
            >
              Basic
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab2")}
              active={verticalActive === "tab2"}
            >
              Items
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
        <div>
          {result?.isLoading ? (
            <div style={{ margin: "5rem" }}>
              <Loader />
            </div>
          ) : (
            <MDBTabsContent className="col-12">
              <MDBTabsPane open={verticalActive === "tab1"} className="col-12">
                <div>
                  <ActionBarAddEdit
                    title="Basic Sale Orders"
                    mode={!result?.data?.gatePassId ? "EDIT" : ""}
                    onSubmit={handleBasicSubmit(onSubmit)}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    isLoading={AddLoading}
                  >
                    {result?.data?.gatePassId ? (
                      <></>
                    ) : (
                      <CustomButton
                        size="sm"
                        type="hollow"
                        className="mb-2"
                        onClick={handleConvertToGatePass}
                        disabled={convertToGatePassLoading}
                        title={
                          convertToGatePassLoading
                            ? "Converting..."
                            : "Convert to Gate Pass"
                        }
                      />
                    )}
                  </ActionBarAddEdit>
                </div>
                <div>
                  <SaleOrderForm
                    mode="EDIT"
                    apiData={apiData}
                    control={basicControl}
                    errors={basicErrors}
                    isEdit={isEdit}
                    setValue={setBasicValue}
                  />
                </div>
              </MDBTabsPane>
              <MDBTabsPane open={verticalActive === "tab2"}>
                <EditSaleOrderItems
                  saleOrderId={result.data?.saleOrderId ?? 0}
                  gatePassId={result?.data?.gatePassId ?? 0}
                />
              </MDBTabsPane>
            </MDBTabsContent>
          )}
        </div>
      </div>
    </>
  );
}
