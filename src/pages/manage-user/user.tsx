import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import UserListPageViews from '@/views/manage–user/user'

const UserList: NextPageWithLayout = () => {
    return (
        <>
            <UserListPageViews />
        </>
    )
}

UserList.getLayout = getNavbarLayout
export default UserList
