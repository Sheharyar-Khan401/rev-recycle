import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { basicGPResolver } from "validators/graderValidator/Sales/gatePassResolver";
import {
  BasicSaleGP,
  BasicSaleGPEditRequest,
  GatePassItemsCodes,
} from "redux/types/Sales/gatepasses";
import EditBasicGPForm from "components/Sales/GatePasses/EditBasicGPForm";
import EditItemsGPForm from "components/Sales/GatePasses/EditItemsGPForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCodeInGatePassMutation,
  useEditSalesGatePassesMutation,
  useLazyGetSalesGatePassesByIdQuery,
  useLazyGetsaleOrderItemsByIdQuery,
  useUpdateGPModifyStatusMutation,
} from "redux/features/sales/gatePassesApiSlice";
import { format, parse } from "date-fns";
import {
  SaleOrderItems,
  SaleOrderItemsResponse,
} from "redux/types/Orders/saleOrders";
import Loader from "shared/Components/Loader/Loader";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { GatePassItemsAgainstCode } from "redux/types/GatePasses/saleGatePass";
import { calculateWeights, getDateFromMillis } from "helper/utility";
import { globalVariables } from "helper/globalVariables";
import CustomButton from "shared/Components/CustomButton";

const basicDefaultValues: BasicSaleGP = {
  customerId: 0,
  invoiceTypeId: 0,
  date: "",
  arrivalTime: "",
  containerNo: "",
  referenceNumber: "",
  vehicleNo: "",
  weightUnitId: 0,
  kantaWeightUnitId: 0,
  remarks: "",
  departureTime: "",
  containerSerial: "",
  weightDifference: 0,
  kantaWeight: 0,
};
const ItemsValues: GatePassItemsCodes = {
  barcode: 0,
};
export default function EditGatePass() {
  const {
    handleSubmit: handleBasicSubmit,
    control: basicControl,
    setValue: setBasicValue,
    getValues,
    watch,
    formState: { errors: basicErrors },
  } = useForm({
    defaultValues: basicDefaultValues,
    resolver: basicGPResolver,
  });

  const {
    handleSubmit: handleItemsSubmit,
    control: itemsControl,
    watch: itemWatch,
    formState: { errors: itemsErrors },
  } = useForm({
    defaultValues: ItemsValues,
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [verticalActive, setVerticalActive] = useState("tab1");
  const [triggerSaleOrderItems, getSalesOrderItems] =
    useLazyGetsaleOrderItemsByIdQuery();
  const params = useParams();
  const [editCode, { isLoading: editCodes }] = useAddCodeInGatePassMutation();
  const [saleOrderId, setSaleOrderId] = useState<number>(0);
  // eslint-disable-next-line
  const [orderStatusId, setOrderStatusId] = useState<number>(0);
  const [salesItems, setSalesItems] = useState<SaleOrderItemsResponse[]>([]);
  const [saleInvoiceId, setSaleInvoiceId] = useState<number>(0);
  const navigate = useNavigate();
  const [displayRowData, setDisplayRowData] = useState<
    GatePassItemsAgainstCode[]
  >([]);
  const [rowData, setRowData] = useState<GatePassItemsAgainstCode[]>([]);
  const [getGatePassesById, result] = useLazyGetSalesGatePassesByIdQuery();
  const [editGatePasses, { isLoading: submitLoading }] =
    useEditSalesGatePassesMutation();
  const [updatePostStatus, { isLoading: PostLoading }] =
    useUpdateGPModifyStatusMutation();

  useEffect(() => {
    if (saleOrderId) {
      getSaleOrderItems()
    }
  }, [saleOrderId]);


  function getSaleOrderItems(){
    triggerSaleOrderItems({
      saleOrderId: saleOrderId,
    });
  }

  useEffect(() => {
    if (getSalesOrderItems.data) {
      const resultItems =
        getSalesOrderItems && getSalesOrderItems?.data?.payLoad;
      const itemMap = new Map(); // Map to store items based on itemId

      if (resultItems) {
        
        resultItems.forEach((item: SaleOrderItems) => {
          const itemId = item?.item?.itemId;

          if (itemId && itemMap.has(itemId)) {
            
            const existingItem = itemMap.get(itemId);

            const weights = calculateWeights(
              item?.unitWeight,
              item?.weightUnit?.weightUnitId ?? 0
            );
    
            existingItem.weightKgs += weights[0];
            existingItem.weightLbs += weights[1];
            existingItem.unitPieces += 1;
            
          } else {
            itemMap.set(itemId, {
              saleOrderItemId: item?.saleOrderItemId,
              itemName: item?.item?.name,
              unitPieces: 1,
              weightKgs: item?.weightUnit?.weightUnitId
                ? calculateWeights(
                    item?.unitWeight,
                    item?.weightUnit?.weightUnitId ?? 0
                  )[0]
                : 0,
              weightLbs: item?.weightUnit?.weightUnitId
                ? calculateWeights(
                    item?.unitWeight,
                    item?.weightUnit?.weightUnitId ?? 0
                  )[1]
                : 0,
              uom: item?.item?.uom?.name,
              itemId: item?.item?.itemId,
              soUnits: item?.soUnits,
            });
          }
        });
      }

      const allScannedItems = Array.from(itemMap.values());
      setSalesItems(allScannedItems);
    }
  }, [getSalesOrderItems]);

  useEffect(() => {
    if (params?.id) getGatePassesById(+params?.id);
  }, [getGatePassesById, params.id]);
  useEffect(() => {
    if (result?.data) {
      setBasicValue(
        "customerId",
        result.data?.supplier?.clientId ? result.data?.supplier?.clientId : 0
      );
      setBasicValue(
        "date",
        result.data?.passingDate
          ? getDateFromMillis(result.data?.passingDate)
          : ""
      );
      setBasicValue(
        "containerNo",
        result?.data?.containerNo ? result?.data?.containerNo : ""
      );
      setBasicValue(
        "referenceNumber",
        result?.data?.referenceNumber ? result?.data?.referenceNumber : ""
      );
      setBasicValue(
        "weightDifference",
        result?.data?.weightDifference ? result?.data?.weightDifference : 0
      );
      setBasicValue(
        "vehicleNo",
        result?.data?.vehicleNo ? result?.data?.vehicleNo : ""
      );
      setBasicValue(
        "arrivalTime",
        result?.data?.arrivalTime
          ? format(result?.data?.arrivalTime, "hh:mm a")
          : ""
      );
      setBasicValue(
        "departureTime",
        result?.data?.departureTime
          ? format(result?.data?.departureTime, "hh:mm a")
          : ""
      );
      setBasicValue(
        "remarks",
        result?.data?.remarks ? result?.data?.remarks : ""
      );
      setBasicValue(
        "kantaWeight",
        result?.data?.kantaWeight ? result?.data?.kantaWeight : 0
      );
      setBasicValue(
        "containerSerial",
        result?.data?.containerSerial ? result?.data?.containerSerial : ""
      );
      setBasicValue(
        "invoiceTypeId",
        result?.data?.invoiceType ? result?.data?.invoiceType?.invoiceTypeId : 0
      );
      setBasicValue(
        "kantaWeightUnitId",
        result?.data?.kantaWeightUnit ? result?.data?.kantaWeightUnit?.weightUnitId : 0
      );
      setSaleOrderId(
        result?.data?.saleOrder?.saleOrderId
          ? result?.data?.saleOrder?.saleOrderId
          : 0
      );

      setOrderStatusId(
        result?.data?.orderStatus?.orderStatusId
          ? result?.data?.orderStatus?.orderStatusId
          : 0
      );
      setSaleInvoiceId(
        result?.data?.orderSaleInvoiceId ? result?.data?.orderSaleInvoiceId : 1
      );
    }
  }, [result.data, setBasicValue]);
  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };
  const onSubmitBasic = async (values: BasicSaleGP) => {
    const arrivalTime = values.arrivalTime
      ? parse(values.arrivalTime, "hh:mm aa", new Date())
      : "";
    const departureTime = values.departureTime
      ? parse(values.departureTime, "hh:mm aa", new Date())
      : "";
    const formattedArrivalTime = arrivalTime ? arrivalTime.toISOString() : "";
    const formattedDepartureTime = departureTime
      ? departureTime.toISOString()
      : "";
    const updatedData: BasicSaleGPEditRequest = {
      arrivalTime: formattedArrivalTime,
      containerNo: values?.containerNo,
      containerSerial: values?.containerSerial,
      customerId: values?.customerId,
      passingDate: values?.date,
      gatePassId: params?.id ? +params?.id : 0,
      departureTime: formattedDepartureTime,
      invoiceTypeId: values?.invoiceTypeId,
      referenceNumber: values?.referenceNumber,
      remarks: values?.remarks,
      orderSaleId: saleOrderId,
      kantaWeightUnitId: values.kantaWeightUnitId,
      vehicleNo: values?.vehicleNo,
      orderStatusId: values?.orderStatusId ? values?.orderStatusId : 0,
      saleInvoiceId: saleInvoiceId,
      weightUnitId: result?.data?.weightUnit ? result?.data?.weightUnit?.weightUnitId : 0,
      weightDifference: values?.weightDifference,
      kantaWeight: values?.kantaWeight,
    };
    const res = await editGatePasses(updatedData);

    if ("data" in res && res.data.status === "SUCCESS") {
      navigate("/grader/sales/gatepasses");
    }
  };
  const onSubmitItems = async (values: GatePassItemsCodes) => {
    const itemIdsToMatch = [
      ...new Set(displayRowData.map((item) => item.itemId)),
    ];

    // Filter rowData based on matching itemIds and extract unitCode
    const unitCodes = rowData
      .filter((item) => itemIdsToMatch.includes(item.itemId))
      .map((item) => item.unitCode);

    const GatePassItemsData = {
      gatePassId: params?.id ? +params?.id : 0,
      codes: unitCodes,
    };
    const res = await editCode(GatePassItemsData);

    if ("data" in res && res.data.status === "SUCCESS") {
      navigate("/grader/sales/gatepasses");
    }
  };
  const columns: column<"codeId", GatePassItemsAgainstCode>[] = [
    {
      label: "Code Id",
      field: "codeId",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "Item",
      field: "itemName",
      inputType: "text",
      sort: false,
      disabled: true,
    },

    {
      label: "Units",
      field: "units",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "SO Units",
      field: "soUnits",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "Weight(Kgs)",
      field: "weightKgs",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "Weight(Lbs)",
      field: "weightLbs",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "UOM",
      field: "unitOfMeasurement",
      inputType: "text",
      sort: false,
      disabled: true,
    },
  ];
  useEffect(() => {
    if (displayRowData?.length === 0) {
      setRowData([]);
    }
  }, [displayRowData]);

  return (
    <>
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
      {result?.isLoading ? (
        <Loader />
      ) : (
        <MDBTabsContent className="col-12">
          <MDBTabsPane open={verticalActive === "tab1"} className="col-12">
            <div>
              <ActionBarAddEdit
                title="Sale Basic GPs"
                mode={result?.data?.posted ? "" : "EDIT"}
                isLoading={submitLoading}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                onSubmit={handleBasicSubmit(onSubmitBasic)}
              >
                {!result?.data?.posted ? (
                  <CustomButton
                    size="sm"
                    type="hollow"
                    className="mb-2"
                    onClick={handleBasicSubmit(() => {
                      updatePostStatus({
                        gatepassId: params?.id,
                        posted: true,
                      });
                    })}
                    disabled={PostLoading}
                    title={PostLoading ? "Posting..." : "Post"}
                  />
                ) : result?.data?.invoice?.invoiceId ? (
                  <></>
                ) : (
                  <div>
                    <CustomButton
                      size="sm"
                      type="hollow"
                      className="mb-2 mx-2"
                      onClick={handleBasicSubmit(() =>
                        updatePostStatus({
                          gatepassId: params?.id,
                          posted: false,
                        })
                      )}
                      disabled={PostLoading}
                      title={PostLoading ? "Unposting..." : "Unpost"}
                    />
                    <CustomButton
                      size="sm"
                      type="hollow"
                      className="mb-2 mx-2"
                      onClick={() =>
                        navigate(`/grader/sales/invoices/add`, {
                          state: {
                            gatePassId: params.id,
                            date: getValues("date"),
                            customerId: getValues("customerId"),
                            invoiceTypeId: getValues("invoiceTypeId"),
                            containerNo: getValues("containerNo"),
                            referenceNumber: getValues("referenceNumber"),
                          },
                        })
                      }
                      title="Convert to Invoice"
                    />
                  </div>
                )}
              </ActionBarAddEdit>
            </div>
            <div>
              <EditBasicGPForm
                isEdit={isEdit}
                control={basicControl}
                errors={basicErrors}
                watch={watch}
                setValue={setBasicValue}
              />
            </div>
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab2"}>
            <div className="my-3">
              {!result?.data?.posted && (
                <ActionBarAddEdit
                  title="Items"
                  mode={""}
                  isLoading={editCodes}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  onSubmit={handleItemsSubmit(onSubmitItems)}
                />
              )}
              <EditItemsGPForm
                salesItems={salesItems ? salesItems : []}
                saleOrderId={saleOrderId}
                isEdit={true}
                control={itemsControl}
                errors={itemsErrors}
                watch={itemWatch}
                columns={columns}
                displayRowData={displayRowData}
                setDisplayRowData={setDisplayRowData}
                rowData={rowData}
                setRowData={setRowData}
                gatePassId={params?.id ? +params?.id : 0}
                getItems = {getSaleOrderItems}
                gpResponse={result.data}
                totalSalesOrderItems={getSalesOrderItems.data?.payLoad ? getSalesOrderItems.data.payLoad : []}
              />
            </div>
          </MDBTabsPane>
        </MDBTabsContent>
      )}
    </>
  );
}
