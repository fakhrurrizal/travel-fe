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
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Tambahkan props untuk status login dan showAuthButtons
interface NavbarProps {
    showAuthButtons?: boolean
    isLoggedIn?: boolean
    userAvatar?: string
    userName?: string
}

const Navbar: React.FC<NavbarProps> = ({
    showAuthButtons = true,
    isLoggedIn = false,
    userAvatar = '/images/avatar.png',
    userName = 'User',
}) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const router = useRouter()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleAvatarClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        // Implementasi logout logic di sini
        console.log('Logout clicked')
        handleAvatarClose()
        // Redirect ke halaman login atau home
        router.push('/')
    }

    const handleProfile = () => {
        // Redirect ke halaman profile
        console.log('Profile clicked')
        handleAvatarClose()
        router.push('/profile')
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

            {/* Mobile Auth Buttons atau Avatar */}
            {isLoggedIn ? (
                <Box sx={{ px: 2, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                        src={userAvatar}
                        alt={userName}
                        sx={{
                            width: 50,
                            height: 50,
                            mb: 2,
                            cursor: 'pointer',
                        }}
                        onClick={handleAvatarClick}
                    />
                    <Button
                        variant='outlined'
                        fullWidth
                        onClick={handleProfile}
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
                        Profile
                    </Button>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: '#dc2626',
                            borderRadius: 25,
                            '&:hover': {
                                backgroundColor: '#b91c1c',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            ) : (
                showAuthButtons && (
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
                )
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

                        {/* Desktop Auth Buttons atau Avatar */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                {isLoggedIn ? (
                                    <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                                        <Avatar
                                            src={userAvatar}
                                            alt={userName}
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                cursor: 'pointer',
                                                border: '0px solid #F9833A',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                                transition: 'all 0.2s ease-in-out',
                                            }}
                                        />
                                    </IconButton>
                                ) : (
                                    showAuthButtons && (
                                        <>
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
                                        </>
                                    )
                                )}
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

            {/* Avatar Menu Dropdown */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAvatarClose}
                sx={{
                    mt: 1,
                    '& .MuiPaper-root': {
                        borderRadius: 2,
                        minWidth: 180,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
                    <Icon icon='mdi:account-outline' width={20} height={20} style={{ marginRight: 8 }} />
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#dc2626' }}>
                    <Icon icon='mdi:logout' width={20} height={20} style={{ marginRight: 8 }} />
                    Logout
                </MenuItem>
            </Menu>

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
