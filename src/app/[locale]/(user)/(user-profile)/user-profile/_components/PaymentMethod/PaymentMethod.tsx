"use client"


import React, { useState } from 'react';
import './PaymentMethod.scss';
import { Button } from '@/components/ui/button';
import { Visa, Mastercard, Paypal, Star, Trash } from '@/icons';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useUpcomingPage } from '../../UpcomingPageContext';

export default function PaymentMethod() {
  const { isUpcomingPage, setIsUpcoming } = useUpcomingPage();
  const [openForm, setOpenForm] = useState(false)
  const [loading, setLoading] = useState(false);

  const t = useTranslations();

  const paymentData = [
    {
      number: "4073 4200 7474 7474",
      name: "Mastercard",
      expiration: "08/26",

    },
    {
      number: "9800 6400 7474 7474",
      name: "Visa",
      expiration: "01/28",

    },
    {
      number: "4073 4200 7474 7474",
      name: "Mastercard",
      expiration: "08/26",

    },
  ]

  const backToNavbar = () => {
    setIsUpcoming(false)
  }
  const toggleForm = () => {
    setOpenForm(true)
  }

  const cancelForm = () => {
    setOpenForm(false)
  }
  return (
    <div className='paymentMethods'>
      <div className='title flex items-center gap-[10px]' onClick={backToNavbar}>
        <div className='lg:hidden'>
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
        </div>
        <h2 className='max-lg:!mb-0 max-lg:!text-xl'>{t(`paymentMethods`)}</h2>
      </div>

      <div className='paymentCard'>
        {paymentData.map((item, index) => (
          <div key={index}>
            <div className='paymentInfo max-lg:flex-col max-lg:items-start max-lg:gap-[20px]'>
              <div className='flex items-center gap-3'>
                <Visa />
                <div className='info'>
                  <p className='details'>{item.number}</p>
                  <div className='flex'>
                    <p className='type text-sm'>{item.name}</p>
                    <span className='divider'></span>
                    <p className='expiration text-sm'>Expiration: {item.expiration}</p>
                  </div>
                </div>
              </div>
              <div className='actions'>
                <button className='setDefaultButton'>
                  <span>
                    <Star />
                  </span>
                  Set Default
                </button>
                <button className='removeButton'>
                  <span>
                    <Trash />
                  </span>
                  Remove
                </button>
              </div>
            </div>
            <span className='border-btm'></span>
          </div>
        ))}
      </div>

      <div className='addPayment'>
        {openForm && (
          <div className='mb-4'>
            <div>
              <input className='py-2 px-4 rounded-xl' type="text" placeholder='Card Number' />
            </div>
            <div className='flex items-center mt-2'>
              <input className='py-2 px-4 rounded-xl' type="text" placeholder='Expiration Date' />
              <input className='py-2 px-4 rounded-xl' type="text" placeholder='CVV' />
            </div>
          </div>
        )}
        <div className='flex items-center gap-2'>
          <Button onClick={toggleForm}>Add Payment Method</Button>
          {openForm && (
            <Button onClick={cancelForm}>Cancel</Button>
          )}
        </div>
      </div>
    </div>
  );
}
