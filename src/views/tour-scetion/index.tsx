// components/ToursSection.tsx
import React from 'react'
import { Container, Typography, Grid, Box, Button, Paper } from '@mui/material'
import { Icon } from '@iconify/react'
import TourCard from './tour-card'

const ToursSection: React.FC = () => {
    const tours = [
        {
            id: '1',
            title: 'Nusa Penida',
            image: '/images/nusa-penida.png',
            price: 850000,
            location: 'Bali',
            rating: 5,
            reviewCount: 350,
        },
        {
            id: '2',
            title: 'Bromo',
            image: '/images/bromo.png',
            price: 375000,
            location: 'Jawa Timur',
            rating: 5,
            reviewCount: 350,
        },
        {
            id: '3',
            title: 'Pulau Tegal Mas',
            image: '/images/pulau-tegal-mas.png',
            price: 1750000,
            location: 'Lampung',
            rating: 5,
            reviewCount: 350,
        },
    ]

    const busRoutes = [
        {
            id: '1',
            route: 'Semarang → Yogya',
            type: 'Shuttle',
            image: '/images/shuttle-bus.png',
            price: 78000,
            rating: 4.9,
            reviewCount: 5,
        },
        {
            id: '2',
            route: 'Jakarta → Bandung',
            type: 'Shuttle',
            image: '/images/shuttle-bus.png',
            price: 61000,
            rating: 4.9,
            reviewCount: 5,
        },
        {
            id: '3',
            route: 'Solo → Semarang',
            type: 'Shuttle',
            image: '/images/shuttle-bus.png',
            price: 78000,
            rating: 4.9,
            reviewCount: 5,
        },
    ]

    return (
        <Box sx={{ py: 4, backgroundColor: '#f8fafc' }}>
            <Container maxWidth='xl'>
                {/* Destinasi Minggu Ini Section */}
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography
                            variant='h4'
                            component='h2'
                            sx={{
                                fontWeight: 'bold',
                                color: '#1e293b',
                                fontSize: { xs: '1.5rem', md: '2rem' },
                            }}
                        >
                            Destinasi Minggu Ini
                        </Typography>
                        <Button
                            variant='text'
                            endIcon={<Icon icon='mdi:arrow-right' width={20} height={20} />}
                            sx={{
                                color: '#0ea5e9',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(14, 165, 233, 0.04)',
                                },
                            }}
                        >
                            Lihat semua
                        </Button>
                    </Box>

                    <Grid container spacing={2}>
                        {tours.map(tour => (
                            <Grid item xs={12} md={4} key={tour.id}>
                                <TourCard {...tour} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Hero Banner Section */}
                <Box sx={{ mb: 6 }}>
                    <Paper
                        sx={{
                            borderRadius: 4,
                            overflow: 'hidden',
                            height: 300,
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #7dd3fc 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            {/* Plane Image - Left Side */}
                            <Box
                                sx={{
                                    flex: 1,
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    component='img'
                                    src='/images/plane.png'
                                    alt='Airplane'
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        borderRadius: 3,
                                    }}
                                />
                            </Box>

                            {/* Text Content - Right Side */}
                            <Box
                                sx={{
                                    flex: 1,
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    px: 4,
                                    height: '100%',
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    sx={{
                                        mb: 2,
                                        fontSize: 25,
                                        fontWeight: 'normal',
                                        textAlign: 'center',
                                    }}
                                >
                                    Liburan kemana aja jadi gampang
                                </Typography>
                                <Typography
                                    variant='h2'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: { xs: '2rem', md: '3rem' },
                                        lineHeight: 1.1,
                                        textAlign: 'center',
                                    }}
                                >
                                    Pesan Tiketmu
                                    <br />
                                    Sekarang Juga
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* Bus dan Travel Section */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography
                            variant='h4'
                            component='h2'
                            sx={{
                                fontWeight: 'bold',
                                color: '#1e293b',
                                fontSize: { xs: '1.5rem', md: '2rem' },
                            }}
                        >
                            Bus dan Travel
                        </Typography>
                        <Button
                            variant='text'
                            endIcon={<Icon icon='mdi:arrow-right' width={20} height={20} />}
                            sx={{
                                color: '#0ea5e9',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(14, 165, 233, 0.04)',
                                },
                            }}
                        >
                            Lihat semua
                        </Button>
                    </Box>

                    <Grid container spacing={2}>
                        {busRoutes.map(route => (
                            <Grid item xs={12} md={4} key={route.id}>
                                <BusCard {...route} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

// Bus Card Component
const BusCard: React.FC<{
    route: string
    type: string
    image: string
    price: number
    rating: number
    reviewCount: number
}> = ({ route, type, image, price, rating, reviewCount }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    return (
        <Paper
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                display: 'flex',
                p: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                },
                border: '1px solid #e2e8f0',
            }}
        >
            <Box
                component='img'
                src={image}
                alt={route}
                sx={{
                    width: 160,
                    height: 160,
                    borderRadius: 2,
                    objectFit: 'cover',
                    mr: 2,
                }}
            />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography
                        variant='h6'
                        sx={{
                            fontWeight: 'bold',
                            color: '#1e293b',
                            fontSize: '1.1rem',
                            mb: 0.5,
                        }}
                    >
                        {route}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            color: '#64748b',
                            mb: 1,
                        }}
                    >
                        {type}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Icon icon='mdi:star' color='#f59e0b' width={16} height={16} />
                        <Typography variant='body2' sx={{ ml: 0.5, fontWeight: 'bold', color: '#374151' }}>
                            {rating}/{reviewCount}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        variant='h6'
                        sx={{
                            color: '#0ea5e9',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                        }}
                    >
                        {formatPrice(price)}
                    </Typography>
                    <Button
                        variant='contained'
                        size='small'
                        sx={{
                            backgroundColor: '#f97316',
                            borderRadius: 2,
                            minWidth: 40,
                            '&:hover': {
                                backgroundColor: '#ea580c',
                            },
                        }}
                    >
                        <Icon icon='mdi:arrow-right' width={16} height={16} />
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ToursSection
