import React, { useState } from 'react';
import './swapmodal.css'
import Modal from './swapmodal';

function Modalapp() {
    const [openModal, setOpenModal] = useState(false);
    return (

        <div>
            <button
                onClick={() => setOpenModal(true)}
                className='swap_button'>
                Buy
            </button>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)} />
        </div>
    );
}

export default Modalapp;