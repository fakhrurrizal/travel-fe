import { axiosInterceptor } from '@/config'
import { ResponseGetMe } from '@/modules/user'
import { useApplicationSettings } from '@/services'
import { getApi } from '@/utils'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { ReactNode, useEffect, useMemo } from 'react'
import Navbar from './navbar-default-layout'

dayjs.locale('id')

export const appBarHeight = 65
const normalSideBarWidth = 250
const miniSideBarWidth = 60

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
    const { refetch: getMe } = useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<ResponseGetMe>(getApi('get_me'))

            return res.data
        },
        queryKey: [getApi('get_me')],
        enabled: false,
    })

    const isExpandDrawer = useApplicationSettings(state => state.value.expandSidebar)

    const drawerWidth = useMemo(() => {
        if (isExpandDrawer) {
            return normalSideBarWidth
        } else {
            return miniSideBarWidth
        }
    }, [isExpandDrawer])

    useEffect(() => {
        getMe()
    }, [getMe])

    return (
        <>
            <Navbar drawerWidth={drawerWidth} />

            <Box
                component='main'
                sx={({ breakpoints }) => ({
                    flexGrow: 1,
                    padding: 2,
                    // backgroundColor: theme => theme.palette.mainColor,
                    [breakpoints.up('md')]: {
                        paddingLeft: `calc(${drawerWidth}px + 15px)`,
                    },
                    minHeight: `calc(100vh - ${appBarHeight}px)`,
                    // position: 'relative',
                    // overflowY: 'auto',
                    marginTop: `calc(${appBarHeight}px)`,
                    borderTopLeftRadius: theme => theme.shape.borderRadius + 'px',
                    borderTopRightRadius: theme => theme.shape.borderRadius + 'px',
                    marginRight: '0px',
                    [breakpoints.down('md')]: {
                        marginX: '8px',
                        paddingRight: 2,
                        paddingY: 1,
                    },
                })}
                className='bg-[#f8f7fa] !rounded-md'
            >
                {children}
            </Box>
        </>
    )
}
