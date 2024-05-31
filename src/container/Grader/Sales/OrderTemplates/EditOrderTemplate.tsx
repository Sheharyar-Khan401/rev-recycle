import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  OrderTemplateItemsData,
  OrderTemplateRequest,
  itemtableData,
} from "redux/types/Sales/ordertemplate";
import { orderTemplateResolver } from "validators/graderValidator/Sales/orderTemplateResolver";
import OrderTemplateForm from "components/Sales/OrderTemplateForm/OrderTemplateForm";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useGetquantityunitQuery } from "redux/features/quantityunit/quantityunitApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditOrderTemplateMutation,
  useLazyGetByIdOrderTemplateQuery,
} from "redux/features/sales/ordertemplateApiSlice";
import Loader from "shared/Components/Loader/Loader";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { useGetuomQuery } from "redux/features/uom/uomApiSlice";
import { UnitOfMeasurement } from "redux/types/common/uom";
import { roundValue, convertWghtToLbs } from "helper/utility";
const defaultValues: OrderTemplateRequest = {
  saleOrderTemplateId: 0,
  name: "",
  brandId: 0,
  clientId: 0,
};
export default function EditOrderTemplate() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<OrderTemplateRequest, null>({
    defaultValues,
    resolver: orderTemplateResolver,
  });
  const navigate = useNavigate();
  const params = useParams();
  const [rowData, setRowData] = useState<OrderTemplateItemsData[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getOrderTemplateById, result] = useLazyGetByIdOrderTemplateQuery();
  const [editOrderTemplate, { isLoading: editLoading }] =
    useEditOrderTemplateMutation();
  const { data: itemsData } = useGetAllProductionItemsQuery(null);
  const { data: measurementData } = useGetuomQuery(null);

  const { data: getquantityunit } = useGetquantityunitQuery(null);
  useEffect(() => {
    const id = params.id;
    if (id) {
      getOrderTemplateById(id);
    }
  }, [getOrderTemplateById, params.id]);

  useEffect(() => {
    if (result?.data) {
      setValue(
        "brandId",
        result?.data?.brand ? result?.data?.brand?.brandId : 0
      );
      setValue("name", result?.data?.name ? result?.data?.name : "-");
      setValue(
        "clientId",
        result?.data?.client?.clientId ? result?.data?.client?.clientId : 0
      );
      setValue(
        "saleOrderTemplateId",
        result?.data?.saleOrderTemplateId
          ? result?.data?.saleOrderTemplateId
          : 0
      );

      setRowData(
        result?.data?.items && result?.data?.items?.length > 0
          ? result?.data?.items?.map((item: itemtableData) => {
              return {
                code: item?.code,
                itemName: item?.itemName ? item?.itemName : "-",
                quantity: item?.quantity,
                quantityUnitId: item?.quantityUnitId ? item?.quantityUnitId : 0,
                unitId: item?.uom ? item?.uom?.unitId : 0,
                unitPieces: item?.unitPieces,
                weightKgs: item?.weightKgs,
                weightLbs: item?.weightLbs,
                uweight: item?.uweight,
                itemId: item?.item ? item?.item?.itemId : 0,
                saleOrderTemplateItemId: item?.saleOrderTemplateItemId
                  ? item?.saleOrderTemplateItemId
                  : 0,
              };
            }) ?? []
          : []
      );
    }
  }, [result.data, setValue]);
  const columns: column<"saleOrderTemplateItemId", OrderTemplateItemsData>[] = [
    {
      label: "Code",
      field: "code",
      sort: false,
      inputType: "text",
      disabled: true,
    },

    {
      label: "Item",
      field: "itemId",
      sort: false,
      inputType: "select",
      mutateFieldsCallback: (value) => {
        const selectedItem = itemsData?.find((item) => item.itemId === value);
        if (selectedItem) {
          return {
            code: selectedItem?.itemCode ? selectedItem?.itemCode : 0,
            unitId: selectedItem?.uom ? selectedItem?.uom?.unitId : 0,
            unitPieces: 1,
          };
        } else return {};
      },
      options: itemsData?.length
        ? itemsData.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.itemId ? item?.itemId : 0,
            };
          })
        : [],
    },
    {
      label: "UOM",
      field: "unitId",
      sort: false,
      inputType: "select",
      options: measurementData
        ? measurementData?.map((item: UnitOfMeasurement) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.unitId ? item?.unitId : 0,
            };
          })
        : [],
      disabled: true,
    },

    {
      label: "QTY",
      field: "quantity",
      inputType: "number",
      sort: false,
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            weightKgs: value ? roundValue(+value * row?.uweight) : 0,
            weightLbs: value
              ? roundValue(convertWghtToLbs(+value * row?.uweight))
              : 0,
          };
        } else return {};
      },
    },
    {
      label: "Q-UNIT",
      field: "quantityUnitId",
      inputType: "select",
      sort: false,
      options: getquantityunit?.length
        ? getquantityunit?.map((item: QuantityUnit) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.quantityUnitId ? item?.quantityUnitId : 0,
            };
          })
        : [],
    },

    {
      label: "Unit Weight",
      sort: false,
      field: "uweight",
      inputType: "number",
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            weightKgs: value ? roundValue(+value * row?.quantity) : 0,
            weightLbs: value
              ? roundValue(convertWghtToLbs(+value * row?.quantity))
              : 0,
          };
        } else return {};
      },
    },
    {
      label: "Unit Pieces",
      sort: false,
      field: "unitPieces",
      inputType: "number",
      disabled: true,
    },
    {
      label: "Weight Kgs",
      sort: false,
      field: "weightKgs",
      inputType: "number",
      disabled: true,
    },
    {
      label: "Weight Lbs",
      sort: false,
      field: "weightLbs",
      inputType: "number",
      disabled: true,
    },
  ];

  const onSubmit = async (values: OrderTemplateRequest) => {
    const apiValues = {
      brandId: values?.brandId,
      clientId: values?.clientId,
      name: values?.name,
      saleOrderTemplateId: values?.saleOrderTemplateId,
      items: rowData,
    };
    const result = await editOrderTemplate(apiValues);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  return (
    <div className="mt-3">
      <ActionBarAddEdit
        title="Order Templates"
        mode={"EDIT"}
        isLoading={editLoading}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      {result?.isLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <>
          <OrderTemplateForm
            mode="EDIT"
            control={control}
            errors={errors}
            isEdit={isEdit}
            columns={columns}
            rowData={rowData}
            setRowData={setRowData}
          />
        </>
      )}
    </div>
  );
}
