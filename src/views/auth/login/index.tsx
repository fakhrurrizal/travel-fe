import CustomTextField from '@/components/text-field/custom-text-field'
import { axiosInterceptor } from '@/config'
import { useLoginMutation } from '@/modules/auth/login'
import { useAuth } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Schema Zod untuk validasi Login
const loginSchema = z.object({
    email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginComponent: React.FC = () => {
    const router = useRouter()

    const { mutateAsync: login, isPending: isLoadingLogin } = useLoginMutation()

    const setAuth = useAuth(state => state.setAuth)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await login(data)
            const user = res?.data?.user
            const accessToken = 'Bearer ' + res?.data?.access_token
            setAuth({ accessToken, user })
            axiosInterceptor.defaults.headers.common['Authorization'] = accessToken
            axios.defaults.headers.common['Authorization'] = accessToken
            console.log('user,', user)
            router.push('/dashboard')
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
                className='w-full lg:w-1/2 flex items-center justify-center p-8 relative'
                style={{ backgroundColor: '#B6E8FF' }}
            >
                {/* Decorative Image - Top Right */}
                <div className='absolute top-0 right-0'>
                    <Image
                        src='/decorative-lines-top.png'
                        alt='Decorative Lines Top'
                        width={400}
                        height={400}
                        className='opacity-60'
                    />
                </div>

                {/* Decorative Image - Bottom Left */}
                <div className='absolute bottom-0 left-0'>
                    <Image
                        src='/decorative-lines-bottom.png'
                        alt='Decorative Lines Bottom'
                        width={400}
                        height={400}
                        className='opacity-60'
                    />
                </div>

                <Card
                    className='w-full max-w-sm shadow-none border-0 relative z-10'
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

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        control={control}
                                        size='medium'
                                        error={!!errors.email}
                                        name='email'
                                        label='Email*'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        control={control}
                                        inputFormat='PASSWORD'
                                        size='medium'
                                        error={!!errors.password}
                                        placeholder='••••••••'
                                        name='password'
                                        label='Password*'
                                    />
                                </Grid>
                            </Grid>

                            {/* Button */}
                            <Box className='pt-4'>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    disabled={isLoadingLogin}
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
                                        color: 'white',
                                    }}
                                >
                                    {isLoadingLogin ? (
                                        <Box className='flex items-center gap-2'>
                                            <Icon icon='mdi:loading' className='animate-spin' />
                                            Memproses...
                                        </Box>
                                    ) : (
                                        'Masuk'
                                    )}
                                </Button>
                            </Box>
                        </form>

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
