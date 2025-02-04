import Image from 'next/image';
import React, { useState } from 'react';
import './Masseur.scss'

interface Props { }

const Masseur: React.FC<Props> = () => {

    const masseursData = [
        {
            name: "Winifred Wuckert",
            imageUrl: "/images/booking/masseur1.png",
            rating: 9.2,
        },
        {
            name: "Rachael Bogisich",
            imageUrl: "/images/booking/masseur1.png",
            rating: 9.9,
        },
        {
            name: "Whitney Dicki",
            imageUrl: "/images/booking/masseur1.png",
            rating: 8.5,
        },
    ];


    const [choosenMasseure, setChoosenMasseure] = useState<number | null>(null);


    const handleAnySpecialistSelect = () => {
        // const randomIndex = Math.floor(Math.random() * masseursData.length);
        setChoosenMasseure(null);
      };
    
      const handleChoosenMasseure = (index: number) => {
        setChoosenMasseure(index);
      };


    return (
        <div className="masseur">
            <h2>Choose Masseur</h2>
            <div className='masseur-col'>
                <div
                    className={`masseur-block ${choosenMasseure === null ? 'active' : ''} masseur-any`}
                    onClick={handleAnySpecialistSelect} // Выбор случайного специалиста
                >
                    <div className='circle'>
                        <Image src="/images/booking/Sparkles.svg" alt="masseur" width={60} height={60} />
                    </div>
                    <p>Any <br /> Specialist</p>
                    <div className={`checkbox ${choosenMasseure === null ? 'active' : ''}`}></div>
                    <div className={`check-circle ${choosenMasseure === null ? 'active' : ''}`}>
                        <Image className={`${choosenMasseure === null ? 'active' : ''}`} src="/images/booking/check-mark-dark.svg" alt='checked' width={8} height={8} />
                    </div>
                </div>
                {masseursData.map((masseur, index) => (
                    <div className={`masseur-block ${choosenMasseure === index ? "active" : ""}`} key={index} onClick={() => handleChoosenMasseure(index)}>
                        <div>
                            <Image src={masseur.imageUrl} alt={masseur.name} width={60} height={60} />
                        </div>
                        <p>{masseur.name}</p>
                        <p>
                            <Image src="/images/booking/star.svg" alt="star" width={12} height={12} /> {masseur.rating}
                        </p>
                        <div className={`checkbox ${choosenMasseure === index ? "active" : ""}`}></div>
                        <div className={`check-circle ${choosenMasseure === index ? "active" : ""}`}>
                            <Image className={`${choosenMasseure === index ? "active" : ""}`} src="/images/booking/check-mark-dark.svg" alt='checked' width={8} height={8}></Image>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Masseur;