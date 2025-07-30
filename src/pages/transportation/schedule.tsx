import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TransportationScheduleListPageViews from '@/views/transportation/schedule'

const TransportationScheduleList: NextPageWithLayout = () => {
    return (
        <>
            <TransportationScheduleListPageViews />
        </>
    )
}
TransportationScheduleList.getLayout = getNavbarLayout
export default TransportationScheduleList
