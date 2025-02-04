import React, { useEffect } from 'react';
import './ChoosenInfo.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectUpcomingPageState, setSelectedService, setSelectedTime, setSelectedDate } from '@/slices/upcomingPageSlice';

interface Props { }

const ChoosenInfo: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const { selectedService, selectedDate, selectedTime } = useSelector(selectUpcomingPageState);

    useEffect(() => {
        const savedSelectedService = localStorage.getItem('selectedService');
        const savedSelectedDate = localStorage.getItem('selectedDate');
        const savedSelectedTime = localStorage.getItem('selectedTime');

        if (savedSelectedService) {
            dispatch(setSelectedService(savedSelectedService));
        }
        if (savedSelectedDate) {
            dispatch(setSelectedDate(savedSelectedDate));
        }
        if (savedSelectedTime) {
            dispatch(setSelectedTime(savedSelectedTime));
        }
    }, [dispatch]);

    return (
        <div className="choosen-info">
            <div className="choosen-block">
                <div>
                    <p>{selectedService}</p>
                    <p>Chosen Service</p>
                </div>
                <div>
                    <img src="/images/booking/edit.svg" alt="" />
                    <p>Edit</p>
                </div>
            </div>
            <div className="choosen-block">
                <div>
                    <p>{selectedDate}</p>
                    <p>Chosen Date</p>
                </div>
                <div>
                    <img src="/images/booking/edit.svg" alt="" />
                    <p>Edit</p>
                </div>
            </div>
            <div className="choosen-block">
                <div>
                    <p>{selectedTime}</p>
                    <p>Chosen Start Time</p>
                </div>
                <div>
                    <img src="/images/booking/edit.svg" alt="" />
                    <p>Edit</p>
                </div>
            </div>
        </div>
    );
};

export default ChoosenInfo;