import { StaticAutoComplete } from '@/components'
import CustomTextField from '@/components/text-field/custom-text-field'
import { Grid } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { UserForm } from '../schema/form.schemas'

interface Props {
    form: UseFormReturn<UserForm>
    readOnly?: boolean
    for_edit?: boolean
}

export const Status: { id: number; label: string }[] = [
    { id: 1, label: 'Aktif' },
    { id: 0, label: 'Nonaktif' },
]

const FormDataModal = ({ form }: Props) => {
    const { control } = form

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <CustomTextField control={control} name='fullname' label='Nama Agen' inputFormat='NORMAL' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField control={control} name='phone' label='No. Telpon' inputFormat='PHONE' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField control={control} name='email' label='Email' inputFormat='EMAIL' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <StaticAutoComplete
                        control={control}
                        name='status'
                        label='Status User'
                        options={Status}
                        disableClearable
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default FormDataModal
