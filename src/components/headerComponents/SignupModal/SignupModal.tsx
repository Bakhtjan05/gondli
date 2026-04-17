import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './SignupModal.scss';
import Image from 'next/image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import LoginModal from '../LoginModal/LoginModal';
import { on } from 'events';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/types/auth';
import { toast } from '@/components/ui/sonner';
import axios from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, selectUpcomingPageState } from '@/slices/upcomingPageSlice';
import { useLocale } from 'next-intl';


interface SignupModalProps {
  show: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onClose }) => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();


  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [allinterets, seetallinterets] = useState<
    { name: string; id: number }[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);


  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { register, isLoading, token } = useAuth({ middleware: 'guest' });

  const [errorsForm, setErrorsForm] = useState({
    name: '',
    email: '',
    // birthday: '',
    password: '',
    passwordConfirmation: '',
  });

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const handleOpenLoginModal = () => {
    onClose();
    setIsLoginModalVisible(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalVisible(false);
  };
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateDetails = () => {
    const newErrors = {
      name: name.trim() === '' ? 'Full Name is required' : '',
      email: !emailRegex.test(email) ? 'Invalid Email Address' : '',
      // birthday: birthday === '' ? 'Birthday is required' : '',
      password:
        password.trim() === ''
          ? 'Password is required'
          : password.length < 8
            ? 'password should be atleast 8 letter'
            : '',
      passwordConfirmation:
        password !== passwordConfirmation ? 'Passwords do not match' : '',
    };
    setErrorsForm(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  // Handle OTP input change and focus shift
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value)) || value.length > 1) return; // Allow only digits and max length of 1
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if the current input is filled
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleinterest = async () => {

    await axios.post(
      '/api/user/interests',
      { interests: selectedInterests },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const currentLocale = window.location.pathname.split('/')[1] || 'en';
    nextStep();
  };

  // const fetchInterests = async () => {
  //   const { data } = await axios.get('/api/get-all-interests');
  //   seetallinterets(data?.data);
  // };

  // useEffect(() => {
  //   fetchInterests();
  // }, []);

  // Handle interest selection
  const handleInterestSelection = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest),
      );
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');
  const isPersonalizationComplete = selectedInterests.length === 5;

  const nextStep = () => {
    if (step === 1 && phoneNumber.length === 12) {
      setStep(step + 1); // Ensure phone number has exactly 12 digits before moving forward
    } else if (step === 3 && validateDetails()) {
      setStep(step + 1);
    } else if (step !== 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      const { err, msg } = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        setErrors,
      });
      if (err) {
        toast('error', msg);
      } else {
        setStep(2);
      }
    }
  };

  return (
    <React.Fragment>
      <Modal show={show} onHide={onClose} centered className='SignupModal'>
        {step === 1 && (
          <React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>
                <Image
                  priority
                  className='logo'
                  src='/images/logo/dark.svg'
                  width={85}
                  height={20}
                  alt='logo'
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='text-center'>
                <h2 className='title max-lg:!text-xl'>{t('join-gondli')}</h2>
                <p className='description max-lg:!text-sm'>
                  {t('start-path-to-wellness')}
                </p>
              </div>
              <div className='nameInput'>
                <FloatingLabel
                  className='mb-2'
                  controlId='floatingFullName'
                  label={t('full-name')}
                >
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('full-name')}
                    isInvalid={!!errorsForm.name}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errorsForm.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </div>
              <div className='emailInput'>
                <FloatingLabel
                  className='mb-2'
                  controlId='floatingFullName'
                  label={'Email'}
                >
                  <Form.Control
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('full-name')}
                    isInvalid={!!errorsForm.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errorsForm.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </div>
              <div className='passwordInput'>
                <FloatingLabel
                  className='mb-2'
                  controlId='floatingFullName'
                  label={'Password'}
                >
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('full-name')}
                    isInvalid={!!errorsForm.password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errorsForm.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </div>
              <div className='passwordConfirmationInput'>
                <FloatingLabel
                  className='mb-2'
                  controlId='floatingFullName'
                  label={'Confirm Password'}
                >
                  <Form.Control
                    type='password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder={t('full-name')}
                    isInvalid={!!errorsForm.passwordConfirmation}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errorsForm.passwordConfirmation}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </div>
              <button
                disabled={isLoading}
                className={`get-started max-lg:!py-[14px] max-lg:!text-sm`}
                onClick={handleSubmit}
              >
                {t('get-started')} {!isLoading.toString()}
              </button>
              <div className='termsCondition'>
                <p className='max-lg:!text-sm'>
                  {t('agree')} <Link href='/'>{t('terms')}</Link> {t('and')}{' '}
                  <Link href='/'>{t('privacy')}</Link>
                </p>
              </div>
              <div className='or'>
                <p>
                  <span>{t('or')}</span>
                </p>
              </div>
              
              <div className='alreadyAccount'>
                <p className='max-lg:!text-sm'>
                  {t('already-have-account')}{' '}
                  <span onClick={handleOpenLoginModal}>{t('log-in')}</span>{' '}
                  {t('or')} <span>{t('continue-as-guest')}</span>
                </p>
              </div>
            </Modal.Body>
          </React.Fragment>
        )}

        {step === 2 && (
          <React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>
                <Image
                  priority
                  className='logo'
                  src='/images/logo/dark.svg'
                  width={85}
                  height={20}
                  alt='logo'
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='text-center max-lg:mt-10'>
                <Image
                  priority
                  className='setup'
                  src='/images/notifications/gondli.svg'
                  width={60}
                  height={60}
                  alt='gondli'
                />
                <h2 className='title'>{t('welcome-to-gondli')}</h2>
                <p className='description mb-0 max-lg:!mb-16'>
                  {t('happy-to-see-you')}
                </p>
                <button className='get-started active'
                  onClick={async () => {
                    try {
                      
                      onClose(); // Закрываем модальное окно
                
                      // Выполняем навигацию
                      setIsAuthenticated(true)
                    } catch (error) {
                      console.error('Ошибка при обработке интересов:', error);
                    }
                  }}
                >
                  {t('get-started')}
                </button>
              </div>
            </Modal.Body>
          </React.Fragment>
        )}
        {/* {step === 3 && (
          <React.Fragment>
            <Modal.Header closeButton>
              <Image
                priority
                className='back'
                onClick={prevStep}
                src='/images/notifications/back.svg'
                width={20}
                height={20}
                alt='back'
              />
              <Modal.Title>
                <div className='justify-content-center flex'>
                  <Image
                    priority
                    className='logo'
                    src='/images/logo/dark.svg'
                    width={85}
                    height={20}
                    alt='logo'
                  />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='text-center'>
                <h3 className='title'>{t('select-your-interests')}</h3>
                <p className='description'>{t('select-up-to-five')}</p>
                <div className='interests-grid'>
                  {allinterets.map((interest: any) => (
                    <button
                      key={interest.id}
                      className={`interest-button ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                      onClick={() => handleInterestSelection(interest.id)}
                    >
                      {interest.name}
                    </button>
                  ))}
                </div>
                <p className='noSelected'>
                  {selectedInterests.length} {t('selected-count')}
                </p>
                <button
                  className={`get-started ${isPersonalizationComplete ? 'active' : ''}`}
                  disabled={!isPersonalizationComplete}
                  onClick={handleinterest}
                >
                  {t('personalize-my-feed')}
                </button>
              </div>
            </Modal.Body>
          </React.Fragment>
        )} */}
        {/* {step === 4 && (
          <React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>
                <Image
                  priority
                  className='logo'
                  src='/images/logo/dark.svg'
                  width={85}
                  height={20}
                  alt='logo'
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='text-center max-lg:mt-10'>
                <Image
                  priority
                  className='setup'
                  src='/images/notifications/setup.svg'
                  width={60}
                  height={60}
                  alt='setup'
                />
                <h2 className='title'>{t('setup-complete')}</h2>
                <p className='description mb-0 max-lg:!mb-16'>
                  Now you can check all the available offers tailored only for
                  you
                </p>
                <button
                  className='get-started active'
                  onClick={async () => {
                    try {
                      await handleinterest(); // Выполняем обработку интересов
                      onClose(); // Закрываем модальное окно
                
                      // Получаем текущую локаль из URL
                      const currentLocale = window.location.pathname.split('/')[1] || 'en';
                
                      // Выполняем навигацию
                      router.push(`/${currentLocale}/homeSection`);
                    } catch (error) {
                      console.error('Ошибка при обработке интересов:', error);
                    }
                  }}
                >
                  {t('dive')}
                </button>
              </div>
            </Modal.Body>
          </React.Fragment>
        )} */}
      </Modal>
      {isLoginModalVisible && (
        <LoginModal
          show={isLoginModalVisible}
          onClose={handleCloseLoginModal}
        />
      )}
    </React.Fragment>
  );
};

export default SignupModal;
