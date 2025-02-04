'use client';
import React, { useEffect, useState } from 'react';
import './HeaderInput.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { usePathname,  useRouter} from 'next/navigation';
import Link from 'next/link';


interface SlideData {
  title: string;
  imageSrc: string;
  avaImage: string;
  rating: number;
  priceRange: string;
  location: string;
  services: string[];
  address: boolean;
  addressText: "Thun"
}

const slideData: SlideData[] = [
  {
    title: 'Harmony Haven Wellness Center',
    imageSrc: '/images/home/booking1.svg',
    avaImage: "/images/searchInput/virta.png",
    rating: 8.5,
    priceRange: '$$$$',
    location: 'Seefeld',
    services: ['Spa', 'Yoga', 'Detox'],
    address: false,
    addressText: "Thun"
  },
  {
    title: 'Serenity Spa Retreat',
    imageSrc: '/images/home/booking2.svg',
    avaImage: "/images/searchInput/virta.png",
    rating: 9.2,
    priceRange: '$$$$',
    location: 'Engel',
    services: ['Massage', 'Meditation', 'Workshops'],
    address: true,
    addressText: "Thun"
  },
  {
    title: 'Pure Pilates Oasis',
    imageSrc: '/images/home/booking3.svg',
    avaImage: "/images/searchInput/virta.png",
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Altdetten',
    services: ['Pilates', 'Core Strength', 'Nutrition'],
    address: true,
    addressText: "Thun"
  },
  {
    title: 'Renewal Fitness Hub',
    imageSrc: '/images/home/booking4.svg',
    avaImage: "/images/searchInput/virta.png",
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Oerlikon',
    services: ['Fitness', 'Pilates', 'Yoga'],
    address: false,
    addressText: "Thun"
  },
];




