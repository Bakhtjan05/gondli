import React, { useEffect, useState } from 'react';
import './PaymentDetails.scss'
import { loadStripe } from '@stripe/stripe-js';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpcomingPageState, setSelectedServicePrice } from '@/slices/upcomingPageSlice';
import axios from '@/lib/axios';
import { useAuth } from '@/types/auth';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface PaymentDetailsProps {
    cardNumber: string;
    expirationDate: string;
    cvc: string;

}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ cardNumber, expirationDate, cvc }) => {
    const dispatch = useDispatch()
    const locale = useLocale();
    const router = useRouter();
    const { token } = useAuth();


    const [isProcessing, setIsProcessing] = useState(false);
    const [isProcessingSuccessful, setIsProcessingSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);


    const { selectedServicePrice } = useSelector(selectUpcomingPageState);




    useEffect(() => {
        const savedSelectedServicePrice = localStorage.getItem('selectedServicePrice');


        if (savedSelectedServicePrice) {
            dispatch(setSelectedServicePrice(savedSelectedServicePrice));
        }

    }, [dispatch]);

    // const handlePayment = () => {
    //     setIsProcessing(true);


    //     setTimeout(() => {
    //         setIsProcessingSuccessful(true);
    //     }, 2000);


    // };

    const handlePayment = async () => {
        const stripe = await stripePromise;
        if (!stripe) {
            console.error("Stripe failed to load.");
            return;
        }

        setIsProcessing(true);
        setLoading(true);

        try {
            // Создаем Stripe токен на основе введенных данных

            // Отправляем данные на сервер
            const response = await axios.post('/api/confirm-pay',
                {
                    service_id: 1, // Здесь подставьте нужный ID услуги
                    date: "2025-02-01",
                    time: "12:00",
                    practitioner_id: null,
                    discount_code: null,
                    payment_option: "full",
                    additional_email: null,
                    stripeToken: "tok_visa"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Добавляем токен авторизации в заголовок
                    },
                }
            );

            setIsProcessingSuccessful(true);
        } catch (err) {
            console.error("Payment Error:", err);
            alert("Ошибка при оплате!");
        } finally {
            setLoading(false);
        }
    };



    const toBookingOverview = () => {
        router.push(`/${locale}/SingleBookingPage/ReservationPage`);
    }

    const handleCloseSuccess = () => {
        setIsProcessing(false)
    }



    return (
        <div className="payment-details max-lg:!pb-6">


            <h2>Payment Details</h2>
            <div className='subscription'>
                <p className='font-light text-sm'>Activate <a href="#" className='link !underline !font-semibold'>Subscription</a> and save more on <br /> selected services while booking them on Gondli
                </p>
            </div>
            <div className="details">
                <div className='choosen-service'>
                    <p className='text-sm'>Chosen Service</p>
                    <p className='text-sm'>{selectedServicePrice} / 1 hour</p>
                </div>
                <div className="service-fee">
                    <p className='text-sm'>Service Fee</p>
                    <p className='text-sm'>10</p>
                </div>
                <div className="total">
                    <p>Total</p>
                    <p><span>{Number(selectedServicePrice) + 10}</span> CHF</p>
                </div>
            </div>
            <button className='confirmBtn' onClick={handlePayment} disabled={isProcessing}>
                Confirm & Pay
            </button>

            {isProcessing && (
                <div className="processing-message">
                    <div className='processing-block'>
                        <div className='w-full header-success flex justify-between items-center'>
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