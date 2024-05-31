import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate, useParams } from "react-router-dom";
import CodesForm from "components/Production/CodesForm";
import {
  useDeleteCodesMutation,
  useEditCodesMutation,
  useLazyGetCodesByIdQuery,
  useLazyGetItemsByCodeQuery,
} from "redux/features/productions/codesApiSlice";
import { CodeRequest, Codes } from "redux/types/Productions/codes";
import { CodesResolver } from "validators/graderValidator/Productions/CodesResolver";
import DataTable from "shared/Components/DataTable";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import Loader from "shared/Components/Loader/Loader";
import Barcodes from "shared/Components/PrintBarcodes/Barcodes";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
  calculateWeights,
} from "helper/utility";
import CustomButton from "shared/Components/CustomButton";
import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";

const defaultValues: CodeRequest = {
  codeId: 0,
  codeDate: "",
  tickets: 0,
  pieces: 1,
  description: "",
  unitWeight: 0,
  priQUnit: 0,
  labelTypeId: 0,
  departmentId: 0,
  gradeId: 0,
  itemId: 0,
  floorId: 0,
  isPrint: false,
  wunitId: 0,
  secUnitId: 0,
  isScanned: false,
  batch: 0,
};
export default function EditCode() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CodeRequest, null>({ defaultValues, resolver: CodesResolver });
  const [editCodes, { isLoading: submitLoading }] = useEditCodesMutation();
  const [deleteCodes] = useDeleteCodesMutation();
  const [getCodesByitem, result] = useLazyGetItemsByCodeQuery();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getCodes, codes] = useLazyGetCodesByIdQuery();
  const { isLoading: isClientsLoading, data: clientsList } =
    useGetAllClientsQuery(null);
  const [itemCodes, setItemCodes] = useState<Codes[]>([]);
  const [itemCodesToPrint, setItemCodesToPrint] = useState<Codes[]>([]);
  const [printFormat, setPrintFormat] = useState<number>(1);
  const [printClientName, setPrintClientName] = useState<string>("");

  useEffect(() => {
    if (params.id) getCodes(+params.id);
  }, [params.id, getCodes]);

  useEffect(() => {
    reset({
      codeId: codes.data?.codeId ? codes.data?.codeId : 0,
      codeDate: codes.data?.codeDate
        ? getDateFromMillis(codes.data?.codeDate)
        : "",
      tickets: codes.data?.tickets ? codes.data?.tickets : 0,
      pieces: codes.data?.pieces ? codes.data?.pieces : 0,
      description: codes.data?.description ? codes.data?.description : "",
      unitWeight: codes.data?.unitWeight ? codes.data?.unitWeight : 0,
      priQUnit: codes.data?.priUnit ? codes.data?.priUnit?.quantityUnitId : 0,
      labelTypeId: codes.data?.labeltype
        ? codes.data?.labeltype?.labelTypeId
        : 0,
      departmentId: codes.data?.department
        ? codes.data?.department?.departmentId
        : 0,
      gradeId: codes.data?.grade ? codes.data?.grade?.gradeId : 0,
      itemId: codes.data?.item ? codes.data?.item?.itemId : 0,
      floorId: codes.data?.floor ? codes.data?.floor?.floorId : 0,
      isPrint: codes.data?.isPrint ? codes.data?.isPrint : false,
      wunitId: codes.data?.weightUnit
        ? codes.data?.weightUnit?.weightUnitId
        : 0,
      secUnitId: codes.data?.unitSec ? codes.data?.unitSec?.quantityUnitId : 0,
      isScanned: codes?.data?.isScanned ? codes?.data?.isScanned : false,
      batch: codes?.data?.batch ? codes?.data?.batch : 0,
      clientId: codes?.data?.clientId ?? 0,
    });
  }, [codes.data, reset]);

  useEffect(() => {
    if (codes?.data) {
      getCodesByitem(codes?.data?.batch ? codes?.data?.batch : 0);
    }
  }, [codes?.data, watch("itemId")]);

  useEffect(() => {
    if (result.data) {
      setItemCodes(result?.data?.payLoad);
    }
  }, [result.data]);

  useEffect(() => {
    const clientId = watch("clientId");
    setPrintClientName(
      clientsList?.find((c) => c.clientId === clientId)?.user?.fullName ?? ""
    );
  }, [watch("clientId")]);

  const onSubmit = async (values: CodeRequest) => {
    const res = await editCodes(values);

    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };
  const handleDelete = (id: number) => {
    if (id) {
      deleteCodes(id);
    }
  };
  function formats(val: number) {
    return [
      { text: "Small bale", value: 3, defaultSelected: val === 3 },
      { text: "Big bale", value: 1, defaultSelected: val === 1 },
    ];
  }
  return (
    <>
      <div style={{ marginTop: "mt-3" }}>
        <ActionBarAddEdit
          title="Codes"
          mode={"EDIT"}
          isLoading={submitLoading}
          onSubmit={handleSubmit(onSubmit, (e) => {})}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        {codes?.isLoading ? (
          <div style={{ margin: "5rem" }}>
            <Loader />
          </div>
        ) : (
          <>
            <CodesForm
              mode={"ADD"}
              isEdit={isEdit}
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <div className="pb-4">
              <div className="d-flex justify-content-end my-2">
                <div className="row">
                  <div className="col-lg-4 col-md-5 col-12">
                    <MDBInput
                      size="sm"
                      label="Client Name"
                      value={printClientName}
                      onChange={(e) => {
                        setPrintClientName(e.target.value);
                      }}
                      disabled={printFormat !== 3}
                    />
                  </div>
                  <div className="col-lg-4 col-md-5 col-12">
                    <MDBSelect
                      size="sm"
                      label="Bale type"
                      data={formats(printFormat)}
                      onValueChange={(data) => {
                        if ("value" in data && data.value) {
                          setPrintFormat(+data.value);
                        }
                      }}
                    />
                  </div>
                  <div className="col-lg-4 col-md-2 col-12">
                    <CustomButton
                      size="sm"
                      type="hollow"
                      onClick={() => {
                        result?.data
                          ? setItemCodesToPrint(result?.data?.payLoad)
                          : setItemCodesToPrint([]);
                      }}
                      title="Print"
                    />
                  </div>
                </div>
              </div>
              <DataTable
                isLoading={result?.isFetching}
                fixLastColumn={true}
                columns={[
                  { label: "Code", field: "code" },
                  { label: "Item", field: "item" },
                  { label: "UOM", field: "uom" },
                  { label: "Pri. Qty", field: "priQty" },
                  { label: "Pri. Q-Unit", field: "priQUnit" },
                  { label: "Pri. Weight", field: "priWeight" },
                  { label: "Pri. W-Unit", field: "priWeightUnit" },
                  { label: "Sec. Qty", field: "secQty" },
                  { label: "Sec. Q-Unit", field: "secQUnit" },
                  { label: "(KGS)", field: "kgs" },
                  { label: "(LBS)", field: "lbs" },
                  { label: "Scanned", field: "scanned" },
                  { label: "action", field: "action" },
                ]}
                rows={
                  itemCodes && itemCodes?.length > 0
                    ? itemCodes?.map((item: Codes) => {
                        return {
                          code: item?.code ? item?.code : "-",
                          item: item?.item ? item?.item?.name : "-",
                          uom: item?.item?.uom ? item?.item?.uom?.name : "-",
                          priQty: 1,
                          priQUnit: item?.priUnit ? item?.priUnit?.name : "-",
                          priWeight: item?.item?.unitWeight
                            ? item?.item?.unitWeight
                            : "-",
                          priWeightUnit: item?.weightUnit
                            ? item?.weightUnit.name
                            : "-",
                          secQty: 1,
                          secQUnit: item?.unitSec ? item?.unitSec?.name : "-",
                          kgs: calculateWeights(
                            item?.unitWeight ?? 0,
                            item?.weightUnit?.weightUnitId ?? 0
                          )[0],
                          lbs: calculateWeights(
                            item?.unitWeight ?? 0,
                            item?.weightUnit?.weightUnitId ?? 0
                          )[1],
                          scanned: item?.isScanned ? "Yes" : "No",
                          action: (
                            <RoutingActionButton
                              onDeleteClick={() => {
                                handleDelete(item?.codeId);
                              }}
                            />
                          ),
                        };
                      })
                    : []
                }
              />
            </div>
          </>
        )}
      </div>
      <Barcodes
        items={itemCodesToPrint}
        onAfterPrint={() => setItemCodesToPrint([])}
        Format={printFormat}
        clientName={printClientName}
      />
    </>
  );
}
