import { ServerSideAutoComplete } from '@/components'
import CustomTextField from '@/components/text-field/custom-text-field'
import { Grid } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { TransportationTerminalForm } from '../schema/form.schemas'

interface Props {
    form: UseFormReturn<TransportationTerminalForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataModal = ({ form }: Props) => {
    const { control } = form

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ServerSideAutoComplete<TransportationTerminalForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='transportation_type'
                        name='transportation_type_id'
                        label='Jenis Transportasi'
                        queryEndpoint={{ app_id: 1 }}
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
                    <CustomTextField control={control} name='name' label='Nama Terminal' inputFormat='NORMAL' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='code'
                        textUppercase
                        label='Kode Terminal'
                        inputFormat='NORMAL'
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField control={control} name='city' label='Kota' inputFormat='NORMAL' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField control={control} name='province' label='Provinsi' inputFormat='NORMAL' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField control={control} name='address' label='Alamat' inputFormat='NORMAL' />
                </Grid>
            </Grid>
        </>
    )
}

export default FormDataModal
