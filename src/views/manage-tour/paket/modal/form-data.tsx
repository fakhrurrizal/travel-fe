import { useAuth } from '@/services'
import { getApi } from '@/utils'
import axios from 'axios'

import { MUITextField, ServerSideAutoComplete } from '@/components'
import IconifyIcon from '@/components/icon'
import CustomTextField from '@/components/text-field/custom-text-field'
import getEncodedKey from '@/utils/helpers/getEncodedKey'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Button, CircularProgress, Grid, IconButton, InputAdornment, Tooltip } from '@mui/material'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TripForm } from '../schema/trip.schemas'
import ShowImage from './show-image'

interface Props {
    form: UseFormReturn<TripForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataTrip = ({ form, readOnly = false }: Props) => {
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

                const response = await axios.post(getApi('file') + '', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${accessToken}`,
                        'X-API-KEY': encodedKey,
                    },
                })
                setValue('image', [response.data.data.full_url])
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
                    <CustomTextField control={control} name='name' label='Nama Trip' placeholder='Masukkan nama trip' />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        control={control}
                        name='base_price'
                        label='Harga Dasar'
                        placeholder='Masukkan harga trip'
                        inputFormat='PRICE'
                        size='medium'
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField control={control} name='location' label='Lokasi' placeholder='Masukkan lokasi' />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        control={control}
                        name='description'
                        label='Deskripsi'
                        placeholder='Masukkan deskripsi'
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ServerSideAutoComplete<TripForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='destination_type'
                        name='destination_type_id'
                        label='Kategori'
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
                <Grid item xs={12}>
                    <ServerSideAutoComplete<TripForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='category'
                        name='trip_category_id'
                        label='Status'
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
                    <MUITextField
                        label='Gambar'
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
                                    {watch('image')?.[0] ? (
                                        <>
                                            {!readOnly && (
                                                <Tooltip title='Hapus Gambar'>
                                                    <InputAdornment position='end'>
                                                        <IconButton onClick={() => setValue('image', null)}>
                                                            <IconifyIcon icon='mdi:close-circle' color='error' />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </Tooltip>
                                            )}
                                            <Tooltip title='Lihat Gambar'>
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={toggleImage}>
                                                        <IconifyIcon icon='quill:eye' color='info' />
                                                    </IconButton>
                                                </InputAdornment>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <Button
                                            sx={{ width: '140px!important' }}
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
                        value={watch('image')?.[0] ? watch('image')?.[0]?.split('/').pop() : ''}
                    />
                </Grid>
                {openImage && <ShowImage open={openImage} toggle={toggleImage} image={watch('image')?.[0] || ''} />}
            </Grid>
        </>
    )
}

export default FormDataTrip
