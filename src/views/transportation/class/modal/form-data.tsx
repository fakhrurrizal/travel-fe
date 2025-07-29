import { ServerSideAutoComplete } from '@/components'
import CustomTextField from '@/components/text-field/custom-text-field'
import { Grid } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { TransportationClassForm } from '../schema/form.schemas'

interface Props {
    form: UseFormReturn<TransportationClassForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataModal = ({ form }: Props) => {
    const { control } = form

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ServerSideAutoComplete<TransportationClassForm, { id: number; label: string }, any>
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
                    <CustomTextField control={control} name='name' label='Nama Kelas' inputFormat='NORMAL' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='code'
                        textUppercase
                        label='Kode Kelas'
                        inputFormat='NORMAL'
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='description'
                        label='Keterangan Kelas'
                        inputFormat='NORMAL'
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default FormDataModal
