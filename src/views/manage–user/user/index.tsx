import { CustomTooltip } from '@/components'
import HeaderSectionTableCustom from '@/components/custom-table/header'
import PaginationSectionTableCustom from '@/components/custom-table/pagination'
import CustomStyledTable from '@/components/custom-table/table/custom-styled-table'
import CustomStyledTableContainer from '@/components/custom-table/table/custom-styled-table-container'
import { CustomStyledTableData, CustomStyledTableHead } from '@/components/custom-table/table/custom-styled-table-head'
import CustomStyledTableRow from '@/components/custom-table/table/custom-styled-table-row'
import TableHeaderCustomTable from '@/components/custom-table/table/header'
import ToolbarSectionTableCustom from '@/components/custom-table/toolbar'
import { Order } from '@/interfaces'
import { SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddUser from './modal/add'
import FilterUser from './modal/filter'
import { UserFilter } from './schema/filter.schema'
import RowOptions from './table/row-options'
import { useUserParams } from '@/utils/quries/use–user.query.'

const HeaderItems = [
    {
        label: 'Nama Lengkap',
        alignCenter: false,
    },
    {
        label: 'Email',
        alignCenter: false,
    },
    {
        label: 'No. Telpon',
        alignCenter: false,
    },
    {
        label: 'Status',
        alignCenter: true,
    },
    {
        label: 'Action',
        alignCenter: true,
    },
]

const UserListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const router = useRouter()

    const { sort, user_type_id } = router.query

    const form = useForm<UserFilter>({
        defaultValues: {
            user_type: null,
            sort: null,
        },
    })

    const {
        data: { data: ListData = [], recordsFiltered = 0 } = { data: [] },
        isLoading,
    } = //jgn diapa apain
        useUserParams({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            transportationType: user_type_id as string,
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

    const handlePageChange = (_event: any, newPage: number) => {
        setPage(newPage)
    }

    const toggleAdd = () => setAddOpen(!addOpen)

    const toggleFilter = () => setFilterOpen(!filterOpen)

    return (
        <>
            <div className='custom__styled__container'>
                <HeaderSectionTableCustom title={'Daftar User'} />
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
                                                <CustomStyledTableHead>{item?.fullname || '-'}</CustomStyledTableHead>
                                                <CustomStyledTableData className='text-left'>
                                                    {item?.email || '-'}
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className='truncate max-w-[190px]'>
                                                    <CustomTooltip title={item?.phone || ''}>
                                                        <span className='block truncate'>{item?.phone || '-'}</span>
                                                    </CustomTooltip>
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className='text-center'>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            item?.status === 1
                                                                ? 'bg-green-100 text-green-800'
                                                                : item?.status === 0
                                                                  ? 'bg-red-100 text-red-800'
                                                                  : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {item?.status === 1
                                                            ? 'Aktif'
                                                            : item?.status === 0
                                                              ? 'Tidak Aktif'
                                                              : '-'}
                                                    </span>
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

            {addOpen && <AddUser open={addOpen} toggle={toggleAdd} />}
            {filterOpen && <FilterUser form={form} open={filterOpen} toggle={toggleFilter} />}
        </>
    )
}

export default UserListPageViews
