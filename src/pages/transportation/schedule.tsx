import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import ScheduleListPageViews from '@/views/manage-tour/schedule'
// import ContactList from '@/views/master-data/contact-data'

const ScheduleList: NextPageWithLayout = () => {
    return (
        <>
            <ScheduleListPageViews />
        </>
    )
}
ScheduleList.getLayout = getNavbarLayout
export default ScheduleList
