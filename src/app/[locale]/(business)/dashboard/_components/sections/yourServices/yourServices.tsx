'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import './yourServices.scss';
import Image from 'next/image';

type ServiceTableProps = {
  service: {
    title: string;
    image: string;
    width: number;
    height: number;
    data: {
      name: string;
    }[];
  };
  conversionRate: number[];
  orders: number[];
  revenue: number[];
}[];

const YourServices: React.FC = () => {
  const t = useTranslations();
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown
  const [status, setStatus] = useState<number>(1);
  const [showServices, setShowServices] = useState<number[]>([0]);
  const services: ServiceTableProps = [
    {
      service: {
        title: t('yoga'),
        image: 'service1',
        width: 17,
        height: 18,
        data: [
          {
            name: t('gentle_flow_yoga_class'),
          },
          {
            name: t('power_vinyasa_yoga_workshop'),
          },
          {
            name: t('restorative_yoga_and_meditation'),
          },
        ],
      },
      conversionRate: [37, 12, 51, 35],
      orders: [22, 15, 14, 34],
      revenue: [5283.24, 6712.42, 1232.71, 103.23],
    },
    {
      service: {
        title: t('spa'),
        image: 'service2',
        width: 14,
        height: 20,
        data: [
          {
            name: t('tranquil_relaxation_massage'),
          },
          {
            name: t('revitalizing_aromatherapy_facial'),
          },
        ],
      },
      conversionRate: [31, 12, 14],
      orders: [30, 89, 34],
      revenue: [2178.3, 20, 80],
    },
    {
      service: {
        title: t('fitness'),
        image: 'service3',
        width: 21,
        height: 16,
        data: [
          {
            name: t('energizing_cardio_fitness_class'),
          },
          {
            name: t('strength_and_conditioning_bootcamp'),
          },
          {
            name: t('mindful_movement_yoga_fusion'),
          },
        ],
      },
      conversionRate: [31, 12, 14, 19],
      orders: [30, 89, 34, 12],
      revenue: [2178.3, 20, 80, 10],
    },
    {
      service: {
        title: t('cycling'),
        image: 'service4',
        width: 17,
        height: 15,
        data: [
          {
            name: t('gentle_flow_yoga_class'),
          },
          {
            name: t('restorative_yoga_and_meditation'),
          },
          {
            name: t('power_vinyasa_yoga_workshop'),
          },
        ],
      },
      conversionRate: [31, 12, 14, 19],
      orders: [30, 89, 34, 12],
      revenue: [2178.3, 20, 80, 10],
    },
    {
      service: {
        title: t('mindful'),
        image: 'service5',
        width: 24,
        height: 24,
        data: [
          {
            name: t('restorative_yoga_and_meditation'),
          },
          {
            name: t('power_vinyasa_yoga_workshop'),
          },
          {
            name: t('gentle_flow_yoga_class'),
          },
        ],
      },
      conversionRate: [31, 12, 14, 19],
      orders: [30, 89, 34, 12],
      revenue: [2178.3, 20, 80, 10],
    },
  ];

  const toggleRow = (index: number) => {
    setActiveRow(activeRow === index ? null : index);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveRow(null); // Close dropdown
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='yourServices'>
      <div className='header max-lg:!mb-5'>
        <h2 className='max-lg:!text-lg'>{t('dashboard-yourServices-title')}</h2>
        <div className='btns'>
          <button className='btn'>See all</button>
        </div>
      </div>
      <div className='overflow-auto rounded-2xl border border-[#DBECF0]'>
        <div className='controls max-lg:border-b max-lg:border-b-[#DBECF0]'>
          <div className='select'>
            <button
              className={` flex items-center ${status === 1 ? 'btn lg:!bg-[#0c343d] lg:!text-white' : 'btn'}`}
              onClick={() => setStatus(1)}
            >
              {t('all')}
              <Image className='lg:hidden' src={"/images/icons/chevron-up-black.svg"} alt='' width={14} height={14}/>
            </button>
            
            <button
              className={`max-lg:hidden ${status === 2 ? 'btn lg:!bg-[#0c343d] lg:!text-white' : 'btn'}`}
              onClick={() => setStatus(2)}
            >
              {t('active')}
            </button>
            <button
              className={`max-lg:hidden ${status === 3 ? 'btn lg:!bg-[#0c343d] lg:!text-white' : 'btn'}`}
              onClick={() => setStatus(3)}
            >
              {t('paused')}
            </button>
          </div>
          <div className='filter'>
            <button className='btn max-lg:text-sm '>
              <Image
                priority
                width={13}
                height={12}
                src='/images/dashboard/search.svg'
                alt='SearchOutline'
              />
              Search
            </button>
            <button className='btn max-lg:text-sm'>
              <Image
                priority
                width={10}
                height={10}
                src='/images/dashboard/filter.svg'
                alt='SearchOutline'
              />
              {t('filter')}
            </button>
          </div>
        </div>
        <table className='min-w-full max-lg:hidden !bg-white'>
          <thead>
            <tr className='serviceSections border-[#DBECF0] font-[400] text-[#878E97]'>
              <th className='px-6 text-left'>
                <div className='serviceSectionsCategory'>
                  <h3>{t('dashboard-yourServices-service')}</h3>
                  <div className='my-1 flex flex-col gap-[2px]'>
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='up arrow'
                      width={10}
                      height={10}
                      className='chevron_small_up'
                    />
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='down arrow'
                      width={10}
                      height={10}
                      className='chevron_small'
                    />
                  </div>
                </div>
              </th>
              <th className='border-l px-6 text-left'>
                <div className='serviceSectionsCategory'>
                  <h3>{t('dashboard-yourServices-conversionRate')}</h3>
                  <div className='my-1 flex flex-col gap-[2px]'>
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='up arrow'
                      width={10}
                      height={10}
                      className='chevron_small_up'
                    />
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='down arrow'
                      width={10}
                      height={10}
                      className='chevron_small'
                    />
                  </div>
                </div>
              </th>
              <th className='border-l px-6 text-left'>
                <div className='serviceSectionsCategory'>
                  <h3>{t('dashboard-yourServices-orders')}</h3>
                  <div className='my-1 flex flex-col gap-[2px]'>
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='up arrow'
                      width={10}
                      height={10}
                      className='chevron_small_up'
                    />
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='down arrow'
                      width={10}
                      height={10}
                      className='chevron_small'
                    />
                  </div>
                </div>
              </th>
              <th className='border-l px-6 text-left'>
                <div className='serviceSectionsCategory'>
                  <h3>{t('dashboard-yourServices-revenue')}</h3>
                  <div className='my-1 flex flex-col gap-[2px]'>
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='up arrow'
                      width={10}
                      height={10}
                      className='chevron_small_up'
                    />
                    <Image
                      src={'/images/services/dropdown.svg'}
                      alt='down arrow'
                      width={10}
                      height={10}
                      className='chevron_small'
                    />
                  </div>
                </div>
              </th>
              <th className='border-l px-6 text-left'></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <React.Fragment key={index}>
                <tr className='border-t'>
                  <td className='px-6'>
                    <div className='flex items-center gap-[2px]'>
                      <div className='service'>
                        <h3>

                          {service.service.title}
                          <button
                            onClick={() => {
                              let found = false;
                              showServices.forEach((service) => {
                                if (service === index) {
                                  const newArr = showServices.filter(
                                    (val) => val !== index,
                                  );
                                  setShowServices(newArr);
                                  found = true;
                                }
                              });
                              if (!found) {
                                const newArr = [...showServices];
                                newArr.push(index);
                                setShowServices(newArr);
                              }
                            }}
                          >
                            {showServices.includes(index) ? (
                              <Image
                                className='chevron_up'
                                priority
                                src={`/images/services/dropdown.svg`}
                                width={8}
                                height={5}
                                alt={`dropdown`}
                              />
                            ) : (
                              <Image
                                className='chevron'
                                priority
                                src={`/images/services/dropdown.svg`}
                                width={8}
                                height={5}
                                alt={`dropdown`}
                              />
                            )}
                          </button>
                        </h3>
                        {showServices.includes(index) ? (
                          <ul>
                            {service.service.data.map((item, idx) => (
                              <li key={idx}>
                                <div className='info'>
                                  <p>{item.name}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </td>

                  {/* Conversion Rate */}
                  <td className='border-l px-6'>
                    <div className='flex items-center gap-[2px]'>
                      <div className='service-list'>
                        {showServices.includes(index) ? (
                          <>
                            <h3>{`${service.conversionRate[0]}%`}</h3>
                            <ul>
                              {service.conversionRate.map(
                                (conversion, index) =>
                                  index !== 0 && (
                                    <li key={index}>
                                      <div className='info'>
                                        <p>{`${conversion}%`}</p>
                                      </div>
                                    </li>
                                  ),
                              )}
                            </ul>
                          </>
                        ) : (
                          <p>{`${service.conversionRate[0]}%`}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Orders */}
                  <td className='border-l px-6'>
                    <div className='flex items-center gap-[2px]'>
                      <div className='service-list'>
                        {showServices.includes(index) ? (
                          <>
                            <h3>{service.orders[0].toLocaleString()}</h3>
                            <ul>
                              {service.orders.map(
                                (conversion, index) =>
                                  index !== 0 && (
                                    <li key={index}>
                                      <div className='info'>
                                        <p>{conversion.toLocaleString()}</p>
                                      </div>
                                    </li>
                                  ),
                              )}
                            </ul>
                          </>
                        ) : (
                          <p>{service.orders[0].toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Revenue */}
                  <td className='border-l px-6'>
                    <div className='flex items-center gap-[2px]'>
                      <div className='service-list'>
                        {showServices.includes(index) ? (
                          <>
                            <h3>{`${service.revenue[0].toLocaleString()} CHF`}</h3>
                            <ul>
                              {service.revenue.map(
                                (conversion, index) =>
                                  index !== 0 && (
                                    <li key={index}>
                                      <div className='info'>
                                        <p>{`${conversion.toLocaleString()} CHF`}</p>
                                      </div>
                                    </li>
                                  ),
                              )}
                            </ul>
                          </>
                        ) : (
                          <p>{`${service.revenue[0].toLocaleString()} CHF`}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Options */}
                  <td className='relative mx-6 border-l text-center'>
                    <div
                      onClick={() => toggleRow(index)}
                      className='flex cursor-pointer justify-center gap-[2px]'
                    >
                      <Image
                        src={
                          activeRow === index
                            ? '/images/services/activeThreeDots.svg'
                            : '/images/dashboard/dots.svg'
                        }
                        alt='three dots'
                        width={12}
                        height={1.5}
                        className='h-[18px] w-[18px]'
                      />
                    </div>
                    {activeRow === index && (
                      <div
                        ref={dropdownRef}
                        className='absolute right-14 mt-2 h-[178px] w-[191px] rounded-lg bg-[#3D3D3D] p-2 shadow-lg'
                      >
                        <div className='flex cursor-pointer items-center rounded p-2 hover:bg-gray-700'>
                          <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#C3C3C34D]'>
                            <Image
                              src={'/images/services/FourDirectionArrow.svg'}
                              width={16}
                              height={16}
                              className='h-[9.6px] w-[9.6px]'
                              alt='Check/Edit'
                            />
                          </div>
                          <span className='ml-2 text-white'>
                            Check/Edit Detail
                          </span>
                        </div>
                        <div className='flex cursor-pointer items-center rounded p-2 hover:bg-gray-700'>
                          <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#C3C3C34D]'>
                            <Image
                              src={'/images/services/tag.svg'}
                              width={16}
                              height={16}
                              className='h-[9.6px] w-[9.6px]'
                              alt='Set Discount'
                            />
                          </div>
                          <span className='ml-2 text-white'>Set Discount</span>
                        </div>
                        <div className='flex cursor-pointer items-center rounded p-2 hover:bg-gray-700'>
                          <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#C3C3C34D]'>
                            <Image
                              src={'/images/services/pause2.svg'}
                              width={16}
                              height={16}
                              className='h-[9.6px] w-[9.6px]'
                              alt='Pause Service'
                            />
                          </div>
                          <span className='ml-2 text-white'>Pause Service</span>
                        </div>
                        <div className='flex cursor-pointer items-center rounded p-2 hover:bg-gray-700'>
                          <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#D56C6CB2]'>
                            <Image
                              src={'/images/services/delete.svg'}
                              width={16}
                              height={16}
                              className='h-[9.6px] w-[9.6px]'
                              alt='Delete'
                            />
                          </div>
                          <span className='ml-2 text-white'>Delete</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className='lg:hidden w-full !bg-white'>
          {services.map((service, index) => (
            <div className=' !py-4 !px-5 border-b border-[#DBECF0]' key={index}>
              <div>
                <h3 className='flex items-center gap-1 font-bold text-sm'>
                  {service.service.title}
                  <button
                    onClick={() => {
                      let found = false;
                      showServices.forEach((service) => {
                        if (service === index) {
                          const newArr = showServices.filter(
                            (val) => val !== index,
                          );
                          setShowServices(newArr);
                          found = true;
                        }
                      });
                      if (!found) {
                        const newArr = [...showServices];
                        newArr.push(index);
                        setShowServices(newArr);
                      }
                    }}
                  >
                    {showServices.includes(index) ? (
                      <Image
                        className='chevron_up'
                        priority
                        src={`/images/services/dropdown.svg`}
                        width={8}
                        height={5}
                        alt={`dropdown`}
                      />
                    ) : (
                      <Image
                        className='chevron'
                        priority
                        src={`/images/services/dropdown.svg`}
                        width={8}
                        height={5}
                        alt={`dropdown`}
                      />
                    )}
                  </button>
                </h3>
                
              </div>
              <div className='flex gap-[6px] mt-3 items-center !overflow-x-auto min-w-full'>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Conversion Rate: <span className='text-[#000B19]'>94.3%</span></p>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Orders: <span className='text-[#000B19]'>31</span></p>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Revenue: <span className='text-[#000B19]'>5 283,24 CHF</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourServices;
