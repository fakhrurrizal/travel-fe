import { queryClient } from '@/utils'
import { objectClear } from '@/utils/helpers/object-clear.helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { default as DialogActions, default as DialogContent } from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import FormDataModal from './form-data'
import { TransportationRouteForm, transportationRouteSchema } from '../schema/form.schemas'
import { useAddTransportationRoute } from '@/utils/mutations/use-transportation-route.mutation'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddTransportationRoute = (props: ModalAdd) => {
    const { mutateAsync: add_data, isPending } = useAddTransportationRoute()

    const { open, toggle } = props
    const addTransportationRouteForm = useForm<TransportationRouteForm>({
        defaultValues: {
            transportation_type_id: null,
            transportation_company_id: null,
            departure_terminal_id: null,
            arrival_terminal_id: null,
            name: '',
            distance_km: '',
            estimated_duration: '',
        },
        resolver: zodResolver(transportationRouteSchema),
    })

    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = addTransportationRouteForm

    console.log('errors', errors)

    const onSubmit: any = async (data: TransportationRouteForm) => {
        const tripData = objectClear<TransportationRouteForm>(data)

        await add_data({ ...tripData })

        queryClient.invalidateQueries({ queryKey: ['LIST_TRANSPORTATION_ROUTE_ALL'] })

        toggle()
        reset()
    }

    const handleClose = () => {
        toggle()
        reset()
    }

    return (
        <>
            <Dialog fullWidth open={open} maxWidth='md'>
                <DialogTitle fontWeight={600} sx={{ position: 'relative' }}>
                    Tambah Rute
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataModal form={addTransportationRouteForm} />
                        </Box>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button variant='outlined' color='secondary' onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            variant='contained'
                            sx={{ mr: 1 }}
                            disabled={isPending}
                        >
                            {isPending ? <CircularProgress size={18} color='inherit' /> : 'Submit'}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddTransportationRoute
