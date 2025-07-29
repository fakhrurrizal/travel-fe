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
import { TransportationClassForm, transportationClassSchema } from '../schema/form.schemas'
import FormDataModal from './form-data'
import { useAddTransportationClass } from '@/utils/mutations/use-transportation-class.mutation'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddTransportationClass = (props: ModalAdd) => {
    const { mutateAsync: add_transportation_company, isPending } = useAddTransportationClass()

    const { open, toggle } = props
    const addTransportationClassForm = useForm<TransportationClassForm>({
        defaultValues: {
            transportation_type_id: null,
            code: '',
            description: '',
            name: '',
        },
        resolver: zodResolver(transportationClassSchema),
    })

    const { handleSubmit, reset } = addTransportationClassForm

    const onSubmit: any = async (data: TransportationClassForm) => {
        const tripData = objectClear<TransportationClassForm>(data)

        await add_transportation_company({ ...tripData, app_id: 1 })

        queryClient.invalidateQueries({ queryKey: ['LIST_TRANSPORTATION_CLASS_ALL'] })

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
                    Tambah Kelas Transportasi
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataModal form={addTransportationClassForm} />
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

export default AddTransportationClass
