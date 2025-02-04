import React, { use } from 'react';
import { useEffect, useState } from 'react';
import "./RecurringPayouts.scss"
import Image from 'next/image';


interface RecurringPayoutsProps {
    setOpenRecurringPayouts: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSuccessRecurringPayouts: React.Dispatch<React.SetStateAction<boolean>>;

}



const RecurringPayouts: React.FC<RecurringPayoutsProps> = ({
    setOpenRecurringPayouts,
    setShowSuccessRecurringPayouts,

}) => {

    const [openScheduleDropdown, setOpenScheduleDropdown] = useState(false)
    const [openCityDropdown, setOpenCityDropdown] = useState(false)
    const [selectedOption, setSelectedOption] = useState("Once per week");
    const [selectedCountry, setSelectedCountry] = useState("Switzerland");
    const [selectedCity, setSelectedCity] = useState("Select");
    const [activeCheckbox, setActiveCheckbox] = useState(false);
    const [activeSavings, setActiveSavings] = useState(false);
    const [accountName, setAccountName] = useState("")
    const [routingNumber, setRoutingNumber] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [streetNumber, setStreetNumber] = useState("")
    const [apt, setApt] = useState("")
    const [zipCode, setZipCode] = useState("")


    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < 2) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };


    const saveChanges = () => {
        setOpenRecurringPayouts((prev) => !prev);
        setShowSuccessRecurringPayouts(true)
        setTimeout(() => {
            setShowSuccessRecurringPayouts(false);
        }, 5000);
    }

    const closeConfirmBlock = () => {
        setOpenRecurringPayouts((prev) => !prev);

    }

    const toggleOpenScheduleDropdown = () => {
        setOpenScheduleDropdown((prev) => !prev)
    }

    const toggleOpenCityDropdown = () => {
        setOpenCityDropdown((prev) => !prev)
    }

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setOpenScheduleDropdown(false);
    };

    const handleCitySelect = (option: string) => {
        setSelectedCity(option);
        setOpenCityDropdown(false);
    };

    const handleClickCheckbox = () => {
        setActiveCheckbox((prev) => !prev);
        setActiveSavings(false);

    };

    const handleClickSavings = () => {
        setActiveSavings((prev) => !prev);
        setActiveCheckbox(false);

    }

    const handleChangeAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountName(e.target.value)
    }

    const handleChangeRoutingNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoutingNumber(e.target.value)
    }

    const handleChangeAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(e.target.value)
    }

    const handleChangeStreetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStreetNumber(e.target.value)
    }

    const handleChangeApt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApt(e.target.value)
    }

    const handleChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(e.target.value)
    }

    const blocks = [
        (
            <div key="general-details">
                <div className="select-reason">
                    <p className="title">General Details</p>
                    <div className="options">
                        <div className='select-week max-lg:!flex-col max-lg:!items-start max-lg:!gap-3'>
                            <div>
                                <p className='discount-title'>Deposit Schedule</p>
                            </div>
                            <div className='input-block max-lg:!w-full'>
                                <div className='input max-lg:!w-full'>
                                    <p>{selectedOption}</p>
                                </div>
                                <div className='down-image-block' onClick={toggleOpenScheduleDropdown}>
                                    <Image src="/images/finance-page/down-icon.svg" alt='' width={16} height={16} />
                                </div>
                                <div className={`schedule-dropdown ${openScheduleDropdown ? "active" : ""}`}>
                                    <p onClick={() => handleOptionSelect("Once per week")}>Once per week</p>
                                    <p onClick={() => handleOptionSelect("Once per day")}>Once per day</p>
                                    <p onClick={() => handleOptionSelect("Once per month")}>Once per month</p>
                                </div>
                            </div>
                        </div>
                        <div className='select-min max-lg:!flex-col max-lg:!items-start max-lg:!gap-3'>
                            <div>
                                <p className='discount-title'>Minimum Payout Amount</p>
                            </div>
                            <div className='input-block max-lg:!w-full'>
                                <div className='input max-lg:!w-full'>
                                    <input defaultValue={0} type="text" />
                                </div>
                                <div className='down-image-block'>
                                    <p>CHF</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="save-block">
                    <div>

                    </div>
                    <div>
                        <button className="discard max-lg:!text-sm max-lg:!px-4" onClick={closeConfirmBlock}>
                            Discard
                        </button>
                        <button className="save max-lg:!text-sm max-lg:!px-4" onClick={nextStep}>
                            Next Step
                        </button>
                    </div>
                </div>
            </div>
        ),
        (
            <div key="bank-account-info">
                <div className="select-reason">
                    <p className="title">Bank Account Info</p>
                    <div className="options">
                        <div className="select-account max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Type of Account</p>
                            </div>
                            <div className="input-block">
                                <div className="checkbox checking">
                                    <div className={`checkbox-block ${activeCheckbox === true ? "active" : ""}`} onClick={handleClickCheckbox}>
                                        <img className={`${activeCheckbox === true ? "active" : ""}`} src="/images/booking/check-white.svg" alt="" />
                                    </div>
                                    <p>Checking</p>
                                </div>
                                <div className="checkbox savings">
                                    <div className={`checkbox-block ${activeSavings === true ? "active" : ""}`} onClick={handleClickSavings}>
                                        <img className={`${activeSavings === true ? "active" : ""}`} src="/images/booking/check-white.svg" alt="" />
                                    </div>
                                    <p>Savings</p>
                                </div>
                            </div>
                        </div>
                        <div className="account-name max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Account Holder Name</p>
                            </div>
                            <div className="input-block max-lg:!w-full">
                                <input className='max-lg:!w-full' value={accountName} onChange={handleChangeAccountName} type="text" placeholder='Enter' />
                            </div>
                        </div>
                        <div className="account-name max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Routing Number</p>
                            </div>
                            <div className="input-block max-lg:!w-full">
                                <input className='max-lg:!w-full' value={routingNumber} onChange={handleChangeRoutingNumber} type="text" placeholder='Enter' />
                            </div>
                        </div>
                        <div className="account-name last max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Account Number</p>
                            </div>
                            <div className="input-block max-lg:!w-full">
                                <input className='max-lg:!w-full' value={accountNumber} onChange={handleChangeAccountNumber} type="text" placeholder='Enter' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="save-block">
                    <div className='go-back' onClick={prevStep}>
                        <Image src={"/images/finance-page/arrow-left.svg"} alt='' width={14} height={14} />
                        <p className='max-lg:!text-sm'>Go Back</p>
                    </div>
                    <div>
                        <button className="discard max-lg:!text-sm max-lg:!px-4" onClick={closeConfirmBlock}>
                            Discard
                        </button>
                        <button className="save max-lg:!text-sm max-lg:!px-4" onClick={nextStep}>
                            Next Step
                        </button>
                    </div>
                </div>
            </div>
        ),
        (
            <div key="address-details">
                <div className="select-reason">
                    <p className="title">Address Associated With This Account</p>
                    <div className="options">
                        <div className="select-country max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Country</p>
                            </div>
                            <div className='input-block max-lg:!w-full'>
                                <div className='input max-lg:!w-full'>
                                    <p>{selectedCountry}</p>
                                </div>
                                <div className='down-image-block' >
                                    <Image src="/images/finance-page/down-icon.svg" alt='' width={16} height={16} />
                                </div>
                                
                            </div>
                        </div>
                        <div className="select-city max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">City</p>
                            </div>
                            <div className='input-block max-lg:!w-full'>
                                <div className='input max-lg:!w-full'>
                                    <p>{selectedCity}</p>
                                </div>
                                <div className='down-image-block' onClick={toggleOpenCityDropdown}>
                                    <Image src="/images/finance-page/down-icon.svg" alt='' width={16} height={16} />
                                </div>
                                <div className={`schedule-dropdown ${openCityDropdown ? "active" : ""}`}>
                                    <p onClick={() => handleCitySelect("City 1")}>City 1</p>
                                    <p onClick={() => handleCitySelect("City 2")}>City 2</p>
                                    <p onClick={() => handleCitySelect("City 3")}>City 3</p>
                                </div>
                            </div>
                        </div>
                        <div className="street-address max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Street Address</p>
                            </div>
                            <div className="input-block max-lg:!w-full">
                                <input className='max-lg:!w-full' value={streetNumber} onChange={handleChangeStreetNumber} type="text" placeholder='Enter' />
                            </div>
                        </div>
                        <div className="street-address max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Apt, Suite, Etc. (If applicable)</p>
                            </div>
                            <div className="input-block max-lg:!w-full">
                                <input className='max-lg:!w-full' value={apt} onChange={handleChangeApt} type="text" placeholder='Enter' />
                            </div>
                        </div>
                        <div className="street-address max-lg:!flex-col max-lg:!items-start max-lg:!gap-3">
                            <div>
                                <p className="discount-title">Zip Code</p>
                            </div>
                            <div className="input-block max-lg:!w-full">
                                <input className='max-lg:!w-full' value={zipCode} onChange={handleChangeZipCode} type="text" placeholder='Enter' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="save-block">
                    <div className='go-back' onClick={prevStep}>
                        <Image src={"/images/finance-page/arrow-left.svg"} alt='' width={14} height={14} />
                        <p className='max-lg:!text-sm'>Go Back</p>
                    </div>
                    <div>
                        <button className="discard max-lg:!text-sm max-lg:!px-4" onClick={closeConfirmBlock}>
                            Discard
                        </button>
                        <button className="save max-lg:!text-sm max-lg:!px-4" onClick={saveChanges}>
                            Finish Setting Up
                        </button>
                    </div>
                </div>
            </div>
        ),
    ];


    return (
        <div className='block-recurring'>
            <div className='recurring-info'>
                <div className='title'>
                    <h2>
                        <Image src="/images/bookingManage/gondi-logo.png" alt='' width={85} height={20} />
                    </h2>
                    <div onClick={closeConfirmBlock}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="main-discount">
                    <h1 className='max-lg:!text-xl'>Set Recurring Payouts</h1>
                    <p className='description max-lg:!text-sm'>
                        Fill out these details to automate your payments and free up your time for more important tasks.
                    </p>

                    {blocks[step]}

                </div>

            </div>
        </div>
    )
}

export default RecurringPayouts;

