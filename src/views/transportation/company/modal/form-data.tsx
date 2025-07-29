import { CustomTooltip, MUITextField, ServerSideAutoComplete } from '@/components'
import CustomTextField from '@/components/text-field/custom-text-field'
import { Button, CircularProgress, Grid } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { TransportationCompanyForm } from '../schema/form.schemas'
import { useState } from 'react'
import { InputAdornment } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { IconButton } from '@mui/material'
import IconifyIcon from '@/components/icon'
import { useAuth } from '@/services'
import getEncodedKey from '@/utils/helpers/getEncodedKey'
import { axiosInterceptor } from '@/config'
import { getApi } from '@/utils'
import ShowImage from './show-image'

interface Props {
    form: UseFormReturn<TransportationCompanyForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataModal = ({ form }: Props) => {
    const [openImage, setOpenImage] = useState(false)
    const [loadingImage, setLoadingImage] = useState<boolean>(false)

    const toggleImage = () => setOpenImage(!openImage)

    const { control, setValue, watch } = form

    const { accessToken } = useAuth().value

    const handleButtonClick = () => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement | null
        if (fileInput) {
            fileInput.click()
        }
    }

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0]

        if (file) {
            const form = new FormData()
            form.append('file', file)
            setLoadingImage(true)
            try {
                const encodedKey = getEncodedKey()

                const response = await axiosInterceptor.post(getApi('file') + '', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${accessToken}`,
                        'X-API-KEY': encodedKey,
                    },
                })
                setValue('logo', response.data.data.full_url)
                setLoadingImage(false)
            } catch (error) {
                console.log(error)
                setLoadingImage(false)
            }
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ServerSideAutoComplete<TransportationCompanyForm, { id: number; label: string }, any>
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
                    <CustomTextField control={control} name='name' label='Nama Perusahaan' inputFormat='NORMAL' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='code'
                        textUppercase
                        label='Kode Perusahaan'
                        inputFormat='NORMAL'
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='description'
                        label='Keterangan Perusahaan'
                        inputFormat='NORMAL'
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <MUITextField
                        label='Logo'
                        variant='outlined'
                        fullWidth
                        size='medium'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <input
                                        id='file-input'
                                        type='file'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    {watch('logo') ? (
                                        <>
                                            <CustomTooltip title='Hapus Gambar'>
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('logo', null)}>
                                                        <IconifyIcon icon='mdi:close-circle' color='error' />
                                                    </IconButton>
                                                </InputAdornment>
                                            </CustomTooltip>
                                            <CustomTooltip title='Lihat Gambar'>
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={toggleImage}>
                                                        <IconifyIcon icon='quill:eye' color='info' />
                                                    </IconButton>
                                                </InputAdornment>
                                            </CustomTooltip>
                                        </>
                                    ) : (
                                        <Button
                                            sx={{ width: '120px' }}
                                            variant='contained'
                                            onClick={handleButtonClick}
                                            endIcon={!loadingImage && <UploadFileIcon />}
                                            disabled={loadingImage}
                                            fullWidth
                                        >
                                            {loadingImage ? <CircularProgress size={20} /> : 'Choose File'}
                                        </Button>
                                    )}
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                        value={watch('logo') ? watch('logo')?.split('/').pop() : ''}
                    />
                </Grid>
                {openImage && <ShowImage open={openImage} toggle={toggleImage} image={watch('logo') || ''} />}
            </Grid>
        </>
    )
}

export default FormDataModal
