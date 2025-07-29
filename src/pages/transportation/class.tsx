import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TransportationClassListPageViews from '@/views/transportation/class'

const TransportationClassList: NextPageWithLayout = () => {
    return (
        <>
            <TransportationClassListPageViews />
        </>
    )
}

TransportationClassList.getLayout = getNavbarLayout
export default TransportationClassList
