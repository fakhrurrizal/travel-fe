import { axiosInterceptor } from '@/config'
import { PaginationArgs } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { getApi } from '../helpers'

export const useTransportationScheduleParams = (args: PaginationArgs<any>) => {
    const { status, pageIndex, pageSize, sort, searchValue, order, transportationClass, transportationRoute } = args

    const query: Record<string, string | number> = {
        limit: Number(pageSize),
        page: Number(pageIndex),
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

    if (transportationClass) {
        query['transportation_class_id'] = transportationClass
    }

    if (transportationRoute) {
        query['transportation_route_id'] = transportationRoute
    }

    if (sort) {
        query['sort'] = sort
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('transportation_schedule'),
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_TRANSPORTATION_SCHEDULE_ALL', query, args],
    })
}
