'use client';

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

export const useAuth = () => {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(selectUpcomingPageState);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // 🔥 Получение пользователя
  const getMe = async () => {
    try {
      const token = Cookies.get('authToken');

      if (!token) {
        dispatch(setIsAuthenticated(false));
        setUser(null);
        return;
      }

      const { data } = await axios.get('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data); // ✅ теперь у тебя есть user
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      Cookies.remove('authToken');
      setUser(null);
      dispatch(setIsAuthenticated(false));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  // CSRF
  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
  };

  // Register
  const register = async ({ setErrors, ...props }: RegisterProps) => {
    setErrors([]);
    setIsLoading(true);

    try {
      await csrf();
      await axios.post('/register', props);
      const { data } = await axios.post('/login', props);

      Cookies.set('authToken', data.token, { expires: 1, path: '/' });

      await getMe();

      return { err: false };
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setErrors(Object.values(error.response.data.errors).flat() as string[]);
      setIsLoading(false);

      return { err: true };
    }
  };

  // Login
  const login = async ({ setErrors, ...props }: LoginProps) => {
    setErrors([]);

    try {
      await csrf();
      const { data } = await axios.post('/api/login', props);

      Cookies.set('authToken', data.token, { expires: 1, path: '/' });

      await getMe();

      return { err: false };
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setErrors(Object.values(error.response.data.errors).flat() as string[]);

      return { err: true };
    }
  };

  // Logout
  const logout = () => {
    Cookies.remove('authToken');
    setUser(null);
    dispatch(setIsAuthenticated(false));
    router.push(`/${locale}`);
  };

  return {
    user, // 🔥 НОВОЕ
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
};