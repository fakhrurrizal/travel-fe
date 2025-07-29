import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { default as DialogActions, default as DialogContent } from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import { TripForm, tripSchema } from '../schema/trip.schemas'
import FormDataTrip from './form-data'
import { CircularProgress } from '@mui/material'
import { objectClear } from '@/utils/helpers/object-clear.helper'
import { queryClient } from '@/utils'
import { useAddTrip } from '@/utils/mutations/use-trips.mutation'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddTrip = (props: ModalAdd) => {
    const { mutateAsync: add_trip, isPending } = useAddTrip()

    const { open, toggle } = props
    const addTripForm = useForm<TripForm>({
        defaultValues: {
            name: '',
            description: '',
            status: true,
            trip_category_id: null,
            destination_type_id: null,
            base_price: '',
            max_capacity: '10',
            min_participants: '1',
            duration_days: '1',
            is_active: true,
            image: '',
            location: '',
            latitude: '',
            longitude: '',
        },
        resolver: zodResolver(tripSchema),
    })

    const { handleSubmit, reset } = addTripForm

    const onSubmit: any = async (data: TripForm) => {
        const tripData = objectClear<TripForm>(data)

        await add_trip({ ...tripData, app_id: 1 })

        queryClient.invalidateQueries({ queryKey: ['LIST_TRIP_ALL'] })

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
                    Tambah Paket Wisata
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataTrip form={addTripForm} />
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

export default AddTrip
