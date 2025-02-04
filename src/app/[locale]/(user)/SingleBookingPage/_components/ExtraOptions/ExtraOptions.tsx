import React, { useState } from "react";
import Image from "next/image";
import "./ExtraOptions.scss"



const ExtraOptions: React.FC = () => {
    const [scentDropdown, setScentDropdown] = useState(false)
    const [selectedScent, setSelectedScent] = useState("Any Scent");

    const [oilDropdown, setOilDropdown] = useState(false)
    const [selectedOil, setSelectedOil] = useState("Any Oil");

    const [fragranceDropdown, setFragranceDropdown] = useState(false)
    const [selectedFragrance, setSelectedFragrance] = useState("Any Fragrance");



    const hanleScentDropdown = () => {
        setScentDropdown((prev) => !prev);
    }

    const handleSelectScent = (promo: string) => {
        setSelectedScent(promo);
        setScentDropdown(true); 

    };

    const hanleOilDropdown = () => {
        setOilDropdown((prev) => !prev);
    }

    const handleSelectOil = (promo: string) => {
        setSelectedOil(promo);
        setOilDropdown(true); 

    };

    const hanleFragranceDropdown = () => {
        setFragranceDropdown((prev) => !prev);
    }

    const handleSelectFragrance = (promo: string) => {
        setSelectedFragrance(promo);
        setFragranceDropdown(true); 

    };

    return (
        <div className="extra-options">
            <h2>Extra Options</h2>
            <div className="options-block">
                <div className='candle-scent' onClick={hanleScentDropdown}>
                    <div>
                        <div>
                            <Image src={"/images/booking/candle-scent-icon.svg"} alt='coupon' width={20} height={20} />
                        </div>
                        <div>
                            <p className="title">Candle Scent</p>
                            <p className="selected-text">{selectedScent}</p>
                        </div>
                    </div>
                    <div className={`dropdown-icon ${scentDropdown ? "active" : ""}`}>
                        <Image src={"/images/booking/arrow-down.svg"} alt='arrow' width={12} height={12}></Image>
                    </div>
                    <div className={`scent-dropdown ${scentDropdown ? "active" : ""}`}>
                        <p onClick={() => handleSelectScent("Any Scent")}>Any Scent</p>
                        <p onClick={() => handleSelectScent("Cotton Scent")}>Cotton Scent</p>
                    </div>
                </div>
                <div className='oil-type' onClick={hanleOilDropdown}>
                    <div>
                        <div>
                            <Image src={"/images/booking/oil-icon.svg"} alt='coupon' width={20} height={20} />
                        </div>
                        <div>
                            <p className="title">Oil Type</p>
                            <p className="selected-text">{selectedOil}</p>
                        </div>
                    </div>
                    <div className={`dropdown-icon ${oilDropdown ? "active" : ""}`}>
                        <Image src={"/images/booking/arrow-down.svg"} alt='arrow' width={12} height={12}></Image>
                    </div>
                    <div className={`oil-dropdown ${oilDropdown ? "active" : ""}`}>
                        <p onClick={() => handleSelectOil("Any Scent")}>Any Oil</p>
                        <p onClick={() => handleSelectOil("Cotton Scent")}>Option 1</p>
                    </div>
                </div>
                <div className='fragrance-type' onClick={hanleFragranceDropdown}>
                    <div>
                        <div>
                            <Image src={"/images/booking/fragrance-icon.svg"} alt='coupon' width={20} height={20} />
                        </div>
                        <div>
                            <p className="title">Fragrance Type</p>
                            <p className="selected-text">{selectedFragrance}</p>
                        </div>
                    </div>
                    <div className={`dropdown-icon ${fragranceDropdown ? "active" : ""}`}>
                        <Image src={"/images/booking/arrow-down.svg"} alt='arrow' width={12} height={12}></Image>
                    </div>
                    <div className={`fragrance-dropdown ${fragranceDropdown ? "active" : ""}`}>
                        <p onClick={() => handleSelectFragrance("Any Fragrance")}>Any Fragrance</p>
                        <p onClick={() => handleSelectFragrance("Option 1")}>Option 1</p>
                    </div>
                </div>
                <div className="additional-message">
                    <input type="text" placeholder="Additional Message to Venue"/>
                </div>
                <div className="info">
                    <Image src="/images/booking/information-icon.svg" alt="" width={16} height={16}/>
                    <p>You can address your general preferences, allergies, or anything else related to your reservation</p>
                </div>
            </div>
        </div>
    );
};

export default ExtraOptions;