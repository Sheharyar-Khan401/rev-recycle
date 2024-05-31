import { MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import {
  Account,
  AccountRequest,
} from "redux/types/Finance/PrimaryData/account";
import { AccountType } from "redux/types/common/accountType";
import FormValidationError from "shared/Components/FormValidationError";
import { useGetReportsGroupsQuery } from "redux/features/common/reportGroupApiSlice";
import { useGetAccountsGroupsQuery } from "redux/features/finance/primarydata/AccountGroupApiSlice";
import { AccountGroup } from "redux/types/common/accountGroup";
import { ReportGroup } from "redux/types/common/reportGroup";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useEffect } from "react";
interface Props {
  isEdit: boolean;
  control: Control<AccountRequest>;
  errors: Partial<FieldErrorsImpl<AccountRequest>>;
  data: Account[];
  accountTypeData: AccountType[];
  mode?: string;
  accountId?: number;
}

export default function AccountForm({
  isEdit,
  control,
  errors,
  data,
  accountId,
  accountTypeData,
  mode,
}: Props) {
  const { data: reportGroupList } = useGetReportsGroupsQuery(null);
  const { data: groupList } = useGetAccountsGroupsQuery(null);
  const { data: currencyList } = useGetBusinessCurrrencyQuery(null);

  const accountDataList = (id: number) => {
    return data
      ?.filter((dataa: Account) => accountId != dataa?.accountId)

      .map((data: Account) => {
        return {
          text: data?.accountTitle ? data?.accountTitle : "",
          value: data?.accountId ? data?.accountId : 0,
          defaultSelected: data?.accountId == id,
        };
      });
  };

  const ReportGroupDataList = (id?: number) => {
    if (reportGroupList?.length) {
      return reportGroupList.map((data: ReportGroup) => {
        return {
          text: data?.name ? data?.name : "",
          value: data?.reportGroupId ? data?.reportGroupId : 0,
          defaultSelected: data?.reportGroupId === id,
        };
      });
    } else return [];
  };
  const GroupDataList = (id?: number) => {
    if (groupList?.length) {
      return groupList.map((data: AccountGroup) => {
        return {
          text: data?.name ? data?.name : "",
          value: data?.groupId ? data?.groupId : 0,
          defaultSelected: data?.groupId === id,
        };
      });
    } else return [];
  };
  const CurrencyDataList = (id?: number) => {
    if (currencyList?.length) {
      return currencyList.map((data) => {
        return {
          text: data?.currency ? data?.currency?.name : "",
          value: data?.businesscurrencyId ? data?.businesscurrencyId : 0,
          defaultSelected: data?.businesscurrencyId === id,
        };
      });
    } else return [];
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12 my-2">
          <Controller
            control={control}
            name="parentAccountId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Parent Account"
                data={accountDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                value={value}
                disabled={!isEdit}
                preventFirstSelection
              />
            )}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12 my-2">
          <Controller
            control={control}
            name="accountTitle"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.accountTitle && "is-invalid"}`}
                label="Account Title*"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.accountTitle?.message} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12 my-2">
          <Controller
            control={control}
            name="currencyId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Currency"
                data={CurrencyDataList(value)}
                preventFirstSelection
                search
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                disabled={!isEdit}
              />
            )}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12 my-2">
          <Controller
            control={control}
            name="accountCode"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.accountCode && "is-invalid"}`}
                label="Account Code*"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.accountCode?.message} />
        </div>
      </div>
      {mode === "EDIT" && (
        <>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="reportGroupId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Report Group*"
                    preventFirstSelection
                    search
                    inputClassName={`${errors.reportGroupId && "is-invalid"}`}
                    data={ReportGroupDataList(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.reportGroupId?.message}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="groupId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Group"
                    preventFirstSelection
                    search
                    data={GroupDataList(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="depth"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Depth"
                    type="text"
                    disabled
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="controlAccountRef"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    preventFirstSelection
                    data={["Payable", "Receivable"].map((d) => {
                      return { text: d, value: d, defaultSelected: d == value };
                    })}
                    label="Control Account Ref"
                    type="text"
                    disabled={!isEdit}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
        </>
      )}
      <h6 className="fw-bold mb-0">Account Type</h6>
      <div className="row">
        {accountTypeData?.map((item, index) => {
          return (
            <div key={index} className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="accountTypeId"
                render={({ field: { onChange, value } }) => (
                  <MDBRadio
                    label={item?.name}
                    disabled={!isEdit}
                    onChange={onChange}
                    value={item?.accountTypeId}
                    checked={item?.accountTypeId === +value}
                  />
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
