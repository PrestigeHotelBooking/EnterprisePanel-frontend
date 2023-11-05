
import { useRouter } from "next/router";
import UserAddressCard from "@/components/common/Card/UserCard/UserAddressCard";
import UserDetailCard from "@/components/common/Card/UserCard/UserDetailCard";
import DateFilter from "@/components/common/DateFilter/dateFilter";
import PrButton from "@/components/common/PrButton/PrButton";
import PrIcon from "@/components/common/PrIcon/PrIcon";
import PrTable from "@/components/common/PrTable/PrTable";
import { LANG } from "@/components/lang/Lang";
import { useCustomerHook } from "@/redux/selectors/customer";
import useCustomerData from "@/hooks/useCustomerData/useCustomerData";
import { CustomerDataT } from "./common/userCommon";
import useSingleCustomerBookingData from "@/hooks/useCustomerData/useSingleCustomerBookingData";
import { useEffect, useMemo, useState } from "react";
import { BackendGet } from "@/components/services/BackendServices";
import { ENDPOINTS } from "@/components/lang/EndPoints";
import PrCircularProgressIndicator from "@/components/common/Loader/PrCircularProgressIndicator";
import { TableCellPropsT } from "@/components/common/PrTable/PrTableCommon";
import DateFormat from "@/components/common/DateFormat/dateFormat";
import generateExcelAndDownload from "@/components/services/ExcelDownloader";
import PrPagination from "@/components/common/PrPagination/PrPagination";
import { useFilteredPagination } from "@/components/common/PrPagination/PrPaginationCalculator";
import PrRowPagination from "@/components/common/PrPagination/PrRowPagination";



export type userDetailInputT = {
    searchText: string;
    pageRows: number;
    calendarStartDate: Date | null;
    calendarEndDate: Date | null;
    userDetailData: any;
}


export const initialuserModalInput: userDetailInputT = {
    searchText: '',
    pageRows: 0,
    calendarStartDate: null,
    calendarEndDate: null,
    userDetailData: {}
}


    const BookingDateFormat: React.FC<TableCellPropsT> = ({ data }) => {
        return (
            <DateFormat date={data} formatType="dd MMM yyyy" className="text-black" />
        );
    };


const UserDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <PrCircularProgressIndicator/>;
      }


    const handleNavigate = () => {
        router.push('/dashboard/user');
    };

    const [userDetailInput, setUserDetailInput] = useState<userDetailInputT>(initialuserModalInput);

    const { data } = useSingleCustomerBookingData(id as string);

    const customerData = useCustomerData();

    const singleCustomerData = customerData.data.find((d) => d.customer_id === Number(id));

    const [itemsPerPage,setItemsPerPage]=useState<number>(10);
    const {currentPage,visibleData,handlePageChange,totalPages} =useFilteredPagination(data,'',itemsPerPage);

    const handleState = (data: Partial<userDetailInputT>) => {
        setUserDetailInput((prevState) => ({
            ...prevState,
            ...data,
        }));
    };


    useEffect(() => {
        handleState({ userDetailData: data })
    }, [data])


    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null): void => {
        handleState({
            calendarStartDate: startDate,
            calendarEndDate: endDate
        })
    }

    return (
        <div className="bg-[#f6f7fa]">
            <div className="flex">
                <div className="p-2.5 font-semibold cursor-pointer" onClick={handleNavigate}>
                    <PrIcon name={'ArrowLeft'} size={28} ></PrIcon>
                </div>
                <div className="p-2 text-[1.5rem] font-semibold">{singleCustomerData?.first_name || ' '}</div>

            </div>
            <div className="flex space-x-4">
                <UserDetailCard
                    items={[
                        { icon: "User", iconType: 'feather', title: "Name", subtitle: singleCustomerData?.first_name || ' ' },
                        { icon: 'Mail', iconType: 'feather', title: "Email", subtitle: singleCustomerData?.email_id || ' ' },
                        { icon: 'Smartphone', iconType: 'feather', title: "Mobile", subtitle: singleCustomerData?.phone_number || ' ' }

                    ]}
                />
                <UserAddressCard icon={"Airplay"}
                    title={"Address"}
                    subtitle={"Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678"}
                    items={[
                        { title: 'City', subtitle: singleCustomerData?.city || '' },
                        { title: 'State', subtitle: singleCustomerData?.city || '' },
                        { title: 'Pincode', subtitle: singleCustomerData?.pincode || '' },
                        { title: 'Country', subtitle: singleCustomerData?.country || '' }
                    ]}
                ></UserAddressCard>

                <UserDetailCard
                    items={[
                        { icon: 'TransgenderSharp', iconType: 'material', title: "Gender", subtitle: singleCustomerData?.gender || '' },
                        { icon: "Gift", iconType: 'feather', title: "Date Of Birth", subtitle: singleCustomerData?.date_of_birth || '' },
                        { icon: 'LocalAtmSharp', iconType: 'material', title: "Curreny", subtitle: singleCustomerData?.currency || ' ' }
                    ]}
                />
                <div className="bg-transparent w-[1rem]"></div>

            </div>
            <div className="p-4 bg-white">
                <div className="h-[4rem] flex">
                    <label className="text-[20px] font-bold">{LANG.COMMON.BOOKINGHISTORY}</label>
                    <div className="ml-auto flex items-center space-x-4">
                        <DateFilter onDateRangeChange={handleDateRangeChange} options={[]} value={""} onChange={function (value: any): void {
                            throw new Error("Function not implemented.");
                        }} />

                        <PrButton label={'Excel'} iconName={'Download'} onClick={()=>{ generateExcelAndDownload(data,`booking_history_${singleCustomerData?.first_name}`) }} />
                        <PrRowPagination
                        totalRows={totalPages}
                        currentPageData={visibleData}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage} 
                        onItemsPerPageChange={(itemsPerPage) => {
                            setItemsPerPage(itemsPerPage)
                        }}/>
                        <PrPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange }></PrPagination>
                    </div>
                </div>
                <PrTable headers={[
                    {
                        name: '#',
                        id: 'index'
                    },
                    {
                        name: 'Booking Id',
                        id: 'booking_id'
                    },
                    {
                        name: 'Property Name',
                        id: 'property_name'
                    },
                    {
                        name: 'Booking On',
                        id: 'booking_date',
                        renderComponent:BookingDateFormat,
                        renderProps:{dataField:'booking_date'}
                    },
                    {
                        name: 'Rooms Selected',
                        id: 'room_id'
                    }, {
                        name: 'Guests',
                        id: 'no_of_adults'
                    }, {
                        name: 'Check In',
                        id: 'check_in_date',
                        renderComponent:BookingDateFormat,
                        renderProps:{dataField:'check_in_date'}
            
                    },
                    {
                        name: 'Check Out',
                        id: 'check_in_date',
                        renderComponent:BookingDateFormat,
                        renderProps:{dataField:'check_in_date'}
                    },
                    {
                        name: 'Booking Status',
                        id: 'payment_status'
                    },
                    {
                        name: 'Check In Status',
                        id: 'check_in_status'
                    }
                ]} data={visibleData || []}></PrTable>
            </div>

        </div>
    );
}

export default UserDetail;