
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../globals.css';
import Sidebar from '@/components/sidebarComponents/Sidebar';
import DashboardHeader from '@/components/dashboardHeader/DashboardHeader';
import { SidebarProvider } from '@/components/sidebarComponents/SidebarContext';

export const metadata: Metadata = {
  title: 'Gondli - Easiest Way of Booking Wellness Services',
  description:
    'Your Path to wellness starts here. Finding and reserving top wellness services around you is now simple using Gondli',
};

export const viewport: Viewport = {
  themeColor: '#0C343D',
  maximumScale: 1,
};

export default async function BusinessLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const messages = await getMessages();


  return (
    <html lang={locale} className='scroll-smooth'>
      <Head>
        <link
          rel='icon'
          href='https://blobgondlis.blob.core.windows.net/favicon/favicon.ico'
        />
      </Head>
      <Script
        id='gtm-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PLM7GFXG');
            `,
        }}
      />
      <body className={cn('bg-surface-primary leading-snug sm:leading-none')}>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-PLM7GFXG'
            height='0'
            width='0'
            className='invisible hidden'
          ></iframe>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider>
            <div className='bg-surface-primary flex '>
              <div className='bg-[#0C343D] '>
                <Sidebar />
              </div>
              <div className='w-full'>
                <DashboardHeader />
                <div>{children}</div>
              </div>
            </div>
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
