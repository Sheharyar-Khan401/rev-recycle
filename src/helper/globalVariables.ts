export const globalVariables = {
  ErrorMessage: "Something went wrong",
  LoaderMessage: "Your request is being processed.",
  LoadingMore: "Loading more items..",
  ComingSoonMessage: "Coming Soon",
  NoRecordFound: "No Record Found",
  NoRightsMessage: "You have no rights for this feature.",
  NewPassword: "New temporary password is: ",
  ResetTemporaryPasswordMessage:
    "Please reset your temporary password to continue. Thank you!",
  SaveChanges: "To continue, either Save the changes or Cancel.",
  ExpiryDateNotLessStartDate: "Expiry Date cannot be less than Start Date",
  StartDateNotGreaterExpiryDate:
    "Start Date cannot be greater than Expiry Date",
  ServerDateTimeError:
    "Your System Date and Time is Outdated. Please Fix your System Date and Time to Continue. Thank you!",
  InfiniteScrollingRowLimit: 10,
  ItemsPerPageLimit: 10,
};
export const COLORS = ["#5956D9 ", "#777BED", "#929CF6", "#BBC9FB", "#DAE4FC"];
export const months = [
  {
    name: "January",
    short: "Jan",
    number: 1,
    days: 31,
  },
  {
    name: "February",
    short: "Feb",
    number: 2,
    days: 28,
  },
  {
    name: "March",
    short: "Mar",
    number: 3,
    days: 31,
  },
  {
    name: "April",
    short: "Apr",
    number: 4,
    days: 30,
  },
  {
    name: "May",
    short: "May",
    number: 5,
    days: 31,
  },
  {
    name: "June",
    short: "Jun",
    number: 6,
    days: 30,
  },
  {
    name: "July",
    short: "Jul",
    number: 7,
    days: 31,
  },
  {
    name: "August",
    short: "Aug",
    number: 8,
    days: 31,
  },
  {
    name: "September",
    short: "Sep",
    number: 9,
    days: 30,
  },
  {
    name: "October",
    short: "Oct",
    number: 10,
    days: 31,
  },
  {
    name: "November",
    short: "Nov",
    number: 11,
    days: 30,
  },
  {
    name: "December",
    short: "Dec",
    number: 12,
    days: 31,
  },
];
export const Pages = [
  { title: "Dashboard", route: "/grader/dashboard" },
  // Finance
  { title: "Fiscal Groups", route: "/grader/finance/primarydata/fiscalgroups" },
  {
    title: "Add Fiscal Group",
    route: "/grader/finance/primarydata/fiscalgroups/add",
  },
  {
    title: "Edit Fiscal Group",
    route: "/grader/finance/primarydata/fiscalgroups/edit",
  },
  { title: "Cost Groups", route: "/grader/finance/primarydata/costgroups" },
  {
    title: "Add Cost Group",
    route: "/grader/finance/primarydata/costgroups/add",
  },
  {
    title: "Edit Cost Group",
    route: "/grader/finance/primarydata/costgroups/edit",
  },
  { title: "Accounts", route: "/grader/finance/primarydata/accounts" },
  { title: "Add Account", route: "/grader/finance/primarydata/accounts/add" },
  { title: "Edit Account", route: "/grader/finance/primarydata/accounts/edit" },
  { title: "Cash Accounts", route: "/grader/finance/primarydata/cashaccounts" },
  {
    title: "Add Cash Account",
    route: "/grader/finance/primarydata/cashaccounts/add",
  },
  {
    title: "Edit Cash Account",
    route: "/grader/finance/primarydata/cashaccounts/edit",
  },
  { title: "Bank Accounts", route: "/grader/finance/primarydata/bankaccounts" },
  {
    title: "Add Bank Account",
    route: "/grader/finance/primarydata/bankaccounts/add",
  },
  {
    title: "Edit Bank Account",
    route: "/grader/finance/primarydata/bankaccounts/edit",
  },
  {
    title: "Cash Payment Vouchers",
    route: "/grader/finance/vouchers/cashpaymentvouchers",
  },
  {
    title: "Add Cash Payment Voucher",
    route: "/grader/finance/vouchers/cashpaymentvouchers/add",
  },
  {
    title: "Edit Cash Payment Voucher",
    route: "/grader/finance/vouchers/cashpaymentvouchers/edit",
  },
  {
    title: "Cash Reciept Vouchers",
    route: "/grader/finance/vouchers/cashreceiptvouchers",
  },
  {
    title: "Add Cash Reciept Voucher",
    route: "/grader/finance/vouchers/cashreceiptvouchers/add",
  },
  {
    title: "Edit Cash Reciept Voucher",
    route: "/grader/finance/vouchers/cashreceiptvouchers/edit",
  },
  {
    title: "Bank Reciept Vouchers",
    route: "/grader/finance/vouchers/bankreceiptvouchers",
  },
  {
    title: "Add Bank Reciept Voucher",
    route: "/grader/finance/vouchers/bankreceiptvouchers/add",
  },
  {
    title: "Edit Bank Reciept Voucher",
    route: "/grader/finance/vouchers/bankreceiptvouchers/edit",
  },
  {
    title: "Bank Payment Vouchers",
    route: "/grader/finance/vouchers/bankpaymentvouchers",
  },
  {
    title: "Add Bank Payment Voucher",
    route: "/grader/finance/vouchers/bankpaymentvouchers/add",
  },
  {
    title: "Edit Bank Payment Voucher",
    route: "/grader/finance/vouchers/bankpaymentvouchers/edit",
  },
  {
    title: "Journel Vouchers",
    route: "/grader/finance/vouchers/journelvouchers",
  },
  {
    title: "Add Journel Voucher",
    route: "/grader/finance/vouchers/journelvouchers/add",
  },
  {
    title: "Edit Journel Voucher",
    route: "/grader/finance/vouchers/journelvouchers/edit",
  },
  // Purchase
  { title: "Purchase Overview", route: "/grader/purchase/overview" },
  { title: "Purchase Orders", route: "/grader/purchase/orders" },
  { title: "Add Purchase Order", route: "/grader/purchase/orders/add" },
  { title: "Edit Purchase Order", route: "/grader/purchase/orders/edit" },
  { title: "Purchase Invoices", route: "/grader/purchase/invoices" },
  { title: "Add Purchase Invoice", route: "/grader/purchase/invoices/add" },
  { title: "Edit Purchase Invoice", route: "/grader/purchase/invoices/edit" },
  {
    title: "Purchase Freight Invoices",
    route: "/grader/purchase/invoices/freightinvoices",
  },
  {
    title: "Add Purchase Freight Invoice",
    route: "/grader/purchase/invoices/freightinvoices/add",
  },
  {
    title: "Edit Purchase Freight Invoice",
    route: "/grader/purchase/invoices/freightinvoices/edit",
  },
  {
    title: "Purchase Clearing Invoices",
    route: "/grader/purchase/invoices/clearinginvoices",
  },
  {
    title: "Add Purchase Clearing Invoice",
    route: "/grader/purchase/invoices/clearinginvoices/add",
  },
  {
    title: "Edit Purchase Clearing Invoice",
    route: "/grader/purchase/invoices/clearinginvoices/edit",
  },
  {
    title: "Purchase Delivery Order Invoices",
    route: "/grader/purchase/invoices/deliveryorderinvoices",
  },
  {
    title: "Add Purchase Delivery Order Invoice",
    route: "/grader/purchase/invoices/deliveryorderinvoices/add",
  },
  {
    title: "Edit Purchase Delivery Order Invoice",
    route: "/grader/purchase/invoices/deliveryorderinvoices/edit",
  },
  {
    title: "Purchase Invoices Defaults",
    route: "/grader/purchase/invoices/invoicedefaults",
  },
  { title: "Purchase Gatepass", route: "/grader/purchase/gatepasses" },
  { title: "Add Purchase Gatepas", route: "/grader/purchase/gatepasses/add" },
  { title: "Edit Purchase Gatepas", route: "/grader/purchase/gatepasses/edit" },
  // Sale
  { title: "Sale Orders", route: "/grader/sales/orders" },
  { title: "Add Sale Order", route: "/grader/sales/orders/add" },
  { title: "Edit Sale Order", route: "/grader/sales/orders/edit" },
  { title: "Sale Gatepasses", route: "/grader/sales/gatepasses" },
  { title: "Add Sale Gatepasse", route: "/grader/sales/gatepasses/add" },
  { title: "Edit Sale Gatepasse", route: "/grader/sales/gatepasses/edit" },
  { title: "Sale Invoices", route: "/grader/sales/invoices" },
  { title: "Add Sale Invoice", route: "/grader/sales/invoices/add" },
  { title: "Edit Sale Invoice", route: "/grader/sales/invoices/edit" },
  {
    title: "Sale Freight Invoices",
    route: "/grader/sales/invoices/freightinvoices",
  },
  {
    title: "Add Sale Freight Invoice",
    route: "/grader/sales/invoices/freightinvoices/add",
  },
  {
    title: "Edit Sale Freight Invoice",
    route: "/grader/sales/invoices/freightinvoices/edit",
  },
  {
    title: "Sale Clearing Invoices",
    route: "/grader/sales/invoices/clearinginvoices",
  },
  {
    title: "Add Sale Clearing Invoice",
    route: "/grader/sales/invoices/clearinginvoices/add",
  },
  {
    title: "Edit Sale Clearing Invoice",
    route: "/grader/sales/invoices/clearinginvoices/edit",
  },
  {
    title: "Sale CNC/COC Invoices",
    route: "/grader/sales/invoices/cncinvoices",
  },
  {
    title: "Add Sale CNC/COC Invoice",
    route: "/grader/sales/invoices/cncinvoices/add",
  },
  {
    title: "Edit Sale CNC/COC Invoice",
    route: "/grader/sales/invoices/cncinvoices/edit",
  },
  {
    title: "Sale Other Invoices",
    route: "/grader/sales/invoices/otherinvoices",
  },
  {
    title: "Add Sale Other Invoice",
    route: "/grader/sales/invoices/otherinvoices/add",
  },
  {
    title: "Edit Sale Other Invoice",
    route: "/grader/sales/invoices/otherinvoices/edit",
  },
  { title: "Sales Client Item Rates", route: "/grader/sales/clientitemsrates" },
  { title: "Sales Order Templates", route: "/grader/sales/ordertemplates" },
  { title: "Sales Basic Settings", route: "/grader/sales/settings/basic" },
  {
    title: "Sales Prod. Profit FOH Deficit/Surplus Settings",
    route: "/grader/sales/settings/productionprofitfohdeficit",
  },
  {
    title: "Sales Expense Accounts",
    route: "/grader/sales/settings/expenseaccount",
  },
  // Client
  { title: "Clients", route: "/grader/clients/clients" },
  { title: "Add Client", route: "/grader/clients/clients/add" },
  { title: "Edit Client", route: "/grader/clients/clients/edit" },
  { title: "Suppliers", route: "/grader/clients/suppliers" },
  { title: "Add Supplier", route: "/grader/clients/suppliers/add" },
  { title: "Edit Supplier", route: "/grader/clients/suppliers/edit" },
  { title: "Agents", route: "/grader/clients/agents" },
  { title: "Add Agent", route: "/grader/clients/agents/add" },
  { title: "Edit Agent", route: "/grader/clients/agents/edit" },
  //Production
  { title: "Production Overview", route: "/grader/production/overview" },
  { title: "Production Codes", route: "/grader/production/codes" },
  { title: "Add Production Code", route: "/grader/production/codes/add" },
  { title: "Edit Production Code", route: "/grader/production/codes/edit" },
  { title: "Daily Productions", route: "/grader/production/productions" },
  {
    title: "Add Daily Production",
    route: "/grader/production/productions/add",
  },
  {
    title: "Edit Daily Production",
    route: "/grader/production/productions/edit",
  },
  {
    title: "Transfer Sale Order Units",
    route: "/grader/production/transfersaleorderunits",
  },
  {
    title: "Add Transfer Sale Order Unit",
    route: "/grader/production/transfersaleorderunits/add",
  },
  {
    title: "Edit Transfer Sale Order Unit",
    route: "/grader/production/transfersaleorderunits/edit",
  },
  {
    title: "Wiper Issuances",
    route: "/grader/production/issuances/wiperissuance",
  },
  {
    title: "Add Wiper Issuance",
    route: "/grader/production/issuances/wiperissuance/add",
  },
  {
    title: "Edit Wiper Issuance",
    route: "/grader/production/issuances/wiperissuance/edit",
  },
  {
    title: "Production Issuances",
    route: "/grader/production/issuances/issuance",
  },
  {
    title: "Add Production Issuance",
    route: "/grader/production/issuances/issuance/add",
  },
  {
    title: "Edit Production Issuance",
    route: "/grader/production/issuances/issuance/edit",
  },
  {
    title: "Mutility Issuances",
    route: "/grader/production/issuances/mutility",
  },
  {
    title: "Add Mutility Issuance",
    route: "/grader/production/issuances/mutility/add",
  },
  {
    title: "Edit Mutility Issuance",
    route: "/grader/production/issuances/mutility/edit",
  },
  {
    title: "Reproduction Issuances",
    route: "/grader/production/issuances/reproductionissuance",
  },
  {
    title: "Add Reproduction Issuance",
    route: "/grader/production/issuances/reproductionissuance/add",
  },
  {
    title: "Edit Reproduction Issuance",
    route: "/grader/production/issuances/reproductionissuance/edit",
  },
  { title: "FOH Values", route: "/grader/production/settings/fohValues" },
  { title: "Add FOH Value", route: "/grader/production/settings/fohValues" },
  { title: "Edit FOH Value", route: "/grader/production/settings/fohValues" },
  {
    title: "Opening Balances",
    route: "/grader/production/settings/openingbalances",
  },
  // Reports
  {
    title: "Purchase Report: Container In Transit",
    route: "/grader/reports/purchase/containerintransit",
  },
  {
    title: "Purchase Report: Detailed Inward Gate Pass",
    route: "/grader/reports/purchase/detailedinwardgatepass",
  },
  {
    title: "Purchase Report: Raw Material",
    route: "/grader/reports/purchase/rawmaterial",
  },
  {
    title: "Purchase Report: Issued Material",
    route: "/grader/reports/purchase/issuedmaterial",
  },
  {
    title: "Purchase Report: Item Supplier Inward Gate Pass",
    route: "/grader/reports/purchase/itemsupplierinwardgatepasses",
  },
  {
    title: "Purchase Report: Item Supplier Invoices",
    route: "/grader/reports/purchase/itemsupplierinvoices",
  },
  {
    title: "Purchase Report: Freight Invoices",
    route: "/grader/reports/purchase/freightinvoices",
  },
  {
    title: "Purchase Report: Clearing Invoices",
    route: "/grader/reports/purchase/clearinginvoices",
  },
  {
    title: "Purchase Report: Stock Room Items",
    route: "/grader/reports/purchase/stockroomitems",
  },
  {
    title: "Purchase Report: Container Costs",
    route: "/grader/reports/purchase/containerscosts",
  },
  {
    title: "Sales Report: Price List",
    route: "/grader/reports/sales/pricelist",
  },
  {
    title: "Sales Report: Detailed Outward Gate Pass",
    route: "/grader/reports/sales/detailedoutwardgatepass",
  },
  {
    title: "Sales Report: Item / Customer Gate Pass",
    route: "/grader/reports/sales/customergatepass",
  },
  {
    title: "Sales Report: Daily Production Profit",
    route: "/grader/reports/sales/dailyproductionprofit",
  },
  {
    title: "Sales Report: Production Profit",
    route: "/grader/reports/sales/productionprofit",
  },
  {
    title: "Sales Report: Detailed Outward Gate Pass (2)",
    route: "/grader/reports/sales/detailedoutwardgatepass2",
  },
  {
    title: "Sales Report: Invoice Price Comparison",
    route: "/grader/reports/sales/invoicepricecomparison",
  },
  {
    title: "Sales Report: Item Customer Gate Pass Leveled",
    route: "/grader/reports/sales/itemcustomergatepassleveled",
  },
  {
    title: "Sales Report: Order Statuses",
    route: "/grader/reports/sales/orderstatuses",
  },
  {
    title: "Sales Report: Price Comparision",
    route: "/grader/reports/sales/pricecomparison",
  },
  {
    title: "Production Report: Stockroom Balance",
    route: "/grader/reports/production/stockroombalance",
  },
  {
    title: "Production Report: Transfer Sale Order Units",
    route: "/grader/reports/production/transfersaleorderunits",
  },
  {
    title: "Production Report: Daily Production",
    route: "/grader/reports/production/dailyproduction",
  },
  {
    title: "Production Report: Wiper Issuances",
    route: "/grader/reports/production/wiper",
  },
  {
    title: "Production Report: Production Issuances",
    route: "/grader/reports/production/production",
  },
  {
    title: "Production Report: Reproduction Issuances",
    route: "/grader/reports/production/reproduction",
  },
  {
    title: "Production Report: Mutility Issuances",
    route: "/grader/reports/production/mutility",
  },
  // Settings
  { title: "Purchase Categories", route: "/grader/settings/purchase" },
  {
    title: "Purchase Categories",
    route: "/grader/settings/purchase/categories",
  },
  { title: "Purchase Items", route: "/grader/settings/purchase/items" },
  { title: "Add Purchase Item", route: "/grader/settings/purchase/items/add" },
  {
    title: "Edit Purchase Item",
    route: "/grader/settings/purchase/items/edit",
  },
  { title: "Purchase Types", route: "/grader/settings/purchase/types" },
  { title: "Purchase Ports", route: "/grader/settings/purchase/ports" },
  {
    title: "Purchase Charge Types",
    route: "/grader/settings/purchase/chargetypes",
  },
  { title: "Purchase Locations", route: "/grader/settings/purchase/locations" },
  {
    title: "Purchase Shipping Lines",
    route: "/grader/settings/purchase/shippinglines",
  },
  { title: "Finance Currency", route: "/grader/settings/finance" },
  { title: "Finance Currency", route: "/grader/settings/finance/currency" },
  { title: "Finance Settings", route: "/grader/settings/finance/settings" },
  { title: "Production Categories", route: "/grader/settings/productions" },
  {
    title: "Add Production Categories",
    route: "/grader/settings/productions/add",
  },
  {
    title: "Edit Production Categories",
    route: "/grader/settings/productions/edit",
  },
  { title: "Production Items", route: "/grader/settings/productions/items/" },
  {
    title: "Add Production Items",
    route: "/grader/settings/productions/items/add",
  },
  {
    title: "Edit Production Items",
    route: "/grader/settings/productions/items/edit",
  },
  { title: "Production Belts", route: "/grader/settings/productions/belts" },
  {
    title: "Production Stockrooms",
    route: "/grader/settings/productions/stockrooms",
  },
  { title: "Production Floors", route: "/grader/settings/productions/floors" },
  {
    title: "Production Sorted Rooms",
    route: "/grader/settings/productions/sortedrooms",
  },
  {
    title: "Production Label Types",
    route: "/grader/settings/productions/labeltypes",
  },
  {
    title: "Production Stations",
    route: "/grader/settings/productions/stations",
  },
  {
    title: "Production Cartons",
    route: "/grader/settings/productions/cartons",
  },
  { title: "Production Brands", route: "/grader/settings/productions/brands" },
  {
    title: "Add Production Brands",
    route: "/grader/settings/productions/brands/add",
  },
  {
    title: "Edit Production Brands",
    route: "/grader/settings/productions/brands/edit",
  },
  { title: "Production Grades", route: "/grader/settings/productions/grades" },
  {
    title: "Production Departments",
    route: "/grader/settings/productions/departments",
  },
  {
    title: "Purchase Account Settings",
    route: "/grader/settings/accountsetting/purchase",
  },
  {
    title: "Production Account Settings",
    route: "/grader/settings/accountsetting/production/",
  },
  {
    title: "Sale Account Settings",
    route: "/grader/settings/accountsetting/sale",
  },
  {
    title: "Common Account Settings",
    route: "/grader/settings/accountsetting/common",
  },
  { title: "Roles", route: "/grader/settings/roles" },
  { title: "Add Roles", route: "/grader/settings/roles/add" },
  { title: "Edit Roles", route: "/grader/settings/roles/edit" },
  { title: "Users", route: "/grader/settings/users" },
  { title: "Add Users", route: "/grader/settings/users/add" },
  { title: "Edit Users", route: "/grader/settings/users/edit" },
];
