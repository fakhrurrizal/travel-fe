import React from 'react'
import { Box, Container, Typography, Paper, Grid, Button, Divider } from '@mui/material'
import Navbar from '../homepage/navbar'

const TicketDetailPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Navbar showAuthButtons={false} />
            {/* Content */}
            <Container maxWidth='lg' sx={{ py: 4 }}>
                <Typography
                    variant='h4'
                    component='h1'
                    sx={{
                        fontWeight: 'bold',
                        color: '#1e293b',
                        mb: 4,
                        mt: 10,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                >
                    Detail Tiket
                </Typography>

                <Grid container spacing={4}>
                    {/* Left Column - Ticket Details */}
                    <Grid item xs={12} md={8}>
                        {/* Ticket Code Section */}
                        <Paper
                            sx={{
                                borderRadius: 3,
                                p: 3,
                                mb: 3,
                                background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                                border: '1px solid #e0f2fe',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box>
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            color: '#0369a1',
                                            fontWeight: 'bold',
                                            mb: 1,
                                        }}
                                    >
                                        Kode Tiket Anda
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            color: '#0369a1',
                                            fontWeight: 'bold',
                                            fontSize: { xs: '1.5rem', md: '2rem' },
                                        }}
                                    >
                                        778305428C1
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box
                                        component='img'
                                        src='/images/eTicket.png'
                                        alt='E-Ticket'
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 1,
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: '#0369a1',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Anda wajib menunjukkan boarding pass saat boarding dan saat pemeriksaan di atas pesawat
                            </Typography>
                        </Paper>

                        {/* Flight Details */}
                        <Paper
                            sx={{
                                borderRadius: 3,
                                p: 3,
                                mb: 3,
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    color: '#0369a1',
                                    fontWeight: 'bold',
                                    mb: 3,
                                }}
                            >
                                Detail Perjalanan
                            </Typography>

                            <Grid container spacing={3}>
                                {/* Airline and Flight Number */}
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                color: '#0369a1',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Garuda Indonesia
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                color: '#0369a1',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            GA401
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Route */}
                                <Grid item xs={12}>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    >
                                        <Box sx={{ textAlign: 'left', flex: 1 }}>
                                            <Typography
                                                variant='h6'
                                                sx={{
                                                    color: '#0369a1',
                                                    fontWeight: 'bold',
                                                    mb: 1,
                                                }}
                                            >
                                                Denpasar-Bali (DPS)
                                            </Typography>
                                            <Typography
                                                variant='h4'
                                                sx={{
                                                    color: '#1e293b',
                                                    fontWeight: 'bold',
                                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                                    mb: 1,
                                                }}
                                            >
                                                06 : 10
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                sx={{
                                                    color: '#64748b',
                                                }}
                                            >
                                                8 Agustus 2025
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                mx: 4,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                variant='h3'
                                                sx={{
                                                    color: '#0369a1',
                                                    fontWeight: 'bold',
                                                    mb: 1,
                                                }}
                                            >
                                                &gt;
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: '#64748b',
                                                    fontSize: '0.8rem',
                                                }}
                                            >
                                                2 jam
                                            </Typography>
                                        </Box>

                                        <Box sx={{ textAlign: 'right', flex: 1 }}>
                                            <Typography
                                                variant='h6'
                                                sx={{
                                                    color: '#0369a1',
                                                    fontWeight: 'bold',
                                                    mb: 1,
                                                }}
                                            >
                                                Jakarta (CGK)
                                            </Typography>
                                            <Typography
                                                variant='h4'
                                                sx={{
                                                    color: '#1e293b',
                                                    fontWeight: 'bold',
                                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                                    mb: 1,
                                                }}
                                            >
                                                07 : 10
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                sx={{
                                                    color: '#64748b',
                                                }}
                                            >
                                                8 Agustus 2025
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Price Details */}
                        <Paper
                            sx={{
                                borderRadius: 3,
                                p: 3,
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    color: '#0369a1',
                                    fontWeight: 'bold',
                                    mb: 3,
                                }}
                            >
                                Detail Harga
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: '#0369a1',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Garuda Indonesia
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: '#0369a1',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    GA401
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: '#64748b',
                                    }}
                                >
                                    Dewasa x 1
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: '#64748b',
                                    }}
                                >
                                    Rp 1.237.400
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: '#0369a1',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Total
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: '#0369a1',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Rp 1.237.400
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right Column - Download E-Ticket */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                borderRadius: 3,
                                p: 3,
                                border: '1px solid #e2e8f0',
                                height: 'fit-content',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    color: '#0369a1',
                                    fontWeight: 'bold',
                                    mb: 3,
                                }}
                            >
                                Unduh E-Ticket
                            </Typography>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                            fontWeight: 'bold',
                                            mr: 1,
                                        }}
                                    >
                                        1.
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                        }}
                                    >
                                        Buka aplikasi scan Anda
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                            fontWeight: 'bold',
                                            mr: 1,
                                        }}
                                    >
                                        2.
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                        }}
                                    >
                                        Scan QR code disamping atau unduh
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                            fontWeight: 'bold',
                                            mr: 1,
                                        }}
                                    >
                                        3.
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                        }}
                                    >
                                        Print halaman PDF
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                            fontWeight: 'bold',
                                            mr: 1,
                                        }}
                                    >
                                        4.
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#0369a1',
                                        }}
                                    >
                                        Tunjukkan boarding pass Anda kepada petugas
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant='contained'
                                fullWidth
                                sx={{
                                    backgroundColor: '#F9833A',
                                    color: 'white',
                                    borderRadius: 3,
                                    py: 2,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#d97706',
                                    },
                                }}
                            >
                                Unduh
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default TicketDetailPage
