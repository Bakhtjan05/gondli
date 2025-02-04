'use client';
import React, { useState } from 'react';
import './SpotifyBlend.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const SpotifyBlendComponent: React.FC = () => {
  const t = useTranslations();
  const [spotifyLink, setSpotifyLink] = useState('');

  return (
    <div className='spotify-blend'>
      {/* Link Input Field */}
      <div className='input-container'>
        {!spotifyLink && <div className='left-border' />}
        <input
          type='text'
          placeholder='Enter Link'
          className='spotify-blend__input'
          onChange={(e) => setSpotifyLink(e.target.value)}
        />
      </div>

      {/* Pro Tip Section */}
      <div className='spotify-blend__pro-tip max-lg:!flex-col max-lg:!h-auto max-lg:!items-start max-lg:gap-6'>
        <div className='spotify-blend__text max-lg:order-2'>
          <span className='!font-bold'>Pro Tip:</span> <span>Link your</span>{' '}
          <span className='spotify-blend__link'>{t('spotifyBlend')}</span>{' '}
          <span>and give your users ability to control playlist</span>
        </div>
        <div className='spotify-image'>
          <Image
            src='/images/services/spotify-icon.svg'
            width={72}
            height={72}
            alt='Spotify Logo'
            className='music-notes note-1'
          />
        </div>

      </div>
    </div>
  );
};

export default SpotifyBlendComponent;
