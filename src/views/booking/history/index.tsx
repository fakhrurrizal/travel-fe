import React, { useState, useRef } from 'react'
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Rating,
} from '@mui/material'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Navbar from '../../homepage/navbar'

const BookingHistoryPage = () => {
    const bookingData = [
        {
            id: 1,
            transportType: 'kapal',
            date: '27 Mei 2025',
            time: '01 : 16 AM',
            from: 'Merak-Cilegon',
            to: 'Bakauheni-Lampung',
            method: 'Metode Pembayaran',
            paymentType: 'QRIS',
            price: 'Rp 23.000',
            status: 'SELESAI',
            rating: 'Beri Rating',
        },
        {
            id: 2,
            transportType: 'kapal',
            date: '6 Juli 2025',
            time: '09 : 27 AM',
            from: 'Bakauheni-Lampung',
            to: 'Merak-Cilegon',
            method: 'Metode Pembayaran',
            paymentType: 'Transfer Bank',
            price: 'Rp 27.000',
            status: 'SELESAI',
            rating: 'Beri Rating',
        },
        {
            id: 3,
            transportType: 'pesawat',
            date: '20 Juli 2025',
            time: '03 : 00 AM',
            from: 'Surabaya (SUB)',
            to: 'Jakarta (CGK)',
            method: 'Metode Pembayaran',
            paymentType: 'Kartu Kredit',
            price: 'Rp 806.000',
            status: 'SELESAI',
            rating: 'Beri Rating',
        },
        {
            id: 4,
            transportType: 'pesawat',
            date: '20 Juli 2025',
            time: '03 : 00 AM',
            from: 'Jakarta (CGK)',
            to: 'Denpasar - Bali (DPS)',
            method: 'Metode Pembayaran',
            paymentType: 'QRIS',
            price: 'Rp 897.500',
            status: 'SELESAI',
            rating: 'Beri Rating',
        },
        {
            id: 5,
            transportType: 'kereta',
            date: '20 Juli 2025',
            time: '03 : 00 AM',
            from: 'Pasar Senen-Jakarta (PSU)',
            to: 'Sugeng-Surabaya (SGU)',
            method: 'Metode Pembayaran',
            paymentType: 'Transfer Bank',
            price: 'Rp 104.000',
            status: 'SELESAI',
            rating: 'Beri Rating',
        },
        {
            id: 6,
            transportType: 'bus',
            date: '20 Juli 2025',
            time: '03 : 00 AM',
            from: 'Jakarta',
            to: 'Yogyakarta',
            method: 'Metode Pembayaran',
            paymentType: 'Kartu Kredit',
            price: 'Rp 195.000',
            status: 'SELESAI',
            rating: 'Beri Rating',
        },
    ]

    const [openRatingModal, setOpenRatingModal] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState<any>(null)
    const photoInputRef = useRef<HTMLInputElement>(null)
    const videoInputRef = useRef<HTMLInputElement>(null)

    const handleOpenRatingModal = (booking: any) => {
        setSelectedBooking(booking)
        setOpenRatingModal(true)
    }

    const handleCloseRatingModal = () => {
        setOpenRatingModal(false)
        setSelectedBooking(null)
    }

    const handleAddPhoto = () => {
        photoInputRef.current?.click()
    }

    const handleAddVideo = () => {
        videoInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            console.log('Selected file:', file)
        }
    }

    const getTransportIcon = (type: string) => {
        switch (type) {
            case 'kapal':
                return <Icon icon='mdi:ferry' width={60} height={60} color='#F9833A' />
            case 'pesawat':
                return (
                    <Image
                        src='/images/garuda.png'
                        alt='Pesawat'
                        width={60}
                        height={60}
                        style={{ objectFit: 'contain' }}
                    />
                )
            case 'kereta':
                return (
                    <Image src='/images/kai.png' alt='Kereta' width={60} height={60} style={{ objectFit: 'contain' }} />
                )
            case 'bus':
                return (
                    <Image
                        src='/images/shuttle-bus.png'
                        alt='Bus'
                        width={60}
                        height={60}
                        style={{ objectFit: 'contain' }}
                    />
                )
            default:
                return <Icon icon='mdi:help-circle-outline' width={20} height={20} />
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Navbar showAuthButtons={false} isLoggedIn={true} />
            <Container maxWidth='lg' sx={{ py: 4 }}>
                <Typography
                    variant='h4'
                    sx={{ color: '#1e293b', fontWeight: 'bold', mb: 4, mt: 10, fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                    Riwayat Pesanan
                </Typography>

                <Grid container spacing={3}>
                    {bookingData.map(booking => (
                        <Grid item xs={12} key={booking.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: '1px solid #e2e8f0',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <Box sx={{ backgroundColor: '#E9F7FF', p: 3 }}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant='body1' sx={{ color: '#005484', fontWeight: 600 }}>
                                                {booking.date}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant='body1' sx={{ color: '#005484' }}>
                                                {booking.time}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Typography variant='body2' sx={{ color: '#005484', fontWeight: 600 }}>
                                                {booking.status}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ textAlign: 'right' }}>
                                            <Button
                                                variant='contained'
                                                sx={{
                                                    backgroundColor: '#F9833A',
                                                    color: 'white',
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    '&:hover': { backgroundColor: '#d97706' },
                                                }}
                                                onClick={() => handleOpenRatingModal(booking)}
                                            >
                                                {booking.rating}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Grid container spacing={3} alignItems='center'>
                                        <Grid item xs={12} md={4}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Icon icon='mdi:circle' width={12} height={12} color='#F9833A' />
                                                <Typography variant='body1' sx={{ color: '#1e293b', fontWeight: 500 }}>
                                                    {booking.from}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                                <Icon icon='mdi:map-marker' width={12} height={12} color='#F9833A' />
                                                <Typography variant='body1' sx={{ color: '#1e293b', fontWeight: 500 }}>
                                                    {booking.to}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant='body2' sx={{ color: '#64748b', mb: 1 }}>
                                                {booking.method}
                                            </Typography>
                                            <Typography variant='body1' sx={{ color: '#1e293b', fontWeight: 500 }}>
                                                {booking.paymentType}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant='h6'
                                                    sx={{ color: '#F9833A', fontWeight: 'bold', fontSize: '1.1rem' }}
                                                >
                                                    {booking.price}
                                                </Typography>
                                                {getTransportIcon(booking.transportType)}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Dialog open={openRatingModal} onClose={handleCloseRatingModal} fullWidth maxWidth='sm'>
                <DialogTitle sx={{ fontWeight: 'bold', color: '#005484' }}>Beri Rating</DialogTitle>

                <DialogContent dividers>
                    {selectedBooking && (
                        <Typography sx={{ fontSize: '0.9rem', color: '#64748b', mb: 2 }}>
                            {selectedBooking.from} → {selectedBooking.to} ({selectedBooking.date})
                        </Typography>
                    )}
                    <Typography sx={{ fontWeight: 'bold', mb: 1, color: '#005484' }}>Kualitas Pelayanan</Typography>
                    <Rating name='rating' defaultValue={0} precision={1} />
                    <Box mt={3}>
                        <Typography sx={{ fontWeight: 'bold', color: '#005484' }}>Kemudahan Pemesanan</Typography>
                        <TextField placeholder='sangat mudah' fullWidth variant='outlined' margin='dense' />
                        <Typography sx={{ fontWeight: 'bold', color: '#005484' }}>Kenyamanan</Typography>
                        <TextField
                            placeholder='perjalanan cukup lancar dan nyaman'
                            fullWidth
                            variant='outlined'
                            margin='dense'
                        />
                        <Typography sx={{ fontWeight: 'bold', color: '#005484' }}>Informasi Rute dan Jadwal</Typography>
                        <TextField
                            placeholder='jadwal sesuai dengan informasi'
                            fullWidth
                            variant='outlined'
                            margin='dense'
                        />
                        <Typography sx={{ fontWeight: 'bold', color: '#005484' }}>
                            Yuk, kasih tahu kami pendapat kamu!
                        </Typography>
                        <TextField
                            multiline
                            rows={4}
                            placeholder='maksimum 200 kata'
                            fullWidth
                            variant='outlined'
                            margin='dense'
                        />
                    </Box>
                    <Box mt={2} sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant='outlined'
                            startIcon={<Icon icon='mdi:camera' />}
                            onClick={handleAddPhoto}
                            sx={{ borderColor: '#F9833A', color: '#F9833A' }}
                        >
                            Tambah Foto
                        </Button>
                        <Button
                            variant='outlined'
                            startIcon={<Icon icon='mdi:video' />}
                            onClick={handleAddVideo}
                            sx={{ borderColor: '#F9833A', color: '#F9833A' }}
                        >
                            Tambah Video
                        </Button>
                        <input
                            type='file'
                            accept='image/*'
                            style={{ display: 'none' }}
                            ref={photoInputRef}
                            onChange={handleFileChange}
                        />
                        <input
                            type='file'
                            accept='video/*'
                            style={{ display: 'none' }}
                            ref={videoInputRef}
                            onChange={handleFileChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={handleCloseRatingModal}
                        variant='outlined'
                        sx={{ borderColor: '#F9833A', color: '#F9833A', borderRadius: 2, textTransform: 'none', px: 4 }}
                    >
                        NANTI SAJA
                    </Button>
                    <Button
                        onClick={handleCloseRatingModal}
                        variant='contained'
                        sx={{
                            backgroundColor: '#F9833A',
                            color: 'white',
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 4,
                            '&:hover': { backgroundColor: '#d97706' },
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default BookingHistoryPage
