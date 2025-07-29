import HeaderSectionTableCustom from '@/components/custom-table/header'
import PaginationSectionTableCustom from '@/components/custom-table/pagination'
import CustomStyledTable from '@/components/custom-table/table/custom-styled-table'
import CustomStyledTableContainer from '@/components/custom-table/table/custom-styled-table-container'
import { CustomStyledTableData, CustomStyledTableHead } from '@/components/custom-table/table/custom-styled-table-head'
import CustomStyledTableRow from '@/components/custom-table/table/custom-styled-table-row'
import TableHeaderCustomTable from '@/components/custom-table/table/header'
import ToolbarSectionTableCustom from '@/components/custom-table/toolbar'
import { Order } from '@/interfaces'
import { useTransportationRouteParams } from '@/utils/quries/use-transportation-route.query'
import { SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddTrip from './modal/add'
import FilterTransportationCompany from './modal/filter'
import { TransportationCompanyFilter } from './schema/filter.schema'
import RowOptions from './table/row-options'

const HeaderItems = [
    {
        label: 'nama rute',
        alignCenter: false,
    },
    {
        label: 'perusahaan',
        alignCenter: true,
    },
    {
        label: 'Terminal Keberangkatan',
        alignCenter: true,
    },
    {
        label: 'Terminal Tiba',
        alignCenter: false,
    },
    {
        label: 'Jarak',
        alignCenter: false,
    },
    {
        label: 'Estimasi Perjalanan',
        alignCenter: true,
    },
    {
        label: 'Jenis Transportasi',
        alignCenter: true,
    },
    {
        label: 'Action',
        alignCenter: true,
    },
]

const TransportationRouteListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const router = useRouter()

    const { sort, transportation_type_id, transportation_company_id, arrival_terminal_id, departure_terminal_id } =
        router.query

    const form = useForm<TransportationCompanyFilter>({
        defaultValues: {
            transportation_type: null,
            arrival_terminal: null,
            departure_terminal: null,
            transportation_company: null,
            sort: null,
        },
    })

    const { data: { data: ListData = [], recordsFiltered = 0 } = { data: [] }, isLoading } =
        useTransportationRouteParams({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            transportationType: transportation_type_id as string,
            transportationCompany: transportation_company_id as string,
            departureTerminal: departure_terminal_id as string,
            arrivalTerminal: arrival_terminal_id as string,
            sort: sort ? (sort as Order) : undefined,
        })

    const handleLimitChange = useCallback((e: SelectChangeEvent) => {
        setPageSize(parseInt(e.target.value, 10))
    }, [])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        setPage(1)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchValue(searchValue)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchValue])

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const toggleAdd = () => setAddOpen(!addOpen)

    const toggleFilter = () => setFilterOpen(!filterOpen)

    return (
        <>
            <div className='custom__styled__container'>
                <HeaderSectionTableCustom title={'Daftar Rute'} />
                <ToolbarSectionTableCustom
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    toggleAdd={toggleAdd}
                    addButtonLabel={'Tambah baru'}
                    isLoading={isLoading}
                    toggleFilter={toggleFilter}
                />
                <CustomStyledTableContainer isLoading={isLoading} recordsFiltered={recordsFiltered}>
                    <CustomStyledTable>
                        <TableHeaderCustomTable data={HeaderItems} />

                        <tbody className='text-xs'>
                            {!isLoading &&
                                Array.isArray(ListData) &&
                                ListData?.map(item => {
                                    return (
                                        <Fragment key={item?.id}>
                                            <CustomStyledTableRow>
                                                <CustomStyledTableHead>{item?.name}</CustomStyledTableHead>
                                                <CustomStyledTableData>
                                                    {item?.transportation_company?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData>
                                                    {item?.departure_terminal?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData>
                                                    {item?.arrival_terminal?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {Number(item?.distance_km)} Km
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {Number(item?.estimated_duration)} Jam
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {item?.transportation_type?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    <RowOptions data={item} />
                                                </CustomStyledTableData>
                                            </CustomStyledTableRow>
                                        </Fragment>
                                    )
                                })}
                        </tbody>
                    </CustomStyledTable>
                </CustomStyledTableContainer>

                {/* Paginasi */}
                <PaginationSectionTableCustom
                    page={page}
                    pageSize={pageSize}
                    recordsFiltered={recordsFiltered}
                    handleLimitChange={handleLimitChange}
                    handlePageChange={handlePageChange}
                />
                {/* Paginasi */}
            </div>

            {addOpen && <AddTrip open={addOpen} toggle={toggleAdd} />}
            {filterOpen && <FilterTransportationCompany form={form} open={filterOpen} toggle={toggleFilter} />}
        </>
    )
}

export default TransportationRouteListPageViews
