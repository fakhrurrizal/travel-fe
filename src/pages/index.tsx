import React from 'react'
import { NextPageWithLayout } from '@/utils'
import HomepageViews from '@/views/homepage'
import { getHomeNavbarLayout } from '@/components'

const HomePage: NextPageWithLayout = () => {
    return <HomepageViews />
}

export default HomePage
HomePage.getLayout = getHomeNavbarLayout
