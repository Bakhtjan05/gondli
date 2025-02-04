import React, { useEffect, useState } from 'react';
import './PaymentDetails.scss'
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const PaymentDetails: React.FC = () => {

    const locale = useLocale();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [isProcessingSuccessful, setIsProcessingSuccessful] = useState(false);


    const paymentDetails = {
        choosenService: {
            name: "Chosen Service",
            rate: "40 CHF / 1 hour"
        },
        serviceFee: {
            name: "Service Fee",
            amount: "10 CHF"
        },
        total: {
            amount: "50.00"
        }
    }

    const handlePayment = () => {
        setIsProcessing(true);


        setTimeout(() => {
            setIsProcessingSuccessful(true);
        }, 2000);


    };

    const toBookingOverview = () => {
        router.push(`/${locale}/GroupBookingPage/ReservationPage`);
    }

    const handleCloseSuccess = () => {
        setIsProcessing(false)
    }


    return (
        <div className="payment-details max-lg:!pb-6">


            <h2>Payment Details</h2>
            <div className='subscription'>
                <p className='font-light'>Activate <a href="#" className='link !underline !font-semibold'>Subscription</a> and save more on <br /> selected services while booking them on Gondli
                </p>
            </div>
            <div className="details">
                <div className='choosen-service'>
                    <p className='text-sm'>{paymentDetails.choosenService.name}</p>
                    <p className='text-sm'>{paymentDetails.choosenService.rate}</p>
                </div>
                <div className="service-fee">
                    <p className='text-sm'>{paymentDetails.serviceFee.name}</p>
                    <p className='text-sm'>{paymentDetails.serviceFee.amount}</p>
                </div>
                <div className="total">
                    <p>Total</p>
                    <p><span>{paymentDetails.total.amount}</span> CHF</p>
                </div>
            </div>
            <button className='confirmBtn' onClick={handlePayment} disabled={isProcessing}>
                Confirm & Pay
            </button>

            {isProcessing && (
                <div className="processing-message">
                    <div className='processing-block'>
                        <div className='w-full header flex justify-between items-center'>
                            <Image src={"/images/icons/booking-logo.png"} alt='' width={101} height={22} />
                            <button onClick={handleCloseSuccess}>
                                <Image src={"/images/icons/booking-x.svg"} alt='' width={20} height={20} />
                            </button>
                        </div>
                        {isProcessingSuccessful ? (
                            <div className="loading-successful">
                                <Image src="/images/booking/check-white.svg" alt='' width={20} height={20} />
                            </div>
                        ) : (
                            <div className="loading-circle">
                            </div>
                        )}

                        {isProcessingSuccessful ? (
                            <p className='font-bold mb-3 text-[28px] max-lg:text-xl'>Payment Successful</p>
                        ) : (
                            <p className='font-bold mb-3 text-[28px] max-lg:text-xl'>Processing Payment</p>
                        )}
                        {isProcessingSuccessful ? (
                            <p className=' mb-10 max-lg:mb-20'>Your request was successfully received, but your reservation has not yet been confirmed. The venue must review your reservation and provide additional access. Your confirmation will be sent to you via email and Gondli.</p>
                        ) : (
                            <p className='mb-10 max-lg:mb-20'>Payment is being processed. Please, do not close the window before the process is fully complete.</p>
                        )}

                        {isProcessingSuccessful ? (
                            <button className='confirmBtn in' onClick={toBookingOverview}>Check Your Booking</button>
                        ) : (
                            <p></p>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentDetails;