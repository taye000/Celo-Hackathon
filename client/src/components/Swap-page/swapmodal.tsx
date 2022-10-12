import React from 'react';

const Modal = ({ open, onClose }: {open: any, onClose: any}) => {
    if (!open) return null;
    return (
        <div onClick={onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'
            >

                <div className='modalRight'>
                    <div className='closeBtn' onClick={onClose}>
                        Confirm
                    </div>
                    <div className='transaction_header'>
                        <p>Transaction</p>
                    </div>
                    <div className='h1' >Amount:</div>
                    <div className='h2'>Token:</div>
                    <div className='h3'>Address:</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
