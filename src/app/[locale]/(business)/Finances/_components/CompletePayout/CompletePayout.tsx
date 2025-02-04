"use client"

import React, { useEffect, useRef, useState } from 'react';
import "./CompletePayout.scss"
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface CompletePayoutProps {

}

const CompletePayout: React.FC = () => {
    const t = useTranslations();

    return (
        <div className='complete-payout'>
            <div className='discount max-lg:!p-4'>
                <div className='discountWrapper max-lg:!flex-col max-lg:!gap-5'>
                    <div className='content max-lg:!order-2 '>
                        <h2 className='max-lg:!text-base'>You need to set Payout Account to Withdraw Funds</h2>

                        <p className='max-lg:!text-sm max-lg:!mb-6'>To get payout on your desired bank account, you need to finish setting up Gondli payments</p>

                        <div className='buttons'>
                            <button>Complete Payout Details</button>
                        </div>
                    </div>

                    <div>
                        <Image
                            priority
                            width={145}
                            height={145}
                            src='/images/finance-page/notification.png'
                            alt='Discount'
                            className='max-lg:!w-24 '
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CompletePayout;