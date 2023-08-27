import DateFilter from "@/components/common/DateFilter/dateFilter";
import { H1 } from "@/components/common/Header/header";
import PrButton from "@/components/common/PrButton/PrButton";
import PrPagination from "@/components/common/PrPagination/PrPagination";
import PrSearch from "@/components/common/PrSearch/PrSearch";
import { LANG } from "@/components/lang/Lang";
import { ChangeEvent, useState } from "react";
import RevenueTabs, { reportTabT } from "./common/reportTabs";
import PrTable from "@/components/common/PrTable/PrTable";
import products from "../../common/booking_data.json";
import { ComissionCellComponent } from "../payment/paymentModal";
import { BookingCellComponent, IndexCellComponent, PaymentStatusCellComponent, PropertyCellComponent } from "./common/reportTableComponents";
import { useFilteredPagination } from "@/components/common/PrPagination/PrPaginationCalculator";




function ReportModal() {
  const [selectedTab, setSelectedTab] = useState<reportTabT>("BOOKING");
  const handleTabChange = (tab: reportTabT) => {
    setSelectedTab(tab);
  };
  const {visibleData,currentPage,totalPages,handlePageChange} = useFilteredPagination(products,'',10)
  return (
    <div>
      <div className="h-[4rem] flex">
        <H1>{LANG.COMMON.REPORTANDANALYSISMANAGEMENT}</H1>
        <div className="ml-auto flex items-center space-x-4">
          <DateFilter
            onDateRangeChange={function (
              startDate: Date | null,
              endDate: Date | null
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
          <PrButton label={"Excel"} iconName={"Download"} />
          <PrSearch
            onSearch={function (e: ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
            value={""}
          ></PrSearch>
          <PrPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}></PrPagination>
        </div>
      </div>
      <RevenueTabs
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      ></RevenueTabs>
      {selectedTab === "BOOKING" ? (
        <PrTable
          headers={[
            {
              name: "#",
              id: "index",
            },
            {
              name: "Booking Id",
              id: "bookingId",
            },
            {
              name: "Customer Name",
              id: "customerName",
            },
            {
              name: "Property Name",
              id: "propertyName",
            },
            {
              name: "Booking Date",
              id: "bookingDate",
            },
            {
              name: "Final Amount",
              id: "finalAmount",
            },
            {
              name: "Payment Method",
              id: "paymentMethod",
            },
            {
              name: "Payment Status",
              id: "paymentStatus",
              renderComponent:PaymentStatusCellComponent,
              renderProps:{dataField:'paymentStatus'}
            },
          ]}
          data={visibleData}
        ></PrTable>
      ) : (
        <PrTable
          headers={[
            { name: "#", id: "index",
        renderComponent:IndexCellComponent,
    renderProps:{dataField:'index'} },
            { name: "Property Name", id: "propertyName",
        renderComponent:PropertyCellComponent,
    renderProps:{dataField:'proprtyName'} },
            { name: "No Of Successfull Bookings", id: "totalNumber",
        renderComponent:BookingCellComponent,
    renderProps:{dataField:'totalNumber'} },
            { name: "Commission", id: "commission",
        renderComponent:ComissionCellComponent,
    renderProps:{dataField:'commission'} },
          ]}
          data={visibleData}
        ></PrTable>
      )}
    </div>
  );
}
export default ReportModal;
