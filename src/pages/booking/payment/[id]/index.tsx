'use client'

import React from 'react'
import BankPayment from '@/views/booking/payment/bank-payment'
import { getHomeNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'

const BankPaymentRoute: NextPageWithLayout = () => {
    return <BankPayment />
}

export default BankPaymentRoute
BankPaymentRoute.getLayout = getHomeNavbarLayout
