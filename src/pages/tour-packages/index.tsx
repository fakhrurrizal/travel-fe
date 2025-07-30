'use client'

import { getHomeNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TourPackagesPage from '@/views/tour-packages/list'


const TourPackagesRoute: NextPageWithLayout = () => {
    return <TourPackagesPage />
}

export default TourPackagesRoute
TourPackagesRoute.getLayout = getHomeNavbarLayout