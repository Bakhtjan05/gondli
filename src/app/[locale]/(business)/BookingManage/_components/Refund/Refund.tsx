import React from 'react';
import { useEffect, useState } from 'react';
import "./Refund.scss"
import Image from 'next/image';



interface RefundProps {
    handleOpenRefund: () => void;
    openRefund: boolean;

}

const Refund: React.FC<RefundProps> = ({
    handleOpenRefund,
    openRefund,

}) => {
    return (
        <div className="block-refund">
            <div className="refund-info">
                <div className='title'>
                    <h2>
                        <Image src="/images/bookingManage/gondi-logo.png" alt='' width={85} height={20} />
                    </h2>
                    <div onClick={handleOpenRefund}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="main max-lg:mt-4">
                    <h1 className='max-lg:!text-xl'>Confirm Refund</h1>
                    <p className='max-lg:!text-sm'>Are you sure you want to proceed refunding order <span className='font-bold'>#132631</span>
                        for <span className='font-bold'>Wilfred Anderson</span> of amount of <span className='font-bold'>40.00 CHF?</span>
                    </p>

                    <div className="refund-details">
                        <h3>Refund Details</h3>
                        <div className="policy">
                            <div>
                                <p className='policy-value max-lg:!text-sm'>Firm</p>
                                <p className='policy-title'>Your Cancelation Policy</p>
                            </div>
                            <div className='edit'>
                                <button>
                                    <Image src="/images/bookingManage/edit-dark-icon.svg" alt='' width={14} height={14} />
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="service-price">
                            <div>
                                <p className='price-value max-lg:!text-sm'>40.00 CHF</p>
                                <p className='price-title'>Chosen Service Price</p>
                            </div>
                            <div className='edit'>
                                <p className='max-lg:!text-sm'><Image src="/images/bookingManage/green-check-icon.svg" alt='' width={18} height={18} /> 100% Refundable</p>
                            </div>
                        </div>
                        <div className="service-fee">
                            <div>
                                <p className='price-value max-lg:!text-sm'>10.00 CHF</p>
                                <p className='price-title'>Service Fee</p>
                            </div>
                            <div className='edit'>
                                <p className='max-lg:!text-sm'><Image src="/images/bookingManage/x-red-outline.svg" alt='' width={18} height={18} /> Non-Refundable</p>
                            </div>
                        </div>
                        <div className="total">
                            <div>
                                <p className='price-value max-lg:!text-sm'>10.00 CHF</p>
                                <p className='price-title'>Service Fee</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="save-block">
                    <button className='discard' onClick={handleOpenRefund}>Discard</button>
                    <button className='save' onClick={handleOpenRefund}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default Refund;