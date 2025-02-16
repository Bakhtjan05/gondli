import React from 'react';
import './Insights.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
const Insights: React.FC = () => {
  const t = useTranslations();

  const data = [
    { service: "Wellness Tips & Tricks", title: "5 Quick Morning Rituals to Start Your Day Right", src: "/images/home/insights.jpg" },
    { service: "Success Stories", title: "How Serenity Spa Doubled Its Clientele in Six Months", src: "/images/home/insights.jpg" },
    { service: "Industry Insights & Trends", title: "The Rise of Virtual Wellness: What It Means for Your Business", src: "/images/home/insights.jpg" },
    { service: "Practitioner Insights", title: "Meet Emma: The Yoga Instructor Who Transforms Lives", src: "/images/home/insights.jpg" },

  ]
  return (
    <React.Fragment>
      <div
        className='locationServices container mx-auto'
        style={{

          minHeight: '350px',
          padding: '60px 16px 60px',
        }}
      >
        <h1 className='text-[40px] font-semibold text-center max-lg:text-[26px]'>Insights & Inspiration For Your Wellness Journey</h1>
        <p className='mt-3 text-center'>Stay up-to-date with the latest wellness trends, expert tips, and inspiring stories. We’ve gathered <br /> helpful articles to guide you on your journey to better health and well-being</p>
        <div className='flex items-center gap-6 max-lg:overflow-x-auto '>
          {data.map((item, index) => (
            <div key={index} className='overflow-hidden rounded-2xl mt-15 min-w-72'>
              <Image src={item.src} alt='' width={700} height={700} className='h-[164px]'/>
              <div className='pt-4 pl-4 pr-4 pb-[20px] bg-white'>
                <p className='text-sm text-[#878E97]'>{item.service}</p>
                <h2 className='font-semibold'>{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-10 flex justify-center'>
          <Button>See all of Our Blog Posts</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Insights;
