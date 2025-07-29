import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TripListPageViews from '@/views/manage-tour/paket'
// import ContactList from '@/views/master-data/contact-data'

const ManageTourList: NextPageWithLayout = () => {
    return (
        <>
            <TripListPageViews />
        </>
    )
}

ManageTourList.getLayout = getNavbarLayout
export default ManageTourList
