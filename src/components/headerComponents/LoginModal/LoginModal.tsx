import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './LoginModal.scss';
import Image from 'next/image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SignupModal from '../SignupModal/SignupModal';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, selectUpcomingPageState } from '@/slices/upcomingPageSlice';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
  const t = useTranslations();
  const [usePhone, setUsePhone] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);


  const router = useRouter();

  const { login, isLoading } = useAuth({ middleware: 'guest' });

  // Function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  // Function to check if the form is valid
  const isFormValid = usePhone && validateEmail(email) && password.length > 0;

  // Function to handle closing modal and resetting all fields
  const handleClose = () => {
    setEmail('');
    setPassword('');
    setEmailError(false);
    setErrors([]);
    setHasAttemptedSubmit(false); // Reset the submit attempt flag
    onClose();
  };

  // Function to handle switching login method (Phone/Email)
  const toggleLoginMethod = () => {
    setUsePhone(!usePhone);
    setEmail(''); // Reset field when switching between phone and email
    setPassword(''); // Reset password as well
    setEmailError(false); // Reset email error state
    setHasAttemptedSubmit(false); // Reset the submit attempt flag
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle email input and validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    // Remove error when the user starts typing again
    if (hasAttemptedSubmit) {
      setEmailError(!validateEmail(email));
    }
  };

  // Function to handle phone number input

  // Function to handle form submission (Log In button click)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]); // Очистить предыдущие ошибки
    setHasAttemptedSubmit(true); // Установить, что попытка отправки была


    // Если форма невалидна, не продолжать обработку
    if (!isFormValid) {
      setEmailError(!validateEmail(email)); // Установить ошибку email, если она есть
      return;
    }

    // Попробовать выполнить вход
    try {
      const { err, msg } = await login({
        email,
        password,
        setErrors, // Обновить ошибки, если запрос не удался
      });

      if (err) {
        toast('error', msg); // Показать ошибку через toast
      } else {
        handleClose(); // Закрыть модальное окно в случае успеха
      }
    } catch (error) {
      toast('error', 'Invalid email or password'); // Обработать неожиданные ошибки
      console.error(error);
    }
  };

  const handleOpenSignupModal = () => {
    handleClose();
    setIsSignupModalVisible(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalVisible(false);
  };

  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose} centered className='LoginModal'>
        <Modal.Header closeButton>
          <Modal.Title>
            <Image
              priority
              src='/images/logo/dark.svg'
              width={85}
              height={20}
              alt='logo'
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
            <h2 className='title'>{t('welcome-back')}</h2>
            <p className='description'>{t('enter-credentials')}</p>
          </div>
          <div className='phoneInput'>
            <FloatingLabel
              className='mb-2'
              controlId='floatingInput'
              label={t('email-address')}
            >
              <Form.Control
                type={'email'}
                placeholder={t('email-address')}
                value={email}
                onChange={handleEmailChange}
                isInvalid={emailError && hasAttemptedSubmit} // Show validation error for email field after submit attempt
              />
              {emailError && hasAttemptedSubmit && (
                <Form.Control.Feedback type='invalid'>
                  {t('valid-email-error')}
                </Form.Control.Feedback>
              )}
            </FloatingLabel>
            <div className="password-wrapper">
              <FloatingLabel
                className='mb-2'
                controlId='floatingPassword'
                label={t('password')}
              >
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>

              <div
                className='show-hide-password'
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? t('hide') : t('show')}
              </div>
            </div>
            <div className='forgotPassword'>
              <span>{t('forgot-password')}</span>
            </div>
          </div>
          <button
            type='submit'
            className={`get-started ${isFormValid ? 'active' : ''}`}
            disabled={!isFormValid || isLoading}
            onClick={handleSubmit} // Trigger validation on submit
          >
            {t('log-in')}
          </button>
          <div className='or'>
            <p>
              <span>{t('or')}</span>
            </p>
          </div>
          
          <div className='alreadyAccount'>
            <p>
              {t('no-account-yet')}{' '}
              <span onClick={handleOpenSignupModal}>{t('sign-up')}</span> or{' '}
              <span>{t('continue-as-guest')}</span>
            </p>
          </div>
        </Modal.Body>
      </Modal>
      {/* <SignupModal
        show={isSignupModalVisible}
        onClose={handleCloseSignupModal}
      /> */}
    </React.Fragment>
  );
};

export default LoginModal;
