import React, { useState } from 'react'
import './Transferpage.css'
import '../../index.css'
import '../Swap-page/swappage.css'
import Modpopup from './popup'

function Transfer() {
    const [value, setValue] = useState('');

    const handleChange = (e:any) => {
        const result = e.target.value.replace(/\D/g, '');
        setValue(result);
    };
    return (
        <section id='Transfer'>
            <div className='container-D'>
                <div className='header_name'>
                    SWAP CRYPTO
                </div>
                <div className='logo-button' />

                <div className='account_box'>
                    <div className='green_circle' />
                    <div className='account_box-text'>Account</div>
                    <div>
                        <input type='text' placeholder='0x4hy...jkilmn67' className='input_address_text' />
                    </div>
                    <div className='acc-balance'>Balance</div>
                    <div><input type='text' placeholder='20 cusd' className='acc-balance-txt' /></div>
                </div>
                <div className='ksh'>
                    <div className='ksh-from'>Transfer</div>
                    <div className='ksh_text'>CUSD</div>
                    <div className='ksh-amount'>Amount</div>
                    <div><input type="text" placeholder="0" className="input-ksh-amount" value={value}
                        onChange={handleChange} /></div>
                </div>
                <div className='recipient-box'>
                    <div className='to-Text'>To</div>
                    <input type='text' placeholder='input address' className='input_address' ></input>
                </div>
                <button className='swap_button' >Send</button>

                {/*enable modal popup */}
                <Modpopup />
            </div>
        </section>
    )
}

export default Transfer

