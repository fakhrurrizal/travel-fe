import { axiosInterceptor } from '@/config'
import { PaginationArgs } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { getApi } from '../helpers'

export const useTransportationTerminalParams = (args: PaginationArgs<any>) => {
    const { status, pageIndex, pageSize, sort, searchValue, order, transportationType } = args

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

    if (transportationType) {
        query['transportation_type_id'] = transportationType
    }

    if (sort) {
        query['sort'] = sort
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('transportation_terminal'),
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_TRANSPORTATION_TERMINAL_ALL', query, args],
    })
}
