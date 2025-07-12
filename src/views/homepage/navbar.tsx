import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Tambahkan props showAuthButtons
interface NavbarProps {
    showAuthButtons?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ showAuthButtons = true }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const router = useRouter()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Booking', path: '/' },
    ]

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' sx={{ my: 2, color: '#F9833A' }}>
                TRIPFY
            </Typography>
            <List>
                {navItems.map(item => (
                    <ListItem key={item.label} disablePadding>
                        <Button
                            fullWidth
                            onClick={() => router.push(item.path)}
                            sx={{
                                justifyContent: 'flex-start',
                                px: 3,
                                py: 1.5,
                                color: '#64748b',
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </Button>
                    </ListItem>
                ))}
            </List>
            {showAuthButtons && (
                <Box sx={{ px: 2, mt: 2 }}>
                    <Button
                        variant='outlined'
                        fullWidth
                        onClick={() => router.push('/auth/register')}
                        sx={{
                            mb: 1,
                            borderColor: '#F9833A',
                            color: '#F9833A',
                            borderRadius: 25,
                            '&:hover': {
                                borderColor: '#d97706',
                                backgroundColor: 'rgba(249, 131, 58, 0.04)',
                            },
                        }}
                    >
                        Daftar
                    </Button>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={() => router.push('/auth/login')}
                        sx={{
                            backgroundColor: '#F9833A',
                            borderRadius: 25,
                            '&:hover': {
                                backgroundColor: '#d97706',
                            },
                        }}
                    >
                        Masuk
                    </Button>
                </Box>
            )}
        </Box>
    )

    return (
        <>
            <AppBar
                position='fixed'
                elevation={0}
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: 'none',
                }}
            >
                <Container maxWidth='xl'>
                    <Toolbar disableGutters sx={{ py: 0 }}>
                        {/* Logo */}
                        <Box className='flex justify-center items-center mb-3'>
                            <Image src='/Logo.png' alt='Logo' width={70} height={70} />
                        </Box>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                                {navItems.map(item => (
                                    <Button
                                        key={item.label}
                                        onClick={() => router.push(item.path)}
                                        sx={{
                                            mx: 2,
                                            color: '#1e293b',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: 'rgba(249, 131, 58, 0.08)',
                                                color: '#F9833A',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        {/* Desktop Auth Buttons */}
                        {!isMobile && showAuthButtons && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant='contained'
                                    onClick={() => router.push('/auth/register')}
                                    sx={{
                                        backgroundColor: '#F9833A',
                                        borderRadius: 25,
                                        px: 4,
                                        py: 1.2,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        boxShadow: '0 2px 8px rgba(249, 131, 58, 0.3)',
                                        '&:hover': {
                                            backgroundColor: '#d97706',
                                            boxShadow: '0 4px 12px rgba(249, 131, 58, 0.4)',
                                        },
                                    }}
                                >
                                    Daftar
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => router.push('/auth/login')}
                                    sx={{
                                        borderColor: '#F9833A',
                                        color: '#F9833A',
                                        borderRadius: 25,
                                        px: 4,
                                        py: 1.2,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            borderColor: '#d97706',
                                            backgroundColor: 'rgba(249, 131, 58, 0.04)',
                                        },
                                    }}
                                >
                                    Masuk
                                </Button>
                            </Box>
                        )}

                        {/* Mobile Menu Icon */}
                        {isMobile && (
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton
                                    color='inherit'
                                    aria-label='open drawer'
                                    edge='start'
                                    onClick={handleDrawerToggle}
                                    sx={{ color: '#64748b' }}
                                >
                                    <Icon icon='mdi:menu' width={24} height={24} />
                                </IconButton>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    )
}

export default Navbar
