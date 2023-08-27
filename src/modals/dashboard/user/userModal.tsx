import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import products from './sampleProduct';
import { initialuserModalInput, userModalInputT } from './common/userCommon';
import { useDebounce } from '@uidotdev/usehooks';
import _ from 'lodash';
import DateFilter from '@/components/common/DateFilter/dateFilter';
import DateFormat from '@/components/common/DateFormat/dateFormat';
import {H1} from '@/components/common/Header/header';
import PrButton from '@/components/common/PrButton/PrButton';
import PrIcon from '@/components/common/PrIcon/PrIcon';
import PrSearch from '@/components/common/PrSearch/PrSearch';
import PrTable from '@/components/common/PrTable/PrTable';
import { TableCellPropsT } from '@/components/common/PrTable/PrTableCommon';
import { LANG } from '@/components/lang/Lang';










const TotalBookingText: React.FC<TableCellPropsT> = ({ data }) => {
    return (
        <label className='font-bold text-black text-[18px]'>{data}</label>
    );
};

const JoinedDateText : React.FC<TableCellPropsT>=({data})=>{
    return(
        <DateFormat date={data} formatType="dd MMM yyyy" className="text-black" />

    )
}


const UserModal = () => {
    const router = useRouter();
    const [userData,setUserData]=useState<userModalInputT>(initialuserModalInput);
    const searchText=useDebounce(userData.searchText,20);

    const filteredData = useMemo(() => {
        return searchText
            ? products.filter(product => {
                return _.some(product, value => {
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchText.toLowerCase());
                    }
                    return false;
                });
            })
            : products;
    }, [searchText]);

    const handleEditClick = (id:string) => {
        router.push(`/dashboard/userdetail/${id}`);
    };
    const EditButton: React.FC<TableCellPropsT> = ({ rowIndex,rowData }) => {    
   
        return (
            <div onClick={() => handleEditClick(rowData?.customer_id)} className='cursor-pointer'>
               <PrIcon name={'Eye'} color='blue' ></PrIcon>
            </div>
        );
    };
    


    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
        handleState({ filterDate:`${startDate} - ${endDate}` });
    };

    const handleState = (data:Partial<userModalInputT>)=>{
        setUserData((prevState)=>({
            ...prevState,
            ...data
        }))
    }


    return (
        <div className="p-3">
            <div className="h-[4rem] flex">
                <H1>{LANG.COMMON.USERMANAGEMENT}</H1>
                <div className="ml-auto flex items-center space-x-4">
                    <DateFilter onDateRangeChange={handleDateRangeChange} />
                    <PrButton label={'Excel'} iconName={'Download'} />
                    <PrSearch
                        value={userData.searchText}
                         onSearch={(e)=>handleState({ searchText:e.target.value }) }                    ></PrSearch>
                </div>
            </div>

            <PrTable
                headers={[
                    {
                        id: 'index',
                        name: '#'
                    },
                    {
                        name: 'First Name',
                        id: 'first_name'
                    },
                    {
                        name: 'Last Name',
                        id: 'last_name'
                    },
                    {
                        name: 'Mobile Number',
                        id: 'mobile_number'
                    },
                    {
                        name: 'Email Address',
                        id: 'email_address'
                    },
                    {
                        name:'Total Bookings',
                        id:'total_bookings',
                        renderComponent:TotalBookingText,
                        renderProps:{dataField:'total_bookings'}
                    },
                    {
                        name:'Joined Date',
                        id:'joined_date',
                        renderComponent:JoinedDateText,
                        renderProps:{dataField:'joined_date'}
                    },
                    {
                        name: 'Action',
                        id: 'Edit',
                        renderComponent: EditButton,
                        renderProps: { dataField: 'Edit' } // You don't need to pass the rowIndex here
                    }
                ]}
                data={filteredData}
            />
        </div>
    );
};



export default UserModal;
