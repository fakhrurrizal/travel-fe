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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormDataTrip from './form-data'
import { useEditScheduleTrip } from '@/utils/mutations/use-trips_schedule.mutation'
import { TripScheduleForm, tripScheduleSchema } from '../schema/trip_schedule.schemas'
import dayjs from 'dayjs'

interface ModalAdd {
    open: boolean
    toggle: () => void
    data: any
}

const EditTrip = (props: ModalAdd) => {
    const { open, toggle, data } = props

    const { mutateAsync: add_trip, isPending } = useEditScheduleTrip(data.id)

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

    useEffect(() => {
        if (data) {
            reset({
                trip_id:
                    data.trip?.id > 0
                        ? {
                              id: data.trip?.id,
                              label: data.trip?.name,
                          }
                        : null,

                duration_days: data.duration_days.toString(),
                available_seat: data.available_seat.toString(),
                departure_at: dayjs(data.departure_at),
            })
        }
    }, [data, reset, addTripScheduleForm])

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
                    Edit Jadwal Paket {data.name}
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

export default EditTrip
