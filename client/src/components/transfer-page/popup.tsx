import React, { useState } from "react";
import Modal from "./Modal"
import './Modal.css'
import '../Swap-page/swappage.css'

function Popup() {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div>
            <button onClick={() => setOpenModal(true)}
                className='swap_button' >
                Send
            </button>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)} />
        </div >
    )
}

export default Popup