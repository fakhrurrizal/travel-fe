export interface PaginationArgs<T = any> {
    pageIndex?: number
    searchValue?: string
    pageSize?: number
    sort?: Order
    order?: keyof T
    status?: any
    transportationType?: string
    transportationCompany?: string
    arrivalTerminal?: string
    departureTerminal?: string
}

export type Order = 'desc' | 'asc'
