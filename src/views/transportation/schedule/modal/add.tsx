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
import { TransportationScheduleForm, transportationScheduleSchema } from '../schema/form.schemas'
import { useAddTransportationSchedule } from '@/utils/mutations/use-transportation-schedule.mutation'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddTransportationSchedule = (props: ModalAdd) => {
    const { mutateAsync: add_data, isPending } = useAddTransportationSchedule()

    const { open, toggle } = props
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

    const { handleSubmit, reset } = addTransportationScheduleForm

    const onSubmit: any = async (data: TransportationScheduleForm) => {
        const tripData = objectClear<TransportationScheduleForm>(data)

        await add_data({ ...tripData })

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
                    Tambah Jadwal
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

export default AddTransportationSchedule
