import React from 'react';

interface CalendarItem {
  month: string;
  date: number;
  day: string;
}

interface HorizontalCalendarProps {
  numberOfDays: number;
}

const generateCalendarData = (numberOfDays: number): CalendarItem[] => {
  const startDate = new Date(); 
  const calendarData: CalendarItem[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const date = currentDate.getDate();
    const day = currentDate.toLocaleString('en-US', { weekday: 'short' });

    calendarData.push({ month, date, day });
  }

  return calendarData;
};

const HorizontalCalendar: React.FC<HorizontalCalendarProps> = ({ numberOfDays }) => {
  const calendarData = generateCalendarData(numberOfDays);

  return (
    <div className="w-full overflow-x-auto">
      <div className='p-2 rounded-md bg-white'>
      <div className='w-full h-16 border-b-2 flex flex-row justify-between'>
        <div className='text-2xl font-bold p-4'>{`Inventory Management`}</div>
        <div></div>
      </div>
      <div className='p-4 flex flex-row'>
        <div className='p-2 font-bold text-xl w-1/4 text-center items-center'>
          Room Type
        </div>
        <div className="flex w-full whitespace-nowrap">
          {calendarData.map((item, index) => (
            <div key={index} className="flex-grow text-center border-2 rounded-md p-8 border-blue-500 mr-4">
              <div className="font-bold text-lg mb-2">{item.day}</div>
              <div className="text-3xl font-bold -blue-500 mb-2">{item.date}</div>
              <div>{item.month}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default HorizontalCalendar;
