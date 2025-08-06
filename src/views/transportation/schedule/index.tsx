import HeaderSectionTableCustom from '@/components/custom-table/header'
import PaginationSectionTableCustom from '@/components/custom-table/pagination'
import CustomStyledTable from '@/components/custom-table/table/custom-styled-table'
import CustomStyledTableContainer from '@/components/custom-table/table/custom-styled-table-container'
import { CustomStyledTableData, CustomStyledTableHead } from '@/components/custom-table/table/custom-styled-table-head'
import CustomStyledTableRow from '@/components/custom-table/table/custom-styled-table-row'
import TableHeaderCustomTable from '@/components/custom-table/table/header'
import ToolbarSectionTableCustom from '@/components/custom-table/toolbar'
import { Order } from '@/interfaces'
import { useTransportationScheduleParams } from '@/utils/quries/use-transportation-schedule.query'
import { SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddTrip from './modal/add'
import FilterTransportationCompany from './modal/filter'
import { TransportationCompanyFilter } from './schema/filter.schema'
import RowOptions from './table/row-options'
import { formatToIDR } from '@/utils/helpers/format-number.helper'
import dayjs from 'dayjs'

const HeaderItems = [
    {
        label: 'Jenis transportasi',
        alignCenter: false,
    },
    {
        label: 'nama kendaraan',
        alignCenter: true,
    },
    {
        label: 'kelas',
        alignCenter: false,
    },
    {
        label: 'rute',
        alignCenter: false,
    },
    {
        label: 'total kursi',
        alignCenter: false,
    },
    {
        label: 'harga',
        alignCenter: true,
    },
    {
        label: 'Berlaku',
        alignCenter: false,
    },
    {
        label: 'Action',
        alignCenter: true,
    },
]

const TransportationScheduleListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const router = useRouter()

    const { sort, transportation_class_id, transportation_route_id } = router.query

    const form = useForm<TransportationCompanyFilter>({
        defaultValues: {
            transportation_class: null,
            transportation_route: null,
            sort: null,
        },
    })

    const { data: { data: ListData = [], recordsFiltered = 0 } = { data: [] }, isLoading } =
        useTransportationScheduleParams({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            transportationClass: transportation_class_id as string,
            transportationCompany: transportation_route_id as string,
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
                <HeaderSectionTableCustom title={'Daftar Jadwal'} />
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
                                                <CustomStyledTableHead>
                                                    {item?.transportation_class?.transportation_type?.name}
                                                </CustomStyledTableHead>
                                                <CustomStyledTableData>{item?.vehicle_name}</CustomStyledTableData>
                                                <CustomStyledTableData>
                                                    {item?.transportation_class?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData>
                                                    {item?.transportation_route?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {Number(item?.total_seat)}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {formatToIDR(item?.base_price)}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData>
                                                    {dayjs(item?.valid_from).format('DD-MM-YYYY')} -{' '}
                                                    {dayjs(item?.valid_until).format('DD-MM-YYYY')}
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

export default TransportationScheduleListPageViews
