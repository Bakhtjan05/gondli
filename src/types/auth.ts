import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, selectUpcomingPageState } from '@/slices/upcomingPageSlice';
import Cookies from 'js-cookie';

interface RegisterProps {
  setErrors: (errors: string[]) => void;
  [key: string]: any;
}

interface LoginProps {
  setErrors: (errors: string[]) => void;
  [key: string]: any;
}

interface UseAuthProps {
  middleware?: 'guest' | 'auth';
}

export const useAuth = ({ middleware }: UseAuthProps = {}) => {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();
  
  const { isAuthenticated } = useSelector(selectUpcomingPageState);
  

  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Получаем токен из cookies
    const savedToken = Cookies.get('authToken');
    if (savedToken) {
      setToken(savedToken);
      dispatch(setIsAuthenticated(true)); // Авторизован
    } else {
      dispatch(setIsAuthenticated(false)); // Не авторизован
    }
    setIsLoading(false); // Завершаем загрузку
  }, [dispatch]);



  // CSRF
  const csrf = async (): Promise<void> => {
    await axios.get('/sanctum/csrf-cookie');
  };

  // Register
  const register = async ({ setErrors, ...props }: RegisterProps): Promise<{ err: boolean; msg: string }> => {
    setErrors([]);
    setIsLoading(true);

    try {
      await csrf();
      await axios.post('/register', props);
      const { data } = await axios.post('/login', props);

      // ✅ Сохраняем токен в cookies
      Cookies.set('authToken', data.token, { expires: 1, path: '/' }); // 1 день

      setToken(data.token);
      dispatch(setIsAuthenticated(true));

      return { err: false, msg: '' };
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setErrors(Object.values(error.response.data.errors).flat() as string[]);
      setIsLoading(false);
      return {
        err: true,
        msg: error.response?.data?.message || 'something went wrong',
      };
    }
  };

  // Login
  const login = async ({ setErrors, ...props }: LoginProps): Promise<{ err: boolean; msg: string }> => {
    setErrors([]);

    try {
      await csrf();
      const { data } = await axios.post('/api/login', props);

      // ✅ Сохраняем токен в cookies
      Cookies.set('authToken', data.token, { expires: 1, path: '/' });
      

      setToken(data.token);
      dispatch(setIsAuthenticated(true));

      return { err: false, msg: '' };
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setErrors(Object.values(error.response.data.errors).flat() as string[]);
      return { err: true, msg: error.response?.data?.message || 'something went wrong' };
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await csrf();

      // ✅ Передаём токен при выходе
      await axios.post('/logout', {}, { withCredentials: true });


      // ✅ Удаляем токен из cookies
      Cookies.remove('authToken');

      setToken(null);
      dispatch(setIsAuthenticated(false));

      // Перенаправляем на главную страницу с локалью
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    csrf,
    isLoading,
    register,
    login,
    logout,
    token,
    isAuthenticated,
  };
};
