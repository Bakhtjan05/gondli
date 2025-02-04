import React from 'react';
import { useEffect, useState } from 'react';
import "./Cancelation.scss"
import Image from 'next/image';



interface CancelationProps {

    handleOpenCancelation: () => void;
    openCancelation: boolean;
    selectedNewBooking?: NewBookings | null;
    selectedActiveBooking?: ActiveBookings | null;
    updateBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    updateActiveBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    setShowSuccessCancelation: React.Dispatch<React.SetStateAction<boolean>>;

}

interface NewBookings {
    orderId: string;
    customer: { name: string; image: string };
    bookingType: string;
    chosenService: string;
    paidAmount: string;
    date: string;
    time: string;
    status: "Pending" | "Accepted" | "Canceled";
}

interface ActiveBookings {
    orderId: string;
    customer: { name: string; image: string };
    bookingType: string;
    chosenService: string;
    paidAmount: string;
    date: string;
    time: string;
    status: "Pending" | "Accepted" | "Canceled";
}

const Cancelation: React.FC<CancelationProps> = ({

    handleOpenCancelation,
    openCancelation,
    selectedNewBooking,
    updateBookingStatus,
    updateActiveBookingStatus,
    selectedActiveBooking,
    setShowSuccessCancelation,

}) => {

    const handleCloseCancelation = () => {

        if (selectedNewBooking) {
            updateBookingStatus(selectedNewBooking.orderId, "Canceled");
        } else if (selectedActiveBooking) {
            updateActiveBookingStatus(selectedActiveBooking.orderId, "Canceled");
        }

        handleOpenCancelation()
        setShowSuccessCancelation(true)
        setTimeout(() => {
            setShowSuccessCancelation(false);
        }, 5000);
    }



    return (
        <div className='block-cancelation'>
            <div className='cancelation-info'>
                <div className='title'>
                    <h2>
                        <Image src="/images/bookingManage/gondi-logo.png" alt='' width={85} height={20} />
                    </h2>
                    <div onClick={handleOpenCancelation}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="main">
                    <h1 className='max-lg:!text-xl'>Confirm Cancelation</h1>
                    {selectedActiveBooking ? (
                        <p className='max-lg:!text-sm'>
                            Are you sure you want to proceed canceling order{" "}
                            <span> {selectedActiveBooking.orderId} </span> for{" "}
                            <span> {selectedActiveBooking.customer.name} </span> on{" "}
                            <span> {selectedActiveBooking.date} </span> at{" "}
                            <span>{selectedActiveBooking.time}?</span>
                        </p>
                    ) : selectedNewBooking ? (
                        <p className='max-lg:!text-sm'>
                            Are you sure you want to proceed canceling order{" "}
                            <span> {selectedNewBooking.orderId} </span> for{" "}
                            <span> {selectedNewBooking.customer.name} </span> on{" "}
                            <span> {selectedNewBooking.date} </span> at{" "}
                            <span>{selectedNewBooking.time}?</span>
                        </p>
                    ) : (
                        <p>No booking selected.</p>
                    )}
                </div>
                <div className="save-block">
                    <button className='discard max-lg:!text-sm' onClick={handleOpenCancelation}>Discard</button>
                    <button className='save max-lg:!text-sm' onClick={handleCloseCancelation}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default Cancelation;


