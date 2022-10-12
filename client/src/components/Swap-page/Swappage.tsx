import React, { useState } from 'react'
import './swappage.css'
import Popup from './Popup'

function BuyCrypto() {
    const [value, setValue] = useState('');
    const [valueA, setValueA] = useState('');


    const handleChange = (event: any) => {
        const result = event.target.value.replace(/\D/g, '');
        setValue(result);
    };
    const handleChangeA = (event: any) => {
        const result = event.target.value.replace(/\D/g, '');
        setValueA(result);
    };
    return (
        <section id='Swap'>
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
                    <div className='ksh_text'>KSH</div>
                    <div className='ksh-from'>from</div>
                    <div className='ksh-amount'>Amount</div>
                    <div><input type="text" placeholder="0" className="input-ksh-amount" value={value}
                        onChange={handleChange} /></div>
                </div>

                <div className='toCUSD'>
                    <div className='to-Text'>To</div>
                    <div className='CUSD-text'>CUSD</div>
                    <div className='cUSD-amount'>Amount</div>
                    <div><input type="text" placeholder="0" className="input-CUSD-amount" value={valueA}
                        onChange={handleChangeA} /></div>
                </div>

                <Popup />
            </div>
        </section>
    )
}

export default BuyCrypto
