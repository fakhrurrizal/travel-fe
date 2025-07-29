import HeaderSectionTableCustom from '@/components/custom-table/header'
import PaginationSectionTableCustom from '@/components/custom-table/pagination'
import CustomStyledTable from '@/components/custom-table/table/custom-styled-table'
import CustomStyledTableContainer from '@/components/custom-table/table/custom-styled-table-container'
import { CustomStyledTableData, CustomStyledTableHead } from '@/components/custom-table/table/custom-styled-table-head'
import CustomStyledTableRow from '@/components/custom-table/table/custom-styled-table-row'
import TableHeaderCustomTable from '@/components/custom-table/table/header'
import ToolbarSectionTableCustom from '@/components/custom-table/toolbar'
import { Order } from '@/interfaces'
import { useTripScheduleParams } from '@/utils/quries/use-schedule.query'
import { SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useState } from 'react'
import AddTrip from './modal/add'
import RowOptions from './table/row-options'

const HeaderItems = [
    {
        label: 'Nama Paket',
        alignCenter: false,
    },
    {
        label: 'Kuota',
        alignCenter: true,
    },
    {
        label: 'Durasi',
        alignCenter: true,
    },
    {
        label: 'Waktu berangkat',
        alignCenter: true,
    },
    {
        label: 'Action',
        alignCenter: true,
    },
]

const ScheduleListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const router = useRouter()

    const { sort, status } = router.query

    const { data: { data: TripList = [], recordsFiltered = 0 } = { data: [] }, isLoading } = useTripScheduleParams({
        pageSize: pageSize,
        pageIndex: page,
        status,
        sort: sort ? (sort as Order) : undefined,
    })

    const handleLimitChange = useCallback((e: SelectChangeEvent) => {
        setPageSize(parseInt(e.target.value, 10))
    }, [])

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const toggleAdd = () => setAddOpen(!addOpen)

    return (
        <>
            <div className='custom__styled__container'>
                {/* header section */}
                <HeaderSectionTableCustom title={'Daftar Jadwal Paket Wisata'} />
                {/* header section */}

                {/* toolbar section */}
                <ToolbarSectionTableCustom
                    toggleAdd={toggleAdd}
                    disabledSearch
                    addButtonLabel={'Tambah baru'}
                    isLoading={isLoading}
                />
                <CustomStyledTableContainer isLoading={isLoading} recordsFiltered={recordsFiltered}>
                    <CustomStyledTable>
                        <TableHeaderCustomTable data={HeaderItems} />

                        <tbody className='text-xs'>
                            {!isLoading &&
                                Array.isArray(TripList) &&
                                TripList?.map(item => {
                                    return (
                                        <Fragment key={item?.id}>
                                            <CustomStyledTableRow>
                                                <CustomStyledTableHead>{item?.trip.name}</CustomStyledTableHead>
                                                <CustomStyledTableData className='text-center'>
                                                    {item?.available_seat}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {item?.duration_days} hari
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {dayjs(item?.departure_at).format('DD MMM YYYY')}
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
        </>
    )
}

export default ScheduleListPageViews
