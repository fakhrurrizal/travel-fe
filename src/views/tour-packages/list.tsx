'use client'

import React, { useState, useMemo } from 'react'
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Chip,
    Card,
    CardMedia,
    CardContent,
    Rating,
} from '@mui/material'
import { Icon } from '@iconify/react'
import Navbar from '../homepage/navbar'

// Mock data untuk destinasi
const TourPackagesPage = () => {
    const destinations = [
        // Bali
        {
            id: 1,
            name: 'Nusa Penida',
            category: 'pantai',
            location: 'Bali',
            province: 'bali',
            image: '/images/nusa-penida.png',
            price: 850000,
            rating: 5,
            reviews: 350,
            date: '20 Agust - 21 Agust 2025',
            type: 'Open Tour',
        },
        {
            id: 2,
            name: 'Pantai Diamond',
            category: 'pantai',
            location: 'Bali',
            province: 'bali',
            image: '/images/pantai-diamond.jpeg',
            price: 720000,
            rating: 5,
            reviews: 350,
            date: '25 Juli 2025',
            type: 'Open Tour',
        },
        {
            id: 3,
            name: 'Blue Lagoon',
            category: 'pantai',
            location: 'Bali',
            province: 'bali',
            image: '/images/blue-lagoon.jpg',
            price: 3200000,
            rating: 5,
            reviews: 350,
            date: '23 Juli - 25 Juli 2025',
            type: 'Open Tour',
        },
        {
            id: 4,
            name: 'Tanah Lot',
            category: 'pantai',
            location: 'Bali',
            province: 'bali',
            image: '/images/tanah-lot.webp',
            price: 120000,
            rating: 5,
            reviews: 350,
            date: '22 Juli 2025',
            type: 'Open Tour',
        },

        // Jawa Timur
        {
            id: 5,
            name: 'Bromo',
            category: 'gunung',
            location: 'Jawa Timur',
            province: 'jawa-timur',
            image: '/images/bromo.png',
            price: 375000,
            rating: 5,
            reviews: 428,
            date: '15 Agust 2025',
            type: 'Open Tour',
        },
        {
            id: 6,
            name: 'Semeru',
            category: 'gunung',
            location: 'Jawa Timur',
            province: 'jawa-timur',
            image: '/images/semeru.webp',
            price: 650000,
            rating: 4.8,
            reviews: 256,
            date: '18 Agust 2025',
            type: 'Open Tour',
        },
        {
            id: 7,
            name: 'Pantai Klayar',
            category: 'pantai',
            location: 'Jawa Timur',
            province: 'jawa-timur',
            image: '/images/pantai-klayar.jpg',
            price: 290000,
            rating: 4.7,
            reviews: 189,
            date: '20 Juli 2025',
            type: 'Open Tour',
        },

        // Jawa Barat
        {
            id: 8,
            name: 'Kawah Putih',
            category: 'gunung',
            location: 'Jawa Barat',
            province: 'jawa-barat',
            image: '/images/kawah-putih.jpg',
            price: 185000,
            rating: 4.6,
            reviews: 312,
            date: '28 Juli 2025',
            type: 'Open Tour',
        },
        {
            id: 9,
            name: 'Pantai Pangandaran',
            category: 'pantai',
            location: 'Jawa Barat',
            province: 'jawa-barat',
            image: '/images/pantai-pangandaran.jpg',
            price: 225000,
            rating: 4.5,
            reviews: 198,
            date: '30 Juli 2025',
            type: 'Open Tour',
        },

        // DI Yogyakarta
        {
            id: 10,
            name: 'Gunung Merapi',
            category: 'gunung',
            location: 'DI Yogyakarta',
            province: 'yogyakarta',
            image: '/images/gunung-merapi.jpg',
            price: 320000,
            rating: 4.7,
            reviews: 275,
            date: '25 Agust 2025',
            type: 'Open Tour',
        },
        {
            id: 11,
            name: 'Pantai Parangtritis',
            category: 'pantai',
            location: 'DI Yogyakarta',
            province: 'yogyakarta',
            image: '/images/pantai-parangritis.jpg',
            price: 150000,
            rating: 4.4,
            reviews: 167,
            date: '27 Juli 2025',
            type: 'Open Tour',
        },

        // Nusa Tenggara Barat
        {
            id: 12,
            name: 'Gunung Rinjani',
            category: 'gunung',
            location: 'Nusa Tenggara Barat',
            province: 'nusa-tenggara-barat',
            image: '/images/gunung-rinjani.jpg',
            price: 850000,
            rating: 4.9,
            reviews: 445,
            date: '5 Agust 2025',
            type: 'Open Tour',
        },
        {
            id: 13,
            name: 'Pantai Pink',
            category: 'pantai',
            location: 'Nusa Tenggara Barat',
            province: 'nusa-tenggara-barat',
            image: '/images/pantai-pink.webp',
            price: 675000,
            rating: 4.8,
            reviews: 298,
            date: '8 Agust 2025',
            type: 'Open Tour',
        },

        // Nusa Tenggara Timur
        {
            id: 14,
            name: 'Pulau Komodo',
            category: 'pantai',
            location: 'Nusa Tenggara Timur',
            province: 'nusa-tenggara-timur',
            image: '/images/pulau-komodo.jpg',
            price: 1200000,
            rating: 4.9,
            reviews: 523,
            date: '12 Agust 2025',
            type: 'Open Tour',
        },
        {
            id: 15,
            name: 'Danau Kelimutu',
            category: 'gunung',
            location: 'Nusa Tenggara Timur',
            province: 'nusa-tenggara-timur',
            image: '/images/danau-kelimutu.png',
            price: 580000,
            rating: 4.7,
            reviews: 234,
            date: '15 Agust 2025',
            type: 'Open Tour',
        },

        // Maluku
        {
            id: 16,
            name: 'Pantai Ora',
            category: 'pantai',
            location: 'Maluku',
            province: 'maluku',
            image: '/images/pantai-ora.webp',
            price: 950000,
            rating: 4.8,
            reviews: 178,
            date: '20 Agust 2025',
            type: 'Open Tour',
        },
        {
            id: 17,
            name: 'Pulau Banda',
            category: 'pantai',
            location: 'Maluku',
            province: 'maluku',
            image: '/images/pulau-banda.jpeg',
            price: 1100000,
            rating: 4.9,
            reviews: 145,
            date: '22 Agust 2025',
            type: 'Open Tour',
        },
    ]

    const provinces = [
        { value: 'semua', label: 'Semua' },
        { value: 'jawa-barat', label: 'Jawa Barat' },
        { value: 'jawa-timur', label: 'Jawa Timur' },
        { value: 'yogyakarta', label: 'DI Yogyakarta' },
        { value: 'maluku', label: 'Maluku' },
        { value: 'nusa-tenggara-barat', label: 'Nusa Tenggara Barat' },
        { value: 'nusa-tenggara-timur', label: 'Nusa Tenggara Timur' },
        { value: 'bali', label: 'Bali' },
    ]

    const categories = [
        { value: 'semua', label: 'Semua' },
        { value: 'pantai', label: 'Pantai' },
        { value: 'gunung', label: 'Gunung' },
    ]

    type Destination = {
        id: number
        name: string
        category: string
        location: string
        province: string
        image: string
        price: number
        rating: number
        reviews: number
        date: string
        type: string
    }

    const DestinationCard = ({ destination }: { destination: Destination }) => {
        const formatPrice = (price: number) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }).format(price)
        }

        return (
            <Card
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                    },
                    border: '1px solid #e2e8f0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component='img'
                        image={destination.image}
                        alt={destination.name}
                        sx={{
                            height: 250,
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <Chip
                        label={destination.type}
                        size='small'
                        sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            backgroundColor: destination.type === 'Private Tour' ? '#8b5cf6' : '#F9833A',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                        }}
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                        {destination.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={destination.rating} readOnly size='small' />
                        <Typography variant='body2' sx={{ ml: 1, color: '#64748b' }}>
                            {destination.rating} ({destination.reviews} ulasan)
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Icon icon='mdi:map-marker' color='#64748b' width={16} height={16} />
                        <Typography variant='body2' sx={{ ml: 0.5, color: '#64748b' }}>
                            {destination.location}
                        </Typography>
                    </Box>

                    <Typography variant='body2' sx={{ color: '#64748b', mb: 2 }}>
                        {destination.date}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 'auto',
                        }}
                    >
                        <Typography variant='h6' sx={{ color: '#0ea5e9', fontWeight: 'bold' }}>
                            {formatPrice(destination.price)}
                        </Typography>
                        <Button
                            variant='contained'
                            size='small'
                            sx={{
                                backgroundColor: '#F9833A',
                                borderRadius: 2,
                                minWidth: 40,
                                '&:hover': {
                                    backgroundColor: '#d97706',
                                },
                            }}
                        >
                            <Icon icon='mdi:arrow-right' width={16} height={16} />
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    const TourPackagesContent = () => {
        const [selectedDate, setSelectedDate] = useState('')
        const [selectedCategory, setSelectedCategory] = useState('semua')
        const [selectedProvinces, setSelectedProvinces] = useState(['semua'])
        const [searchQuery, setSearchQuery] = useState('')

        const filteredDestinations = useMemo(() => {
            return destinations.filter(destination => {
                // Filter by search query
                const matchesSearch =
                    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    destination.location.toLowerCase().includes(searchQuery.toLowerCase())

                // Filter by category
                const matchesCategory = selectedCategory === 'semua' || destination.category === selectedCategory

                // Filter by provinces
                const matchesProvince =
                    selectedProvinces.includes('semua') || selectedProvinces.includes(destination.province)

                // Filter by date range (modern logic)
                let matchesDate = true
                if (selectedDate) {
                    const [startStr, endStr] = destination.date.split(' - ')
                    const startDate = new Date(startStr.trim())
                    const endDate = endStr ? new Date(endStr.trim()) : startDate
                    const selected = new Date(selectedDate)

                    // Bandingkan apakah selectedDate berada di dalam rentang startDate s.d. endDate
                    matchesDate = selected >= startDate && selected <= endDate
                }

                return matchesSearch && matchesCategory && matchesProvince && matchesDate
            })
        }, [searchQuery, selectedCategory, selectedProvinces, selectedDate])

        return (
            <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
                {/* Header */}
                <Navbar showAuthButtons={false} isLoggedIn={true} />
                <Container maxWidth='xl'>
                    {/* Search and Filters */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2, mt: 5, pt: 10, color: '#1e293b' }}>
                            Urutkan
                        </Typography>

                        <Grid container spacing={2} alignItems='center'>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    type='date'
                                    label='Tanggal'
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white',
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
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Kategori</InputLabel>
                                    <Select
                                        value={selectedCategory}
                                        label='Kategori'
                                        onChange={e => setSelectedCategory(e.target.value)}
                                        sx={{
                                            borderRadius: 2,
                                            backgroundColor: 'white',
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
                                        {categories.map(category => (
                                            <MenuItem key={category.value} value={category.value}>
                                                {category.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    placeholder='Cari destinasi...'
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <Icon icon='mdi:magnify' color='#64748b' width={20} height={20} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white',
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
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Sidebar and Content */}
                    <Grid container spacing={3}>
                        {/* Sidebar Filter */}
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: 'white' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Icon icon='mdi:filter' color='#F9833A' width={20} height={20} />
                                    <Typography variant='h6' sx={{ ml: 1, fontWeight: 'bold', color: '#1e293b' }}>
                                        FILTER
                                    </Typography>
                                </Box>

                                <Typography variant='subtitle1' sx={{ mb: 2, color: '#64748b' }}>
                                    Lokasi
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    {provinces.slice(1).map(province => (
                                        <FormControlLabel
                                            key={province.value}
                                            control={
                                                <Checkbox
                                                    checked={selectedProvinces.includes(province.value)}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            setSelectedProvinces(prev =>
                                                                prev.includes('semua')
                                                                    ? [province.value]
                                                                    : [...prev, province.value]
                                                            )
                                                        } else {
                                                            setSelectedProvinces(prev => {
                                                                const newSelected = prev.filter(
                                                                    p => p !== province.value
                                                                )

                                                                return newSelected.length > 0 ? newSelected : ['semua']
                                                            })
                                                        }
                                                    }}
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: '#F9833A',
                                                        },
                                                    }}
                                                />
                                            }
                                            label={province.label}
                                            sx={{ display: 'block', mb: 1 }}
                                        />
                                    ))}
                                </Box>

                                <Typography variant='subtitle1' sx={{ mb: 2, color: '#64748b' }}>
                                    Kategori
                                </Typography>

                                <Box>
                                    {categories.slice(1).map(category => (
                                        <FormControlLabel
                                            key={category.value}
                                            control={
                                                <Checkbox
                                                    checked={selectedCategory === category.value}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            setSelectedCategory(category.value)
                                                        } else {
                                                            setSelectedCategory('semua')
                                                        }
                                                    }}
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: '#F9833A',
                                                        },
                                                    }}
                                                />
                                            }
                                            label={category.label}
                                            sx={{ display: 'block', mb: 1 }}
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Main Content */}
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={3}>
                                {filteredDestinations.map(destination => (
                                    <Grid item xs={12} sm={6} md={3} key={destination.id}>
                                        <DestinationCard destination={destination} />
                                    </Grid>
                                ))}
                            </Grid>

                            {filteredDestinations.length === 0 && (
                                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                                    <Icon icon='mdi:magnify' color='#64748b' width={48} height={48} />
                                    <Typography variant='h6' sx={{ mt: 2, color: '#64748b' }}>
                                        Tidak ada destinasi yang ditemukan
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: '#64748b' }}>
                                        Coba ubah filter pencarian Anda
                                    </Typography>
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    }

    return <TourPackagesContent />
}

export default TourPackagesPage
