import { useEffect, useState } from "react";
import { overviewGatePassesResolver } from "validators/graderValidator/Purchase/gatePassesResolver";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { format, parse } from "date-fns";
import { overViewGatePasses } from "redux/types/GatePasses/gatePasses";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditGatePassesMutation,
  useLazyGetGatePassesByIdQuery,
  useUpdateGPPostStatusMutation,
} from "redux/features/purchase/gatePassesApiSlice";
import OverViewForm from "components/Purchase/OverviewGatePassesForm/overviewForm";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import CustomButton from "shared/Components/CustomButton";
const defaultValues: overViewGatePasses = {
  passingDate: "",
  gatePassId: 0,
  weightUnitId: 0,
  posted: false,
  containerNo: "",
  arrivalTime: "",
  departureTime: "",
  purchaseInvoiceId: 0,
  vehicleNo: "",
  referenceNumber: "",
  invoiceTypeId: 0,
  clientId: 0,
  invoiceNo: "",
  stockRoomId: 0,
  purchaseMethodId: 0,
  totalWeightKgs: 0,
  totalWeightLbs: 0,
  kantaWeight: 0,
  kantaWeightUnit: 0,
  weightDifference: 0,
};
interface Props {
  setPurchaseOrderId: (id: number) => void;
}
export default function EditGatePassBasic({ setPurchaseOrderId }: Props) {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: overviewGatePassesResolver,
  });
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editGatePass, { isLoading }] = useEditGatePassesMutation();
  const [updatePostStatus, { isLoading: PostLoading }] =
    useUpdateGPPostStatusMutation();
  const [getGatePassesById, result] = useLazyGetGatePassesByIdQuery();

  const onSubmit = async (values: overViewGatePasses) => {
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
    const updatedValues: overViewGatePasses = {
      ...values, // Copy all properties from the original object
      arrivalTime: formattedArrivalTime, // Update arrival time
      departureTime: formattedDepartureTime,
      // Update departure time
    };

    const res = await editGatePass(updatedValues);
    if ("data" in res && res.data.status === "SUCCESS") {
      navigate("/grader/purchase/gatepasses");
    }
  };

  useEffect(() => {
    if (params?.id) {
      getGatePassesById(+params?.id);
    }
  }, [params.id, getGatePassesById]);
  useEffect(() => {
    if (result?.data) {
      setValue(
        "passingDate",
        result.data?.passingDate
          ? getDateFromMillis(result.data?.passingDate)
          : ""
      );
      setValue(
        "rateOnId",
        result.data?.rateOn ? result.data?.rateOn?.rateOnId : 0
      );
      setValue("weightUnitId", result.data?.weightUnit?.weightUnitId);
      setValue("kantaWeightUnit", result.data?.kantaWeightUnit?.weightUnitId);
      setValue(
        "containerNo",
        result?.data?.containerNo ? result?.data?.containerNo : ""
      );
      setValue(
        "invoiceNo",
        result?.data?.invoice ? result?.data?.invoice?.invoiceNo : ""
      );
      setValue(
        "referenceNumber",
        result?.data?.referenceNumber ? result?.data?.referenceNumber : ""
      );
      setValue(
        "vehicleNo",
        result?.data?.vehicleNo ? result?.data?.vehicleNo : ""
      );
      setValue(
        "arrivalTime",
        result?.data?.arrivalTime
          ? format(result?.data?.arrivalTime, "hh:mm a")
          : ""
      );
      setValue(
        "departureTime",
        result?.data?.departureTime
          ? format(result?.data?.departureTime, "hh:mm a")
          : ""
      );
      setValue(
        "purchaseInvoiceId",
        result?.data?.purchaseInvoice
          ? result?.data?.purchaseInvoice?.invoiceId
          : 0
      );
      setValue(
        "currencyId",
        result?.data?.currency?.currencyId
          ? result?.data?.currency?.currencyId
          : 0
      );
      setValue(
        "clientId",
        result?.data?.supplier?.clientId ? result?.data?.supplier?.clientId : 0
      );
      setValue(
        "invoiceTypeId",
        result?.data?.invoiceType ? result?.data?.invoiceType?.invoiceTypeId : 0
      );
      setValue(
        "purchaseMethodId",
        result?.data?.purchaseMethod
          ? result?.data?.purchaseMethod?.purchaseMethodId
          : 0
      );
      setValue(
        "stockRoomId",
        result?.data?.stockroom ? result?.data?.stockroom.stockRoomId : 0
      );
      setValue(
        "gradeId",
        result?.data?.grade ? result?.data?.grade?.gradeId : 0
      );
      setValue(
        "totalWeightKgs",
        result?.data?.totalWeightKgs ? result?.data?.totalWeightKgs : 0
      );
      setValue(
        "stockRoomId",
        result?.data?.stockroom ? result?.data?.stockroom?.stockRoomId : 0
      );
      setValue(
        "gradeId",
        result?.data?.grade ? result?.data?.grade?.gradeId : 0
      );
      setValue(
        "totalWeightKgs",
        result?.data?.totalWeightKgs ? result?.data?.totalWeightKgs : 0
      );
      setValue(
        "totalWeightLbs",
        result?.data?.totalWeightKgs
          ? roundValue(convertWghtToLbs(result?.data?.totalWeightKgs))
          : 0
      );
      setValue(
        "weightDifference",
        result?.data?.weightDiff ? result?.data?.weightDiff : 0
      );
      setValue(
        "gatePassId",
        result?.data?.gatePassId ? result?.data?.gatePassId : 0
      );
      setValue("posted", !!result?.data?.posted);
      setValue(
        "purchaseOrderId",
        result?.data?.purchaseOrder
          ? result?.data?.purchaseOrder?.purchaseOrderId
          : 0
      );
      setValue(
        "kantaWeight",
        result?.data?.kantaWeight ? result?.data?.kantaWeight : 0
      );
      setPurchaseOrderId(
        result?.data?.gatePassId ? result?.data?.gatePassId : 0
      );
    }
  }, [result.data]);

  useEffect(() => {
    const kantaWeight = watch("kantaWeight");
    const weightUnitId = watch("kantaWeightUnit");
    const weightLbs = watch("totalWeightLbs");
    const weightKgs = watch("totalWeightKgs");
    if (weightUnitId === 1) {
      setValue("weightDifference", weightKgs - kantaWeight);
    }
    if (weightUnitId === 2) {
      setValue("weightDifference", weightLbs - kantaWeight);
    }
  }, [
    watch("kantaWeightUnit"),
    watch("kantaWeight"),
    watch("totalWeightLbs"),
    watch("totalWeightKgs"),
  ]);

  return (
    <div>
      <ActionBarAddEdit
        title="Overview"
        mode={result?.data?.posted ? "" : "EDIT"}
        isLoading={isLoading}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!result?.data?.posted ? (
          <CustomButton
            size="sm"
            className="mx-2"
            type="hollow"
            onClick={() =>
              updatePostStatus({
                gatepassId: params?.id,
                posted: true,
              })
            }
            disabled={PostLoading}
            title={PostLoading ? "Posting..." : "Post"}
          />
        ) : (
          <CustomButton
            size="sm"
            type="hollow"
            className="mx-2 mb-2"
            onClick={() =>
              updatePostStatus({
                gatepassId: params?.id,
                posted: false,
              })
            }
            disabled={PostLoading}
            title={PostLoading ? "Unposting..." : "Unpost"}
          />
        )}
      </ActionBarAddEdit>
      <OverViewForm
        isEdit={isEdit}
        control={control}
        errors={errors}
        watch={watch}
        setValue={setValue}
        getValues={getValues}
      />
    </div>
  );
}
