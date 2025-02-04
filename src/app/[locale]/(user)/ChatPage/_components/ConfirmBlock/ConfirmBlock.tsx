import React from 'react';
import { useEffect, useState } from 'react';
import "./ConfirmBlock.scss"
import Image from 'next/image';


interface ConfirmBlockProps {
    setOpenConfirmBlock: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
    name: string

}



const ConfirmBlock: React.FC<ConfirmBlockProps> = ({
    setOpenConfirmBlock,
    setShowSuccessMessage,
    name,

}) => {

    const saveChanges = () => {
        setOpenConfirmBlock((prev) => !prev);
        setShowSuccessMessage(true)
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 5000);
    }

    const closeConfirmBlock = () => {
        setOpenConfirmBlock((prev) => !prev);

    }
    

    return (
        <div className='block-cancelation'>
            <div className='confirm-block-info'>
                <div className='title'>
                    <h2>
                        <Image src="/images/bookingManage/gondi-logo.png" alt='' width={85} height={20} />
                    </h2>
                    <div onClick={closeConfirmBlock}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="main">
                    <h1 className='max-lg:!text-xl'>Confirm Blocking</h1>
                    <p className='max-lg:!text-sm'>
                        Are you sure you want to block <span>{name}?</span> Blocking a user will prevent them from interacting with your profile or content. This action is irreversible.
                    </p>
                </div>
                <div className="save-block">
                    <button className='discard max-lg:!text-sm' onClick={closeConfirmBlock}>Discard</button>
                    <button className='save max-lg:!text-sm' onClick={saveChanges}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBlock;