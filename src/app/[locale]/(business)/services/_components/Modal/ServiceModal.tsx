
import React from 'react';
import './ServiceModal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; 

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-1' onClick={(e) => e.stopPropagation()}>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
