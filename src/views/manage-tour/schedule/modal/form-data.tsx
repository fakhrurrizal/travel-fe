import { ServerSideAutoComplete } from '@/components'
import CustomTextField from '@/components/text-field/custom-text-field'
import { Grid, InputAdornment } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { UseFormReturn } from 'react-hook-form'
import { TripScheduleForm } from '../schema/trip_schedule.schemas'

interface Props {
    form: UseFormReturn<TripScheduleForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataTrip = ({ form, readOnly = false }: Props) => {
    const { control, watch } = form

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ServerSideAutoComplete<TripScheduleForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='trip'
                        name='trip_id'
                        label='Paket Wisata'
                        queryEndpoint={{ app_id: 1 }}
                        size='medium'
                        formatOptions={response => {
                            const options = response.data
                            if (!options) return []

                            return options.map((option: any) => ({
                                id: option.id,
                                label: option.name,
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='available_seat'
                        label='Kuota'
                        inputFormat='NUMBER'
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>Orang</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='duration_days'
                        label='Durasi'
                        inputFormat='NUMBER'
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>Hari</InputAdornment>,
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <DatePicker
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        label='Tanggal Keberangkatan'
                        value={watch('departure_at') ? dayjs(watch('departure_at')) : null}
                        format='DD MMMM YYYY'
                        onChange={newValue => {
                            form.setValue('departure_at', newValue ? dayjs(newValue).format('YYYY-MM-DD') : '')
                        }}
                        minDate={dayjs().add(1, 'day')}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: 'medium',

                                error: form.formState.errors.hasOwnProperty(''),
                                InputProps: {
                                    readOnly: readOnly,
                                },
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default FormDataTrip
