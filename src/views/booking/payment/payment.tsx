'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Divider,
} from '@mui/material'
import { useTransaction } from '@/utils/mutations/use-transaction.mutation'
import { toast } from 'react-toastify'

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState('mandiri')

    const { mutateAsync: add_user } = useTransaction()

    const router = useRouter()

    const searchParams = useSearchParams()
    const type = searchParams.get('type')

    const handlePayment = async () => {
        if (['mandiri', 'bca', 'bni'].includes(selectedPayment)) {
            const res = await add_user({ payment_channel_id: 4, transportation_id: 1, trip_id: 4, type: type })
            router.push(
                `/booking/payment/${selectedPayment}?invoice_id=${res.data.data.invoice_id}&payment_code=${res.data.data.payment.payment_code}`
            )
        } else {
            toast.warning('Metode pembayaran belum didukung atau halaman belum tersedia.')
        }
    }

    const paymentMethods = {
        virtualAccount: [
            {
                id: 'mandiri',
                name: 'Bank Mandiri',
                image: '/images/payment/mandiri.png',
            },
            {
                id: 'bca',
                name: 'Bank BCA',
                image: '/images/payment/bca.png',
            },
            {
                id: 'bni',
                name: 'Bank BNI',
                image: '/images/payment/bni.png',
            },
        ],
        creditCard: [
            {
                id: 'kredit',
                name: 'Kartu Kredit',
                image: '/images/payment/kredit.png',
            },
        ],
        qris: [
            {
                id: 'qris',
                name: '(Gopay, OVO, Dana)',
                image: '/images/payment/qris.png',
            },
        ],
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const PaymentMethodSection = ({ title, methods }: { title: string; methods: any[] }) => (
        <Box sx={{ mb: 3 }}>
            <Typography variant='h6' sx={{ mb: 2, color: '#1e293b', fontWeight: 'bold' }}>
                {title}
            </Typography>
            <FormControl component='fieldset' sx={{ width: '100%' }}>
                <RadioGroup value={selectedPayment} onChange={e => setSelectedPayment(e.target.value)}>
                    {methods.map(method => (
                        <Paper
                            key={method.id}
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                border: selectedPayment === method.id ? '2px solid #F9833A' : '1px solid #e2e8f0',
                                backgroundColor: selectedPayment === method.id ? '#fff7ed' : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    borderColor: '#F9833A',
                                    backgroundColor: '#fff7ed',
                                },
                            }}
                        >
                            <FormControlLabel
                                value={method.id}
                                control={
                                    <Radio
                                        sx={{
                                            color: '#e2e8f0',
                                            '&.Mui-checked': {
                                                color: '#F9833A',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <Box
                                            component='img'
                                            src={method.image}
                                            alt={method.name}
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                mr: 2,
                                                objectFit: 'contain',
                                            }}
                                        />
                                        <Typography variant='body1' sx={{ color: '#1e293b', fontWeight: 'medium' }}>
                                            {method.name}
                                        </Typography>
                                    </Box>
                                }
                                sx={{
                                    margin: 0,
                                    width: '100%',
                                    '& .MuiFormControlLabel-label': {
                                        width: '100%',
                                    },
                                }}
                            />
                        </Paper>
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    )

    return (
        <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Container maxWidth='lg' sx={{ pt: 15, pb: 4 }}>
                <Typography variant='h4' sx={{ mb: 4, color: '#1e293b', fontWeight: 'bold' }}>
                    Pembayaran
                </Typography>

                <Grid container spacing={4}>
                    {/* Payment Methods */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: 'white' }}>
                            <Typography variant='h5' sx={{ mb: 3, color: '#1e293b', fontWeight: 'bold' }}>
                                Metode Pembayaran
                            </Typography>

                            <PaymentMethodSection
                                title='Transfer Virtual Account'
                                methods={paymentMethods.virtualAccount}
                            />

                            <PaymentMethodSection title='Kartu Kredit' methods={paymentMethods.creditCard} />

                            <PaymentMethodSection title='QRIS' methods={paymentMethods.qris} />
                        </Paper>
                    </Grid>

                    {/* Payment Summary */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: 'white', position: 'sticky', top: 100 }}>
                            <Typography variant='h5' sx={{ mb: 3, color: '#1e293b', fontWeight: 'bold' }}>
                                Rincian Pembayaran
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='body1' sx={{ color: '#64748b' }}>
                                        Subtotal
                                    </Typography>
                                    <Typography variant='body1' sx={{ color: '#1e293b', fontWeight: 'medium' }}>
                                        {formatPrice(800000)}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant='h6' sx={{ color: '#1e293b', fontWeight: 'bold' }}>
                                        Total Pembayaran
                                    </Typography>
                                    <Typography variant='h6' sx={{ color: '#1e293b', fontWeight: 'bold' }}>
                                        {formatPrice(800000)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    sx={{
                                        borderRadius: 2,
                                        py: 1.5,
                                        borderColor: '#F9833A',
                                        color: '#F9833A',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            borderColor: '#d97706',
                                            backgroundColor: '#fff7ed',
                                        },
                                    }}
                                >
                                    Kembali
                                </Button>

                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={handlePayment}
                                    sx={{
                                        borderRadius: 2,
                                        py: 1.5,
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
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default PaymentPage
