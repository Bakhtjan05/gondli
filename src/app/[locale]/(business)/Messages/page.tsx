"use client"


import React, { useEffect, useRef, useState } from 'react';
import "./page.scss"
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ReportUser from './_components/ReportUser/ReportUser';
import ConfirmBlock from './_components/ConfirmBlock/ConfirmBlock';
import AutoReply from './_components/AutoReply/AutoReply';
import DiscountCode from './_components/DiscountCode/DiscountCode';

interface MessagesProps {

}

const Messages: React.FC = () => {
    const t = useTranslations();

    const [messages, setMessages] = useState<{ [key: string]: { id: number; text: string; sender: string }[] }>({
        "Madeline Hintz": [
            { id: 1, text: "Hello! How are you?", sender: "user1" },
            { id: 2, text: "Hello! Everything is great, thank you! And you?", sender: "user2" },
        ],
        "William Dibbert": [
            { id: 1, text: "Hi! What's up?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],
        "Ariel Zieme": [
            { id: 1, text: "Hi! What's up Ariel?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],
        "Darryl Monahan": [
            { id: 1, text: "Hi! What's up Darry?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],
        "Josefina Emard": [
            { id: 1, text: "Hi! What's up Josefina?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],
        "Angel Stokes": [
            { id: 1, text: "Hi! What's up Angel?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],
        "Cory Adams": [
            { id: 1, text: "Hi! What's up Cory?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],
        "Percy Bogan": [
            { id: 1, text: "Hi! What's up Percy?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],
        "Pam Carroll": [
            { id: 1, text: "Hi! What's up Pam?", sender: "user1" },
            { id: 2, text: "Not much, how about you?", sender: "user2" },
        ],

    });

    const [choosenUser, setChoosenUser] = useState({
        name: "Madeline Hintz",
        avatar: "/images/messages-page/avatar.png",
    });

    const [showAside, setShowAside] = useState(true);
    const [isMainVisible, setIsMainVisible] = useState(false);


    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(0)
    const [openAutoReply, setOpenAutoReply] = useState(false)
    const [openDiscountCode, setOpenDiscountCode] = useState(false)
    const [openDetailsInNew, setOpenDetailsInNew] = useState(false)
    const [openConfirmBlock, setOpenConfirmBlock] = useState(false)
    const [showSuccessReply, setShowSuccessReply] = useState(false);
    const [showSuccessDiscount, setShowSuccessDiscount] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessReport, setShowSuccessReport] = useState(false)
    const [openReportUser, setOpenReportUser] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const userData = [
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Madeline Hintz",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "William Dibbert",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Ariel Zieme",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Darryl Monahan",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Josefina Emard",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Angel Stokes",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Cory Adams",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Percy Bogan",
            message: "Looking forward to your response!"
        },
        {
            avatar: "/images/messages-page/avatar.png",
            name: "Pam Carroll",
            message: "Looking forward to your response!"
        },
    ]

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        setMessages(prevMessages => {
            const updatedMessages = { ...prevMessages };
            updatedMessages[choosenUser.name] = [
                ...updatedMessages[choosenUser.name] || [],
                { id: Date.now(), text: inputValue, sender: "user1" }
            ];
            return updatedMessages;
        });
        setInputValue("");
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            const isScrolledToBottom =
                messagesEndRef.current.getBoundingClientRect().top <= window.innerHeight;

            if (isScrolledToBottom) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [messages]);

    const chooseUser = (name: string, avatar: string) => {
        setChoosenUser({
            name: name,
            avatar: avatar,
        });

        setMessages((prevMessages) => ({
            ...prevMessages,
            [name]: prevMessages[name] || [],
        }));

        setIsMainVisible(true);
        setShowAside(false);
    }

    const goBackToAside = () => {
        setShowAside(true);
        setIsMainVisible(false);
    };

    const toggleOpenDetailsInNew = () => {
        setOpenDetailsInNew((prev) => !prev)

    }

    const toggleOpenDiscountCode = () => {
        setOpenDiscountCode((prev) => !prev)

    }

    const toggleOpenAutoReply = () => {
        setOpenAutoReply((prev) => !prev)

    }

    const toggleOpenConfirmBlock = () => {
        setOpenConfirmBlock((prev) => !prev)

    }

    const toggleOpenReportUser = () => {
        setOpenReportUser((prev) => !prev)
    }

    return (
        <main className='messages'>

            <div className={`action-buttons max-lg:!flex-col max-lg:!items-start max-lg:gap-5 ${showAside ? "" : "max-lg:!hidden"}`}>
                <p className='title'>{t('Messages')}</p>
                <div className='button-group max-lg:!w-full'>
                    <div className='filter-search-wrapper max-lg:!w-full'>
                        <button className='button-wrapper-1 max-lg:!w-full max-lg:!justify-center'>
                            <Image
                                src={'/images/services/filter.svg'}
                                width={14}
                                height={14}
                                alt='filter'
                                className='filter-icon'
                            />
                            <div className='button-text'>{t('filter')}</div>
                        </button>


                    </div>
                    <div className='divider'></div>
                    <div className='add-service-wrapper max-lg:!w-full'>
                        <button
                            className='button-wrapper-2 max-lg:!w-full max-lg:!justify-center'

                        >
                            <Image
                                src={'/images/services/plus.svg'}
                                width={14}
                                height={14}
                                alt='add service'
                                className='add-icon'
                            />
                            <div className='button-text' onClick={toggleOpenAutoReply}>Set Auto-Reply</div>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`flex items-center gap-4 lg:hidden ${isMainVisible ? "" : "max-lg:!hidden"}`}>
                <button onClick={goBackToAside}>
                    <Image src={"/images/icons/arrow-left.svg"} alt='' width={24} height={24} />
                </button>

                <div className='flex items-center gap-3'>
                    <Image src={choosenUser.avatar} alt='' width={32} height={32}></Image>
                    <p className='font-bold text-lg'>{choosenUser.name}</p>
                </div>
            </div>

            <div className="message-block">

                <aside className={`!px-0 !max-w-none !w-auto max-lg:!w-full max-lg:!flex-1 ${showAside ? "" : "max-lg:!hidden"}`}>
                    <div className="search">
                        <Image src={"/images/messages-page/search-icon.svg"} alt='' width={14} height={14}></Image>
                        <input type="text" placeholder='Search' />
                    </div>
                    <div className="users">
                        {userData.map((item, index) => (
                            <div className={`user ${activeIndex === index ? "active" : ""}`} key={index} onClick={() => {
                                setActiveIndex(index)
                                chooseUser(item.name, item.avatar)
                            }}>
                                <div >
                                    <Image src={item.avatar} alt='' width={32} height={32}></Image>
                                </div>
                                <div>
                                    <p className='name'>{item.name}</p>
                                    <p className='message'>{item.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>


                <div className={`chat-block ${isMainVisible ? "" : "max-lg:!hidden"}`}>
                    <div className="top">
                        <div className='user-name max-lg:!hidden'>
                            <Image src={choosenUser.avatar} alt='' width={32} height={32}></Image>
                            <p>{choosenUser.name}</p>
                        </div>
                        <div className='discount-extra-message max-lg:!w-full'>
                            <button className='discount-message max-lg:!flex-1 max-lg:!justify-center' onClick={toggleOpenDiscountCode}>
                                <Image src="/images/messages-page/discount-icon.svg" alt='' width={14} height={14} />
                                Generate Discount Code
                            </button>
                            <div className='extra-block-message '>
                                <button className='extra-message' onClick={toggleOpenDetailsInNew}>
                                    <Image src="/images/bookingManage/horizontal-dots.svg" alt='' width={16} height={16} />
                                </button>
                                <div className={`details-message ${openDetailsInNew ? "active" : ""}`}>
                                    <div className='details-options-message'>
                                        <button onClick={() => toggleOpenConfirmBlock()}>
                                            <Image src="/images/bookingManage/hide-icon.svg" alt='' width={20} height={20} />
                                            Block User
                                        </button>
                                        <button onClick={() => toggleOpenReportUser()}>
                                            <Image src="/images/bookingManage/report-icon.svg" alt='' width={20} height={20} />
                                            Report User
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main ">
                        <div className="chat-messages">
                            {messages[choosenUser.name]?.map((message) => (
                                <div
                                    key={message.id}
                                    className={`chat-message-block ${message.sender === "user1" ? "sent" : "received"}`}
                                >
                                    <div className="chat-message">
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                placeholder="Send Message"
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>

            </div>



            {openDiscountCode && <DiscountCode
                setOpenDiscountCode={setOpenDiscountCode}
                setShowSuccessDiscount={setShowSuccessDiscount}
                name={choosenUser.name}

            />}

            {showSuccessDiscount && (
                <div className='succes-reply'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />

                        </div>
                        <p>
                            Discount Code has been generated successfully
                        </p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={20} height={20} />
                    </button>
                </div>
            )}


            {openAutoReply && <AutoReply
                setOpenAutoReply={setOpenAutoReply}
                setShowSuccessReply={setShowSuccessReply}
                name={choosenUser.name}

            />}

            {showSuccessReply && (
                <div className='succes-reply'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        </div>
                        <p className='max-lg:text-sm '>
                            Auto-Reply has been set-up successfully
                        </p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={20} height={20} />
                    </button>
                </div>
            )}


            {openConfirmBlock && <ConfirmBlock
                setOpenConfirmBlock={setOpenConfirmBlock}
                setShowSuccessMessage={setShowSuccessMessage}
                name={choosenUser.name}

            />}

            {showSuccessMessage && (
                <div className='succes-reply'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />

                        </div>
                        <p>
                            User <span>{choosenUser.name}</span> has been blocked successfully
                        </p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={20} height={20} />
                    </button>
                </div>
            )}


            {openReportUser && <ReportUser
                setOpenReportUser={setOpenReportUser}
                setShowSuccessReport={setShowSuccessReport}
                name={choosenUser.name}


            />}

            {showSuccessReport && (
                <div className='succes-reply'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />

                        </div>
                        <p>
                            User <span>{choosenUser.name}</span> has been reported successfully
                        </p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={12} height={12} />
                    </button>
                </div>
            )}
        </main>
    )
}

export default Messages