import { axiosInterceptor } from '@/config'
import { PaginationArgs } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { getApi } from '../helpers'

export const useTripScheduleID = (id: number) => {
    const endpoint = queryString.stringifyUrl({
        url: getApi('trip_schedule') + '/' + id,
    })

    return useQuery({
        queryFn: async () => {
            if (id) {
                const res = await axiosInterceptor.get<any>(endpoint)

                return res.data?.data
            }
        },
        refetchOnWindowFocus: false,
        queryKey: [' TRIP_SCHEDULE_ID', id],
    })
}

export const useTripScheduleParams = (args: PaginationArgs<any>) => {
    const { status, pageIndex, pageSize, sort, searchValue, order } = args

    const query: Record<string, string | number> = {
        limit: Number(pageSize),
        page: Number(pageIndex),
        app_id: 1,
    }

    if (order) {
        query['order'] = order as any
    }

    if (status) {
        query['status'] = status
    }

    if (searchValue) {
        query['search'] = searchValue
    }

    if (sort) {
        query['sort'] = sort
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('trip_schedule'),
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_TRIP_SCHEDULE_ALL', query, args],
    })
}
