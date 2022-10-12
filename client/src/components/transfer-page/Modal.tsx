import React from 'react';
import "./Modal.css"

const Modal = ({ open, onClose }: {open: any, onClose: any}) => {
    if (!open) return null;
    return (

        <div

            onClick={(e) => {
                e.stopPropagation();
            }}
            className='modalContainer'>
            <div className='closeBtn' onClick={onClose}>
                <div className='closeBtn-text'>
                    Close
                </div>
            </div>
            <div className='transaction-header'>
                Transaction Failed
            </div>
            <div className='h1' >Amount:</div>
            <div className='h2'>Token:</div>
            <div className='h3'>address:</div>




        </div>

    );
};

export default Modal;