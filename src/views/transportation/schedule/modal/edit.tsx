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
import FormDataModal from './form-data'
import { useEditTransportationSchedule } from '@/utils/mutations/use-transportation-schedule.mutation'
import { TransportationScheduleForm, transportationScheduleSchema } from '../schema/form.schemas'
import dayjs from 'dayjs'

interface ModalAdd {
    open: boolean
    toggle: () => void
    data: any
}

const EditTransportationSchedule = (props: ModalAdd) => {
    const { open, toggle, data } = props

    const { mutateAsync: edit_data, isPending } = useEditTransportationSchedule(data.id)

    const addTransportationScheduleForm = useForm<TransportationScheduleForm>({
        defaultValues: {
            transportation_class_id: null,
            transportation_route_id: null,
            vehicle_name: '',
            base_price: '',
            arrival_at: '',
            departure_at: '',
            valid_from: '',
            valid_until: '',
            total_seat: '',
        },
        resolver: zodResolver(transportationScheduleSchema),
    })

    const { handleSubmit, reset, } = addTransportationScheduleForm

    useEffect(() => {
        if (data) {
            reset({
                transportation_class_id:
                    data.transportation_class?.id > 0
                        ? {
                            id: data.transportation_class?.id,
                            label: data.transportation_class?.name,
                            transportation_type_name: data.transportation_class.transportation_type?.name,
                            transportation_type_id: data.transportation_class.transportation_type.id,
                        }
                        : null,
                transportation_route_id:
                    data.transportation_route?.id > 0
                        ? {
                            id: data.transportation_route?.id,
                            label: data.transportation_route?.name,
                        }
                        : null,
                vehicle_name: data.vehicle_name.toString(),
                image: data.image.toString(),
                base_price: data.base_price.toString(),
                total_seat: data.total_seat.toString(),
                departure_at: dayjs(data.departure_at),
                arrival_at: dayjs(data.arrival_at),
                valid_from: dayjs(data.valid_from),
                valid_until: dayjs(data.valid_until),
            })
        }
    }, [data, reset, addTransportationScheduleForm])

    const onSubmit: any = async (data: TransportationScheduleForm) => {
        const tripData = objectClear<TransportationScheduleForm>(data)

        await edit_data({ ...tripData })

        queryClient.invalidateQueries({ queryKey: ['LIST_TRANSPORTATION_SCHEDULE_ALL'] })

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
                    Edit Rute {data.name}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataModal form={addTransportationScheduleForm} />
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

export default EditTransportationSchedule
