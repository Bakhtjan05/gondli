import React from 'react';
import { useEffect, useState } from 'react';
import "./DiscountCode.scss"
import Image from 'next/image';


interface DiscountCodeProps {
    setOpenDiscountCode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSuccessDiscount: React.Dispatch<React.SetStateAction<boolean>>;
    name: string

}



const DiscountCode: React.FC<DiscountCodeProps> = ({
    setOpenDiscountCode,
    setShowSuccessDiscount,
    name,

}) => {

    const [isGenerating, setIsGenerating] = useState(true);
    const [copied, setCopied] = useState(false); // Состояние для отображения уведомления


    const copyToClipboard = async () => {
        try {
            const textToCopy = "G62VSF36"; // Текст для копирования
            await navigator.clipboard.writeText(textToCopy); // Копируем текст в буфер обмена
            setCopied(true); // Устанавливаем состояние "скопировано"
            setTimeout(() => setCopied(false), 2000); // Сбрасываем состояние через 2 секунды
        } catch (err) {
            console.error("Failed to copy text: ", err); // Обрабатываем ошибку
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGenerating(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);





    const saveChanges = () => {
        setOpenDiscountCode((prev) => !prev);
        setShowSuccessDiscount(true)
        setTimeout(() => {
            setShowSuccessDiscount(false);
        }, 5000);
    }

    const closeConfirmBlock = () => {
        setOpenDiscountCode((prev) => !prev);

    }


    return (
        <div className='block-cancelation'>
            <div className='discount-info'>
                <div className='title'>
                    <h2>
                        <Image src="/images/bookingManage/gondi-logo.png" alt='' width={85} height={20} />
                    </h2>
                    <div onClick={closeConfirmBlock}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="main-discount">
                    <h1 className='max-lg:!text-xl'>Generating Discount Code</h1>
                    <p className='description max-lg:!text-sm'>
                        Select an amount of discount that will be generated and can be used
                        only by that person
                    </p>
                    <div className="select-reason">
                        <p className='title'>General Details</p>
                        <div className='options'>
                            <div className='select-discount max-lg:!flex-col max-lg:!items-start max-lg:!gap-4'>
                                <div>
                                    <p className='discount-title max-lg:!text-sm'>Discount in Percentage</p>
                                    <p className='extra-info-text'>No order minimum. Expires in 5 days</p>
                                </div>
                                <div className='input-block max-lg:!w-full'>
                                    <div className='input max-lg:!w-full'>
                                        <input className='max-lg:!text-sm' type="number" />
                                    </div>
                                    <p>%</p>
                                </div>
                            </div>
                            <div className="generate-code max-lg:!flex-col max-lg:!items-start max-lg:!gap-4">
                                <div>
                                    <p className='discount-title max-lg:!text-sm'>Discount Code</p>
                                    <p className='extra-info-text'>Only works for the individual it was created for</p>
                                </div>
                                <div className='process-box max-lg:!w-full'>
                                    {isGenerating ? (
                                        <div className="generating-process">
                                            <Image
                                                src="/images/messages-page/generating-icon.svg"
                                                alt=""
                                                width={14}
                                                height={14}
                                            />
                                            <p>Generating</p>
                                        </div>
                                    ) : (
                                        <div className="generated-code max-lg:!justify-between">
                                            <p>G62VSF36</p>
                                            <p className="copy" onClick={copyToClipboard}>Copy</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="save-block">
                    <button className='discard max-lg:!text-sm' onClick={closeConfirmBlock}>Discard</button>
                    <button className='save max-lg:!text-sm' onClick={saveChanges}>Done</button>
                </div>
            </div>
        </div>
    )
}

export default DiscountCode;




