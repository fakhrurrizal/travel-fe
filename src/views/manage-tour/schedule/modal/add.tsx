import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { default as DialogActions, default as DialogContent } from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import { TripScheduleForm, tripScheduleSchema } from '../schema/trip_schedule.schemas'
import FormDataTrip from './form-data'
import { CircularProgress } from '@mui/material'
import { objectClear } from '@/utils/helpers/object-clear.helper'
import { queryClient } from '@/utils'
import { useAddScheduleTrip } from '@/utils/mutations/use-trips_schedule.mutation'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddTrip = (props: ModalAdd) => {
    const { mutateAsync: add_trip, isPending } = useAddScheduleTrip()

    const { open, toggle } = props
    const addTripScheduleForm = useForm<TripScheduleForm>({
        defaultValues: {
            trip_id: null,
            start_date: null,
            end_date: null,
            available_seat: '',
        },
        resolver: zodResolver(tripScheduleSchema),
    })

    const { handleSubmit, reset } = addTripScheduleForm

    const onSubmit: any = async (data: TripScheduleForm) => {
        const tripData = objectClear<TripScheduleForm>(data)

        await add_trip({ ...tripData, app_id: 1 })

        queryClient.invalidateQueries({ queryKey: ['LIST_TRIP_SCHEDULE_ALL'] })

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
                    Tambah Jadwal Wisata
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataTrip form={addTripScheduleForm} />
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
