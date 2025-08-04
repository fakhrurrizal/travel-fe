export interface PaginationArgs<T = any> {
    pageIndex?: number
    searchValue?: string
    pageSize?: number
    sort?: Order
    order?: keyof T
    status?: any
    transportationType?: string
    transportationCompany?: string
    transportationClass?: string
    transportationRoute?: string
    arrivalTerminal?: string
    departureTerminal?: string
    roleID?: number
}

export type Order = 'desc' | 'asc'
