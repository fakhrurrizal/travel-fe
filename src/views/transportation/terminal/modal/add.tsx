import { queryClient } from '@/utils'
import { objectClear } from '@/utils/helpers/object-clear.helper'
import { useAddTransportationTerminal } from '@/utils/mutations/use-transportation-terminal.mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { default as DialogActions, default as DialogContent } from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import { TransportationTerminalForm, transportationTerminalSchema } from '../schema/form.schemas'
import FormDataModal from './form-data'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddTransportationTerminal = (props: ModalAdd) => {
    const { mutateAsync: add_transportation, isPending } = useAddTransportationTerminal()

    const { open, toggle } = props
    const addTransportationTerminalForm = useForm<TransportationTerminalForm>({
        defaultValues: {
            transportation_type_id: null,
            code: '',
            name: '',
            city: '',
            province: '',
            address: '',
        },
        resolver: zodResolver(transportationTerminalSchema),
    })

    const { handleSubmit, reset } = addTransportationTerminalForm

    const onSubmit: any = async (data: TransportationTerminalForm) => {
        const tripData = objectClear<TransportationTerminalForm>(data)

        await add_transportation({ ...tripData, app_id: 1 })

        queryClient.invalidateQueries({ queryKey: ['LIST_TRANSPORTATION_TERMINAL_ALL'] })

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
                    Tambah Terminal
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataModal form={addTransportationTerminalForm} />
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

export default AddTransportationTerminal
