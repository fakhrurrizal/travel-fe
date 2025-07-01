import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Schema Zod untuk validasi Login
const loginSchema = z.object({
    email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginComponent: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            console.log('Login data:', data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            alert('Login berhasil!')
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <div className='min-h-screen flex'>
            {/* Background Image */}
            <div
                className='hidden lg:block lg:w-1/2 bg-cover bg-center'
                style={{
                    backgroundImage: `url('/images/register.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Form Section */}
            <div
                className='w-full lg:w-1/2 flex items-center justify-center p-8'
                style={{ backgroundColor: '#B6E8FF' }}
            >
                <Card
                    className='w-full max-w-sm shadow-none border-0'
                    sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                >
                    <CardContent className='p-0'>
                        {/* Logo */}
                        <Box className='flex justify-center items-center mb-3'>
                            <Image src='/Logo.png' alt='Logo' width={100} height={100} />
                        </Box>

                        {/* Title */}
                        <Typography
                            variant='h3'
                            className='text-center font-bold mb-8'
                            style={{ color: '#2E5266', fontSize: '2.5rem', fontWeight: '700' }}
                        >
                            Login
                        </Typography>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                            {/* Email */}
                            <Box>
                                <Typography
                                    variant='body2'
                                    className='mb-2 font-medium'
                                    style={{ color: '#2E5266', fontSize: '14px' }}
                                >
                                    Email
                                </Typography>
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type='email'
                                            placeholder='email@mail.com'
                                            variant='outlined'
                                            error={!!errors.email}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <FormHelperText error sx={{ fontSize: '12px' }}>
                                        {errors.email.message}
                                    </FormHelperText>
                                )}
                            </Box>

                            {/* Password */}
                            <Box>
                                <Typography
                                    variant='body2'
                                    className='mb-2 font-medium'
                                    style={{ color: '#2E5266', fontSize: '14px' }}
                                >
                                    Password
                                </Typography>
                                <Controller
                                    name='password'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='••••••••'
                                            variant='outlined'
                                            error={!!errors.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge='end'
                                                            size='small'
                                                        >
                                                            <Icon
                                                                icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                                                                style={{ fontSize: '20px' }}
                                                            />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormHelperText error sx={{ fontSize: '12px' }}>
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </Box>

                            {/* Button */}
                            <Box className='pt-4'>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    disabled={isSubmitting}
                                    sx={{
                                        backgroundColor: '#FF914D',
                                        '&:hover': {
                                            backgroundColor: '#ED7B34',
                                        },
                                        borderRadius: '8px',
                                        height: '48px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        color: '#0159A3',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <Box className='flex items-center gap-2'>
                                            <Icon icon='mdi:loading' className='animate-spin' />
                                            Memproses...
                                        </Box>
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </Box>
                        </form>

                        {/* Social Login Separator */}
                        <Box className='my-6'>
                            <Box className='flex items-center justify-center mb-4'>
                                <Box className='flex-grow h-px bg-black/50' />
                                <Typography
                                    variant='body2'
                                    sx={{
                                        mx: 2,
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#2E5266',
                                    }}
                                >
                                    log in lebih cepat dengan
                                </Typography>
                                <Box className='flex-grow h-px bg-black/50' />
                            </Box>

                            {/* Social Buttons */}
                            <Box className='flex justify-center gap-4'>
                                {/* Apple */}
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        border: '1px solid #CFCFCF',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Icon icon='mdi:apple' fontSize={24} />
                                </Box>

                                {/* Google */}
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        border: '1px solid #CFCFCF',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Icon icon='logos:google-icon' fontSize={24} />
                                </Box>

                                {/* Facebook */}
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        border: '1px solid #CFCFCF',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Icon icon='logos:facebook' fontSize={24} />
                                </Box>
                            </Box>
                        </Box>

                        {/* Link ke Register */}
                        <Box className='text-center mt-6'>
                            <Typography variant='body2' style={{ color: '#2E5266', fontSize: '14px' }}>
                                Belum punya akun?{' '}
                                <Typography
                                    component='span'
                                    onClick={() => router.push('/auth/register')}
                                    sx={{
                                        color: '#1976D2',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Daftar sekarang
                                </Typography>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default LoginComponent
