import { getApi } from '@/utils'

import { ServerSideAutoComplete } from '@/components'
import { HeaderIcon } from '@/components/header-icon'
import IconifyIcon from '@/components/icon'
import CustomTextField from '@/components/text-field/custom-text-field'
import { axiosInterceptor } from '@/config'
import { ResponseUploadFileMultiple } from '@/utils/types/api-response'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Box, Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material'
import 'glider-js/glider.min.css'
import { DragEvent, useState } from 'react'
import Glider from 'react-glider'
import { UseFormReturn } from 'react-hook-form'
import { TripForm } from '../schema/trip.schemas'

interface Props {
    form: UseFormReturn<TripForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataTrip = ({ form }: Props) => {
    const [loadingImage, setLoadingImage] = useState<boolean>(false)

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const {
        control,
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = form

    const uploadImage = async (file: any) => {
        try {
            const formData = new FormData()
            await file.map((_: any, index: number) => {
                formData.append('files', file[index])
            })

            const apiUrl = getApi('file') + '/multi'

            formData.append('name', '')
            setLoadingImage(true)
            const response = await axiosInterceptor.post<ResponseUploadFileMultiple>(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/image',
                },
            })

            setLoadingImage(false)
            setValue('image', [...(watch('image') as any), ...response.data.data.map(res => res.full_url)])
            clearErrors('image')
        } catch (error) {
            setLoadingImage(false)
            console.log(error)
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        const droppedFiles = e.dataTransfer.files

        uploadImage(droppedFiles)
    }

    const theme = useTheme()

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {(watch('image')?.length ?? 0 > 0) ? (
                            <Grid container>
                                <Grid item md={12} xs={12}>
                                    <Box
                                        sx={({ palette, shape }) => ({
                                            border: `1px solid ${palette.primary.main}`,
                                            borderRadius: shape.borderRadius + 'px',
                                            height: '15rem',
                                            width: '100%',
                                            position: 'relative',
                                            paddingY: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        })}
                                    >
                                        <img
                                            src={watch('image')?.[selectedIndex] ?? ''}
                                            alt='Preview'
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                borderRadius: '5px',
                                            }}
                                        />

                                        <HeaderIcon
                                            sx={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                            }}
                                            color='error'
                                            onClick={() => {
                                                const images = watch('image')
                                                setValue(
                                                    'image',
                                                    images
                                                        ?.slice(0, selectedIndex)
                                                        .concat(images?.slice(selectedIndex + 1))
                                                )
                                                setSelectedIndex(selectedIndex == 0 ? 0 : selectedIndex - 1)
                                            }}
                                        >
                                            <DeleteOutlineOutlinedIcon />
                                        </HeaderIcon>
                                    </Box>
                                </Grid>

                                <Grid item md={12} xs={12}>
                                    <Glider
                                        className='glider-container'
                                        draggable
                                        hasArrows={(watch('image') ?? []).length > 4}
                                        hasDots={(watch('image') ?? []).length > 4}
                                        slidesToShow={5}
                                    >
                                        {watch('image')?.map((image: string, index: number) => {
                                            return (
                                                <>
                                                    {image && (
                                                        <Box
                                                            key={index}
                                                            component={'button'}
                                                            onClick={() => setSelectedIndex(index)}
                                                            sx={({ palette, shape }) => ({
                                                                width: '100%',
                                                                mt: 2,
                                                                mr: 2,
                                                                paddingY: 2,
                                                                border: `1px solid ${palette.primary.main}`,
                                                                borderRadius: shape.borderRadius + 'px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            })}
                                                        >
                                                            <img
                                                                src={image}
                                                                alt='Preview'
                                                                style={{
                                                                    maxWidth: '90%',
                                                                    maxHeight: '5rem',
                                                                    objectFit: 'initial',
                                                                    borderRadius: '5px',
                                                                }}
                                                            />
                                                        </Box>
                                                    )}
                                                </>
                                            )
                                        })}
                                        <Box
                                            // onClick={() => setSelectedIndex(index)}
                                            sx={({ palette, shape }) => ({
                                                width: '90%',
                                                mt: 2,
                                                mr: 2,
                                                paddingY: 2,
                                                border: `1px solid ${palette.primary.main}`,
                                                borderRadius: shape.borderRadius + 'px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            })}
                                        >
                                            <div onDragOver={handleDragOver} onDrop={handleDrop}>
                                                <Button
                                                    variant='outlined'
                                                    component='label'
                                                    sx={({ palette }) => ({
                                                        width: '100%',
                                                        height: '100%',
                                                        border: `1px dashed  ${errors?.image ? palette.primary.main : palette.primary.main
                                                            }`,
                                                        display: 'flex',
                                                        gap: 3,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    })}
                                                    disabled={loadingImage}
                                                >
                                                    {loadingImage ? (
                                                        <>
                                                            {' '}
                                                            <CircularProgress />{' '}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconifyIcon
                                                                color={theme.palette.primary.main}
                                                                icon='bx:image-add'
                                                                fontSize='3rem'
                                                            />
                                                        </>
                                                    )}
                                                    <input
                                                        type='file'
                                                        multiple
                                                        accept='.png, .jpg, .jpeg'
                                                        onChange={e =>
                                                            uploadImage(
                                                                Array.from(
                                                                    (e?.target as HTMLInputElement)?.files as any
                                                                )
                                                            )
                                                        }
                                                        style={{ display: 'none' }}
                                                    />
                                                </Button>
                                            </div>
                                        </Box>

                                        {/* */}
                                    </Glider>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <div onDragOver={handleDragOver} onDrop={handleDrop}>
                                    <Button
                                        variant='outlined'
                                        size='large'
                                        component='label'
                                        sx={({ palette }) => ({
                                            height: '10rem',
                                            width: '100%',
                                            fontSize: '12px',
                                            border: `1px dashed  ${errors?.image ? palette.primary.main : palette.primary.main
                                                }`,
                                            display: 'flex',
                                            gap: 3,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        })}
                                        disabled={loadingImage}
                                    >
                                        {loadingImage ? (
                                            <CircularProgress />
                                        ) : (
                                            <>
                                                <IconifyIcon
                                                    color={theme.palette.primary.main}
                                                    icon='bx:image-add'
                                                    fontSize='3rem'
                                                />
                                                <Typography color='primary' fontSize={16} fontWeight={700}>
                                                    Unggah Gambar
                                                    <Typography color={'inherit'} fontSize={12}>
                                                        {'atau seret foto dari penyimpanan'}
                                                    </Typography>
                                                </Typography>
                                            </>
                                        )}
                                        <input
                                            type='file'
                                            multiple
                                            accept='.png, .jpg, .jpeg'
                                            onChange={e =>
                                                uploadImage(Array.from((e?.target as HTMLInputElement)?.files as any))
                                            }
                                            style={{ display: 'none' }}
                                        />
                                    </Button>
                                </div>
                            </Grid>
                        )}
                    </Box>

                    {errors.image && (
                        <Typography sx={({ palette }) => ({ color: palette.error.main })} variant='caption'>
                            Minimal 1 gambar
                        </Typography>
                    )}
                </Grid>
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

                {/* <Grid item xs={12} md={12}>
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
                {openImage && <ShowImage open={openImage} toggle={toggleImage} image={watch('image')?.[0] || ''} />} */}
            </Grid>
        </>
    )
}

export default FormDataTrip
