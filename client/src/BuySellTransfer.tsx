import React from 'react'
import Swap from './components/Swap-page/Swappage'
import Nav from './components/navbar/Nav'
import Sell from './components/SellPage/Sellpage'
import Send from './components/transfer-page/Transferpage'

const BuySellTransfer = () => {
    return (
        <>
            <Swap />
            <Sell />
            <Send />
            <Nav />
        </>
    )
}

export default BuySellTransfer
