// CustomDatePicker.tsx
import Image from 'next/image';
import React, { useState } from 'react';

interface CustomDatePickerProps {
  onDateSelect: (date: Date) => void; // New prop type
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay(); // Get the first day of the week
    const days = [];

    // Fill in the previous month's days (grayed out)
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div className='day prev-month' key={`prev-${i}`}>
          {prevMonthDays - i}
        </div>,
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          className={`day ${selectedDate === day ? 'selected' : ''}`}
          key={`current-${day}`}
          onClick={() => {
            setSelectedDate(day);
            onDateSelect(new Date(year, month, day)); // Call the prop function on date select
          }}
        >
          {day}
        </div>,
      );
    }

    // Fill in the next month's days (grayed out)
    const nextMonthDays = 42 - days.length; // To fill 6 rows of the calendar grid (7 days * 6 = 42)
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div className='day next-month' key={`next-${i}`}>
          {i}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className='datepicker'>
      <div className='datepicker-content'>
        <div className='month-navigation'>
          <button onClick={handlePreviousMonth}>
            <Image
              priority
              src='/images/services/dropdown.svg'
              width={8}
              height={4}
              alt='dropdown'
              className='dropdown-icon'
            />
          </button>
          <span className='month-year'>
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </span>
          <button onClick={handleNextMonth}>
            <Image
              priority
              src='/images/services/dropdown.svg'
              width={8}
              height={4}
              alt='dropdown'
              className='dropdown-icon'
            />
          </button>
        </div>
        <div className='days-of-week'>
          {daysOfWeek.map((day, index) => (
            <div className='day-of-week' key={index}>
              {day}
            </div>
          ))}
        </div>
        <div className='days-grid'>{renderDays()}</div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
