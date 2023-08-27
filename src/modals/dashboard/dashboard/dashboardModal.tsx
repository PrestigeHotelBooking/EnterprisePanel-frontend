import React from 'react';
import DashboardCard from "@/components/common/Card/DashboardCard/DashboardCard";
import { DashboardCardKey, DashboardConfiguration } from "./common/dashboardTypes";


const cardOrder: DashboardCardKey[] = ['BOOKING','CANCELLED_BOOKING','REGISTERED_USERS', 'REVENUE'];

export default function DashboardModal() {
    return (
        <div>
            <div className='flex space-x-4'>
                {cardOrder.slice(0, 4).map(key => (
                    <DashboardCard
                        key={key}
                        icon={DashboardConfiguration[key].icon}
                        title={DashboardConfiguration[key].title}
                        counter={ 2000}
                        className={DashboardConfiguration[key].className}
                        iconClassName={DashboardConfiguration[key].iconClassName}
                    />
                ))}
                <div className='w-[2rem]'></div>
            </div>
            <div className='flex space-x-4 space-y-8'>
                <div className='w-[2rem]'></div>
                {cardOrder.slice(4).map(key => (
                    <DashboardCard
                        key={key}
                        icon={DashboardConfiguration[key].icon}
                        title={DashboardConfiguration[key].title}
                        counter={3255}
                        className={DashboardConfiguration[key].className}
                        iconClassName={DashboardConfiguration[key].iconClassName}
                    />
                ))}
                <div className='w-[2rem]'></div>
            </div>
        </div>
    );
}
