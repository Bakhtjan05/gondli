import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { useState } from 'react';

interface PaymentBlockProps {
    hanleDebitCardDropdown: () => void;
    handleSelectCard: (promo: string) => void;
    handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleExpirationDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCvc: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleZipCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hanleSaveCard: () => void;
    selectedDebitCard: string;
    debitCardDropdown: boolean;
    cardNumber: string;
    expirationDate: string;
    cvc: string;
    zipCode: string;
    saveCard: boolean;



}


const PaymentBlock: React.FC<PaymentBlockProps> = ({
    hanleDebitCardDropdown, 
    handleSelectCard, 
    handleCardNumberChange,
    handleExpirationDateChange,
    handleCvc,
    handleZipCode,
    hanleSaveCard,
    selectedDebitCard, 
    debitCardDropdown, 
    cardNumber,
    expirationDate,
    cvc,
    zipCode,
    saveCard,

}) => {

    return (
        
            <div className="pay-with">
                <h2>Pay With</h2>
                <div className='debit-card' onClick={hanleDebitCardDropdown}>
                    <div>
                        <div>
                            <Image src={'/images/booking/CreditCardOutline.svg'} alt='coupon' width={20} height={20} />
                        </div>
                        <p>{selectedDebitCard}</p>
                    </div>
                    <div className={`dropdown-icon ${debitCardDropdown ? "active" : ""}`}>
                        <Image src={'/images/booking/arrow-down.svg'} alt='arrow' width={12} height={12} />
                    </div>
                    <div className={`card-dropdown ${debitCardDropdown ? "active" : ""}`}>
                        <p onClick={() => handleSelectCard("Credit")}>Credit</p>
                        <p onClick={() => handleSelectCard("Debit Card")}>Debit Card</p>
                    </div>
                </div>
                <div className="card-number">
                    <input
                        type="text"
                        placeholder='Card Number'
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                    />
                </div>
                <div className='card-info'>
                    <input
                        type="text"
                        placeholder='Expiration Date'
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                        maxLength={5}
                    />
                    <input
                        type="text"
                        placeholder='CVC'
                        value={cvc}
                        onChange={handleCvc}
                        maxLength={3}
                    />
                </div>
                <div className="zip">
                    <input
                        type="text"
                        placeholder='Zip Code'
                        value={zipCode}
                        onChange={handleZipCode}
                    />
                </div>
                <div className="checkbox">
                    <div className={`checkbox-block ${saveCard === true ? "active" : ""}`} onClick={hanleSaveCard}>
                        <img className={`${saveCard === true ? "active" : ""}`} src="/images/booking/check-white.svg" alt="" />
                    </div>
                    <p>Save card for future payments</p>
                </div>
            </div>
       
    );
};

export default PaymentBlock;
