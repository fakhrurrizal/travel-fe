import { StaticAutoComplete } from '@/components'
import { queryClient } from '@/utils'
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
import { UserFilter } from '../schema/filter.schema'

interface ModalFilter {
    open: boolean
    toggle: () => void
    form: UseFormReturn<UserFilter>
}

const Sort: { id: string; label: string }[] = [
    { id: 'ASC', label: 'Terlama ke Terbaru' },
    { id: 'DESC', label: 'Terbaru ke Terlama' },
]

const FilterUser = (props: ModalFilter) => {
    const { open, toggle, form } = props

    const route = useRouter()

    const { control, handleSubmit, reset } = form

    const onSubmit = async (data: UserFilter) => {
        const queryParams = queryString.stringify(
            {
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
        queryClient.invalidateQueries({ queryKey: ['LIST_USER_ALL'] })
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
                Filter User
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={12}>
                    <Box>
                        <Grid container spacing={3}>
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

export default FilterUser
