import React, { useState } from 'react'
import '../Swap-page/swappage.css'
import './Sellpage.css'


function Sellpage() {
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
        <section id='Sell'>
            <div className='container-D'>
                <header className='header_name'>
                    SWAP CRYPTO
                </header>
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
                    <div className='ksh_text'>CUSD</div>
                    <div className='ksh-from'>from</div>
                    <div className='ksh-amount'>Amount</div>
                    <div><input type="text" placeholder="0" className="input-ksh-amount" value={value}
                        onChange={handleChange} /></div>
                </div>

                <div className='toCUSD'>
                    <div className='to-Text'>To</div>
                    <div className='CUSD-text'>KSH</div>
                    <div className='cUSD-amount'>Amount</div>
                    <div><input type="text" placeholder="0" className="input-CUSD-amount" value={valueA}
                        onChange={handleChangeA} /></div>
                </div>
                <div>
                    <button className='sell_button'>Sell</button>
                </div>


            </div>
        </section>
    )
}

export default Sellpage
