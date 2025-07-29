import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TransportationTerminalListPageViews from '@/views/transportation/terminal'

const TransportationTerminalList: NextPageWithLayout = () => {
    return (
        <>
            <TransportationTerminalListPageViews />
        </>
    )
}

TransportationTerminalList.getLayout = getNavbarLayout
export default TransportationTerminalList
