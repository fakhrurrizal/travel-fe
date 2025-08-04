import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import UserAgenListPageViews from '@/views/manage–user/agen'

const UserList: NextPageWithLayout = () => {
    return (
        <>
            <UserAgenListPageViews />
        </>
    )
}

UserList.getLayout = getNavbarLayout
export default UserList
