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
import { useEditTransportationRoute } from '@/utils/mutations/use-transportation-route.mutation'
import { TransportationRouteForm, transportationRouteSchema } from '../schema/form.schemas'

interface ModalAdd {
    open: boolean
    toggle: () => void
    data: any
}

const EditTransportationRoute = (props: ModalAdd) => {
    const { open, toggle, data } = props

    const { mutateAsync: edit_data, isPending } = useEditTransportationRoute(data.id)

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

    const { handleSubmit, reset } = addTransportationRouteForm

    useEffect(() => {
        if (data) {
            reset({
                transportation_type_id:
                    data.transportation_type?.id > 0
                        ? {
                              id: data.transportation_type?.id,
                              label: data.transportation_type?.name,
                          }
                        : null,
                transportation_company_id:
                    data.transportation_company?.id > 0
                        ? {
                              id: data.transportation_company?.id,
                              label: data.transportation_company?.name,
                          }
                        : null,
                departure_terminal_id:
                    data.departure_terminal?.id > 0
                        ? {
                              id: data.departure_terminal?.id,
                              label: data.departure_terminal?.name,
                              code: data.departure_terminal?.code,
                          }
                        : null,
                arrival_terminal_id:
                    data.arrival_terminal?.id > 0
                        ? {
                              id: data.arrival_terminal?.id,
                              label: data.arrival_terminal?.name,
                              code: data.arrival_terminal?.code,
                          }
                        : null,
                name: data.name.toString(),
                distance_km: data.distance_km.toString(),
                estimated_duration: data.estimated_duration.toString(),
            })
        }
    }, [data, reset, addTransportationRouteForm])

    const onSubmit: any = async (data: TransportationRouteForm) => {
        const tripData = objectClear<TransportationRouteForm>(data)

        await edit_data({ ...tripData })

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
                    Edit Rute {data.name}
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

export default EditTransportationRoute
