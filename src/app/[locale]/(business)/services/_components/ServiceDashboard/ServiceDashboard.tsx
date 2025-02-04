'use client';
import React, { useState, useEffect } from 'react';
import ActionButtons from '../ActionButton/ActionButton';
import ServiceTable from '../ServiceTable/ServiceTable';
import './ServiceDashboard.scss';
import Modal from '../Modal/ServiceModal';
import ServiceForm from '../AddService/AddServiceForm';
import DiscountsModal from '../Discount/DiscountComponent';
import PauseConfirm from '../PauseConfirm/PauseConfirm';
import DeleteService from '../DeleteService/DeleteService';
import ConfirmMessage from '../ServiceConfirmMessage/ConfirmMessage';
import DetailService from '../DetailService/DetailService';

export const services = [
  {
    id: 1,
    category: 'Yoga',
    service: 'Gentle Flow Yoga Class',
    price: '35.00',
    discount: 25,
    duration: '60',
    type: 'Group',
    icon: '/images/services/Yoga.svg',
  },
  {
    id: 2,
    category: 'Yoga',
    service: 'Power Vinyasa Yoga Workshop',
    price: '40.00',
    discount: 0,
    duration: '75',
    type: 'Group',
    icon: '/images/services/Yoga.svg',
  },
  {
    id: 3,
    category: 'Yoga',
    service: 'Restorative Yoga and Meditation',
    price: '45.00',
    discount: 40,
    duration: '90',
    type: 'Group',
    icon: '/images/services/Yoga.svg',
  },
  {
    id: 4,
    category: 'Spa',
    service: 'Tranquil Relaxation Massage',
    price: '90.00',
    discount: 0,
    duration: '60',
    type: 'Individual',
    icon: '/images/services/Spa.svg',
  },
  {
    id: 5,
    category: 'Spa',
    service: 'Revitalizing Aromatherapy Facial',
    price: '110.00',
    discount: 80,
    duration: '75',
    type: 'Individual',
    icon: '/images/services/Spa.svg',
  },
  {
    id: 6,
    category: 'Fitness',
    service: 'Strength and Conditioning Bootcamp',
    price: '110.00',
    discount: 80,
    duration: '75',
    type: 'Individual',
    icon: '/images/services/Fitness.svg',
  },
  {
    id: 7,
    category: 'Fitness',
    service: 'Mindful Movement Yoga Fusion',
    price: '110.00',
    discount: 80,
    duration: '75',
    type: 'Individual',
    icon: '/images/services/Fitness.svg',
  },
  {
    id: 8,
    category: 'Cycling',
    service: 'Alpine Spin',
    price: '110.00',
    discount: 80,
    duration: '75',
    type: 'Individual',
    icon: '/images/services/cycle.svg',
  },
];

const ServiceDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isDetailServiceModalOpen, setIsDetailServiceModalOpen] =
    useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isPauseConfirmModalOpen, setIsPuaseConfirmModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);

  // State for dynamic confirmation message
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState({
    FirstMessage: '',
    MiddleMessage: '',
    LastMessage: '',
  });

  // Show confirmation message and set timer to hide it after 10 seconds
  useEffect(() => {
    if (isConfirmationVisible) {
      const timer = setTimeout(() => setIsConfirmationVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmationVisible]);

  const handleServiceModalClose = () => {
    setIsAddServiceModalOpen(false);
  };

  const handleDetailServiceModalClose = () => {
    setIsDetailServiceModalOpen(false);
  };

  const handleDiscountModalClose = () => {
    setIsDiscountModalOpen(false);
  };

  const handlePauseModalClose = () => {
    setIsPuaseConfirmModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  return (
    <div className='services-container'>
      <div className='actions'>
        <div className='action-buttons'>
          <ActionButtons
            isAddServiceModalOpen={isAddServiceModalOpen}
            setIsAddServiceModalOpen={setIsAddServiceModalOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <ServiceTable
          services={services}
          setIsDiscountModalOpen={setIsDiscountModalOpen}
          setIsPuaseConfirmModalOpen={setIsPuaseConfirmModalOpen}
          setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
          setIsDetailServiceModalOpen={setIsDetailServiceModalOpen}
          searchTerm={searchTerm}
        />

        {isConfirmationVisible && (
          <div className=''>
            <ConfirmMessage
              FirstMessage={confirmationMessage.FirstMessage}
              MiddleMessage={confirmationMessage.MiddleMessage}
              LastMessage={confirmationMessage.LastMessage}
            />
          </div>
        )}
      </div>

      {isAddServiceModalOpen && (
        <Modal isOpen={isAddServiceModalOpen} onClose={handleServiceModalClose}>
          <ServiceForm
            onClose={handleServiceModalClose}
            isConfirmationVisible={setIsConfirmationVisible}
            setConfirmMessage={setConfirmationMessage}
          />
        </Modal>
      )}

      {isDetailServiceModalOpen && (
        <Modal
          isOpen={isDetailServiceModalOpen}
          onClose={handleDetailServiceModalClose}
        >
          <DetailService
            onClose={handleDetailServiceModalClose}
            isConfirmationVisible={setIsConfirmationVisible}
            setConfirmMessage={setConfirmationMessage}
          />
        </Modal>
      )}

      {isDiscountModalOpen && (
        <Modal isOpen={isDiscountModalOpen} onClose={handleDiscountModalClose}>
          <DiscountsModal
            onClose={handleDiscountModalClose}
            isConfirmationVisible={setIsConfirmationVisible}
            setConfirmMessage={setConfirmationMessage}
          />
        </Modal>
      )}

      {isPauseConfirmModalOpen && (
        <Modal isOpen={isPauseConfirmModalOpen} onClose={handlePauseModalClose}>
          <PauseConfirm
            onClose={handlePauseModalClose}
            isConfirmationVisible={setIsConfirmationVisible}
            setConfirmMessage={setConfirmationMessage}
          />
        </Modal>
      )}

      {isDeleteConfirmModalOpen && (
        <Modal
          isOpen={isDeleteConfirmModalOpen}
          onClose={handleDeleteModalClose}
        >
          <DeleteService
            onClose={handleDeleteModalClose}
            isConfirmationVisible={setIsConfirmationVisible}
            setConfirmMessage={setConfirmationMessage}
          />
        </Modal>
      )}
    </div>
  );
};

export default ServiceDashboard;
