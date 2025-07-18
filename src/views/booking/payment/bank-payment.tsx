'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'
import { Icon } from '@iconify/react'
import Navbar from '../../homepage/navbar'

const PaymentDetailVA = () => {
    const router = useRouter()
    const { id } = router.query
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 48,
        seconds: 28,
    })

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 }
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
                }

                return prev
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const bankData = {
        mandiri: {
            name: 'Bank Mandiri',
            logo: '/images/payment/mandiri.png',
            vaNumber: '883412097612568',
            atmSteps: [
                'Masukkan kartu ATM dan PIN Anda',
                'Pilih "Bayar/Beli"',
                'Pilih "Multi Payment"',
                'Masukkan kode perusahaan (70014)',
                'Masukkan nomor Virtual Account (883412097612568)',
                'Konfirmasi pembayaran dan ikuti instruksi selanjutnya',
            ],
            mobileSteps: [
                'Buka aplikasi Mandiri Online',
                'Login dengan User ID dan PIN',
                'Pilih "Bayar"',
                'Pilih "Multi Payment"',
                'Pilih "Virtual Account"',
                'Masukkan nomor Virtual Account (883412097612568)',
                'Konfirmasi pembayaran',
            ],
        },
        bca: {
            name: 'Bank BCA',
            logo: '/images/payment/bca.png',
            vaNumber: '883412097612568',
            atmSteps: [
                'Masukkan kartu ATM dan PIN Anda',
                'Pilih "Transaksi Lainnya"',
                'Pilih "Transfer"',
                'Pilih "Ke Rek Tabungan"',
                'Masukkan nomor Virtual Account (883412097612568)',
                'Konfirmasi pembayaran dan ikuti instruksi selanjutnya',
            ],
            mobileSteps: [
                'Buka aplikasi BCA Mobile',
                'Login dengan User ID dan PIN',
                'Pilih "m-Transfer"',
                'Pilih "BCA Virtual Account"',
                'Masukkan nomor Virtual Account (883412097612568)',
                'Konfirmasi pembayaran',
            ],
        },
        bni: {
            name: 'Bank BNI',
            logo: '/images/payment/bni.png',
            vaNumber: '883412097612568',
            atmSteps: [
                'Masukkan kartu ATM dan PIN Anda',
                'Pilih "Menu Lainnya"',
                'Pilih "Transfer"',
                'Pilih "Rekening Tabungan"',
                'Masukkan nomor Virtual Account (883412097612568)',
                'Konfirmasi pembayaran dan ikuti instruksi selanjutnya',
            ],
            mobileSteps: [
                'Buka aplikasi BNI Mobile Banking',
                'Login dengan User ID dan PIN',
                'Pilih "Transfer"',
                'Pilih "Virtual Account Billing"',
                'Masukkan nomor Virtual Account (883412097612568)',
                'Konfirmasi pembayaran',
            ],
        },
    }

    const currentBank = bankData[id as keyof typeof bankData] || bankData.mandiri

    // const formatPrice = (price: number) => {
    //     return new Intl.NumberFormat('id-ID', {
    //         style: 'currency',
    //         currency: 'IDR',
    //         minimumFractionDigits: 0,
    //     }).format(price)
    // }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        // You can add a toast notification here
    }

    return (
        <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar showAuthButtons={false} isLoggedIn={true} />

            <Container maxWidth='lg' sx={{ pt: 15, pb: 4 }}>
                <Grid container spacing={4}>
                    {/* Payment Instructions */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: 'white', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Typography variant='h5' sx={{ color: '#1e293b', fontWeight: 'bold' }}>
                                    Pembayaran Via Bank
                                </Typography>
                                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        component='img'
                                        src={currentBank.logo}
                                        alt={currentBank.name}
                                        sx={{ width: 60, height: 40, objectFit: 'contain' }}
                                    />
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Typography variant='body1' sx={{ mb: 2, color: '#64748b', textAlign: 'center' }}>
                                Transfer pembayaran ke No. Virtual Account
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        color: '#1e293b',
                                        fontWeight: 'bold',
                                        fontFamily: 'monospace',
                                        mr: 2,
                                    }}
                                >
                                    {currentBank.vaNumber}
                                </Typography>
                                <Button
                                    variant='contained'
                                    size='small'
                                    onClick={() => copyToClipboard(currentBank.vaNumber)}
                                    sx={{
                                        backgroundColor: '#F9833A',
                                        borderRadius: 2,
                                        fontSize: '0.75rem',
                                        '&:hover': {
                                            backgroundColor: '#d97706',
                                        },
                                    }}
                                >
                                    Salin
                                </Button>
                            </Box>

                            <Typography
                                variant='body2'
                                sx={{
                                    color: '#3b82f6',
                                    textAlign: 'center',
                                    mb: 4,
                                }}
                            >
                                Atas Nama: XENDIT TRIPFY
                            </Typography>
                        </Paper>

                        {/* Payment Deadline */}
                        <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: 'white', mb: 3 }}>
                            <Typography variant='body1' sx={{ mb: 2, color: '#64748b', textAlign: 'center' }}>
                                Segera lakukan pembayaran Anda sebelum
                            </Typography>

                            <Typography
                                variant='h6'
                                sx={{
                                    color: '#3b82f6',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    mb: 2,
                                }}
                            >
                                Senin, 23 Juni 2025 pukul 15.50 WIB
                            </Typography>

                            <Typography variant='body2' sx={{ color: '#64748b', textAlign: 'center', mb: 3 }}>
                                Sisa Waktu
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 2,
                                    mb: 3,
                                }}
                            >
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant='h3'
                                        sx={{
                                            color: '#3b82f6',
                                            fontWeight: 'bold',
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        {timeLeft.hours.toString().padStart(2, '0')}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: '#64748b' }}>
                                        Jam
                                    </Typography>
                                </Box>
                                <Typography variant='h3' sx={{ color: '#3b82f6' }}>
                                    :
                                </Typography>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant='h3'
                                        sx={{
                                            color: '#3b82f6',
                                            fontWeight: 'bold',
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        {timeLeft.minutes.toString().padStart(2, '0')}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: '#64748b' }}>
                                        Menit
                                    </Typography>
                                </Box>
                                <Typography variant='h3' sx={{ color: '#3b82f6' }}>
                                    :
                                </Typography>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant='h3'
                                        sx={{
                                            color: '#3b82f6',
                                            fontWeight: 'bold',
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        {timeLeft.seconds.toString().padStart(2, '0')}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: '#64748b' }}>
                                        Detik
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Payment Summary */}
                        <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: 'white', mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant='body1' sx={{ color: '#64748b' }}>
                                    Jumlah Tagihan
                                </Typography>
                                <Typography variant='body1' sx={{ color: '#1e293b', fontWeight: 'medium' }}>
                                    Rp 850.000
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant='body1' sx={{ color: '#64748b' }}>
                                    Biaya Tambahan
                                </Typography>
                                <Typography variant='body1' sx={{ color: '#1e293b', fontWeight: 'medium' }}>
                                    Rp 6.500
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6' sx={{ color: '#1e293b', fontWeight: 'bold' }}>
                                    Total Tagihan
                                </Typography>
                                <Typography variant='h6' sx={{ color: '#1e293b', fontWeight: 'bold' }}>
                                    Rp 856.500
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Button
                                variant='outlined'
                                onClick={() => router.back()}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.5,
                                    px: 4,
                                    borderColor: '#F9833A',
                                    color: '#F9833A',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        borderColor: '#d97706',
                                        backgroundColor: '#fff7ed',
                                    },
                                }}
                            >
                                Ubah Metode
                            </Button>

                            <Button
                                variant='contained'
                                sx={{
                                    borderRadius: 2,
                                    py: 1.5,
                                    px: 4,
                                    backgroundColor: '#F9833A',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#d97706',
                                    },
                                }}
                            >
                                Bayar
                            </Button>
                        </Box>
                    </Grid>

                    {/* Payment Instructions Right Side */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: 'white', position: 'sticky', top: 100 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Typography variant='h6' sx={{ color: '#1e293b', fontWeight: 'bold' }}>
                                    Transfer Bank (Virtual Account)
                                </Typography>
                                <Box sx={{ ml: 'auto' }}>
                                    <Box
                                        component='img'
                                        src={currentBank.logo}
                                        alt={currentBank.name}
                                        sx={{ width: 50, height: 32, objectFit: 'contain' }}
                                    />
                                </Box>
                            </Box>

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>ATM {currentBank.name}</InputLabel>
                                <Select
                                    defaultValue='atm'
                                    label={`ATM ${currentBank.name}`}
                                    sx={{
                                        borderRadius: 2,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#e2e8f0',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#F9833A',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#F9833A',
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value='atm'>ATM {currentBank.name}</MenuItem>
                                    <MenuItem value='mobile'>Mobile Banking</MenuItem>
                                </Select>
                            </FormControl>

                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<Icon icon='mdi:chevron-down' />}
                                    sx={{
                                        backgroundColor: '#f8fafc',
                                        borderRadius: 2,
                                        mb: 1,
                                        '&.Mui-expanded': {
                                            minHeight: 48,
                                        },
                                    }}
                                >
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                        Mobile - {currentBank.name}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ pl: 2 }}>
                                        {currentBank.mobileSteps.map((step, index) => (
                                            <Typography
                                                key={index}
                                                component='div'
                                                variant='body2'
                                                sx={{
                                                    color: '#64748b',
                                                    mb: 1,
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        minWidth: 20,
                                                        mr: 1,
                                                        color: '#F9833A',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {index + 1}.
                                                </Box>
                                                {step}
                                            </Typography>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default PaymentDetailVA
