// components/TourCard.tsx
import React from 'react'
import { Paper, Typography, Box, Button } from '@mui/material'
import { Icon } from '@iconify/react'

interface TourCardProps {
    id: string
    title: string
    image: string
    price: number
    location: string
    rating: number
    reviewCount: number
}

const TourCard: React.FC<TourCardProps> = ({ title, image, price, location, rating, reviewCount }) => {
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
                alt={title}
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
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Icon icon='mdi:star' color='#f59e0b' width={16} height={16} />
                        <Typography variant='body2' sx={{ ml: 0.5, fontWeight: 'bold', color: '#374151' }}>
                            {rating}
                        </Typography>
                        <Typography variant='body2' sx={{ ml: 0.5, color: '#6b7280' }}>
                            ({reviewCount} ulasan)
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Icon icon='mdi:map-marker' color='#6b7280' width={16} height={16} />
                        <Typography variant='body2' sx={{ ml: 0.5, color: '#6b7280' }}>
                            {location}
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

export default TourCard
