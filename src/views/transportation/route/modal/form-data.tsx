import { ServerSideAutoComplete } from '@/components'
import CustomTextField from '@/components/text-field/custom-text-field'
import { Grid, InputAdornment } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { TransportationRouteForm } from '../schema/form.schemas'

interface Props {
    form: UseFormReturn<TransportationRouteForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataModal = ({ form }: Props) => {
    const { control, setValue, watch } = form

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <ServerSideAutoComplete<TransportationRouteForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='transportation_type'
                        name='transportation_type_id'
                        label='Jenis Transportasi'
                        onValueChange={() => {
                            setValue('transportation_company', null)
                            setValue('departure_terminal', null)
                            setValue('arrival_terminal', null)
                        }}
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
                        name='name'
                        label='Nama Rute'
                        inputFormat='NORMAL'
                        placeholder='Jakarta - Semarang'
                    />
                </Grid>
                {watch('transportation_type_id')?.id > 0 && (
                    <>
                        <Grid item xs={12} md={12}>
                            <ServerSideAutoComplete<TransportationRouteForm, { id: number; label: string }, any>
                                control={control}
                                endpoint='transportation_company'
                                queryEndpoint={{
                                    transportation_type_id: Number(watch('transportation_type_id')?.id),
                                }}
                                name='transportation_company_id'
                                label='Perusahaan'
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
                            <ServerSideAutoComplete<
                                TransportationRouteForm,
                                { id: number; label: string; code: string },
                                any
                            >
                                control={control}
                                endpoint='transportation_terminal'
                                queryEndpoint={{
                                    transportation_type_id: Number(watch('transportation_type_id')?.id),
                                }}
                                name='departure_terminal_id'
                                getOptionLabel={(option: any) => `${option?.label} (${option?.code})`}
                                label='Terminal Keberangkatan'
                                formatOptions={response => {
                                    const options = response.data

                                    if (!options) return []

                                    return options.map((option: any) => ({
                                        id: option.id,
                                        label: option.name,
                                        code: option.code,
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ServerSideAutoComplete<
                                TransportationRouteForm,
                                { id: number; label: string; code: string },
                                any
                            >
                                control={control}
                                endpoint='transportation_terminal'
                                queryEndpoint={{
                                    transportation_type_id: Number(watch('transportation_type_id')?.id),
                                }}
                                name='arrival_terminal_id'
                                label='Terminal Tiba'
                                getOptionLabel={(option: any) => `${option?.label} (${option?.code})`}
                                formatOptions={response => {
                                    const options = response.data

                                    if (!options) return []

                                    return options.map((option: any) => ({
                                        id: option.id,
                                        label: option.name,
                                        code: option.code,
                                    }))
                                }}
                            />
                        </Grid>
                    </>
                )}

                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='distance_km'
                        textUppercase
                        label='Jarak'
                        inputFormat='DECIMAL'
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>Km</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='estimated_duration'
                        textUppercase
                        label='Estimasi perjalanan'
                        inputFormat='DECIMAL'
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>Jam</InputAdornment>,
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default FormDataModal
