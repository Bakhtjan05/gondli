import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define the available locales
export const locales = ['en', 'de', 'fr', 'it'];

// Configure the request config for next-intl
export default getRequestConfig(async (params) => {
  // Получаем locale из params
  const { locale } = params;

  // Ensure the locale is valid
  if (!locales.includes(locale as string)) {
    notFound();  // Если локаль недопустима, возвращаем ошибку
  }

  try {
    // Динамически загружаем сообщения на основе текущей локали
    const messages = (await import(`../messages/${locale}.json`)).default;

    // Возвращаем locale и messages для соответствующей локали
    return {
      locale,     // Возвращаем локаль
      messages,   // Возвращаем сообщения для текущей локали
    };
  } catch (error) {
    // Обрабатываем ошибку, если не удаётся загрузить сообщения для локали
    notFound();
  }
});
