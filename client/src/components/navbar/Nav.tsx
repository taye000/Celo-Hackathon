import React, { useState } from 'react'
import './nav.css'
import { ImMenu3 } from "@react-icons/all-files/im/ImMenu3";


const Nav = () => {
    const [activeNav, setActiveNav] = useState('Transfer')

    return (
        <>
            <nav>
                <button className='buy-button'><a href='#Swap' onClick={() => setActiveNav('#Swap')} className={activeNav === '#Swap' ? 'active' : ''}>Buy</a></button>
                <button className='sell_btn'><a href='#Sell' onClick={() => setActiveNav('#Sell')} className={activeNav === '#Sell' ? 'active' : ''}>Sell</a></button>
                <button className='transfer-button'><a href='#Transfer' onClick={() => setActiveNav('#Transfer')} className={activeNav === '#Transfer' ? 'active' : ''}>Transfer</a></button>
            </nav>
            <div className='Home-Profile-btn'><button className='profile'><a href='#Dropdown' onClick={() => setActiveNav('#Dropdown')} className={activeNav === '#Dropdown' ? 'active' : ''}><ImMenu3 /></a></button></div>
        </>
    )
}

export default Nav
