import { axiosInterceptor } from '@/config'
import { PaginationArgs } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { getApi } from '../helpers'

export const useTransportationTypeParams = (args: PaginationArgs<any>) => {
    const { pageIndex, pageSize, sort, searchValue, order } = args

    const query: Record<string, string | number> = {
        limit: Number(pageSize),
        page: Number(pageIndex),
    }

    if (order) {
        query['order'] = order as any
    }

    if (searchValue) {
        query['search'] = searchValue
    }

    if (sort) {
        query['sort'] = sort
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('transportation_type'),
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_TRANSPORTATION_TYPE_ALL', query, args],
    })
}
