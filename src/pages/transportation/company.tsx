import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TransportationCompanyListPageViews from '@/views/transportation/company'

const TransportationCompanyList: NextPageWithLayout = () => {
    return (
        <>
            <TransportationCompanyListPageViews />
        </>
    )
}

TransportationCompanyList.getLayout = getNavbarLayout
export default TransportationCompanyList
