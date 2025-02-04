"use client"

import React, { useEffect, useRef, useState } from 'react';
import "./SearchResults.scss"
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchItem {
    title: string;
    imageSrc: string;
    avaImage: string;
    rating: number;
    priceRange: string;
    location: string;
    services: string[];
}


const SearchResults: React.FC = () => {
    const searchParams = useSearchParams();

    const router = useRouter();
    const data = searchParams.get('data');


    const parsedData = data ? JSON.parse(data as string) : [];

    return (
        <div>
            <div className="map-search lg:hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21629.701930694486!2d8.509508935015104!3d47.33948113662698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479009d845d42b91%3A0x7db4358e76bb3faa!2z0JLQvtC70LvQuNGB0YXQvtGE0LXQvSwg0KbRjtGA0LjRhSwg0KjQstC10LnRhtCw0YDQuNGP!5e0!3m2!1sru!2s!4v1730910856396!5m2!1sde!2s&hl=de" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="search-page-container">
                <div className='search-page'>
                    <div className="search-block">
                        <div className='search-title'>
                            <h2 className='max-lg:!text-[22px]'>Search Results</h2>
                            <button className='filter-btn'>
                                <Image className='filter-icon' src={"/images/searchInput/filter-icon.svg"} alt='' width={20} height={20} />
                                Filter
                            </button>
                        </div>
                        <div className='grid-block'>
                            {parsedData.map((item: SearchItem, index: number) => (
                                <div className='image-wrapper' key={index}>
                                    <div className='banner'>
                                        <Image
                                            priority
                                            width={100}
                                            height={100}
                                            className='main-img'
                                            src={item.imageSrc}
                                            alt={item.title}
                                        />
                                        <Image
                                            priority
                                            width={32}
                                            height={32}
                                            className='heart'
                                            src='/images/home/heart.svg'
                                            alt='heart'
                                        />
                                        <div className='favorite max-lg:!hidden'>
                                            <Image
                                                priority
                                                width={32}
                                                height={32}
                                                src='/images/home/heat.svg'
                                                alt='heat'
                                            />
                                            <span>Users Favorite</span>
                                        </div>
                                    </div>
                                    <h2 className='slide-title'>{item.title}</h2>
                                    <div className='additional-info'>
                                        <div className='service'>
                                            {item.services.map((service, i) => (
                                                <span key={i}>{service}</span>
                                            ))}
                                        </div>
                                        <div className='info'>
                                            <span className='rating'>
                                                <Image
                                                    priority
                                                    width={12}
                                                    height={12}
                                                    src='/images/home/star.svg'
                                                    alt='star'
                                                />{' '}
                                                {item.rating}
                                            </span>
                                            <span className='price'>{item.priceRange}</span>
                                            <span className='location'>{item.location}</span>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>
                    <div className="map-search max-lg:hidden">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21629.701930694486!2d8.509508935015104!3d47.33948113662698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479009d845d42b91%3A0x7db4358e76bb3faa!2z0JLQvtC70LvQuNGB0YXQvtGE0LXQvSwg0KbRjtGA0LjRhSwg0KjQstC10LnRhtCw0YDQuNGP!5e0!3m2!1sru!2s!4v1730910856396!5m2!1sde!2s&hl=de" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResults;