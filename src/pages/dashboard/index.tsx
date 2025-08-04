'use client'

import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import DashboardView from '@/views/dashboard'

const DashboardPage: NextPageWithLayout = () => {
    return (
        <div>
            <DashboardView/>
        </div>
    )
}

DashboardPage.getLayout = getNavbarLayout
export default DashboardPage
