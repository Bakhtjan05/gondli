'use client';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import './ServiceTable.scss';

interface ServiceTableProps {
  searchTerm: string;
  services: any[];
  setIsDiscountModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsPuaseConfirmModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsDeleteConfirmModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsDetailServiceModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

type SortColumn = 'category' | 'service' | 'price' | 'duration' | 'type';
type SortDirection = 'asc' | 'desc';

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  setIsDiscountModalOpen,
  setIsPuaseConfirmModalOpen,
  setIsDeleteConfirmModalOpen,
  setIsDetailServiceModalOpen,
  searchTerm,
}) => {
  const t = useTranslations();
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [sortedServices, setSortedServices] = useState<any[]>(services);
  const [sortConfig, setSortConfig] = useState<{
    column: SortColumn;
    direction: SortDirection;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownRefMb = useRef<HTMLDivElement | null>(null);
  const isToggling = useRef(false);

  const toggleRow = (index: number) => {
    setActiveRow(activeRow === index ? null : index);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) &&
        (dropdownRefMb.current && !dropdownRefMb.current.contains(event.target as Node))
      ) {
        setActiveRow(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Sort services by column
  const sortServices = (column: SortColumn) => {
    let direction: SortDirection = 'asc';
    if (
      sortConfig &&
      sortConfig.column === column &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ column, direction });

    const sorted = [...services].sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      // Convert price to a number for numeric sorting
      if (column === 'price') {
        valueA = parseFloat(a[column]);
        valueB = parseFloat(b[column]);
      }

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedServices(sorted);
  };

  // Filter services based on searchTerm
  useEffect(() => {
    if (searchTerm) {
      const filteredServices = services.filter((service) =>
        service.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSortedServices(filteredServices);
    } else {
      setSortedServices(services);
    }
  }, [searchTerm, services]);

  return (
    <div className='table-container'>
      <div className='active-services-count-wrapper'>
        <div className='count'>{sortedServices.length}</div>
        <div className='text'>{t('active-services')}</div>
      </div>
      <table className='max-lg:!hidden'>
        <thead>
          <tr className='head-row'>
            {['category', 'service', 'price', 'duration', 'type'].map((col) => (
              <th
                key={col}
                className='table-header-1'
                onClick={() => sortServices(col as SortColumn)}
              >
                <div className='service-columns-name'>
                  <span>{t(`${col}`)}</span>
                  <div className='arrow-icon-wrapper'>
                    <Image
                      src='/images/services/upArrow.svg'
                      alt='up arrow'
                      width={10}
                      height={10}
                      className={
                        sortConfig?.column === col &&
                          sortConfig?.direction === 'asc'
                          ? 'active-arrow'
                          : ''
                      }
                    />
                    <Image
                      src='/images/services/downArrow.svg'
                      alt='down arrow'
                      width={10}
                      height={10}
                      className={
                        sortConfig?.column === col &&
                          sortConfig?.direction === 'desc'
                          ? 'active-arrow'
                          : ''
                      }
                    />
                  </div>
                </div>
              </th>
            ))}
            <th className='table-header-blank'></th>
          </tr>
        </thead>
        <tbody>
          {sortedServices.length > 0 ? (
            sortedServices.map((service: any, index: number) => (
              <React.Fragment key={index}>
                <tr>
                  <td className='service-category'>
                    <div className='service-category-wrapper'>

                      <span className='text !font-bold'>{service.category}</span>
                    </div>
                  </td>
                  <td className='service-service'>{service.service}</td>
                  <td className='service-price'>
                    <span>{`${service.price} CHF`}</span>
                    {service.discount > 0 && (
                      <Image
                        src={`/images/services/${service.discount < 40
                          ? 'progress1'
                          : service.discount > 60
                            ? 'progress3'
                            : 'progress2'
                          }.svg`}
                        alt='discount'
                        width={24}
                        height={24}
                      />
                    )}
                  </td>
                  <td className='service-duration'>{`${service.duration} ${t(
                    'service-minutes',
                  )}`}</td>
                  <td className='service-type'>{service.type}</td>
                  <td
                    className='three-dots'
                    onClick={
                      activeRow === index ? undefined : () => toggleRow(index)
                    }
                  >
                    <div className='three-dots-wrapper'>
                      <Image
                        src={
                          activeRow === index
                            ? '/images/services/activeThreeDots.svg'
                            : '/images/services/threeDots.svg'
                        }
                        alt='three dots'
                        width={12}
                        height={1.5}
                      />
                    </div>
                    {activeRow === index && (
                      <div ref={dropdownRef} className='three-dots-dropdown'>
                        <div
                          className='check-edit-modal-option'
                          onClick={() => {
                            setIsDetailServiceModalOpen(true);
                            setActiveRow(null);
                          }}
                        >
                          <div className='icon'>
                            <Image
                              src={'/images/services/FourDirectionArrow.svg'}
                              width={14}
                              height={14}
                              alt='Check/Edit'
                            />
                          </div>
                          <span className='text'>{t('check-edit-detail')}</span>
                        </div>
                        <div className='service-border-bottom' />
                        <div
                          className='discount-option'
                          onClick={() => {
                            setIsDiscountModalOpen(true);
                            setActiveRow(null);
                          }}
                        >
                          <div className='icon'>
                            <Image
                              src={'/images/services/tag.svg'}
                              width={12}
                              height={12}
                              alt='Set Discount'
                            />
                          </div>
                          <span className='text'>{t('setDiscount')}</span>
                        </div>
                        <div
                          className='pause-service-option'
                          onClick={() => {
                            setIsPuaseConfirmModalOpen(true);
                            setActiveRow(null);
                          }}
                        >
                          <div className='icon'>
                            <Image
                              src={'/images/services/pause2.svg'}
                              width={12}
                              height={12}
                              alt='Pause Service'
                            />
                          </div>
                          <span className='text'>{t('pauseService')}</span>
                        </div>
                        <div className='service-border-bottom' />
                        <div
                          className='delete-option'
                          onClick={() => {
                            setIsDeleteConfirmModalOpen(true);
                            setActiveRow(null);
                          }}
                        >
                          <div className='icon'>
                            <Image
                              src={'/images/services/Delete.svg'}
                              width={12}
                              height={12}
                              alt='Delete'
                            />
                          </div>
                          <span className='text'>{t('delete')}</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={6} className='no-services'>
                {t('no-such-service-found')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='lg:hidden w-full !bg-white'>
        {services.map((service, index) => (
          <div className=' !py-4 !px-5 border-b border-[#DBECF0]' key={index}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <h3 className='flex items-center gap-1 font-bold text-sm'>
                  {service.service}
                </h3>
              </div>
              <div className='flex !items-center gap-3'>
                <div>
                  {service.discount > 0 && (
                    <Image
                      src={`/images/services/${service.discount < 40
                        ? 'progress1'
                        : service.discount > 60
                          ? 'progress3'
                          : 'progress2'
                        }.svg`}
                      alt='discount'
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <div
                  className='extra-three-dots'
                  onClick={
                    activeRow === index ? undefined : () => toggleRow(index)
                  }
                >
                  <div className='three-dots-wrapper'>
                    <Image
                      src={
                        activeRow === index
                          ? '/images/services/activeThreeDots.svg'
                          : '/images/services/threeDots.svg'
                      }
                      alt='three dots'
                      width={12}
                      height={1.5}
                    />
                  </div>
                  {activeRow === index && (
                    <div ref={dropdownRefMb} className='three-dots-dropdown'>
                      <div
                        className='check-edit-modal-option'
                        onClick={() => {
                          setIsDetailServiceModalOpen(true);
                          setActiveRow(null);
                        }}
                      >
                        <div className='icon'>
                          <Image
                            src={'/images/services/FourDirectionArrow.svg'}
                            width={14}
                            height={14}
                            alt='Check/Edit'
                          />
                        </div>
                        <span className='text'>{t('check-edit-detail')}</span>
                      </div>
                      <div className='service-border-bottom' />
                      <div
                        className='discount-option'
                        onClick={() => {
                          setIsDiscountModalOpen(true);
                          setActiveRow(null);
                        }}
                      >
                        <div className='icon'>
                          <Image
                            src={'/images/services/tag.svg'}
                            width={12}
                            height={12}
                            alt='Set Discount'
                          />
                        </div>
                        <span className='text'>{t('setDiscount')}</span>
                      </div>
                      <div
                        className='pause-service-option'
                        onClick={() => {
                          setIsPuaseConfirmModalOpen(true);
                          setActiveRow(null);
                        }}
                      >
                        <div className='icon'>
                          <Image
                            src={'/images/services/pause2.svg'}
                            width={12}
                            height={12}
                            alt='Pause Service'
                          />
                        </div>
                        <span className='text'>{t('pauseService')}</span>
                      </div>
                      <div className='service-border-bottom' />
                      <div
                        className='delete-option'
                        onClick={() => {
                          setIsDeleteConfirmModalOpen(true);
                          setActiveRow(null);
                        }}
                      >
                        <div className='icon'>
                          <Image
                            src={'/images/services/Delete.svg'}
                            width={12}
                            height={12}
                            alt='Delete'
                          />
                        </div>
                        <span className='text'>{t('delete')}</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
            <div className='flex gap-[6px] mt-3 items-center !overflow-x-auto mi-w-full'>
              <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Order: <span className='text-[#000B19]'>{service.category}</span></p>
              <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Type: <span className='text-[#000B19]'>{service.price}</span></p>
              <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Service: <span className='text-[#000B19]'>{service.duration}</span></p>
              <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Paid Amount: <span className='text-[#000B19]'>{service.type}</span></p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTable;
