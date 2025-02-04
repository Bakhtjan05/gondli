'use client';

import React, { useState, ChangeEvent } from 'react'
import './SingleBookingPage.scss';
import Image from 'next/image'
import PaymentDetails from './_components/PaymentDetails/PaymentDetails';
import ChoosenService from './_components/ChoosenService/ChoosenService';
import ChoosenInfo from './_components/ChoosenInfo/ChoosenInfo';
import Masseur from './_components/Masseur/Masseur';
import ReservationPage from './ReservationPage/page';
import { Elements } from '@stripe/react-stripe-js';
import ExtraOptions from './_components/ExtraOptions/ExtraOptions';
import { loadStripe } from '@stripe/stripe-js';
import PaymentBlock from './_components/PaymentBlock/PaymentBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setFullName, setEmail, setPhoneNumber, setAdditionalComment, selectUpcomingPageState } from '@/slices/upcomingPageSlice';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);



const SingleBookingPage: React.FC = () => {


  const dispatch = useDispatch()

  const { fullName, email, phoneNumber, additionalComment } = useSelector(selectUpcomingPageState);


  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const [oneIsMe, setoneIsMe] = useState(false);
  const [couponDropdown, setCouponDropdown] = useState(false)
  const [debitCardDropdown, setDebitCardDropdown] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState("Coupon or Voucher");
  const [selectedDebitCard, setSelectedDebitCard] = useState("Credit or Debit Card");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [saveCard, setSaveCard] = useState(false);

  const [attendingFirst, setAttendingFirst] = useState<string>("");
  const [attendingSecond, setAttendingSecond] = useState<string>("");
  const [payFull, setPayFull] = useState(false)
  const [payPart, setPayPart] = useState(false)
  const [coinsDropdown, setCoinsDropdown] = useState(false)



  const [selectedDiscount, setSelectedDiscount] = useState<{
    percent?: string;
    amount?: string;
    source: string;
    icon?: string;
    name?: string;
  } | null>(null);




  const coinsDiscount = [
    { percent: "10% Off", amount: "-100 Karma Coins" },
    { percent: "20% Off", amount: "-200 Karma Coins" },
    { percent: "20% Off", amount: "-200 Karma Coins" },
  ]

  const availableCouponData = [
    { icon: "/images/booking/coupon-icon.svg", name: "Yoga Discount", discount: "10% OFF" },
    { icon: "/images/booking/coupon-icon.svg", name: "Yoga Discount", discount: "10% OFF" },
  ]



  const handleCoinsDropdown = () => {
    setCoinsDropdown((prev) => !prev)
  }

  const handleClickCheckbox = () => {
    setActiveCheckbox((prev) => !prev);
  };

  const handleClickOneIsMe = () => {
    setoneIsMe((prev) => !prev)
  }

  const hanleCouponDropdown = () => {
    setCouponDropdown((prev) => !prev);
  }

  const hanleSaveCard = () => {
    setSaveCard((prev) => !prev);
  }

  const handleSelectPromo = (promo: string) => {
    setSelectedPromo(promo);
    setCouponDropdown(true);
    setSelectedDiscount(null)

  };

  const hanleDebitCardDropdown = () => {
    setDebitCardDropdown((prev) => !prev);
  }

  const handleSelectCard = (promo: string) => {
    setSelectedDebitCard(promo);
    setDebitCardDropdown(true);

  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value.replace(/\D/g, "");

    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(value);
  };

  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setExpirationDate(value);
  };

  const handleCvc = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value.replace(/\D/g, "");
    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    setCvc(value)

  }

  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value.replace(/\D/g, "");

    setZipCode(value)
  }


  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;

    dispatch(setFullName(value))
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;

    dispatch(setEmail(value))
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value.replace(/[^0-9+\-]/g, "");

    dispatch(setPhoneNumber(value))
  }

  const handleAdditionalComment = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;

    dispatch(setAdditionalComment(value))
  }

  const handleAttendingFirst = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;

    setAttendingFirst(value)
  }

  const handleAttendingSecond = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;

    setAttendingSecond(value)
  }

  const handlePayFull = () => {
    setPayFull((prev) => !prev)
    setPayPart(false)
  }
  const handlePayPart = () => {
    setPayPart((prev) => !prev)
    setPayFull(false)
  }

  const handleCoinsDiscount = (item: { percent: string; amount: string }) => {
    setSelectedDiscount({ ...item, source: "coinsDiscount" })
    setCoinsDropdown(false)
  }

  const handleAvailableCoupon = (item: { icon: string; name: string }) => {
    setSelectedDiscount({ ...item, source: "availableCoupon" })
    setCoinsDropdown(false)
  }


  return (
    <div className='box'>
      <div className="container">
        <h1>Confirm Details</h1>
        <div className="main">
          <Elements stripe={stripePromise}>
            <div className="confirm-details">
              <ChoosenService />
              <ChoosenInfo />
              <Masseur />
              <ExtraOptions />
              <div className="spotify">
                <div className='text-side'>
                  <p className='font-light'><span>Pro Tip:</span> Join the Spotify Blend to have an opportunity to participate to the creation of playlists that use music to help people stay energetic.</p>
                  <button className='spotify-btn'>Join Spotify Blend</button>
                </div>
                <div className='logo-side'>
                  <Image src="/images/booking/spotify-logo.svg" alt="spotify" width={220} height={220} />
                </div>
              </div>
              <div className="contact-info">
                <h2>Contact Information</h2>
                <form action="">
                  <input
                    className='contact-input'
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={handleFullNameChange}
                  />
                  <input
                    className='contact-input'
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <input
                    className='contact-input'
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  <input
                    className='contact-input'
                    type="text"
                    placeholder="Additional Comment"
                    value={additionalComment}
                    onChange={handleAdditionalComment}
                  />
                  <div className="checkbox">
                    <div className={`checkbox-block ${activeCheckbox === true ? "active" : ""}`} onClick={handleClickCheckbox}>
                      <img className={`${activeCheckbox === true ? "active" : ""}`} src="/images/booking/check-white.svg" alt="" />
                    </div>
                    <p>Fill it out with my profile information</p>
                  </div>

                  <div className="payment">
                    <h2>Payment</h2>
                    <div className={`pay-full ${payFull === true ? "active" : ""}`} onClick={handlePayFull}>
                      <p>Pay in full</p>
                      <p>Pay total now (50 CHF) and you are all set</p>
                      <div className={`checkbox ${payFull === true ? "active" : ""}`}>
                      </div>
                      <div className={`check-circle ${payFull === true ? "active" : ""}`}>
                        <Image className={`${payFull === true ? 'active' : ''}`} src="/images/booking/check-mark-dark.svg" alt='checked' width={7} height={7} />
                      </div>
                    </div>
                    <div className={`pay-part ${payPart === true ? "active" : ""}`} onClick={handlePayPart}>
                      <p>Pay part now, part later</p>
                      <p>Pay part now (25 CHF), and other half (25 CHF) one day before reservation</p>
                      <div className={`checkbox ${payPart === true ? "active" : ""}`}>
                      </div>
                      <div className={`check-circle ${payPart === true ? "active" : ""}`}>
                        <Image className={`${payPart === true ? 'active' : ''}`} src="/images/booking/check-mark-dark.svg" alt='checked' width={7} height={7} />
                      </div>
                    </div>
                  </div>
                  <div className="promo-code">
                    <h2>Have a Promo Code?</h2>
                    <div className='coupon-block' onClick={hanleCouponDropdown}>
                      <div>
                        <div>
                          <Image src={`${selectedPromo === "Coupon or Voucher" ? "/images/booking/coupon.svg" : "/images/booking/wizard-badge.svg"}`} alt='coupon' width={20} height={20} />
                        </div>
                        <p>{selectedPromo}</p>
                      </div>
                      <div className={`dropdown-icon ${couponDropdown ? "active" : ""}`}>
                        <Image src={"/images/booking/arrow-down.svg"} alt='arrow' width={12} height={12}></Image>
                      </div>
                      <div className={`promo-dropdown ${couponDropdown ? "active" : ""}`}>
                        <p onClick={() => handleSelectPromo("Coupon or Voucher")}>Coupon or Voucher</p>
                        <p onClick={() => handleSelectPromo("Use Karma Coins")}>
                          <Image src="/images/booking/wizard-badge.svg" alt='' width={20} height={20} />
                          Use Karma Coins
                        </p>
                      </div>
                    </div>
                    {selectedPromo === "Coupon or Voucher" ? (
                      <div className='promo-block'>
                        <input className='promo-input' type="text" placeholder='Promo Code' />
                        <button type="button">Apply</button>
                      </div>
                    ) : (
                      <>
                        <div className='coins-dropdown-block'>
                          <div className={`coins-dropdown ${coinsDropdown ? "active" : ""}`} onClick={handleCoinsDropdown}>
                            {!selectedDiscount ? (
                              <p className='selected-default'>Select Discount</p>
                            ) : (
                              <>
                                {selectedDiscount.source === "coinsDiscount" && (
                                  <div className="discount-amount">
                                    <p className="percent">{selectedDiscount.percent}</p>
                                    <p className="coins">{selectedDiscount.amount}</p>
                                  </div>
                                )}
                                {selectedDiscount.source === "availableCoupon" && (
                                  <div className="available-coupon-choosen">
                                    {selectedDiscount?.icon && (
                                      <Image src={selectedDiscount.icon} alt='' width={20} height={20} />
                                    )}
                                    <p className="coins">{selectedDiscount.name}</p>
                                  </div>
                                )}
                              </>
                            )}
                            <Image className={`dropdown-icon ${coinsDropdown ? "active" : ""}`} src={"/images/booking/arrow-down.svg"} alt='arrow' width={12} height={12} />
                          </div>
                          <div className={`dropdown-block ${coinsDropdown ? "active" : ""}`}>
                            {coinsDiscount.map((item, index) => (
                              <div className='discount-amount' key={index} onClick={() => handleCoinsDiscount(item)}>
                                <p className='percent'>{item.percent}</p>
                                <p className='coins'>{item.amount}</p>
                              </div>
                            ))}
                            <h3>Available Coupons</h3>
                            {availableCouponData.map((item, index) => (
                              <div className="available-coupon" key={index} onClick={() => handleAvailableCoupon(item)}>
                                <div className='title'>
                                  <Image src={item.icon} alt='' width={32} height={32} />
                                  <p>{item.name}</p>
                                </div>
                                <button className='available-btn'>{item.discount}</button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className='total-coins'>You have a total of <span>340 Karma Coins</span> on your account. you can use one of following options.</p>
                      </>
                    )}
                  </div>
                  <PaymentBlock
                    hanleDebitCardDropdown={hanleDebitCardDropdown}
                    handleSelectCard={handleSelectCard}
                    handleCardNumberChange={handleCardNumberChange}
                    handleExpirationDateChange={handleExpirationDateChange}
                    handleCvc={handleCvc}
                    handleZipCode={handleZipCode}
                    hanleSaveCard={hanleSaveCard}
                    selectedDebitCard={selectedDebitCard}
                    debitCardDropdown={debitCardDropdown}
                    cardNumber={cardNumber}
                    expirationDate={expirationDate}
                    cvc={cvc}
                    zipCode={zipCode}
                    saveCard={saveCard}

                  />
                  <div className="policy max-lg:hidden">
                    <h2>Cancelation Policy</h2>
                    <p>Free cancellation <span> before Jul 6. </span> Cancel before check-in on <span> Jul 24 </span> for a partial refund. <a href="#" >Learn More</a></p>
                  </div>
                </form>
              </div>
            </div>
            <PaymentDetails cardNumber={cardNumber} expirationDate={expirationDate} cvc={cvc} />
            <div className="policy lg:hidden !pt-6 pb-15 border-t border-[#DBECF0]">
              <h2>Cancelation Policy</h2>
              <p className='mt-6'>Free cancellation <span className='font-bold'> before Jul 6. </span> Cancel before check-in on <span className='font-bold'> Jul 24 </span> for a partial refund. <a href="#" className='font-bold'>Learn More</a></p>
            </div>
          </Elements>
        </div>
      </div>

    </div>
  )
}

export default SingleBookingPage