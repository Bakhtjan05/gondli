import React, { useState, useEffect } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import './Formeleven.scss';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import NumberInput from '../../InputFields/NumberInput';
import { Switch } from '@headlessui/react';
import { Select } from '@headlessui/react';

interface FormElevenProps {
  formData: {
    services: string; // Stringified array of services
    [key: string]: any; // Other form fields
  };
  handleChange: (name: string, value: string) => void;
}

export default function FormEleven({
  formData,
  handleChange,
}: FormElevenProps) {
  const t = useTranslations();
  const servicesList = JSON.parse(formData.services || '[]') as string[]; // Parse services from formData
  const [serviceItems, setServiceItems] = useState<{ [key: string]: string[] }>(
    {},
  );
  const [currentInputs, setCurrentInputs] = useState<{ [key: string]: string }>(
    {},
  );
  const [duration, setDuration] = useState<number>(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [serverPrice, setServerPrice] = useState(0);
  const [enabled, setEnabled] = useState<boolean>(false);


  const dayData = [
    { day: 'Monday' },
    { day: 'Tuesday' },
    { day: 'Wednesday' },
    { day: 'Thursday' },
    { day: 'Friday' },
    { day: 'Saturday' },
  ]
  // Initialize state for each service's items
  useEffect(() => {
    const initialServiceItems: { [key: string]: string[] } = {};
    const initialInputs: { [key: string]: string } = {};
    servicesList.forEach((service) => {
      initialServiceItems[service] = []; // Empty list for each service initially
      initialInputs[service] = ''; // Empty input for each service
    });
    setServiceItems(initialServiceItems);
    setCurrentInputs(initialInputs);
  }, []);

  const handleInputChange = (service: string, value: string) => {
    setCurrentInputs((prev) => ({
      ...prev,
      [service]: value,
    }));
  };

  const handleKeyPress = (
    service: string,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' && currentInputs[service].trim()) {
      e.preventDefault();
      const trimmedName = currentInputs[service].trim();

      // Add unique items only
      setServiceItems((prevItems) => {
        const updatedItems = prevItems[service].includes(trimmedName)
          ? prevItems[service]
          : [...prevItems[service], trimmedName];

        handleChange(service, JSON.stringify(updatedItems)); // Update formData
        return {
          ...prevItems,
          [service]: updatedItems,
        };
      });

      // Clear input
      setCurrentInputs((prev) => ({
        ...prev,
        [service]: '',
      }));
    }
  };

  return (
    <div className='form-eleven-main'>
      <FormHeader
        title={'What services do you offer to users?'}
        desc={'Fill out all the services you offer to users into different categories. make sure to include every detail tailored for great user’s experience.'}
      />

      <div className='form-eleven-boxx gradient-border glass-border max-lg:!px-4 max-lg:!py-5'>
        {servicesList.map((service, index) => (
          <div className='eleven' key={service || index}>
            <div className='eleven-topic'>
              <div>
                <Image
                  src='/businessregistration/candle-line.svg'
                  alt=''
                  width={24}
                  height={24}
                  className='eleven-icon'
                />
              </div>
              <span className='eleven-icon-desc'>{t(service)}</span>
            </div>

            {serviceItems[service]?.map((item, itemIndex) => (
              <Disclosure key={itemIndex}>
                {({ open }) => (
                  <div
                    className={`eleven-list glass-border gradient-eleven-border flex py-0 ${open ? '!border-[#5cb170]' : ''
                      }`}
                    key={itemIndex}
                  >
                    <DisclosureButton
                      className={`group relative z-10 min-h-[56px] w-full cursor-pointer px-[20px] py-0 ${open ? 'border-b !border-[#5cb170]' : ''}`}
                    >
                      <div className='flex w-full cursor-pointer items-center justify-between'>
                        <span className='w-fit font-medium text-white max-lg:!text-sm'>
                          {t(item)}
                        </span>

                        <Image
                          src='/businessregistration/ChevronDown.svg'
                          alt='plus'
                          width={16}
                          height={16}
                          className='arrow-icon transition duration-300 group-data-[open]:rotate-180'
                        />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className='z-10 w-full px-[20px] max-lg:!px-0 py-4'>
                      {/* GENERAL DETAILS */}
                      <section>
                        <header className='flex items-center justify-between gap-4'>
                          <h4 className='text-base text-[#ACBFC3] max-lg:!text-sm max-lg:!pl-4'>
                            General Details
                          </h4>
                          <span className='h-[1px] w-full flex-1 bg-[#739097]'></span>
                        </header>
                        <div className='pl-4 max-lg:!pl-0'>
                          <div className='flex items-center justify-between gap-5 border-b border-[#739097] max-lg:!px-4 py-[1.1rem] max-lg:!flex-col max-lg:!items-start max-lg:!gap-3'>
                            <p className='text-white max-lg:!text-sm'>
                              Duration of each session
                            </p>
                            <NumberInput
                              className='text-sm max-lg:!w-full'
                              value={duration}
                              onChange={setDuration}
                              min={0}
                              max={1000}
                              step={1}
                              placeholder='0 Min'
                            />
                          </div>
                          <div className='flex items-center justify-between gap-5 max-lg:!gap-3 border-b border-[#739097] max-lg:!px-4 py-[1.1rem]'>
                            <p className='text-white max-lg:!text-sm'>
                              Group Bookings Available
                            </p>
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className='group inline-flex h-[28px] w-[48px] items-center rounded-full bg-[#F5F9FF] transition data-[checked]:bg-[#0C343D]'
                            >
                              <span className='size-[20px] translate-x-1 rounded-full bg-[#0C343D] transition group-data-[checked]:translate-x-6 group-data-[checked]:bg-[#F5F9FF]' />
                            </Switch>
                          </div>
                          <div className='flex items-center justify-between gap-5 border-b border-[#739097] max-lg:!px-4 py-[1.1rem] max-lg:!flex-col max-lg:!items-start max-lg:!gap-3'>
                            <p className='text-white max-lg:!text-sm'>
                              Max. Capacity for Group
                            </p>
                            <NumberInput
                              className='text-sm max-lg:!w-full'
                              value={maxCapacity}
                              onChange={setMaxCapacity}
                              min={0}
                              max={10000}
                              step={1}
                              placeholder='0'
                            />
                          </div>
                          <div className='flex items-center justify-between gap-5 py-[1.1rem] max-lg:!px-4 max-lg:!flex-col max-lg:!items-start max-lg:!gap-3'>
                            <p className='text-white max-lg:!text-sm'>Server Price</p>
                            <NumberInput
                              className='text-sm max-lg:!w-full'
                              value={serverPrice}
                              onChange={setServerPrice}
                              min={0}
                              max={100000}
                              variant='unit'
                              unitTitle='CHF'
                              placeholder='0'
                            />
                          </div>
                        </div>
                      </section>

                      {/* SCHEDULE */}
                      <section className='mt-10'>
                        <header className='flex items-center justify-between gap-4'>
                          <h4 className='text-base text-[#ACBFC3] max-lg:!pl-4'>Schedule</h4>
                          <span className='h-[1px] w-full flex-1 bg-[#739097]'></span>
                        </header>
                      </section>

                      <div>
                        {dayData.map((item, index) => (
                          <div key={index} className='flex items-center justify-between border-b border-[#739097] py-[1.1rem] max-lg:!px-4 max-lg:!pt-0 max-lg:!flex-col max-lg:!items-start max-lg:!gap-0'>
                            <div className='flex items-center gap-[12px]'>
                              <input
                                type='checkbox'
                                className='checkbox'
                                id='opt1'
                              />

                              <label htmlFor='opt1' className='days'>
                                <div className='fifteen-main'>
                                  <p className='fifteen-text max-lg:!text-sm'>{item.day}</p>
                                </div>
                              </label>
                            </div>
                            <div className='flex items-center gap-3'>
                              <Select
                                className='min-h-[50px]  rounded-[12px] px-2 text-sm bg-[#7597a0] data-[focus]:!border data-[focus]:!border-[#5cb170] data-[focus]:!bg-[#7597a0]'
                                name='status'
                                aria-label='Project status'
                              >
                                <option value='' disabled selected hidden>
                                  Select Times
                                </option>
                                <option value='active '>Active</option>
                                <option value='paused'>Paused</option>
                                <option value='delayed'>Delayed</option>
                                <option value='canceled'>Canceled</option>
                              </Select>
                              <Select
                                className='min-h-[50px] !whitespace-nowrap !overflow-hidden !text-ellipsis w-full rounded-[12px] px-2 text-sm bg-[#7597a0] data-[focus]:!border data-[focus]:!border-[#5cb170] data-[focus]:!bg-[#7597a0]'
                                name='status'
                                aria-label='Project status'
                              >
                                <option className='' value='' disabled selected hidden>
                                  Select Masseurs
                                </option>
                                <option value='active '>Active</option>
                                <option value='paused'>Paused</option>
                                <option value='delayed'>Delayed</option>
                                <option value='canceled'>Canceled</option>
                              </Select>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* EXTRA OPTIONS */}
                      <section className='mt-10'>
                        <header className='flex items-center justify-between gap-4'>
                          <h4 className='text-base text-[#ACBFC3] max-lg:!text-sm max-lg:!pl-4'>Extra options</h4>
                          <span className='h-[1px] w-full flex-1 bg-[#739097]'></span>
                        </header>
                      </section>

                      <div className='flex items-center justify-between border-b border-[#739097] py-[1.1rem] max-lg:!px-4 max-lg:!pt-0 max-lg:!flex-col max-lg:!items-start max-lg:!gap-0'>
                        <div className='flex items-center gap-[12px]'>
                          <div className='fifteen-main flex items-center gap-3 max-lg:!mb-4'>
                            <Image src={"/images/icons/candle-icon.svg"} alt='' width={20} height={20} />
                            <p className='fifteen-text max-lg:!text-sm'>Candle Scents</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-3 max-lg:!w-full'>
                          <Select
                            className='min-h-[50px] w-[170px] max-lg:!w-full rounded-[12px] px-2 text-sm bg-[#7597a0] data-[focus]:!border data-[focus]:!border-[#5cb170] data-[focus]:!bg-[#7597a0]'
                            name='status'
                            aria-label='Project status'
                          >
                            <option value='' disabled selected hidden>
                              Select Scents
                            </option>
                            <option value='active '>Active</option>
                            <option value='paused'>Paused</option>
                            <option value='delayed'>Delayed</option>
                            <option value='canceled'>Canceled</option>
                          </Select>

                        </div>
                      </div>
                      <div className='flex items-center justify-between border-b border-[#739097] py-[1.1rem] max-lg:!px-4 max-lg:!pt-0 max-lg:!flex-col max-lg:!items-start max-lg:!gap-0'>
                        <div className='flex items-center gap-[12px]'>
                          <div className='fifteen-main flex items-center gap-3 max-lg:!mb-4'>
                            <Image src={"/images/icons/bottle-icon.svg"} alt='' width={20} height={20} />
                            <p className='fifteen-text max-lg:!text-sm'>Oil Types</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-3 max-lg:!w-full'>
                          <Select
                            className='min-h-[50px] w-[170px] max-lg:!w-full rounded-[12px] px-2 text-sm bg-[#7597a0] max-lg:!px-4 data-[focus]:!border data-[focus]:!border-[#5cb170] data-[focus]:!bg-[#7597a0]'
                            name='status'
                            aria-label='Project status'
                          >
                            <option value='' disabled selected hidden>
                              Select Oils
                            </option>
                            <option value='active '>Active</option>
                            <option value='paused'>Paused</option>
                            <option value='delayed'>Delayed</option>
                            <option value='canceled'>Canceled</option>
                          </Select>

                        </div>
                      </div>
                      <div className='flex items-center justify-between border-b border-[#739097] max-lg:!border-none py-[1.1rem] max-lg:!px-4 max-lg:!py-0 max-lg:!flex-col max-lg:!items-start max-lg:!gap-0'>
                        <div className='flex items-center gap-[12px]'>
                          <div className='fifteen-main flex items-center gap-3 max-lg:!mb-4'>
                            <Image src={"/images/icons/windy-icon.svg"} alt='' width={20} height={20} />
                            <p className='fifteen-text max-lg:!text-sm'>Fragnance Type</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-3 max-lg:!w-full'>
                          <Select
                            className='min-h-[50px] w-[170px] max-lg:!w-full rounded-[12px] px-2 text-sm  bg-[#7597a0]  data-[focus]:!border data-[focus]:!border-[#5cb170] data-[focus]:!bg-[#7597a0]'
                            name='status'
                            aria-label='Project status'
                          >
                            <option value='' disabled selected hidden>
                              Select Fragnances
                            </option>
                            <option value='active '>Active</option>
                            <option value='paused'>Paused</option>
                            <option value='delayed'>Delayed</option>
                            <option value='canceled'>Canceled</option>
                          </Select>

                        </div>
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            ))}

            <div className='eleven-list glass-border gradient-eleven-border min-h-[56px] px-[20px]'>
              <input
                className='eleven-input max-lg:!text-sm'
                type='text'
                value={currentInputs[service] || ''}
                onChange={(e) => handleInputChange(service, e.target.value)}
                onKeyDown={(e) => handleKeyPress(service, e)}
                placeholder={t(
                  'Enter new service name to create another entry',
                )}
              />
              <Image
                src='/businessregistration/Plus.svg'
                alt='plus'
                width={16}
                height={16}
                className='eleven-icon'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
