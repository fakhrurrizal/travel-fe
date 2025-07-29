import { ServerSideAutoComplete, StaticAutoComplete } from '@/components'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { default as DialogActions, default as DialogContent } from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { UseFormReturn } from 'react-hook-form'
import { TransportationCompanyFilter } from '../schema/filter.schema'
import { queryClient } from '@/utils'

interface ModalFilter {
    open: boolean
    toggle: () => void
    form: UseFormReturn<TransportationCompanyFilter>
}

const Sort: { id: string; label: string }[] = [
    { id: 'ASC', label: 'Terlama ke Terbaru' },
    { id: 'DESC', label: 'Terbaru ke Terlama' },
]

const FilterTransportationCompany = (props: ModalFilter) => {
    const { open, toggle, form } = props

    const route = useRouter()

    const { control, handleSubmit, reset } = form

    const onSubmit = async (data: TransportationCompanyFilter) => {
        const queryParams = queryString.stringify(
            {
                transportation_type_id: data.transportation_type?.id ?? '',
                sort: data.sort?.id ?? '',
            },
            {
                skipEmptyString: true,
                skipNull: true,
            }
        )

        if (queryParams) {
            await route.push(`${route.pathname}?${queryParams}`, undefined, { shallow: false })
        }
        queryClient.invalidateQueries({ queryKey: ['LIST_TRANSPORTATION_COMPANY_ALL'] })
        toggle()
    }

    const onReset = () => {
        reset()
        route.push(`${route.pathname}`, undefined, {
            shallow: false,
        })
        toggle()
    }
    const handleClose = () => {
        toggle()
        reset()
    }

    return (
        <Dialog fullWidth maxWidth='sm' open={open}>
            <DialogTitle fontWeight={600} sx={{ position: 'relative' }}>
                Filter Terminal
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={12}>
                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <ServerSideAutoComplete<TransportationCompanyFilter, { id: number; label: string }, any>
                                    control={control}
                                    endpoint='transportation_type'
                                    name='transportation_type'
                                    label='Jenis Transportasi'
                                    formatOptions={response => {
                                        const options = response.data

                                        if (!options) return []

                                        return options.map((option: any) => ({
                                            id: option.id,
                                            label: option.name,
                                        }))
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <StaticAutoComplete
                                    control={control}
                                    name='sort'
                                    label='Urutkan'
                                    options={Sort}
                                    disableClearable
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleSubmit(onReset)} variant='outlined' sx={{ mr: 3 }}>
                    Reset
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleSubmit(onSubmit)} variant='contained' sx={{ mr: 3 }}>
                        Simpan
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default FilterTransportationCompany
