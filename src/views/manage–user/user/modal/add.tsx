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
import { UserForm, userSchema } from '../schema/form.schemas'
import FormDataModal from './form-data'
import { useAddUser } from '@/utils/mutations/use-user.mutation'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddUser = (props: ModalAdd) => {
    const { mutateAsync: add_user, isPending } = useAddUser()

    const { open, toggle } = props
    const addUserForm = useForm<UserForm>({
        defaultValues: {
            user_type_id: null,
            code: '',
            description: '',
            name: '',
        },
        resolver: zodResolver(userSchema),
    })

    const { handleSubmit, reset } = addUserForm

    const onSubmit: any = async (data: UserForm) => {
        const userData = objectClear<UserForm>(data)

        await add_user({ ...userData, app_id: 1 })

        queryClient.invalidateQueries({ queryKey: ['LIST_USER_ALL'] })

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
                    Tambah User
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataModal form={addUserForm} />
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

export default AddUser
