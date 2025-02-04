import React from 'react';
import { useEffect, useState } from 'react';
import "./ReportUser.scss"
import Image from 'next/image';



interface ReportUserProps {
    setOpenReportUser: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSuccessReport: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNameReport: string;

}



const ReportUser: React.FC<ReportUserProps> = ({
    setOpenReportUser,
    setShowSuccessReport,
    selectedNameReport,

}) => {

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);


    const reportOptions = [
        { title: "Harassment: Includes bullying, threats, or hate speech" },
        { title: "Spam: Excessive or unwanted messages" },
        { title: "Impersonation: Pretending to be someone else" },
        { title: "Copyright Infringement: Using copyrighted material without permission" },
        { title: "Misinformation: Spreading false or misleading information" },
        { title: "Violation of Terms of Service: Other violations of the platform's rules" },
    ]

    const toggleOption = (option: string) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.includes(option)
                ? prevSelected.filter((item) => item !== option)
                : [...prevSelected, option]
        );
    };

    const saveChanges = () => {
        setOpenReportUser((prev) => !prev);
        setShowSuccessReport(true)
        setTimeout(() => {
            setShowSuccessReport(false);
        }, 5000);
    }

    const closeConfirmBlock = () => {
        setOpenReportUser((prev) => !prev);

    }


    return (
        <div className='block-cancelation'>
            <div className='report-info-customer'>
                <div className='title'>
                    <h2>
                        <Image src="/images/bookingManage/gondi-logo.png" alt='' width={85} height={20} />
                    </h2>
                    <div onClick={closeConfirmBlock}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="main-block-user">
                    <h1 className='max-lg:!text-xl'>Report User</h1>
                    <p className='description max-lg:!text-sm'>
                        Please specify the reason of the report
                    </p>
                    <div className="select-reason">
                        <p className='title max-lg:!text-sm'>Select a reason</p>
                        <div className='options'>
                            {reportOptions.map((item, index) => (
                                <div className='option' key={index}>
                                    <div
                                        onClick={() => toggleOption(item.title)}
                                        className={`check-mark ${selectedOptions.includes(item.title) ? "active" : ""}`}
                                    >
                                        <Image src="/images/bookingManage/check-white-icon.svg" alt='' width={14} height={14} />
                                    </div>
                                    <p className='max-lg:!text-sm'>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="save-block">
                    <button className='discard' onClick={closeConfirmBlock}>Discard</button>
                    <button className='save' onClick={saveChanges}>Save Changes</button>
                </div>

            </div>
        </div>
    )
}

export default ReportUser;