const HeaderInput: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [routerReady, setRouterReady] = useState(false);
  const router = useRouter();

  const isSearchPage = pathname === `/${locale}/homeSection/SearchResults`


  useEffect(() => {
    setRouterReady(true);
  }, []);


  const [inputDropdown, setInputDropdown] = useState(false)
  const [isTypingDropdownOpen, setTypingDropdownOpen] = useState(false); // Управляет вторым dropdown
  const [inputValue, setInputValue] = useState('');
  const [isClear, setIsClear] = useState(false);



  const recommendationsData = [
    {
      title: "Serenity Spa Retreat",
      image: "/images/searchInput/virta.png",
      type: "Thun"
    },
    {
      title: "Renewal Fitness Hub",
      image: "/images/searchInput/virta.png",
      type: "Bern"
    },
    {
      title: "Harmony Haven Wellness Center",
      image: "/images/searchInput/virta.png",
      type: "Biel/Bienne"
    },
  ]



  const searchedData = [
    {
      title: "Spa in Zurich",
      image: "/images/searchInput/clock.svg",
    },
    {
      title: "Aromatheraphy",
      image: "/images/searchInput/clock.svg",
    },
    {
      title: "Yoga Classes",
      image: "/images/searchInput/clock.svg",
    },
  ]

  const filteredData = slideData.filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  );


  const handleInputClick = () => {
    if (inputValue.trim() === '') {
      setInputDropdown(true);
      setTypingDropdownOpen(false);
    } else {
      setInputDropdown(false);
      setTypingDropdownOpen(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() !== '') {
      setInputDropdown(false); // Закрываем первый dropdown
      setTypingDropdownOpen(true); // Открываем второй dropdown
    } else {
      setInputDropdown(true); // Открываем первый dropdown
      setTypingDropdownOpen(false); // Закрываем второй dropdown
    }

    if (isSearchPage) {
      if (value.trim() !== '') {
        setIsClear(false);
      } else {
        setIsClear(false);
      }
    }
  };

  const handleOutsideClick = () => {
    setInputDropdown(false);
    setTypingDropdownOpen(false);
  };

  const clearInput = () => {
    setInputValue('')
  }



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryValue = params.get('query');
    if (queryValue) {
      setInputValue(decodeURIComponent(queryValue));
    }
  }, []);

  useEffect(() => {
    // Сбрасываем isClear, если переходим на страницу поиска
    if (isSearchPage) {
      setIsClear(true);
    } else {
      setIsClear(false);
    }
  }, [isSearchPage]);
  

  const handleSearch = () => {
    if (isSearchPage) setIsClear(true);

    router.push(`/${locale}/homeSection/SearchResults?data=${JSON.stringify(filteredData)}&query=${encodeURIComponent(inputValue)}`);

  };

  return (
    <React.Fragment>
      <div className={`headerInput ${inputDropdown || isTypingDropdownOpen ? "active" : ""}`}>
        <Image
          priority
          width={24}
          height={24}
          src='/images/home/SearchOutline.svg'
          alt='SearchOutline'
          className='search-icon'
        />
        <input
          spellCheck='false'
          type='text'
          placeholder={t('search-paceholder')}
          onClick={handleInputClick}
          onChange={handleInputChange}
          onBlur={handleOutsideClick}
          value={inputValue}
        />
        {!isClear && (
          <button className='find-btn' onClick={handleSearch}>
            <Image
              priority
              width={20}
              height={20}
              src='/images/home/SearchOutline.svg'
              alt='SearchOutline'
              className='btn-search-icon lg:hidden'
            />
            <span className='max-lg:hidden'>Search</span>
          </button>
        )}
        {isClear && isSearchPage && (
          <button className='mr-2' onClick={clearInput}>
            <Image src={"/images/icons/x-input.svg"} alt='' width={28} height={28} />
          </button>
        )}

        {inputDropdown && (
          <div className={`header-dropdown`}>
            <div className="header-dropdown-absolute">
              <div>
                <div className="near-location">
                  <div className='nearby'>
                    <div className='title-side'>
                      <Image src={"/images/searchInput/location-icon.svg"} alt='' width={32} height={32} />
                      <p className='text-start'>Nearby Location Based Search</p>
                    </div>
                    <div className='status'>
                      <Image src={"/images/searchInput/check-icon.svg"} alt='' width={20} height={20} />
                      <p>Activated</p>
                    </div>
                  </div>
                  <div className='ai-search'>
                    <div className='title-side'>
                      <Image src={"/images/searchInput/ai-icon.svg"} alt='' width={32} height={32} />
                      <p>AI Assisted Search</p>
                    </div>

                  </div>
                </div>
                <div className="recommendations">
                  <h2>Gondli Recommendations</h2>

                  {recommendationsData.map((item, index) => (
                    <div className='recommendation' key={index}>
                      <div className='image-side'>
                        <Image src={item.image} alt='' width={32} height={32} />
                      </div>
                      <div className='title-side'>
                        <p className='text-start'>{item.title}</p>
                        <p className='type'>{item.type}</p>
                      </div>
                    </div>
                  ))}

                </div>
                <div className="recently-searched">
                  <h2>Recently Searched</h2>

                  {searchedData.map((item, index) => (
                    <div className='searched' key={index}>
                      <div className='image-side'>
                        <Image src={item.image} alt='' width={32} height={32} />
                      </div>
                      <div className='title-side'>
                        <p className='text-start'>{item.title}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        )}


        {isTypingDropdownOpen && (
          <div className={`header-dropdown`}>
            <div className="header-dropdown-absolute">
              <div className="recommendations-typing">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <div className="recommendation flex items-center" key={index}>
                      <div className="image-side mr-2">
                        <Image src={item.avaImage} alt="" width={32} height={32} />
                      </div>
                      <div className="title-side">
                        <p className="font-medium">{item.title}</p>
                        {item.address && (
                          <p className='type'>{item.addressText}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No results found</div>
                )}

              </div>
            </div>
          </div>
        )}


      </div>
      <div className={`darkscreen ${inputDropdown || isTypingDropdownOpen ? "active" : ""}`}></div>
    </React.Fragment>
  );
};

export default HeaderInput;
