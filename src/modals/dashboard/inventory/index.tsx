import HorizontalCalendar from "@/components/common/PrHorizontalCalendar";

export default function InventoryManagement(){
    const numberOfDays = 7; 
    return(
        <div>
            <HorizontalCalendar numberOfDays={numberOfDays}/>
        </div>
    );
}