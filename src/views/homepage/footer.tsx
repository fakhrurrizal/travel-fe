// components/Footer.tsx
import React from 'react'
import { Container, Typography, Box, Grid, IconButton, Link as MuiLink, useMediaQuery, useTheme } from '@mui/material'
import { Icon } from '@iconify/react'

const Footer: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md')

    const contactInfo = [
        {
            icon: 'mdi:whatsapp',
            title: 'Whatsapp',
            info: '+62 832 1731 4130',
            color: '#25D366',
        },
        {
            icon: 'mdi:email',
            title: 'Email',
            info: 'example@gmail.com',
            color: '#f97316',
        },
    ]

    const siteMapLinks = ['Home', 'Booking', 'Kontak']

    const socialMedia = [
        {
            icon: 'mdi:twitter',
            url: '#',
            color: '#1DA1F2',
        },
        {
            icon: 'mdi:facebook',
            url: '#',
            color: '#1877F2',
        },
        {
            icon: 'mdi:instagram',
            url: '#',
            color: '#E4405F',
        },
    ]

    return (
        <Box
            component='footer'
            sx={{
                backgroundColor: '#E9F7FF',
                py: { xs: 4, sm: 5, md: 6 },
                mt: 'auto',
                borderTop: '1px solid #e2e8f0',
            }}
        >
            <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} sx={{ alignItems: 'flex-start' }}>
                    {/* Logo and Description */}
                    <Grid item xs={12} md={5} lg={4}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: { xs: 'center', md: 'flex-start' },
                            }}
                        >
                            {/* Logo */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    alignItems: 'center',
                                    mb: { xs: 2, md: 3 },
                                }}
                            >
                                <Box
                                    component='img'
                                    src='/Logo.png'
                                    alt='TRIPFY Logo'
                                    sx={{
                                        width: { xs: 100, sm: 120, md: 140 },
                                        height: { xs: 100, sm: 120, md: 140 },
                                        objectFit: 'contain',
                                    }}
                                />
                            </Box>

                            {/* Description */}
                            <Typography
                                variant='body1'
                                sx={{
                                    color: '#f97316',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                                    fontStyle: 'italic',
                                    maxWidth: { xs: '100%', md: '500px' },
                                    textAlign: { xs: 'center', md: 'left' },
                                    px: { xs: 1, sm: 0 },
                                }}
                            >
                                "Dari perencanaan hingga kepulangan, TRIPFY siap menemani setiap langkah perjalanan
                                Anda. Kami menyediakan paket wisata lengkap, hotel terbaik, dan pengalaman otentik yang
                                disesuaikan dengan kebutuhan dan impian Anda."
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box sx={{ height: '100%' }}>
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#64748b',
                                    mb: { xs: 2, md: 3 },
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    textAlign: { xs: 'center', sm: 'left', md: 'left' },
                                }}
                            >
                                Kontak
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: { xs: 2, md: 2.5 },
                                    alignItems: { xs: 'center', sm: 'flex-start', md: 'flex-start' },
                                }}
                            >
                                {contactInfo.map((contact, index) => (
                                    <Box key={index} sx={{ width: '100%' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mb: 1,
                                                justifyContent: { xs: 'center', sm: 'flex-start', md: 'flex-start' },
                                                flexWrap: 'wrap',
                                                gap: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: { xs: 35, md: 40 },
                                                    height: { xs: 35, md: 40 },
                                                    borderRadius: '50%',
                                                    backgroundColor: contact.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mr: { xs: 1, md: 2 },
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Icon icon={contact.icon} width={18} height={18} color='white' />
                                            </Box>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant='h6'
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#64748b',
                                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    {contact.title}
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    sx={{
                                                        color: '#64748b',
                                                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                                                        lineHeight: 1.2,
                                                        wordBreak: 'break-word',
                                                    }}
                                                >
                                                    {contact.info}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Site Map */}
                    <Grid item xs={12} sm={6} md={2} lg={2}>
                        <Box sx={{ height: '100%' }}>
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#64748b',
                                    mb: { xs: 2, md: 3 },
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    textAlign: { xs: 'center', sm: 'left', md: 'left' },
                                }}
                            >
                                Peta Situs
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'row', sm: 'column' },
                                    gap: { xs: 2, sm: 1.5 },
                                    alignItems: { xs: 'center', sm: 'flex-start', md: 'flex-start' },
                                    justifyContent: { xs: 'center', sm: 'flex-start' },
                                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                                }}
                            >
                                {siteMapLinks.map((link, index) => (
                                    <MuiLink
                                        key={index}
                                        href='#'
                                        sx={{
                                            color: '#f97316',
                                            textDecoration: 'none',
                                            fontSize: { xs: '0.85rem', md: '0.95rem' },
                                            fontWeight: 'medium',
                                            '&:hover': {
                                                color: '#ea580c',
                                                textDecoration: 'underline',
                                            },
                                            transition: 'color 0.3s ease',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {link}
                                    </MuiLink>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} md={2} lg={3}>
                        <Box sx={{ height: '100%' }}>
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#64748b',
                                    mb: { xs: 2, md: 3 },
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    textAlign: { xs: 'center', md: 'left' },
                                }}
                            >
                                Media Sosial
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: { xs: 1, md: 1.5 },
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    flexWrap: 'wrap',
                                }}
                            >
                                {socialMedia.map((social, index) => (
                                    <IconButton
                                        key={index}
                                        href={social.url}
                                        sx={{
                                            width: { xs: 40, md: 45 },
                                            height: { xs: 40, md: 45 },
                                            backgroundColor: social.color,
                                            color: 'white',
                                            borderRadius: 2,
                                            '&:hover': {
                                                backgroundColor: social.color,
                                                opacity: 0.8,
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <Icon
                                            icon={social.icon}
                                            width={isMobile ? 18 : 22}
                                            height={isMobile ? 18 : 22}
                                        />
                                    </IconButton>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box
                    sx={{
                        borderTop: '1px solid #e2e8f0',
                        pt: { xs: 2, md: 3 },
                        mt: { xs: 3, md: 4 },
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant='body2'
                        sx={{
                            color: '#64748b',
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            px: { xs: 1, sm: 0 },
                        }}
                    >
                        © {new Date().getFullYear()} TRIPFY Travel and Leisure. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
