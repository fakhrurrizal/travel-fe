import { axiosInterceptor } from '@/config'
import { PaginationArgs } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { getApi } from '../helpers'

export const useUserParams = (args: PaginationArgs<any>) => {
    const { status, pageIndex, pageSize, sort, searchValue, order } = args

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

    if (sort) {
        query['sort'] = sort
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('user'),
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_TRANSPORTATION_CLASS_ALL', query, args],
    })
}
