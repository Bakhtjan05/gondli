import React from 'react';
import { useEffect, useState } from 'react';
import "./AutoReply.scss"
import Image from 'next/image';


interface AutoReplyProps {
    setOpenAutoReply: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSuccessReply: React.Dispatch<React.SetStateAction<boolean>>;
    name: string

}



const AutoReply: React.FC<AutoReplyProps> = ({
    setOpenAutoReply,
    setShowSuccessReply,
    name,

}) => {

    const [replyText, setReplyText] = useState("");


    const saveChanges = () => {
        setOpenAutoReply((prev) => !prev);
        setShowSuccessReply(true)
        setTimeout(() => {
            setShowSuccessReply(false);
        }, 5000);
    }

    const closeConfirmBlock = () => {
        setOpenAutoReply((prev) => !prev);

    }


    return (
        <div className='block-cancelation'>
            <div className='autoreply-info'>
                <div className='title'>
                    <h2>
                        <Image src="/images/bookingManage/gondi-logo.png" alt='' width={85} height={20} />
                    </h2>
                    <div onClick={closeConfirmBlock}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="main">
                    <h1 className='max-lg:!text-xl'>Set Auto-Reply</h1>
                    <p className='max-lg:!text-sm'>
                        send auto-replies automatically to the first message you receive from a buyer while you are way
                    </p>
                    <textarea
                        name=""
                        placeholder='Write reply here and make sure to mention when you will be back'
                        onChange={(e) => setReplyText(e.target.value)}
                    >

                    </textarea>
                </div>
                <div className="save-block">
                    <button className='discard max-lg:!text-sm' onClick={closeConfirmBlock}>Discard</button>
                    <button className={`save max-lg:!text-sm ${!replyText.trim() ? "hide" : ""}`} disabled={!replyText.trim()} onClick={saveChanges}>Set Auto-Reply</button>
                </div>
            </div>
        </div>
    )
}

export default AutoReply;