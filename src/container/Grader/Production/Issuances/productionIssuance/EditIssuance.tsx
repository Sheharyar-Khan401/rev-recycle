import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import IssuanceForm from "components/Production/issunaceForm";
import {
  IssuanceItemsAgainstCodeDataTable,
  IssuanceItemsAgainstCodeEditableDataTable,
  dailyProductionItem,
  issuanceRequest,
} from "redux/types/Productions/issuance";
import { issuanceResolver } from "validators/graderValidator/Productions/issuanceResolver";
import DataTable from "shared/Components/DataTable";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import {
  useDeleteCodeOfItemMutation,
  useEditIssuanceMutation,
  useLazyGetIssuanceByIdQuery,
  useLazyGetIssuanceCodesOnItemIdQuery,
  useUpdateLbsOfCodeMutation,
} from "redux/features/productions/issuanceApiSlice";
import { useGetBeltsQuery } from "redux/features/Settings/Productions/beltsApiSlice";
import {
  calculateWeights,
  convertWghtToLbs,
  getDateFromMillis,
  roundValue,
} from "helper/utility";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import CustomButton from "shared/Components/CustomButton";
import { CrossIcon } from "helper/icons";
interface Props {
  issuanceTypeId: number;
}
const defaultValues: issuanceRequest = {
  issuanceDate: "",
  cartonId: 0,
  remarks: "",
  floorId: 0,
  somp: true,
  productionIssuanceId: 0,
};

