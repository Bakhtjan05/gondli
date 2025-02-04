import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

// Создаём middleware для локализации
const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: locales[0],
});

export function middleware(request: NextRequest) {

  const token = request.cookies.get('authToken')?.value; // Получаем токен из cookies
  const url = request.nextUrl.clone(); // Копируем URL объекта запроса

  // Получаем локаль из URL
  const locale = url.pathname.split('/')[1] || locales[0];

  // Проверяем, что это не корневые страницы (например, /en/, /de/, /fr/)
  const isRootPage = locales.some((loc) => url.pathname === `/${loc}`); // Используем шаблонную строку для правильного сравнения

  // Пример защищённых маршрутов, за исключением корневых страниц
  if (!isRootPage && !token) {
    // Если нет токена и это не корневая страница, перенаправляем на страницу логина с нужной локалью
    url.pathname = `/${locale}/`; // Перенаправляем на страницу логина с нужной локалью
    return NextResponse.redirect(url);
  }

  // Возвращаем локализацию
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/en/:path*', '/de/:path*', '/fr/:path*', '/it/:path*'], // Применяем middleware ко всем маршрутам с локалью
};