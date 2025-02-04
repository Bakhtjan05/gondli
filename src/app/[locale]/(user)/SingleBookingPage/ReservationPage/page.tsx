'use client';


import { useLocale } from 'next-intl';
import './ReservationPage.scss'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import {  selectUpcomingPageState } from '@/slices/upcomingPageSlice';




const ReservationPage: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();

  const { fullName, email, phoneNumber, selectedServicePrice, selectedService, selectedDate, selectedTime } = useSelector(selectUpcomingPageState);


  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState('Rate this!');
  const [pendingStatus, setPendingStatus] = useState(false);
  const [isFeedbackSent, setIsFeedbackSent] = useState(false)
  const [text, setText] = useState(''); // Храним значение textarea



  const handleRating = (index: number) => {
    setRating(index + 1);

    const ratingTexts = [
      'Poor',
      'Not bad',
      'Average',
      'Good',
      'Amazing!'
    ];

    setRatingText(ratingTexts[index]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPendingStatus(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sendingFeedback = () => {
    setIsFeedbackSent(true)
  }

  const toClaimKarma = () => {
    router.push(`/${locale}/SingleBookingPage`);

  }


  const serviceData = [
    {

      rating: "8.5",
      location: "Seefeld",
    }
  ]

  const checkinDetails = {
    confirmationCode: {
      code: "HMEEYXCZA5",
    },

    service: {
      name: "Gentle Flow Yoga Class",
    },

    masseur: {
      name: "Winifred Wuckert",
      rating: 9.2,
    },

    date: {
      selectedDate: "24 July, 2024",
    },

    time: {
      selectedTime: "11:30 AM",
    },
  }

  

  const handleCloseFeedback = () => {
    setIsFeedbackSent(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div className="hero-img-top lg:hidden relative">
        <Image src="/images/booking/reservation-hero.png" alt='service-photo' width={1920} height={448}></Image>
        <div className='absolute left-4 top-3'>
          <div className='heart-icon-block w-8 h-8 rounded-full bg-[#0000004D] flex justify-center items-center'>
            <Image src={"/images/icons/wellness-left.svg"} alt='' width={16} height={16} />
          </div>
        </div>
        <div className='absolute right-4 top-3'>
          {pendingStatus ? (
            <div className='status-attended'>
              <Image src="/images/booking/check-white.svg" alt='' width={12} height={12} />
              <p>Attended</p>
            </div>
          ) : (
            <div className='status-pending'>
              <Image src="/images/booking/Clock.svg" alt='clock' width={16} height={16}></Image>
              <p>Pending</p>
            </div>
          )}
        </div>
      </div>
      <div className="container-reservation">
        <div className='reservation-map'>
          <div className="reservation-block">
            <div className='title-block'>
              <div>
                <h1 className='text-[28px] font-bold max-lg:text-xl'>Harmony Haven Wellness Center</h1>
                <div className="rating">
                  <p><Image src="/images/booking/star.svg" alt="star" width={12} height={12} /> {serviceData[0].rating} </p>
                  <div className="dot"></div>
                  <p>$$<span>$$</span></p>
                  <div className="dot"></div>
                  <p>{serviceData[0].location}</p>
                </div>
              </div>
              {pendingStatus ? (
                <div className='status-attended max-lg:!hidden'>
                  <Image src="/images/booking/check-white.svg" alt='' width={12} height={12} />
                  <p>Attended</p>
                </div>
              ) : (
                <div className='status-pending max-lg:!hidden'>
                  <Image src="/images/booking/Clock.svg" alt='clock' width={16} height={16}></Image>
                  <p>Pending</p>
                </div>
              )}
            </div>
            <div className="hero-img max-lg:hidden">
              <Image src="/images/booking/reservation-hero.png" alt='service-photo' width={1920} height={448}></Image>
            </div>
            <div className='host-name'>
              <div className='name'>
                <div>
                  <Image src="/images/booking/host-logo.png" alt='logo' width={40} height={40} />
                </div>
                <div className='name-date'>
                  <p>Hosted By Vitra <Image src="/images/booking/tick.svg" alt='tick' width={18} height={18} /></p>
                  <p>Member Since 16 Aug, 2023</p>
                </div>
              </div>
              <button className="message max-lg:!hidden">
                <Image src="/images/booking/chat-icon.svg" alt='chat' width={20} height={20}></Image>
                Message Your Host
              </button>
              <button className="message lg:hidden">
                <Image src="/images/booking/chat-icon.svg" alt='chat' width={20} height={20}></Image>
              </button>
            </div>
            <div className="confirmation-message">
              <h3>Note From The Venue</h3>
              <p className='user-name'>Dear Madeline,</p>
              <p className='main-text'>We&apos;re excited to welcome you to Harmony Haven for your upcoming reservation. Our team is eagerly preparing to provide you with a blissful experience. Remember to arrive 10 minutes early to fully unwind before your appointment. Looking forward to pampering you soon!</p>
              <p className='wishes'>Best wishes, </p>
              <p className='from'>The Harmony Haven Wellness Center</p>
            </div>
            <div className="checkin-details">
              <h3>Check-in Details</h3>
              <p>Check-in details edit is available before <span className='available-date'> 23 July, 2024</span></p>
              <div className='check-in-block'>
                <div className='confirmation-code'>
                  <div>
                    <p>{checkinDetails.confirmationCode.code}</p>
                    <p>Confirmation Code</p>
                  </div>
                  <button>
                    <Image src="/images/booking/qrcode-icon.png" alt='qr' width={16} height={16} />
                    QR Code
                  </button>
                </div>
                <div className="choosen-service">
                  <div>
                    <p>{selectedService}</p>
                    <p>Chosen Service</p>
                  </div>
                  <button >
                    <Image src="/images/booking/edit.svg" alt="" width={16} height={16} />
                    <p>Edit</p>
                  </button>
                </div>
                <div className="choosen-masseur">
                  <div>
                    <div>
                      <p>{checkinDetails.masseur.name}</p>
                      <span className='dot'></span>
                      <p>
                        <Image src="/images/booking/star.svg" alt='star' width={20} height={20}></Image>
                        <span>{checkinDetails.masseur.rating}</span>
                      </p>
                    </div>
                    <p>Chosen Masseur</p>
                  </div>
                  <button >
                    <Image src="/images/booking/edit.svg" alt="" width={16} height={16} />
                    <p>Edit</p>
                  </button>
                </div>
                <div className="choosen-date">
                  <div>
                    <p>{selectedDate}</p>
                    <p>Chosen Date</p>
                  </div>
                  <button >
                    <Image src="/images/booking/edit.svg" alt="" width={16} height={16} />
                    <p>Edit</p>
                  </button>
                </div>
                <div className="choosen-time">
                  <div>
                    <p>{selectedTime}</p>
                    <p>Chosen Start Time</p>
                  </div>
                  <button >
                    <Image src="/images/booking/edit.svg" alt="" width={16} height={16} />
                    <p>Edit</p>
                  </button>
                </div>
              </div>

            </div>
            <div className="contact-information">
              <h3>Your Contact Information</h3>
              <div className="block">
                <div className="full-name">
                  <div>
                    <p>{fullName}</p>
                    <p>Full Name</p>
                  </div>
                  <button >
                    <Image src="/images/booking/edit.svg" alt="" width={16} height={16} />
                    <p>Edit</p>
                  </button>
                </div>
                <div className="email">
                  <div>
                    <p>{email}</p>
                    <p>Email</p>
                  </div>
                  <button >
                    <Image src="/images/booking/edit.svg" alt="" width={16} height={16} />
                    <p>Edit</p>
                  </button>
                </div>
                <div className="phone-number">
                  <div>
                    <p>{phoneNumber}</p>
                    <p>Phone Number</p>
                  </div>
                  <button >
                    <Image src="/images/booking/edit.svg" alt="" width={16} height={16} />
                    <p>Edit</p>
                  </button>
                </div>
              </div>
            </div>
            <div className='subscription'>
              <p><span>Pro Tip: </span> Activating Gondli <a href="#">Subscription</a> will help you to save more on selected <br className='max-lg:hidden' /> services while booking them on Gondli
              </p>
            </div>
            <div className="reservation-payment-details">
              <h3>Payment Details</h3>
              <div className="payment-block">
                <div className="payment-method">
                  <div>
                    <div className='method-icon'>
                      <Image src="/images/booking/visa.png" alt='' width={20} height={8} />
                    </div>
                    <span>****</span>
                    <p>2561</p>
                  </div>
                  <p>Payment Method</p>
                </div>
                <div className="for-choosen-service">
                  <p>{selectedServicePrice} CHF</p>
                  <p>For Chosen Service</p>
                </div>
                <div className="service-fee">
                  <p>10.00 CHF</p>
                  <p>Service Fee</p>
                </div>
                <div className="total-cost">
                  <p>{Number(selectedServicePrice) + 10} CHF</p>
                  <p>Total Cost</p>
                </div>
              </div>
            </div>

            {pendingStatus ? (
              <div className="feedback">
                <h3>Write a Feedback</h3>
                <div className="block">
                  <p>How would you rate your experience?</p>
                  <div className='stars'>
                    <div className='flex items-center gap-2'>
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          onClick={() => handleRating(index)}
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ cursor: 'pointer' }}
                        >
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill={index < rating ? '#F4B003' : '#ffffff'}
                            stroke="#F4B003"
                            strokeWidth="1.5"
                          />
                        </svg>
                      ))}
                    </div>
                    <p>{ratingText}</p>
                  </div>
                  <textarea
                    className='text-block'
                    placeholder='Give us a brief description of your visit'
                    value={text}
                    onChange={handleChange}
                  ></textarea>
                  <div className="bonus">
                    <p className='max-lg:!hidden large-text text-sm'>Write a review to receive <span> <Image src="/images/booking/wizard-badge.svg" alt='' width={20} height={20}></Image> 50 Karma Coins </span> on your account</p>
                    <p className='lg:hidden flex items-center gap-1 text-sm'>Write a review to receive <span className='flex items-center gap-1'> <Image src="/images/booking/wizard-badge.svg" alt='' width={20} height={20}></Image> 50 Karma Coins </span></p>
                    <p className='lg:hidden text-sm'>on your account</p>

                  </div>
                  <button
                    className={`send-feedback-to ${!text.trim() ? "disabled" : ""}`}
                    onClick={sendingFeedback}
                    disabled={!text.trim()}
                  >Send Feedback</button>
                </div>
              </div>
            ) : (
              <div className="policy">
                <h3>Cancelation Policy</h3>
                <p>Free cancellation <span> before Jul 6. </span> Cancel before check-in on <span> Jul 24 </span> for a partial refund. <a href="#" >Learn More</a></p>
              </div>
            )}
          </div>
          <div className="map max-lg:hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21629.701930694486!2d8.509508935015104!3d47.33948113662698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479009d845d42b91%3A0x7db4358e76bb3faa!2z0JLQvtC70LvQuNGB0YXQvtGE0LXQvSwg0KbRjtGA0LjRhSwg0KjQstC10LnRhtCw0YDQuNGP!5e0!3m2!1sru!2s!4v1730910856396!5m2!1sde!2s&hl=de" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          {isFeedbackSent && (
            <div className="processing-message">
              <div className='processing-block'>
                <div className='w-full header flex justify-between items-center mb-10'>
                  <Image src={"/images/icons/booking-logo.png"} alt='' width={101} height={22} />
                  <button onClick={handleCloseFeedback}>
                    <Image src={"/images/icons/booking-x.svg"} alt='' width={20} height={20} />
                  </button>
                </div>
                <div className="loading-successful">
                  <Image src="/images/booking/check-white.svg" alt='' width={20} height={20} />
                </div>
                <p className='text-[28px] !mb-4 font-bold max-lg:!text-xl'>Feedback Received!</p>
                <p className=' max-lg:!mb-16'>Your feedback has been published. We appreciate your contribution, as it plays a crucial role in fostering a trusted environment within Gondli. As a token of gratitude, you have been awarded <span className='font-bold'> 50 Karma points. </span></p>
                <button className='send-feedback' onClick={toClaimKarma}>Claim Karma Points</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;