export default function EditIssuance({ issuanceTypeId }: Props) {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<issuanceRequest, null>({
    defaultValues,
    resolver: issuanceResolver,
  });

  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [itemsData, setItemsData] = useState<
    IssuanceItemsAgainstCodeDataTable[]
  >([]);
  const [rowData, setRowData] = useState<
    IssuanceItemsAgainstCodeEditableDataTable[]
  >([]);
  const [displayRowData, setDisplayRowData] = useState<
    IssuanceItemsAgainstCodeEditableDataTable[]
  >([]);
  const [triggerIussuanceById, result] = useLazyGetIssuanceByIdQuery();
  const [editProductionIssuance, { isLoading: editProductionIssuanceLoading }] =
    useEditIssuanceMutation();
  const { data: floorsList } = useGetFloorsQuery(null);
  const { data: beltsList } = useGetBeltsQuery(null);
  const [selectedItem, setSelectedItem] =
    useState<IssuanceItemsAgainstCodeDataTable>();
  const [deleteCode] = useDeleteCodeOfItemMutation();
  const [updateWeightLbsId, setUpdateWeightLbsId] = useState<number>(0);
  const [manualLbsQuantity, setManualLbsQuantity] = useState<number>(0);
  const [basicModal, setBasicModal] = useState<boolean>(false);
  const [editLbs, { isLoading: editLoadingLbs }] = useUpdateLbsOfCodeMutation();

  useEffect(() => {
    if (params.id) {
      triggerIussuanceById(+params.id);
    }
  }, [params.id, triggerIussuanceById]);
  useEffect(() => {
    if (result.data) {
      setValue(
        "issuanceDate",
        result.data?.issuanceDate
          ? getDateFromMillis(result.data?.issuanceDate)
          : "-"
      );
      setValue("remarks", result?.data?.remarks ? result?.data?.remarks : "");
      setValue(
        "cartonId",
        result?.data?.carton?.cartonId ? result?.data?.carton?.cartonId : 0
      );
      const resultItems = result?.data?.items;
      let uniqueItems: IssuanceItemsAgainstCodeDataTable[] = [];

      if (resultItems) {
        resultItems.forEach((item: dailyProductionItem) => {
          const itemId = item?.code?.purchaseOrderItem
            ? item?.code?.purchaseOrderItem?.item?.itemId
            : item?.code?.item?.itemId;
          const beltId = item?.belt?.beltId;
          const floorId = item?.floor?.floorId;
          const foundItem = uniqueItems.find(
            (i) =>
              i.itemId === itemId &&
              i.beltId === beltId &&
              i.floorId === floorId
          );
          if (!foundItem) {
            uniqueItems = [
              ...uniqueItems,
              {
                itemId: item?.code?.purchaseOrderItem?.item?.itemId
                  ? item?.code?.purchaseOrderItem?.item?.itemId
                  : item?.code?.item
                  ? item?.code.item?.itemId
                  : 0,
                itemName: item?.code?.purchaseOrderItem?.item?.name
                  ? item?.code?.purchaseOrderItem?.item?.name
                  : item?.code?.item
                  ? item?.code?.item?.name
                  : "-",
                units: 1,
                productionIssuanceItemsId: item?.productionIssuanceItemsId,
                unitOfMeasurement: item?.code?.purchaseOrderItem?.item?.uom
                  ?.name
                  ? item?.code?.purchaseOrderItem?.item?.uom.name
                  : item?.code?.item && item?.code?.item?.uom?.name
                  ? item?.code?.item?.uom?.name
                  : "-",
                weightKgs:
                  item.code?.weightUnit?.weightUnitId && item.code.unitWeight
                    ? calculateWeights(
                        item.code.unitWeight,
                        item.code?.weightUnit?.weightUnitId
                      )[0]
                    : 0,
                weightLbs:
                  item.code?.weightUnit?.weightUnitId && item.code.unitWeight
                    ? calculateWeights(
                        item.code.unitWeight,
                        item.code?.weightUnit?.weightUnitId
                      )[1]
                    : 0,
                floorName: item?.floor?.name ?? "-",
                floorId: item?.floor?.floorId,
                beltName: item?.belt?.name ?? "-",
                beltId: item?.belt?.beltId,
              },
            ];
          } else {
            uniqueItems = [
              ...uniqueItems.map((i) => {
                if (
                  i.itemId === itemId &&
                  i.beltId === beltId &&
                  i.floorId === floorId
                ) {
                  i = {
                    ...i,
                    units: i.units + 1,
                    weightKgs:
                      item.code?.weightUnit?.weightUnitId &&
                      item.code.unitWeight
                        ? calculateWeights(
                            item.code.unitWeight,
                            item.code?.weightUnit?.weightUnitId
                          )[0]
                        : 0,
                    weightLbs:
                      item.code?.weightUnit?.weightUnitId &&
                      item.code.unitWeight
                        ? calculateWeights(
                            item.code.unitWeight,
                            item.code?.weightUnit?.weightUnitId
                          )[1]
                        : 0,
                  };
                }
                return i;
              }),
            ];
          }
        });
      }
      setItemsData(uniqueItems);
    }
  }, [result.data, setValue]);

  useEffect(() => {
    if (displayRowData.length === 0) {
      setRowData([]);
    } else setRowData(displayRowData);
  }, [displayRowData]);

  const onSubmit = async (values: issuanceRequest) => {
    const updatedRowData = rowData
      .map((rowItem) => {
        const matchingDisplayItem = displayRowData.find(
          (displayItem) =>
            displayItem?.itemId === rowItem?.itemId &&
            displayItem.beltId === rowItem.beltId &&
            displayItem.floorId === rowItem.floorId
        );

        if (matchingDisplayItem) {
          return {
            ...rowItem,
            floorId: matchingDisplayItem.floorId,
            beltId: matchingDisplayItem?.beltId,
          };
        }
      })
      .filter((item) => item !== undefined);

    const ProductionIssuanceData = {
      productionIssuanceId: params?.id ? +params?.id : 0,
      codes: updatedRowData.map((item) => item?.code),
      floorId: updatedRowData.map((item) => item?.floorId),
      beltId: updatedRowData.map((item) => item?.beltId),
      cartonId: values?.cartonId,
      issuanceDate: values?.issuanceDate,
      remarks: values?.remarks,
    };

    const res = await editProductionIssuance(ProductionIssuanceData);
    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };

  const columns: column<"codeId", IssuanceItemsAgainstCodeEditableDataTable>[] =
    [
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
      {
        label: "Floor",
        field: "floorId",
        inputType: "select",
        options: floorsList?.length
          ? floorsList.map((item) => {
              return {
                text: item?.name ? item?.name : "-",
                value: item?.floorId ? item?.floorId : 0,
              };
            })
          : [],
      },
      {
        label: "Belt",
        field: "beltId",
        inputType: "select",
        options: beltsList?.length
          ? beltsList.map((item) => {
              return {
                text: item?.name ?? "",
                value: item?.beltId ?? 0,
              };
            })
          : [],
      },
    ];
  const handleDelete = (id: number) => {
    if (id) {
      deleteCode(id);
    }
  };
  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <div>
        <ActionBarAddEdit
          title={`${
            issuanceTypeId === 1
              ? "Production"
              : issuanceTypeId === 2
              ? "Reproduction"
              : issuanceTypeId === 3
              ? "Wiper"
              : issuanceTypeId === 4 && "Mutility"
          } Issuances`}
          mode={"EDIT"}
          isLoading={editProductionIssuanceLoading}
          onSubmit={handleSubmit(onSubmit)}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        <IssuanceForm
          mode={"Edit"}
          isEdit={isEdit}
          control={control}
          errors={errors}
          columns={columns}
          rowData={rowData}
          setRowData={setRowData}
          displayRowData={displayRowData}
          setDisplayRowData={setDisplayRowData}
          issuanceGetByIdData={result?.data}
          watch={watch}
          setValue={setValue}
          floorsList={floorsList}
          beltsList={beltsList}
          issuanceTypeId={issuanceTypeId}
          IssuanceId={params?.id ? +params?.id : 0}
        />

        {result?.data?.items && result.data.items.length > 0 && (
          <div className="mt-4">
            <DataTable
              isLoading={result.isFetching}
              columns={[
                { label: "Item", field: "item" },
                { label: "UOM", field: "uom" },
                { label: "Units", field: "units" },
                { label: "Weight(KGS)", field: "weightKgs" },
                { label: "Weight(LBS)", field: "weightLbs" },
                { label: "Floor", field: "floorName" },
                { label: "Belt", field: "beltName" },
                { label: "Action", field: "action" },
              ]}
              rows={
                itemsData && itemsData?.length > 0
                  ? itemsData?.map(
                      (item: IssuanceItemsAgainstCodeDataTable) => {
                        return {
                          item: item?.itemName ? item?.itemName : "-",
                          uom: item?.unitOfMeasurement
                            ? item?.unitOfMeasurement
                            : "-",
                          units: item?.units ? item?.units : "-",
                          weightKgs: item?.weightKgs ? item?.weightKgs : 0,
                          weightLbs: item?.weightLbs ? item?.weightLbs : 0,
                          floorName: item?.floorName ? item?.floorName : "-",
                          beltName: item?.beltName ? item?.beltName : "-",
                          action: (
                            <CustomButton
                              type="solid"
                              size="sm"
                              disabled={
                                selectedItem?.productionIssuanceItemsId ==
                                  item?.productionIssuanceItemsId &&
                                selectedItem?.beltId == item.beltId &&
                                selectedItem?.floorId == item.floorId
                              }
                              onClick={() => {
                                setSelectedItem(item);
                              }}
                              title={
                                selectedItem?.productionIssuanceItemsId ==
                                  item?.productionIssuanceItemsId &&
                                selectedItem?.beltId == item.beltId &&
                                selectedItem?.floorId == item.floorId
                                  ? "Selected"
                                  : "Select"
                              }
                            />
                          ),
                        };
                      }
                    )
                  : []
              }
            />
          </div>
        )}
        {true && (
          <div className="mt-5">
            <div style={{ maxHeight: "13rem", overflowY: "auto" }}>
              <DataTable
                columns={[
                  { label: "Barcode", field: "barcode" },
                  { label: "KGS", field: "kgs" },
                  { label: "LBS", field: "lbs" },
                  { label: "Man(LBS)", field: "manLbs" },
                  { label: "Amount", field: "amount" },
                  { label: "Supplier", field: "supplier" },
                  { label: "Reference", field: "reference" },
                  { label: "Floor", field: "floor" },
                  { label: "Grade", field: "grade" },
                  { label: "Created On", field: "createdOn" },
                  { label: "Action", field: "action" },
                ]}
                rows={
                  result?.data?.items
                    ? result?.data?.items
                        .filter(
                          (i) =>
                            selectedItem?.itemId ==
                              (i?.code?.purchaseOrderItem
                                ? i?.code?.purchaseOrderItem?.item?.itemId
                                : i?.code?.item?.itemId) &&
                            selectedItem?.beltId == i?.belt?.beltId &&
                            selectedItem?.floorId == i?.floor?.floorId
                        )
                        .map((item) => {
                          return {
                            barcode: item?.code ? item?.code?.code : "-",
                            kgs:
                              item.code?.weightUnit?.weightUnitId &&
                              item.code.unitWeight
                                ? calculateWeights(
                                    item.code.unitWeight,
                                    item.code?.weightUnit?.weightUnitId
                                  )[0]
                                : 0,
                            lbs:
                              item.code?.weightUnit?.weightUnitId &&
                              item.code.unitWeight
                                ? calculateWeights(
                                    item.code.unitWeight,
                                    item.code?.weightUnit?.weightUnitId
                                  )[1]
                                : 0,
                            amount: roundValue(
                              item?.code?.purchaseOrderItem?.amount
                                ? item?.code?.purchaseOrderItem?.amount
                                : item?.code?.item
                                ? item?.code?.item?.amount
                                : 0
                            ),
                            floor: item?.floor ? item?.floor?.name : "-",
                            supplier: item?.code?.purchaseOrderItem
                              ?.purchaseOrder?.client?.user?.fullName
                              ? item?.code?.purchaseOrderItem?.purchaseOrder
                                  ?.client?.user?.fullName
                              : "-",

                            reference: item?.code?.purchaseOrderItem
                              ?.purchaseOrder?.referenceNumber
                              ? item?.code?.purchaseOrderItem?.purchaseOrder
                                  ?.referenceNumber
                              : "-",
                            manLbs: (
                              <>
                                <div
                                  onClick={() => {
                                    setManualLbsQuantity(
                                      item?.manualLBS ? item?.manualLBS : 0
                                    );

                                    setUpdateWeightLbsId(
                                      item?.productionIssuanceItemsId
                                        ? item?.productionIssuanceItemsId
                                        : 0
                                    );
                                    toggleShow();
                                  }}
                                  role="button"
                                  style={{ color: "#3B71CA" }}
                                >
                                  {item?.manualLBS ? item?.manualLBS : 0}
                                </div>
                              </>
                            ),
                            grade: "-",
                            createdOn: getDateFromMillis(+item?.createdOn),

                            action: (
                              <RoutingActionButton
                                onDeleteClick={() => {
                                  handleDelete(item?.productionIssuanceItemsId);
                                }}
                              />
                            ),
                          };
                        })
                    : []
                }
              />
            </div>
          </div>
        )}
      </div>
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="p-0 my-3">
              <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
                <h6 className=" fw-bold mb-0">Edit LBS Weight</h6>
                <div onClick={toggleShow} role={"button"}>
                  <CrossIcon />
                </div>
              </div>
              <hr />
              <div className="col-12 mx-auto my-2">
                <div className="px-4">
                  <MDBInput
                    value={manualLbsQuantity}
                    onChange={(e) => setManualLbsQuantity(+e.target.value)}
                  />
                </div>
                <hr />
                <div className="px-4 d-flex justify-content-between my-2">
                  <CustomButton
                    size="sm"
                    type="hollow"
                    onClick={toggleShow}
                    title="Close"
                  />

                  <CustomButton
                    size="sm"
                    type="solid"
                    onClick={async () => {
                      const res = await editLbs({
                        id: updateWeightLbsId,
                        quantity: manualLbsQuantity,
                      });
                      if ("data" in res && res.data.status === "SUCCESS") {
                        setTimeout(() => {
                          setBasicModal(false);
                        }, 2000);
                      }
                    }}
                    disabled={editLoadingLbs}
                    title={editLoadingLbs ? "Saving..." : "Save"}
                  />
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
