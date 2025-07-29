// pages/booking/payment/index.tsx
'use client'

import React from 'react'
import PaymentPage from '@/views/booking/payment/payment'
import { NextPageWithLayout } from '@/utils'
import { getHomeNavbarLayout } from '@/components'

const PaymentRoute: NextPageWithLayout = () => {
    return <PaymentPage />
}

export default PaymentRoute
PaymentRoute.getLayout = getHomeNavbarLayout
