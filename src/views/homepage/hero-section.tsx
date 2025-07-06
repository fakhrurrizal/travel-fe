// components/HeroSection.tsx
import React, { useState } from 'react'
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Tab,
    Tabs,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
    Divider,
} from '@mui/material'
import { Icon } from '@iconify/react'

const HeroSection: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [tripType, setTripType] = useState('Sekali Jalan')
    const [passengers, setPassengers] = useState('1 Dewasa')
    const [flightClass, setFlightClass] = useState('Ekonomi')

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue)
    }

    const transportTabs = [
        { label: 'Pesawat', icon: 'mdi:airplane' },
        { label: 'Kereta', icon: 'mdi:train' },
        { label: 'Bus', icon: 'mdi:bus' },
        { label: 'Kapal', icon: 'mdi:ferry' },
    ]

    return (
        <Box sx={{ pt: 10 }}>
            <Container maxWidth={false} disableGutters sx={{ px: 0 }}>
                <Grid container spacing={0}>
                    {/* Left Side - Blue Section */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                                height: { xs: '60vh', md: '70vh' },
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    opacity: 0.1,
                                    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                    animation: 'float 6s ease-in-out infinite',
                                },
                            }}
                        >
                            <Box sx={{ px: { xs: 4, md: 8 }, py: 8, position: 'relative', zIndex: 2 }}>
                                <Typography
                                    variant='h1'
                                    component='h1'
                                    sx={{
                                        fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                                        fontWeight: 'bold',
                                        color: 'white',
                                        mb: 6,
                                        lineHeight: 1.2,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    Temukan
                                    <br />
                                    tempat yang
                                    <br />
                                    paling menarik
                                </Typography>

                                <Button
                                    variant='contained'
                                    size='large'
                                    sx={{
                                        backgroundColor: '#F9833A',
                                        color: 'white',
                                        borderRadius: 3,
                                        px: 5,
                                        py: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        boxShadow: '0 4px 20px rgba(249, 131, 58, 0.4)',
                                        '&:hover': {
                                            backgroundColor: '#d97706',
                                            boxShadow: '0 6px 24px rgba(249, 131, 58, 0.5)',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Explore Now
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Side - Image Section */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: { xs: '60vh', md: '70vh' },
                                backgroundImage: `url('/images/register.webp')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                            }}
                        >
                            {/* Search Bar Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 40,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '85%',
                                    maxWidth: 500,
                                    zIndex: 3,
                                }}
                            >
                                <Paper
                                    elevation={12}
                                    sx={{
                                        borderRadius: 30,
                                        overflow: 'hidden',
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        placeholder='Cari destinasi...'
                                        variant='outlined'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        sx={{
                                                            backgroundColor: '#F9833A',
                                                            color: 'white',
                                                            width: 40,
                                                            height: 40,
                                                            mr: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#d97706',
                                                            },
                                                        }}
                                                    >
                                                        <Icon icon='mdi:magnify' width={20} height={20} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                                '& .MuiInputBase-input': {
                                                    py: 2.5,
                                                    px: 4,
                                                    fontSize: '1rem',
                                                },
                                            },
                                        }}
                                    />
                                </Paper>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Transport Tabs & Booking Form */}
                <Box sx={{ mt: 0, px: 0 }}>
                    <Paper
                        elevation={8}
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/* Transport Tabs */}
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            centered
                            sx={{
                                backgroundColor: '#f8fafc',
                                '& .MuiTab-root': {
                                    minHeight: 80,
                                    px: 4,
                                    py: 2,
                                    color: '#64748b',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        color: '#F9833A',
                                        backgroundColor: 'white',
                                    },
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#F9833A',
                                    height: 3,
                                },
                            }}
                        >
                            {transportTabs.map((tab, index) => (
                                <Tab
                                    key={index}
                                    icon={<Icon icon={tab.icon} width={24} height={24} />}
                                    label={tab.label}
                                    iconPosition='top'
                                    sx={{
                                        flexDirection: 'column',
                                        gap: 1,
                                        minWidth: 120,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}
                                />
                            ))}
                        </Tabs>

                        {/* Booking Form */}
                        <Box sx={{ p: 4 }}>
                            <Grid container spacing={3} alignItems='center'>
                                {/* Trip Type */}
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant={tripType === 'Sekali Jalan' ? 'contained' : 'outlined'}
                                            onClick={() => setTripType('Sekali Jalan')}
                                            sx={{
                                                borderRadius: 3,
                                                px: 2,
                                                py: 1,
                                                fontSize: '0.9rem',
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                backgroundColor:
                                                    tripType === 'Sekali Jalan' ? '#F9833A' : 'transparent',
                                                borderColor: '#F9833A',
                                                color: tripType === 'Sekali Jalan' ? 'white' : '#F9833A',
                                                '&:hover': {
                                                    backgroundColor:
                                                        tripType === 'Sekali Jalan'
                                                            ? '#d97706'
                                                            : 'rgba(249, 131, 58, 0.08)',
                                                },
                                            }}
                                        >
                                            Sekali Jalan
                                        </Button>
                                        <Button
                                            variant={tripType === 'Pulang Pergi' ? 'contained' : 'outlined'}
                                            onClick={() => setTripType('Pulang Pergi')}
                                            sx={{
                                                borderRadius: 3,
                                                px: 2,
                                                py: 1,
                                                fontSize: '0.9rem',
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                backgroundColor:
                                                    tripType === 'Pulang Pergi' ? '#F9833A' : 'transparent',
                                                borderColor: '#F9833A',
                                                color: tripType === 'Pulang Pergi' ? 'white' : '#F9833A',
                                                '&:hover': {
                                                    backgroundColor:
                                                        tripType === 'Pulang Pergi'
                                                            ? '#d97706'
                                                            : 'rgba(249, 131, 58, 0.08)',
                                                },
                                            }}
                                        >
                                            Pulang Pergi
                                        </Button>
                                    </Box>
                                </Grid>

                                {/* Passengers */}
                                <Grid item xs={12} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ color: '#64748b' }}>Penumpang</InputLabel>
                                        <Select
                                            value={passengers}
                                            onChange={e => setPassengers(e.target.value)}
                                            label='Penumpang'
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
                                            <MenuItem value='1 Dewasa'>1 Dewasa</MenuItem>
                                            <MenuItem value='2 Dewasa'>2 Dewasa</MenuItem>
                                            <MenuItem value='3 Dewasa'>3 Dewasa</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Flight Class */}
                                <Grid item xs={12} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ color: '#64748b' }}>Kelas</InputLabel>
                                        <Select
                                            value={flightClass}
                                            onChange={e => setFlightClass(e.target.value)}
                                            label='Kelas'
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
                                            <MenuItem value='Ekonomi'>Ekonomi</MenuItem>
                                            <MenuItem value='Bisnis'>Bisnis</MenuItem>
                                            <MenuItem value='First Class'>First Class</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Divider */}
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant='h6' sx={{ mb: 1, color: '#1e293b', fontWeight: 600 }}>
                                        Asal
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder='Berangkat'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Icon
                                                        icon='mdi:airplane-takeoff'
                                                        color='#F9833A'
                                                        width={20}
                                                        height={20}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
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

                                <Grid item xs={12} md={3}>
                                    <Typography variant='h6' sx={{ mb: 1, color: '#1e293b', fontWeight: 600 }}>
                                        Tujuan
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder='Menuju'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Icon
                                                        icon='mdi:airplane-landing'
                                                        color='#F9833A'
                                                        width={20}
                                                        height={20}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
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

                                <Grid item xs={12} md={3}>
                                    <Typography variant='h6' sx={{ mb: 1, color: '#1e293b', fontWeight: 600 }}>
                                        Keberangkatan
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder='25 Juli 2025'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Icon icon='mdi:calendar' color='#F9833A' width={20} height={20} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
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

                                <Grid item xs={12} md={3}>
                                    <Typography variant='h6' sx={{ mb: 1, color: '#1e293b', fontWeight: 600 }}>
                                        Kembali
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder='30 Juli 2025'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Icon icon='mdi:calendar' color='#F9833A' width={20} height={20} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
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
                    </Paper>
                </Box>
            </Container>

            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </Box>
    )
}

export default HeroSection
