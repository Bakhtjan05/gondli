import React, { useState } from 'react';
import './KarmaCoinsModal.scss';
import { X } from '@/icons';
import Image from 'next/image';

interface KarmaCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KarmaCoinsModal: React.FC<KarmaCoinsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'charity'>(
    'services',
  );
  const availableCoins = 340;

  if (!isOpen) return null;

  const handleTabClick = (tab: 'services' | 'charity') => {
    setActiveTab(tab);
  };

  return (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <div className='modal-top'>
          <div className='modal-title'>Karma Coins</div>
          <button onClick={onClose} className='closeButton'>
            <X />
          </button>
        </div>

        <div className='modal-headings'>
          <Image
            src='/images/shapes/mountain-logo.svg'
            height={100}
            width={100}
            alt='mountains-logo'
          />
          <div className='available-coins'>{availableCoins}</div>
          <p>Karma Coins available to exchange</p>
        </div>

        <div className='karma-tabs'>
          <button
            onClick={() => handleTabClick('services')}
            className={`tab ${activeTab === 'services' ? 'active' : ''}`}
          >
            Services
          </button>
          <button
            onClick={() => handleTabClick('charity')}
            className={`tab ${activeTab === 'charity' ? 'active' : ''}`}
          >
            Charity
          </button>
        </div>

        <div className='karma-body'>
          {activeTab === 'services' ? (
            <div className='grid-container'>
              <div className='card'>
                <div className='card-icon'>
                  <Image
                    src='/images/services/service1.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Yoga Discount</div>
                <div className='card-description'>
                  Enjoy 10% off your next yoga class booking
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>200</p>
                </div>
              </div>
              <div className='card'>
                <div className='card-icon'>
                  <Image
                    src='/images/services/service2.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Spa Discount</div>
                <div className='card-description'>
                  Enjoy 10% off your next spa session
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>200</p>
                </div>
              </div>
              <div className='card'>
                <div className='card-icon'>
                  <Image
                    src='/images/services/service3.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Fitness Discount</div>
                <div className='card-description'>
                  Enjoy 10% off your next fitness session
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>250</p>
                </div>
              </div>
              <div className='card'>
                <div className='card-icon'>
                  <Image
                    src='/images/services/service1.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Pilates Discount</div>
                <div className='card-description'>
                  Enjoy 10% off your next pilates session
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>250</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='grid-container'>
              <div className='card'>
                <div className='charity-card-icon'>
                  <Image
                    src='/images/charity/points4purpose.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Points4Purpose Foundation</div>
                <div className='card-description'>
                  Fighting against poverty and hunger worldwide.
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>50 Points = 1 CHF</p>
                </div>
              </div>
              <div className='card'>
                <div className='charity-card-icon'>
                  <Image
                    src='/images/charity/karmaExchange.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Karma Exchange Fund</div>
                <div className='card-description'>
                  Environmental conservation and sustainability efforts.
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>50 Points = 1 CHF</p>
                </div>
              </div>
              <div className='card'>
                <div className='charity-card-icon'>
                  <Image
                    src='/images/charity/charityPointNet.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Charity Point Network</div>
                <div className='card-description'>
                  Providing aid to disaster-stricken areas and humanitarian
                  relief.
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>50 Points = 1 CHF</p>
                </div>
              </div>
              <div className='card'>
                <div className='charity-card-icon'>
                  <Image
                    src='/images/charity/giveAndGain.svg'
                    height={40}
                    width={40}
                    alt='service'
                  />
                </div>
                <div className='card-title'>Give & Gain Initiative</div>
                <div className='card-description'>
                  Education and literacy programs for underprivileged
                  communities.
                </div>
                <div className='card-points'>
                  <Image
                    src='/images/shapes/mountain-logo.svg'
                    height={24}
                    width={24}
                    alt='mountain-logo'
                  />
                  <p>50 Points = 1 CHF</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KarmaCoinsModal;
