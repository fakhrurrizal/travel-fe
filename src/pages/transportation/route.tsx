import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TransportationRouteListPageViews from '@/views/transportation/schedule'

const TransportationRouteList: NextPageWithLayout = () => {
    return (
        <>
            <TransportationRouteListPageViews />
        </>
    )
}

TransportationRouteList.getLayout = getNavbarLayout
export default TransportationRouteList
