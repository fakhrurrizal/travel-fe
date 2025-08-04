// pages/booking/payment/index.tsx
'use client'

import { getHomeNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import PaymentSuccessPage from '@/views/booking/success'

const PaymentRoute: NextPageWithLayout = () => {
    return <PaymentSuccessPage />
}

export default PaymentRoute
PaymentRoute.getLayout = getHomeNavbarLayout
