'use client';
import { useTranslations } from 'next-intl';
import ExtraOptionComponent from './ExtraOptionComponent';

export const ExtraOption: React.FC = () => {
  const t = useTranslations();

  return (
    <div>
      <ExtraOptionComponent
        label={t('candle-scents')}
        icon='/images/services/candle.svg'
        placeholder={t('enter-all-tags')}
      />
      <ExtraOptionComponent
        label={t('oil-types')}
        icon='/images/services/oilTypes.svg'
        placeholder={t('enter-all-tags')}
      />
      <ExtraOptionComponent
        label={t('fragrance-type')}
        icon='/images/services/fragrance.svg'
        placeholder={t('enter-all-tags')}
      />
    </div>
  );
};
