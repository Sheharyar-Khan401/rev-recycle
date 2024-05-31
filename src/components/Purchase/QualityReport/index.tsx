import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetWeightUnitQuery } from "redux/features/Settings/Productions/weightUnitApiSlice";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import {
  useImportGPQualityReportMutation,
  useLazyGetQualityReportQuery,
  useUpdateGPQualityReportMutation,
} from "redux/features/purchase/gatePassesApiSlice";
import { QualityReportItems } from "redux/types/GatePasses/gatePasses";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import ImportDialog from "shared/Components/ImportDialog";
import * as XLSX from "xlsx";

interface Props {}

function QualityReport(props: Props) {
  const {} = props;
  const params = useParams();

  const [isImportModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importError, setImportError] = useState<string[]>([]);
  const [importResult, setImportResult] = useState<QualityReportItems[]>([]);
  const [results, setResults] = useState<QualityReportItems[]>([]);
  const { data: WeightUnitsList } = useGetWeightUnitsQuery(null);
  const [getQualityReport, result] = useLazyGetQualityReportQuery();
  const [editGatePassQualityRep, { isLoading }] =
    useUpdateGPQualityReportMutation();
  const [importGatePassQualityRep, { isLoading: importLoading }] =
    useImportGPQualityReportMutation();

  const columns: column<"qualityAnalysisId", QualityReportItems>[] = [
    {
      label: "Station Name",
      field: "stationName",
      sort: false,
      inputType: "text",
    },
    {
      label: result.data?.payLoad?.length
        ? result.data.payLoad[0].grade1Field
        : "Grade 01",
      field: "grade1Value",
      inputType: "number",
      sort: false,
    },
    {
      label: result.data?.payLoad?.length
        ? result.data.payLoad[0].grade2Field
        : "Grade 02",
      field: "grade2Value",
      inputType: "number",
      sort: false,
    },
    {
      label: result.data?.payLoad?.length
        ? result.data.payLoad[0].grade3Field
        : "Grade 03",
      field: "grade3Value",
      inputType: "number",
      sort: false,
    },
    {
      label: "Weight",
      field: "totalWeightLbs",
      inputType: "number",
      sort: false,
    },
    {
      label: "Weight Unit",
      field: "weightUnit",
      inputType: "select",
      options:
        WeightUnitsList?.map((wu) => {
          return { text: wu.name, value: wu.weightUnitId };
        }) ?? [],
      sort: false,
    },
  ];

  useEffect(() => {
    getQualityReport({
      gatePassId: params.id,
    });
  }, []);

  useEffect(() => {
    if (result.data?.payLoad.length) {
      setResults(
        result.data.payLoad.map((r) => {
          return {
            ...r,
            totalWeightLbs: r.grade1Value + r.grade2Value + r.grade3Value,
            weightUnit: r.weightUnit?.weightUnitId ?? 0,
          };
        })
      );
    }
  }, [result]);

  const handleModalState = () => {
    setImportModalOpen(!isImportModalOpen);
  };

  const handleSubmit = async () => {
    await importGatePassQualityRep({
      gatePassId: params.id,
      body: importResult,
    });
    setImportResult([]);
    setImportModalOpen(false);
  };

  const submitReport = async () => {
    const submittedValues = results.map((res) => {
      return {
        qualityAnalysisId: res.qualityAnalysisId,
        stationName: res.stationName,
        grade1Field: res.grade1Field ?? "Grade 01",
        grade2Field: res.grade2Field ?? "Grade 02",
        grade3Field: res.grade3Field ?? "Grade 03",
        grade1Value: res.grade1Value,
        grade2Value: res.grade2Value,
        grade3Value: res.grade3Value,
        weightUnitId: res.weightUnit,
      };
    });

    editGatePassQualityRep({
      gatePassId: params.id,
      body: submittedValues,
    });
  };

  const handleFileChange = (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json<Array<string | number>>(
          workbook.Sheets[sheetName],
          { header: 1 }
        );
        const header = sheetData.shift();

        setImportResult(
          sheetData
            .filter((d) => d.length == 5)
            .map((subArr) => {
              return {
                qualityAnalysisId: -1,
                stationName: subArr[0].toString(),
                grade1Value: +subArr[1],
                grade2Value: +subArr[2],
                grade3Value: +subArr[3],
                grade1Field: header ? header[1].toString() : "",
                grade2Field: header ? header[2].toString() : "",
                grade3Field: header ? header[3].toString() : "",
                weightUnit: +subArr[4],
                totalWeightLbs: 0,
              };
            })
        );
      };
      reader.readAsArrayBuffer(file);
      setImportError([]);
    } catch (err) {
      console.log(err);
      setImportError(["File format not supported"]);
    }
  };
  return (
    <div>
      <EditableDataTable
        identifier="qualityAnalysisId"
        addText="Add new item"
        columns={columns}
        setRows={setResults}
        rows={results ? results : []}
        actionBtnTitle="Import"
        actionBtnHandler={handleModalState}
        onSubmit={submitReport}
      />
      {isImportModalOpen && (
        <ImportDialog
          isImportModalOpen={isImportModalOpen}
          title="Import Records"
          onClose={() => handleModalState()}
          onSubmit={() => handleSubmit()}
          handleFileChange={handleFileChange}
          errorMsg={importError}
          isLoading={importLoading}
        />
      )}
    </div>
  );
}

export default QualityReport;
