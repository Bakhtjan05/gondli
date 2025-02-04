import Image from 'next/image';
import { useState } from 'react';

interface ConfirmMessageProps {
  FirstMessage: string;
  MiddleMessage: string;
  LastMessage: string;
}

const ConfirmMessage: React.FC<ConfirmMessageProps> = ({
  FirstMessage,
  MiddleMessage,
  LastMessage,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-12 left-1/2 -translate-x-1/2 flex max-lg:w-11/12  items-center gap-2 rounded-[12px] bg-[#5CB170] px-4 py-3 text-[#fff]'>
      <Image
        src={'/images/services/complete-checker.svg'}
        width={16}
        height={16}
        alt='complete message'
        
      />
      <p className='  max-lg:!text-sm'>
        <span className=''>{FirstMessage} </span>
        <span className='font-bold '>{MiddleMessage} </span>
        <span className=''>{LastMessage} </span>
      </p> 
      <button
        onClick={() => setIsVisible(false)}
        className=' text-xl font-medium text-white hover:text-gray-300'
        aria-label='Close'
      >
        &times;
      </button>
    </div>
  );
};

export default ConfirmMessage;
