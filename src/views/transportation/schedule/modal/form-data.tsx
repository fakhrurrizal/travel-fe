import { CustomTooltip, MUITextField, ServerSideAutoComplete } from '@/components'
import CustomTextField from '@/components/text-field/custom-text-field'
import { Button, CircularProgress, Grid, InputAdornment } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { UseFormReturn } from 'react-hook-form'
import { TransportationScheduleForm } from '../schema/form.schemas'
import { useAuth } from '@/services'
import getEncodedKey from '@/utils/helpers/getEncodedKey'
import axios from 'axios'
import { getApi } from '@/utils'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import IconifyIcon from '@/components/icon'
import ShowImage from '@/components/modal/show-image'

interface Props {
    form: UseFormReturn<TransportationScheduleForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataModal = ({ form }: Props) => {
    const { control, watch, setValue } = form

    const [openImage, setOpenImage] = useState(false)
    const [loadingImage, setLoadingImage] = useState<boolean>(false)

    const toggleImage = () => setOpenImage(!openImage)

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

                const response = await axios.post(getApi('file'), form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${accessToken}`,
                        'X-API-KEY': encodedKey
                    },
                })
                setValue('image', response.data.data.full_url)
                setLoadingImage(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <ServerSideAutoComplete<
                        TransportationScheduleForm,
                        { id: number; label: string; transportation_type_name: string; transportation_type_id: string },
                        any
                    >
                        control={control}
                        endpoint='transportation_class'
                        name='transportation_class_id'
                        getOptionLabel={(option: any) => `${option?.transportation_type_name} (${option?.label})`}
                        label='Kelas Transportasi'
                        formatOptions={response => {
                            const options = response.data

                            if (!options) return []

                            return options.map((option: any) => ({
                                id: option.id,
                                label: option.name,
                                transportation_type_name: option.transportation_type.name,
                                transportation_type_id: option.transportation_type.id,
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <MUITextField
                        label='Gambar kendaraan'
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
                                    {watch('image') ? (
                                        <>
                                            <CustomTooltip title='Hapus Gambar'>
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('image', null)}>
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
                        value={watch('image') ? watch('image')?.split('/').pop() : ''}
                    />
                </Grid>
                {openImage && <ShowImage open={openImage} toggle={toggleImage} image={watch('image') || ''} />}
                {watch('transportation_class_id')?.id > 0 && (
                    <>
                        <Grid item xs={12} md={12}>
                            <ServerSideAutoComplete<TransportationScheduleForm, { id: number; label: string }, any>
                                control={control}
                                endpoint='transportation_route'
                                name='transportation_route_id'
                                queryEndpoint={{
                                    transportation_type_id:
                                        form.watch('transportation_class_id')?.transportation_type_id,
                                }}
                                label='Rute'
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
                    </>
                )}

                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='vehicle_name'
                        label='Nama Kendaraan'
                        inputFormat='NORMAL'
                        placeholder='GA-410, GA-412, Argo Lawu, Senja Yogya, dll.'
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='total_seat'
                        textUppercase
                        label='Total Kursi'
                        inputFormat='NUMBER'
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField
                        control={control}
                        name='base_price'
                        textUppercase
                        label='Harga'
                        inputFormat='PRICE'
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <DatePicker
                        label="Berlaku dari"
                        value={watch('valid_from') ? dayjs(watch('valid_from')) : null}
                        format="DD MMMM YYYY"
                        onChange={newValue => {
                            if (newValue && dayjs(newValue).isValid()) {
                                const formatted = dayjs(newValue).format('YYYY-MM-DD')
                                setValue('valid_from', formatted)

                                if (
                                    watch('valid_until') &&
                                    dayjs(watch('valid_until')).isBefore(dayjs(formatted))
                                ) {
                                    setValue('valid_until', '')
                                }
                            } else {
                                setValue('valid_from', '')
                            }
                        }}
                        minDate={dayjs().add(1, 'day')}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: 'medium',
                                InputProps: { readOnly: true },
                                InputLabelProps: {
                                    sx: { fontSize: '12px' },
                                },
                            },
                        }}
                    />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        label="Berlaku hingga"
                        value={watch('valid_until') ? dayjs(watch('valid_until')) : null}
                        format="DD MMMM YYYY"
                        onChange={newValue => {
                            if (newValue && dayjs(newValue).isValid()) {
                                setValue('valid_until', dayjs(newValue).format('YYYY-MM-DD'))
                            } else {
                                setValue('valid_until', '')
                            }
                        }}
                        minDate={
                            watch('valid_from')
                                ? dayjs(watch('valid_from')).add(1, 'day')
                                : dayjs().add(2, 'day')
                        }
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: 'medium',
                                InputProps: { readOnly: true },
                                InputLabelProps: {
                                    sx: { fontSize: '12px' },
                                },
                            },
                        }}
                    />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <TimePicker
                        label="Jam Keberangkatan"
                        value={watch('departure_at') ? dayjs(watch('departure_at')) : null}
                        onChange={newValue => {
                            if (newValue && dayjs(newValue).isValid()) {
                                setValue('departure_at', newValue)
                            } else {
                                setValue('departure_at', null)
                            }
                        }}
                        ampm={false}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: 'medium',
                                InputProps: { readOnly: true },
                                InputLabelProps: {
                                    sx: { fontSize: '12px' },
                                },
                            },
                        }}
                    />

                </Grid>

                <Grid item xs={12} sm={6}>
                    <TimePicker
                        label="Jam Kedatangan"
                        value={watch('arrival_at') ? dayjs(watch('arrival_at')) : null}
                        onChange={newValue => {
                            if (newValue && dayjs(newValue).isValid()) {
                                setValue('arrival_at', newValue)
                            } else {
                                setValue('arrival_at', null)
                            }
                        }}
                        ampm={false}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: 'medium',
                                InputProps: { readOnly: true },
                                InputLabelProps: {
                                    sx: { fontSize: '12px' },
                                },
                            },
                        }}
                    />

                </Grid>
            </Grid>
        </>
    )
}

export default FormDataModal
