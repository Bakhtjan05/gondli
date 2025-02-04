"use client"


import React, { useEffect, useRef, useState } from 'react';
import "./page.scss"
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ReportUser from './_components/ReportUser/ReportUser';
import ConfirmBlock from './_components/ConfirmBlock/ConfirmBlock';


interface MessagesProps {

}

const ChatPage: React.FC = () => {
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
        name: "Vitra",
        avatar: "/images/searchInput/virta.png",
    });

    const [showAside, setShowAside] = useState(true);
    const [isMainVisible, setIsMainVisible] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(0)
    const [openAutoReply, setOpenAutoReply] = useState(false)
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
            avatar: "/images/searchInput/virta.png",
            name: "Madeline Hintz",
            message: "Looking forward to your response!",
            checkStatus: true,
        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "William Dibbert",
            message: "Looking forward to your response!",
            checkStatus: false,

        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "Ariel Zieme",
            message: "Looking forward to your response!",
            checkStatus: false,

        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "Darryl Monahan",
            message: "Looking forward to your response!",
            checkStatus: true,

        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "Josefina Emard",
            message: "Looking forward to your response!",
            checkStatus: false,

        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "Angel Stokes",
            message: "Looking forward to your response!",
            checkStatus: false,

        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "Cory Adams",
            message: "Looking forward to your response!",
            checkStatus: true,

        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "Percy Bogan",
            message: "Looking forward to your response!",
            checkStatus: true,

        },
        {
            avatar: "/images/searchInput/virta.png",
            name: "Pam Carroll",
            message: "Looking forward to your response!",
            checkStatus: false,

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
        const chatMessagesContainer = document.querySelector('.chat-messages');
        if (chatMessagesContainer) {
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
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

            <div className="message-block">
                <aside className={`${showAside ? "" : "max-lg:!hidden"} max-lg:!w-full max-lg:!flex-1`}>
                    <div className="users">
                        {userData.map((item, index) => (
                            <div className={`user ${activeIndex === index ? "active" : ""}`} key={index} onClick={() => {
                                setActiveIndex(index)
                                chooseUser(item.name, item.avatar)
                            }}>
                                <div>
                                    <Image src={item.avatar} alt='' width={32} height={32}></Image>
                                </div>
                                <div>
                                    <p className='name'>
                                        {item.name}
                                        {item.checkStatus && (
                                            <Image src={"/images/searchInput/check-badge.svg"} alt='' width={20} height={20} />
                                        )}
                                    </p>
                                    <p className='message'>{item.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
                <div className={`chat-block ${isMainVisible ? "" : "max-lg:!hidden"}`}>
                    <div className="top">
                        <div className='user-name'>
                            <button onClick={goBackToAside}>
                                <Image src={"/images/icons/arrow-left.svg"} alt='' width={24} height={24} />
                            </button>
                            <Image src={choosenUser.avatar} alt='' width={32} height={32}></Image>
                            <div className='name-block'>
                                <p className='name max-lg:!text-sm'>
                                    {choosenUser.name}
                                    <Image src={"/images/searchInput/check-badge.svg"} alt='' width={20} height={20} />
                                </p>
                                <p className='response-time'>Typical response time: 20 min</p>
                            </div>

                        </div>
                        <div className='discount-extra-message'>
                            <div className='extra-block-message'>
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
                    <div className="main">
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

export default ChatPage;