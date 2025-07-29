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
import { useTransportationCompanyParams } from '@/utils/quries/use-transportation-company.query'
import { SelectChangeEvent, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddTrip from './modal/add'
import FilterTransportationCompany from './modal/filter'
import ShowImage from './modal/show-image'
import { TransportationCompanyFilter } from './schema/filter.schema'
import RowOptions from './table/row-options'

const HeaderItems = [
    {
        label: 'nama Perusahaan',
        alignCenter: false,
    },
    {
        label: 'kode',
        alignCenter: true,
    },
    {
        label: 'logo',
        alignCenter: true,
    },
    {
        label: 'Keterangan',
        alignCenter: false,
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

const ImageThumbnail = styled('img')({
    width: 70,
    height: 70,
    objectFit: 'contain',
    borderRadius: 8,
    padding: 6,
    cursor: 'pointer',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
})

const TransportationCompanyListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const [openImage, setOpenImage] = useState(false)

    const router = useRouter()

    const { sort, transportation_type_id } = router.query

    const form = useForm<TransportationCompanyFilter>({
        defaultValues: {
            transportation_type: null,
            sort: null,
        },
    })

    const { data: { data: ListData = [], recordsFiltered = 0 } = { data: [] }, isLoading } =
        useTransportationCompanyParams({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            transportationType: transportation_type_id as string,
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

    const toggleImage = () => setOpenImage(!openImage)

    return (
        <>
            <div className='custom__styled__container'>
                <HeaderSectionTableCustom title={'Daftar Perusahaan Transportasi'} />
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
                                                <CustomStyledTableData className='text-center'>
                                                    {item?.code}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center flex justify-center items-center'>
                                                    {item?.logo && (
                                                        <ImageThumbnail
                                                            src={item.logo}
                                                            alt='Thumbnail'
                                                            onClick={toggleImage}
                                                        />
                                                    )}
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className='truncate max-w-[190px]'>
                                                    <CustomTooltip title={item?.description ?? ''}>
                                                        <span className='block truncate'>{item?.description}</span>
                                                    </CustomTooltip>
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className='text-center'>
                                                    {item?.transportation_type?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    <RowOptions data={item} />
                                                </CustomStyledTableData>
                                            </CustomStyledTableRow>
                                            {openImage && (
                                                <ShowImage
                                                    open={openImage}
                                                    toggle={toggleImage}
                                                    image={item.logo || ''}
                                                />
                                            )}
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

export default TransportationCompanyListPageViews
